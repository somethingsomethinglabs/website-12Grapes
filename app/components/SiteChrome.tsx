'use client';

import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="12Grapes home">
        <span className="brand-mark" aria-hidden="true"><b>12</b>G</span>
        <span className="brand-name"><b>12Grapes</b><small>Vineyard Services</small></span>
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span /><span />
      </button>
      <nav aria-label="Main navigation" className={menuOpen ? 'nav-open' : ''}>
        <Link href="/#services" onClick={closeMenu}>Services</Link>
        <Link href="/#ground-management" onClick={closeMenu}>Ground management</Link>
        <Link href="/about" onClick={closeMenu}>About</Link>
        <Link href="/#contact" onClick={closeMenu}>Contact</Link>
        <Link className="nav-cta" href="/estimate" onClick={closeMenu}>Get a quote <span aria-hidden="true">↗</span></Link>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="footer-inner">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true"><b>12</b>G</span>
            <span className="brand-name"><b>12Grapes</b><small>Vineyard Services</small></span>
          </Link>
          <p>Practical vineyard support and specialist ground management for Gippsland growers.</p>
        </div>
        <div className="footer-links">
          <Link href="/#services">Services</Link>
          <Link href="/#ground-management">Ground management</Link>
          <Link href="/about">About 12Grapes</Link>
          <Link href="/estimate">Request a quote</Link>
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
