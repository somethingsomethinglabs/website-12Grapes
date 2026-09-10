<script lang="ts">
  import { tick } from 'svelte';
  import NumericField from './NumericField.svelte';
  import { calculateLabourSupport, hoursFor, normalizeNumber } from '../lib/calculations';

  type ServiceKey = 'mowing' | 'cultivation' | 'tornado';
  type Passes = Record<ServiceKey, number>;

  const serviceData: Record<ServiceKey, { name: string; rate: number; productivity: number; note: string }> = {
    mowing: { name: 'Undervine mowing', rate: 180, productivity: 1, note: 'Mock assumption: 1.0 acre/hr' },
    cultivation: { name: 'Mechanical cultivation', rate: 200, productivity: 0.7, note: 'Mock assumption: 0.7 acre/hr' },
    tornado: { name: 'Fischer Tornado', rate: 220, productivity: 0.8, note: 'Indicative: 0.8 acre/hr' },
  };
  const serviceKeys = Object.keys(serviceData) as ServiceKey[];
  const money = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
  const hoursLabel = (hours: number) => `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;

  let mode = $state<'quick' | 'detailed'>('quick');
  let acres = $state(5);
  let quickService = $state<ServiceKey>('tornado');
  let selected = $state<ServiceKey[]>(['mowing', 'tornado']);
  let passes = $state<Passes>({ mowing: 1, cultivation: 1, tornado: 1 });
  let operatorHours = $state(0);
  let workerCount = $state(0);
  let workerHours = $state(0);
  let name = $state('');
  let location = $state('');
  let prepared = $state(false);
  let copyStatus = $state('');
  let formError = $state('');
  let serviceError = $state('');
  let servicePlan: HTMLDivElement;
  let nameInput: HTMLInputElement;
  let locationInput: HTMLInputElement;
  let preparedSection: HTMLElement;

  const quick = $derived.by(() => {
    const service = serviceData[quickService];
    const hours = hoursFor(acres, service.productivity);
    return { hours, cost: hours * service.rate };
  });

  const details = $derived.by(() => {
    const lines = selected.map((key) => {
      const service = serviceData[key];
      const hours = hoursFor(acres, service.productivity, passes[key]);
      return { key, name: service.name, hours, cost: hours * service.rate };
    });
    const labour = calculateLabourSupport(operatorHours, workerCount, workerHours);
    return {
      ...labour,
      lines,
      total: lines.reduce((sum, line) => sum + line.cost, 0) + labour.operatorCost + labour.workerCost,
    };
  });

  const activeTotal = $derived(mode === 'quick' ? quick.cost : details.total);
  const emailBody = $derived(
    mode === 'quick'
      ? `Hi Mat,\n\nI would like to register my interest in 12Grapes.\n\nName: ${name || 'Not provided'}\nVineyard location: ${location || 'Not provided'}\nArea: ${acres} acres\nService: ${serviceData[quickService].name}\nIndicative hours: ${quick.hours}\nIndicative price ex GST: ${money.format(quick.cost)}\n\nPlease contact me to discuss the property and service concept.`
      : `Hi Mat,\n\nI would like to register my interest in 12Grapes.\n\nName: ${name || 'Not provided'}\nVineyard location: ${location || 'Not provided'}\nArea: ${acres} acres\nServices:\n${details.lines.map((line) => `- ${line.name}: ${hoursLabel(line.hours)}, ${money.format(line.cost)} ex GST`).join('\n')}\nOperator support: ${operatorHours > 0 ? `${hoursLabel(operatorHours)} requested (${hoursLabel(details.operatorBillableHours)} billable), ${money.format(details.operatorCost)} ex GST` : 'Not selected'}\nWorker support: ${details.workerCost > 0 ? `${workerCount} workers × ${hoursLabel(workerHours)} requested each (${hoursLabel(details.workerBillableHours)} billable each), ${money.format(details.workerCost)} ex GST` : 'Not selected'}\nIndicative total ex GST: ${money.format(details.total)}\n\nPlease contact me to discuss the property and service concept.`,
  );

  $effect(() => {
    if (!prepared) return;

    void tick().then(() => {
      preparedSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      preparedSection?.focus({ preventScroll: true });
    });
  });

  function invalidatePrepared() {
    prepared = false;
    copyStatus = '';
  }

  function changeMode(nextMode: 'quick' | 'detailed') {
    invalidatePrepared();
    formError = '';
    serviceError = '';
    mode = nextMode;
  }

  function toggleService(key: ServiceKey) {
    invalidatePrepared();
    serviceError = '';
    selected = selected.includes(key) ? selected.filter((item) => item !== key) : [...selected, key];
  }

  function prepareEnquiry(event: SubmitEvent) {
    event.preventDefault();

    if (mode === 'detailed' && selected.length === 0) {
      serviceError = 'Choose at least one service before preparing your enquiry.';
      formError = '';
      servicePlan?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      servicePlan?.focus({ preventScroll: true });
      return;
    }

    if (!name.trim() || !location.trim()) {
      serviceError = '';
      formError = 'Add your name and vineyard location before preparing your enquiry.';
      const missingField = !name.trim() ? nameInput : locationInput;
      missingField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      missingField?.focus({ preventScroll: true });
      return;
    }

    const form = event.currentTarget as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    serviceError = '';
    formError = '';
    prepared = true;
  }

  async function copyEnquiry() {
    try {
      await navigator.clipboard.writeText(emailBody);
      copyStatus = 'Copied. Paste it into an email to Mat.';
    } catch {
      copyStatus = 'Select the enquiry text and copy it manually.';
    }
  }
</script>

<form class="calculator-shell" onsubmit={prepareEnquiry} novalidate>
  <div class="calculator-main">
    <div class="mode-switch" role="group" aria-label="Estimate type">
      <button type="button" aria-pressed={mode === 'quick'} class:active={mode === 'quick'} onclick={() => changeMode('quick')}>Quick estimate</button>
      <button type="button" aria-pressed={mode === 'detailed'} class:active={mode === 'detailed'} onclick={() => changeMode('detailed')}>Detailed estimate</button>
    </div>

    <div class="field-block property-size">
      <div class="field-heading"><div><span class="step-badge">1</span><h2>Property size</h2></div><strong>{acres} acres</strong></div>
      <input
        aria-label="Vineyard size in acres"
        class="range"
        type="range"
        min="0.25"
        max="100"
        step="0.25"
        value={acres}
        oninput={(event) => {
          invalidatePrepared();
          acres = normalizeNumber(event.currentTarget.value, { min: 0.25, max: 100, emptyValue: 5 });
        }}
      />
      <div class="range-labels"><span>0.25 acre</span><span>100 acres</span></div>
      <label class="number-field">
        Enter exact acreage
        <NumericField value={acres} rules={{ min: 0.25, max: 100, emptyValue: 5 }} step={0.25} required onValueChange={(value) => (acres = value)} onDirty={invalidatePrepared} />
      </label>
    </div>

    {#if mode === 'quick'}
      <div class="field-block">
        <div class="field-heading"><div><span class="step-badge">2</span><h2>Choose one service</h2></div></div>
        <div class="option-grid" role="group" aria-label="Vineyard service">
          {#each serviceKeys as key}
            <button
              type="button"
              aria-pressed={quickService === key}
              class="option-card"
              class:selected={quickService === key}
              onclick={() => {
                invalidatePrepared();
                quickService = key;
              }}
            >
              <span class="radio-dot"></span>
              <strong>{serviceData[key].name}</strong>
              <span>{money.format(serviceData[key].rate)}/hr</span>
              <small>{serviceData[key].note}</small>
            </button>
          {/each}
        </div>
      </div>
    {:else}
      <div
        class="field-block service-plan"
        bind:this={servicePlan}
        tabindex="-1"
        aria-describedby={serviceError ? 'estimate-service-error' : undefined}
      >
        <div class="field-heading"><div><span class="step-badge">2</span><h2>Build the service plan</h2></div></div>
        <div class="detailed-services" role="group" aria-label="Selected vineyard services" aria-describedby={serviceError ? 'estimate-service-error' : undefined}>
          {#each serviceKeys as key}
            <div class="detailed-row" class:selected={selected.includes(key)}>
              <label>
                <input type="checkbox" checked={selected.includes(key)} onchange={() => toggleService(key)} />
                <span><strong>{serviceData[key].name}</strong><small>{serviceData[key].note} · {money.format(serviceData[key].rate)}/hr</small></span>
              </label>
              <label class="passes">
                Passes
                <NumericField
                  value={passes[key]}
                  rules={{ min: 1, max: 6, integer: true, emptyValue: 1 }}
                  step={1}
                  disabled={!selected.includes(key)}
                  required={selected.includes(key)}
                  onValueChange={(value) => (passes = { ...passes, [key]: value })}
                  onDirty={invalidatePrepared}
                />
              </label>
            </div>
          {/each}
        </div>
        {#if serviceError}<p class="form-error" id="estimate-service-error" role="alert">{serviceError}</p>{/if}
      </div>

      <div class="field-block">
        <div class="field-heading"><div><span class="step-badge">3</span><h2>Optional labour support</h2></div></div>
        <p class="field-note">Machinery prices already include the operator. Add non-machinery support only if it is useful.</p>
        <div class="labour-grid">
          <label>Operator-only hours<NumericField value={operatorHours} rules={{ min: 0, emptyValue: 0 }} step={0.5} onValueChange={(value) => (operatorHours = value)} onDirty={invalidatePrepared} /><small>$47.35/hr</small></label>
          <label>Additional workers<NumericField value={workerCount} rules={{ min: 0, max: 20, integer: true, emptyValue: 0 }} step={1} onValueChange={(value) => (workerCount = value)} onDirty={invalidatePrepared} /><small>$39.68/hr each</small></label>
          <label>Hours per worker<NumericField value={workerHours} rules={{ min: 0, emptyValue: 0 }} step={0.5} onValueChange={(value) => (workerHours = value)} onDirty={invalidatePrepared} /><small>Two-hour minimum</small></label>
        </div>
      </div>
    {/if}

    <div class="field-block contact-fields" id="interest-details">
      <div class="field-heading"><div><span class="step-badge">{mode === 'quick' ? 3 : 4}</span><h2>Add your details</h2></div></div>
      <div class="contact-grid">
        <label>
          Your name
          <input bind:this={nameInput} required autocomplete="name" aria-invalid={Boolean(formError) && !name.trim()} aria-describedby={formError ? 'estimate-form-error' : undefined} bind:value={name} oninput={() => { invalidatePrepared(); formError = ''; }} placeholder="Name" />
        </label>
        <label>
          Vineyard location
          <input bind:this={locationInput} required autocomplete="address-level2" aria-invalid={Boolean(formError) && !location.trim()} aria-describedby={formError ? 'estimate-form-error' : undefined} bind:value={location} oninput={() => { invalidatePrepared(); formError = ''; }} placeholder="Town or region" />
        </label>
      </div>
      {#if formError}<p class="form-error" id="estimate-form-error" role="alert">{formError}</p>{/if}
    </div>
  </div>

  <aside class="estimate-summary" aria-live="polite">
    <p class="eyebrow light">Your indicative estimate</p>
    <div class="summary-total">
      <span>Estimated cost</span>
      <strong>{money.format(activeTotal)}</strong>
      <small>excluding GST</small>
    </div>
    <div class="summary-lines">
      {#if mode === 'quick'}
        <div><span>{serviceData[quickService].name}</span><strong>{quick.hours} hrs</strong></div>
      {:else}
        {#each details.lines as line}
          <div><span>{line.name}<small>{hoursLabel(line.hours)}</small></span><strong>{money.format(line.cost)}</strong></div>
        {/each}
        {#if details.operatorCost > 0}
          <div><span>Operator support<small>{hoursLabel(operatorHours)} requested · {hoursLabel(details.operatorBillableHours)} billable</small></span><strong>{money.format(details.operatorCost)}</strong></div>
        {/if}
        {#if details.workerCost > 0}
          <div><span>Worker support<small>{workerCount} workers × {hoursLabel(workerHours)} requested · {hoursLabel(details.workerBillableHours)} billable each</small></span><strong>{money.format(details.workerCost)}</strong></div>
        {/if}
      {/if}
    </div>
    <button class="button button-cream summary-button" type="submit">Prepare expression of interest <span aria-hidden="true">↗</span></button>
    <p class="summary-note">This is a mock estimate, not a quote. Final timing and pricing will depend on vineyard layout, terrain, vine age, weed load, turning time and seasonal conditions.</p>
  </aside>
</form>

{#if prepared}
  <section class="prepared-enquiry" bind:this={preparedSection} tabindex="-1" aria-live="polite" aria-labelledby="prepared-enquiry-title">
    <div>
      <p class="eyebrow">Ready to send</p>
      <h2 id="prepared-enquiry-title">Your expression of interest is prepared.</h2>
      <p>Copy the text below into an email addressed to <strong>matmahlook@gmail.com</strong>.</p>
    </div>
    <div>
      <textarea readonly value={emailBody} aria-label="Prepared expression of interest"></textarea>
      <button class="button button-primary" type="button" onclick={copyEnquiry}>Copy enquiry text</button>
      {#if copyStatus}<p class="copy-status">{copyStatus}</p>{/if}
    </div>
  </section>
{/if}

<section class="assumptions-section">
  <p class="eyebrow">How this estimate works</p>
  <h2>Clear assumptions, easy to adjust.</h2>
  <div class="assumption-grid">
    <article><strong>Two-hour minimum</strong><p>Every selected service is estimated at a minimum of two hours.</p></article>
    <article><strong>Operator included</strong><p>All machinery rates include the operator and are shown before GST.</p></article>
    <article><strong>Coverage rates</strong><p>Tornado uses the documented 0.8 acres/hr. Mowing and cultivation use mock figures until field rates are confirmed.</p></article>
  </div>
</section>
