<script lang="ts">
  import { flushSync, onMount } from 'svelte';
  import { estimateCostRange } from '../lib/calculations';

  type ServiceKey = 'mowing' | 'weeding';

  const acreageSteps = [1, 2, 5, 10, 20, 30, 50, 75, 100] as const;
  const serviceData: Record<
    ServiceKey,
    { name: string; shortName: string; rate: number; slowerCoverage: number; fasterCoverage: number }
  > = {
    mowing: {
      name: 'Undervine mowing',
      shortName: 'Mowing',
      rate: 180,
      slowerCoverage: 0.8,
      fasterCoverage: 1,
    },
    weeding: {
      name: 'Mechanical weed control',
      shortName: 'Weed control',
      rate: 220,
      slowerCoverage: 0.65,
      fasterCoverage: 0.8,
    },
  };
  const serviceKeys = Object.keys(serviceData) as ServiceKey[];
  const money = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  });

  let dialog: HTMLDialogElement;
  let opener: HTMLElement | null = null;
  let acreageIndex = $state(2);
  let service = $state<ServiceKey>('mowing');

  const acres = $derived(acreageSteps[acreageIndex] ?? 5);
  const acreageLabel = $derived(`${acres} ${acres === 1 ? 'acre' : 'acres'}`);
  const estimate = $derived.by(() => estimateCostRange(acres, serviceData[service]));
  const estimateLabel = $derived(`${money.format(estimate.low)} to ${money.format(estimate.high)}`);
  const emailBody = $derived(
    `Hi Mat,\n\nI would like to check an indicative 12Grapes ground-management estimate.\n\nApproximate vineyard area: ${acreageLabel}\nWork needed: ${serviceData[service].name}\nPlanning range: ${estimateLabel} excluding GST\n\nVineyard location:\nAccess, row-spacing or weed-condition notes:\n\nPlease contact me to confirm the scope, timing and price.`,
  );
  const mailtoHref = $derived(
    `mailto:matmahlook@gmail.com?subject=${encodeURIComponent(`12Grapes estimate - ${acreageLabel}`)}&body=${encodeURIComponent(emailBody)}`,
  );

  onMount(() => {
    function handleEstimateTrigger(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const trigger = event.target.closest<HTMLElement>('[data-estimate-open]');
      if (!trigger) return;

      event.preventDefault();
      const returnService = trigger.dataset.estimateReturnService;
      opener = returnService
        ? document.querySelector<HTMLElement>(`[data-service-open="${returnService}"]`) ?? trigger
        : trigger;

      const requestedService = trigger.dataset.estimateService;
      if (requestedService === 'mowing' || requestedService === 'weeding') {
        flushSync(() => (service = requestedService));
      }

      if (!dialog.open) dialog.showModal();
      document.body.classList.add('modal-open');
    }

    document.addEventListener('click', handleEstimateTrigger);

    if (window.location.hash === '#estimate') {
      if (!dialog.open) dialog.showModal();
      document.body.classList.add('modal-open');
    }

    return () => {
      document.removeEventListener('click', handleEstimateTrigger);
      document.body.classList.remove('modal-open');
    };
  });

  function closeModal() {
    dialog.close();
    handleDialogClose();
  }

  function handleDialogClose() {
    document.body.classList.remove('modal-open');
    if (window.location.hash === '#estimate') {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }
    opener?.focus();
    opener = null;
  }

  function handleDialogCancel() {
    setTimeout(handleDialogClose);
  }

  function handleBackdropClick(event: MouseEvent) {
    if (event.target === dialog) closeModal();
  }
</script>

<dialog
  bind:this={dialog}
  class="estimate-modal"
  id="estimate"
  aria-labelledby="estimate-modal-title"
  aria-describedby="estimate-modal-description"
  onclose={handleDialogClose}
  oncancel={handleDialogCancel}
  onclick={handleBackdropClick}
>
  <div class="estimate-modal-panel">
    <header class="estimate-modal-header">
      <div>
        <p class="eyebrow">Ground-management estimate</p>
        <h2 id="estimate-modal-title">Get a quick planning range.</h2>
        <p id="estimate-modal-description">Choose the vineyard area and work needed. Mat will work out the machinery, crew and number of passes with you.</p>
      </div>
      <button class="modal-close" type="button" aria-label="Close estimate" onclick={closeModal}>×</button>
    </header>

    <div class="estimate-layout">
      <div class="estimate-controls">
        <section class="estimate-control" aria-labelledby="acreage-label">
          <div class="estimate-control-heading">
            <div>
              <span class="step-badge" aria-hidden="true">1</span>
              <h3 id="acreage-label">Approximate vineyard area</h3>
            </div>
            <output for="acreage-range">{acreageLabel}</output>
          </div>
          <input
            id="acreage-range"
            class="estimate-range"
            type="range"
            min="0"
            max={acreageSteps.length - 1}
            step="1"
            value={acreageIndex}
            aria-labelledby="acreage-label"
            aria-valuetext={acreageLabel}
            oninput={(event) => (acreageIndex = Number(event.currentTarget.value))}
          />
          <div class="estimate-range-labels" aria-hidden="true">
            <span>1 acre</span>
            <span>20 acres</span>
            <span>100 acres</span>
          </div>
        </section>

        <section class="estimate-control" aria-labelledby="service-label">
          <div class="estimate-control-heading">
            <div>
              <span class="step-badge" aria-hidden="true">2</span>
              <h3 id="service-label">What work do you need?</h3>
            </div>
          </div>
          <div class="estimate-service-options" role="group" aria-labelledby="service-label">
            {#each serviceKeys as key}
              <button
                type="button"
                class:selected={service === key}
                aria-pressed={service === key}
                onclick={() => (service = key)}
              >
                <span class="radio-dot" aria-hidden="true"></span>
                <span>
                  <strong>{serviceData[key].shortName}</strong>
                  <small>{serviceData[key].name}</small>
                </span>
              </button>
            {/each}
          </div>
          <p class="estimate-control-note">Not sure which method suits the block? Pick the closest option and Mat will confirm it with you.</p>
        </section>
      </div>

      <aside class="estimate-summary">
        <p class="eyebrow light">Your planning range</p>
        <div class="summary-total" aria-live="polite" aria-atomic="true">
          <span>Indicative cost</span>
          <strong>{estimateLabel}</strong>
          <small>excluding GST</small>
        </div>
        <p class="summary-selection">{acreageLabel} <span aria-hidden="true">·</span> {serviceData[service].name}</p>
        <a class="button button-cream summary-button" href={mailtoHref}>Email Mat to confirm <span aria-hidden="true">↗</span></a>
        <p class="summary-note">This is a planning guide based on current proposed rates and a two-hour minimum. Access, row spacing, weed load, travel and seasonal conditions can change the final price.</p>
      </aside>
    </div>
  </div>
</dialog>
