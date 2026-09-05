import Link from 'next/link';

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="12Grapes home">
        <span className="brand-mark" aria-hidden="true">12</span>
        <span>Grapes</span>
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/estimate">Estimate</Link>
        <a className="nav-cta" href="mailto:matmahlook@gmail.com">Register interest</a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true">12</span>
            <span>Grapes</span>
          </Link>
          <p>Proposed vineyard services for Gippsland growers.</p>
        </div>
        <div className="footer-links">
          <Link href="/about">About</Link>
          <Link href="/estimate">Estimate</Link>
          <a href="tel:0427551508">0427 551 508</a>
          <a href="mailto:matmahlook@gmail.com">matmahlook@gmail.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>12Grapes · Gippsland, Victoria</span>
        <span>Expression of interest only</span>
      </div>
    </footer>
  );
}

