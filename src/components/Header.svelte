<script lang="ts">
  interface Props {
    currentPath: string;
  }

  let { currentPath }: Props = $props();
  let menuOpen = $state(false);
  let menuButton: HTMLButtonElement;
  let navigation: HTMLElement;

  function closeMenu() {
    menuOpen = false;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (!menuOpen) return;

    if (event.key === 'Escape') {
      menuOpen = false;
      menuButton?.focus();
      return;
    }

    if (event.key !== 'Tab' || !window.matchMedia('(max-width: 760px)').matches) return;

    const links = Array.from(navigation?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? [])
      .filter((link) => link.getClientRects().length > 0);
    const lastLink = links.at(-1);

    if (!lastLink) return;

    if (event.shiftKey && document.activeElement === menuButton) {
      event.preventDefault();
      lastLink.focus();
    } else if (!event.shiftKey && document.activeElement === lastLink) {
      event.preventDefault();
      menuButton.focus();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="site-header">
  <a class="brand" href="/" aria-label="12Grapes home">
    <img class="brand-logo" src="/12grapes-logo.png" alt="12Grapes Vineyard Services" />
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
    bind:this={navigation}
    id="main-navigation"
    aria-label="Main navigation"
    class:nav-open={menuOpen}
  >
    <a href="/#services" onclick={closeMenu}>Services</a>
    <a href="/#ground-management" onclick={closeMenu}>Ground management</a>
    <a href="/about" aria-current={currentPath === '/about' ? 'page' : undefined} onclick={closeMenu}>About</a>
    <a href="/#contact" onclick={closeMenu}>Contact</a>
    <a class="nav-cta" href="#estimate" data-estimate-open onclick={closeMenu}>
      Get a quote <span aria-hidden="true">↗</span>
    </a>
  </nav>
</header>
