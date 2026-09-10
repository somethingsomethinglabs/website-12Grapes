<script lang="ts">
  interface Props {
    base: string;
  }

  let { base }: Props = $props();
  let menuOpen = $state(false);
  let menuButton: HTMLButtonElement;

  function closeMenu() {
    menuOpen = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (menuOpen && event.key === 'Escape') {
      menuOpen = false;
      menuButton?.focus();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="site-header" role="banner">
  <a class="brand" href={base} aria-label="12Grapes home">
    <img class="brand-mark-image" src={`${base}12grapes-mark.png`} alt="" />
    <span class="brand-copy" aria-hidden="true">
      <span class="brand-wordmark">12Grapes</span>
      <span class="brand-descriptor">Vineyard services</span>
    </span>
  </a>
  <button
    bind:this={menuButton}
    class="menu-toggle"
    type="button"
    aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
    aria-controls="main-navigation"
    aria-expanded={menuOpen}
    onclick={() => (menuOpen = !menuOpen)}
  >
    <span></span><span></span>
  </button>
  <nav
    id="main-navigation"
    aria-label="Main navigation"
    class:nav-open={menuOpen}
  >
    <a href={`${base}#services`} onclick={closeMenu}>Services</a>
    <a href={`${base}#ground-management`} onclick={closeMenu}>Ground management</a>
    <a href={`${base}#about`} onclick={closeMenu}>About</a>
    <a href={`${base}#contact`} onclick={closeMenu}>Contact</a>
    <a class="nav-cta" href="#estimate" data-estimate-open>
      Ground estimate <span aria-hidden="true">↗</span>
    </a>
  </nav>
</header>
