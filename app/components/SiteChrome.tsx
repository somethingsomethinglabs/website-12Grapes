export function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="12Grapes home">
        <span className="brand-mark" aria-hidden="true">12</span>
        <span>Grapes</span>
      </a>
      <nav aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/estimate">Estimate</a>
        <a className="nav-cta" href="/estimate#interest-details">Register interest</a>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <a className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true">12</span>
            <span>Grapes</span>
          </a>
          <p>Proposed vineyard services for Gippsland growers.</p>
        </div>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/estimate">Estimate</a>
          <a href="tel:0427551508">0427 551 508</a>
          <span>matmahlook@gmail.com</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>12Grapes · Gippsland, Victoria</span>
        <span>Expression of interest only</span>
      </div>
    </footer>
  );
}
