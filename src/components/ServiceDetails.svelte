<script lang="ts">
  import { flushSync, onMount } from 'svelte';

  type ServiceKey =
    | 'ground-management'
    | 'pruning-training'
    | 'canopy-management'
    | 'vineyard-maintenance'
    | 'irrigation-support'
    | 'harvest-support';

  type Service = {
    number: string;
    title: string;
    intro: string;
    details: string;
    includes: string[];
    estimateService?: 'mowing' | 'weeding';
  };

  const services: Record<ServiceKey, Service> = {
    'ground-management': {
      number: '01',
      title: 'Ground management',
      intro: 'Mechanical work beneath the vine, with herbicide-free options for keeping undervine strips under control.',
      details: 'A compact tractor and front-mounted, dual-sided equipment can work both sides of the row in one pass. The right approach depends on weed pressure, row spacing, access and the condition of the block.',
      includes: ['Undervine mowing and cultivation', 'Weed, sucker and trash disruption', 'Support for snail and weevil control'],
      estimateService: 'mowing',
    },
    'pruning-training': {
      number: '02',
      title: 'Pruning & training',
      intro: 'Hands-on seasonal vine work that supports sound structure, balanced growth and productive fruiting wood.',
      details: 'The scope can be shaped around the age of the block, its training system and the work already completed by your team.',
      includes: ['Seasonal pruning support', 'Vine training and tie-down work', 'Help with new and established blocks'],
    },
    'canopy-management': {
      number: '03',
      title: 'Canopy management',
      intro: 'Timely canopy work to improve access, airflow and conditions around the fruit zone.',
      details: 'Support can be planned around growth stage, variety and the jobs that need extra hands during the busiest part of the season.',
      includes: ['Shoot positioning and wire work', 'Fruit-zone and airflow management', 'Seasonal labour when timing matters'],
    },
    'vineyard-maintenance': {
      number: '04',
      title: 'Vineyard maintenance',
      intro: 'Practical help with the routine jobs and repairs that keep a vineyard ready for the season ahead.',
      details: 'Work is scoped to the block, from a focused maintenance visit to extra support alongside your existing crew.',
      includes: ['General vineyard upkeep', 'Minor repairs and seasonal jobs', 'Extra on-ground capability'],
    },
    'irrigation-support': {
      number: '05',
      title: 'Irrigation support',
      intro: 'On-ground help checking and maintaining vineyard irrigation systems.',
      details: 'The service can support routine checks or help work through block-specific issues before they interrupt the growing program.',
      includes: ['System and line checks', 'Maintenance support', 'Help preparing irrigation for the season'],
    },
    'harvest-support': {
      number: '06',
      title: 'Harvest support',
      intro: 'Extra capability for the narrow window when crop information, coordination and timely vineyard work matter most.',
      details: 'Support can be discussed early in the season and adjusted as crop timing and the needs of the block become clearer.',
      includes: ['Crop estimation', 'Yield and harvest preparation', 'Extra hands during harvest'],
    },
  };

  let dialog: HTMLDialogElement;
  let opener: HTMLElement | null = null;
  let selectedKey = $state<ServiceKey>('ground-management');
  const service = $derived(services[selectedKey]);

  onMount(() => {
    function handleServiceTrigger(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const trigger = event.target.closest<HTMLElement>('[data-service-open]');
      const requestedService = trigger?.dataset.serviceOpen;
      if (!trigger || !requestedService || !(requestedService in services)) return;

      event.preventDefault();
      flushSync(() => (selectedKey = requestedService as ServiceKey));
      opener = trigger;
      if (!dialog.open) dialog.showModal();
      document.body.classList.add('service-modal-open');
    }

    document.addEventListener('click', handleServiceTrigger);

    return () => {
      document.removeEventListener('click', handleServiceTrigger);
      document.body.classList.remove('service-modal-open');
    };
  });

  function closeModal() {
    dialog.close();
    handleDialogClose();
  }

  function openCalculator() {
    opener = null;
    dialog.close();
    handleDialogClose();
  }

  function handleDialogClose() {
    document.body.classList.remove('service-modal-open');
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
  class="service-modal"
  aria-labelledby="service-modal-title"
  aria-describedby="service-modal-intro service-modal-description"
  onclose={handleDialogClose}
  oncancel={handleDialogCancel}
  onclick={handleBackdropClick}
>
  <article class="service-modal-panel">
    <header class="service-modal-header">
      <div>
        <p class="service-modal-number">Service {service.number}</p>
        <h2 id="service-modal-title">{service.title}</h2>
      </div>
      <button class="modal-close" type="button" aria-label="Close service details" onclick={closeModal}>×</button>
    </header>

    <div class="service-modal-body">
      <p class="service-modal-intro" id="service-modal-intro">{service.intro}</p>
      <p class="service-modal-copy" id="service-modal-description">{service.details}</p>

      <section class="service-modal-includes" aria-labelledby="service-includes-title">
        <h3 id="service-includes-title">How we can help</h3>
        <ul>
          {#each service.includes as item, index}
            <li><span aria-hidden="true">0{index + 1}</span>{item}</li>
          {/each}
        </ul>
      </section>
    </div>

    <footer class="service-modal-footer">
      <p>The calculator covers mechanical ground management and gives an indicative planning range.</p>
      <a
        class="button button-primary service-calculator-link"
        href="#estimate"
        data-estimate-open
        data-estimate-service={service.estimateService ?? 'mowing'}
        data-estimate-return-service={selectedKey}
        onclick={openCalculator}
      >
        Open the calculator <span aria-hidden="true">→</span>
      </a>
    </footer>
  </article>
</dialog>
