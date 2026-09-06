'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from '@phosphor-icons/react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navigationRef = useRef<HTMLElement>(null);
  const navigationId = useId();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleMenuKeyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !window.matchMedia('(max-width: 760px)').matches) return;

      const toggle = menuButtonRef.current;
      const links = Array.from(navigationRef.current?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? [])
        .filter((link) => link.getClientRects().length > 0);
      const lastLink = links.at(-1);

      if (!toggle || !lastLink) return;

      if (event.shiftKey && document.activeElement === toggle) {
        event.preventDefault();
        lastLink.focus();
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault();
        toggle.focus();
      }
    };

    document.addEventListener('keydown', handleMenuKeyboard);
    return () => document.removeEventListener('keydown', handleMenuKeyboard);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="12Grapes home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="brand-logo" src="/12grapes-logo.png" alt="12Grapes Vineyard Services" />
      </Link>
      <button
        ref={menuButtonRef}
        className="menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
        aria-controls={navigationId}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span />
      </button>
      <nav ref={navigationRef} id={navigationId} aria-label="Main navigation" className={menuOpen ? 'nav-open' : ''}>
        <Link href="/#services" onClick={closeMenu}>Services</Link>
        <Link href="/#ground-management" onClick={closeMenu}>Ground management</Link>
        <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined} onClick={closeMenu}>About</Link>
        <Link href="/#contact" onClick={closeMenu}>Contact</Link>
        <Link className="nav-cta" href="/estimate" aria-current={pathname === '/estimate' ? 'page' : undefined} onClick={closeMenu}>Get a quote <ArrowUpRight size={16} weight="bold" /></Link>
      </nav>
    </header>
  );
}

export function Footer() {
  const pathname = usePathname();

  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div>
          <Link className="brand footer-brand" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-logo" src="/12grapes-logo.png" alt="12Grapes Vineyard Services" />
          </Link>
          <p>Practical vineyard support and specialist ground management for Gippsland growers.</p>
        </div>
        <div className="footer-links">
          <Link href="/#services">Services</Link>
          <Link href="/#ground-management">Ground management</Link>
          <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>About 12Grapes</Link>
          <Link href="/estimate" aria-current={pathname === '/estimate' ? 'page' : undefined}>Request a quote</Link>
          <a href="tel:0427551508">0427 551 508</a>
          <a href="mailto:matmahlook@gmail.com">matmahlook@gmail.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>12Grapes · Gippsland, Victoria</span>
        <span>Supporting Gippsland vineyards all year round.</span>
      </div>
    </footer>
  );
}
