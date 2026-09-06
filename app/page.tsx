import { Footer, Header } from './components/SiteChrome';

const services = [
  { number: '01', title: 'Ground management', copy: 'Mechanical undervine mowing and cultivation with herbicide-free options.' },
  { number: '02', title: 'Pruning & training', copy: 'Hands-on vine work to support structure, balance and productive growth.' },
  { number: '03', title: 'Canopy management', copy: 'Seasonal canopy work to improve access, airflow and fruit-zone conditions.' },
  { number: '04', title: 'Vineyard maintenance', copy: 'Practical support for vineyard upkeep, repairs and routine seasonal jobs.' },
  { number: '05', title: 'Irrigation support', copy: 'On-ground help with irrigation checks, maintenance and vineyard water systems.' },
  { number: '06', title: 'Harvest support', copy: 'Extra capability when timing matters, including crop estimation and harvest work.' },
];

export default function Home() {
  return (
    <main>
      <div className="hero-shell">
        <Header />
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Gippsland, Victoria</p>
            <h1>Specialist vineyard services.<br /><em>Built for Gippsland.</em></h1>
            <p className="hero-lede">
              Practical vineyard support, specialist equipment and mechanical
              undervine management, delivered by a local operator who knows the work.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#services">Explore services <span aria-hidden="true">↓</span></a>
              <a className="button button-secondary" href="/estimate">Request a quote <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="vineyard-visual" role="img" aria-label="Vineyard tractor working between rows in warm afternoon light">
            <div className="visual-label"><span>Purpose-built</span><strong>Vineyard machinery</strong></div>
          </div>
          <div className="hero-index" aria-hidden="true">12</div>
        </section>
        <div className="service-ribbon" aria-label="Service highlights">
          <p><span>01</span> Specialist equipment</p>
          <p><span>02</span> Year-round support</p>
          <p><span>03</span> Herbicide-free options</p>
          <p><span>04</span> Gippsland based</p>
        </div>
      </div>

      <section className="home-section services-section" id="services">
        <header className="home-section-heading">
          <div>
            <p className="section-kicker">Vineyard services</p>
            <h2>Support for every season.</h2>
          </div>
          <p>From establishment through harvest, 12Grapes provides practical vineyard support across Gippsland.</p>
        </header>
        <div className="home-service-grid">
          {services.map((service) => (
            <article className="home-service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </div>
              <a href="/estimate" aria-label={`Request a quote for ${service.title}`}><span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="ground-section" id="ground-management">
        <div className="ground-image" role="img" aria-label="Specialist vineyard tractor and undervine mowing equipment">
          <span className="image-note">Mechanical care beneath the vine</span>
        </div>
        <div className="ground-copy">
          <p className="section-kicker section-kicker-light">Specialist ground management</p>
          <h2>Control weeds.<br />Keep herbicide out.</h2>
          <p className="ground-lede">A purpose-built, dual-sided system works beneath both sides of the row in one pass. It gives growers a practical mechanical option for cleaner undervine strips.</p>
          <div className="ground-points">
            <div><span>01</span><p>Undervine mowing and cultivation</p></div>
            <div><span>02</span><p>Weed, sucker and trash disruption</p></div>
            <div><span>03</span><p>Support for snail and weevil control</p></div>
          </div>
          <a className="line-link" href="/estimate">Discuss your vineyard <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <section className="equipment-section" aria-label="Specialist equipment">
        <div className="equipment-intro">
          <p className="section-kicker">Specialist equipment</p>
          <h2>Built for the row.</h2>
          <p>A compact vineyard tractor and front-mounted system are selected for precision, visibility and efficient work in tight vineyard conditions.</p>
        </div>
        <div className="equipment-stats">
          <article><strong>Dual-sided</strong><span>Two undervine strips in one pass</span></article>
          <article><strong>Front-mounted</strong><span>Clear visibility around every vine</span></article>
          <article><strong>Multi-task ready</strong><span>Make more of each pass where practical</span></article>
        </div>
      </section>

      <section className="why-section">
        <div className="why-mark" aria-hidden="true">12</div>
        <div className="why-copy">
          <p className="section-kicker">Why 12Grapes?</p>
          <h2>Twelve grapes.<br />Twelve months.</h2>
          <p>The name reflects a simple belief. A successful harvest starts with consistent care throughout the year.</p>
          <a className="line-link line-link-dark" href="/about">Our story <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="section-kicker section-kicker-light">Work with 12Grapes</p>
        <h2>Tell us what your vineyard needs.</h2>
        <p>Based in Gippsland and building a practical service around local growers.</p>
        <div className="contact-actions">
          <a className="button button-primary" href="/estimate">Request a quote <span aria-hidden="true">↗</span></a>
          <a className="contact-phone" href="tel:0427551508">0427 551 508</a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
