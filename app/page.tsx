import { Footer, Header } from './components/SiteChrome';

const services = [
  { number: '01', title: 'Undervine mowing', copy: 'A cleaner undervine strip with less weed competition and a tidy row presentation.', rate: '$180/hr' },
  { number: '02', title: 'Mechanical cultivation', copy: 'Targeted soil work for growers looking to reduce their reliance on herbicide.', rate: '$200/hr' },
  { number: '03', title: 'Fischer Tornado', copy: 'Dual-sided weed, sucker, trash and juvenile snail disruption in one efficient pass.', rate: '$220/hr' },
];

const benefits = [
  'Cleaner undervine presentation',
  'Reduced reliance on herbicide',
  'Improved airflow and access',
  'Snail and weevil pressure reduction',
  'Mechanical de-suckering support',
  'Predictable seasonal scheduling',
];

export default function Home() {
  return (
    <main>
      <Header />
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Proposed vineyard service · Gippsland, Victoria</p>
          <h1>Better care beneath every vine.</h1>
          <p className="hero-lede">
            12Grapes is exploring a specialised, herbicide-free ground-management
            service for Gippsland vineyards. Help shape what comes next.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="/estimate">Estimate your vineyard <span aria-hidden="true">↗</span></a>
            <a className="button button-secondary" href="/estimate#interest-details">Register interest</a>
          </div>
          <p className="microcopy">Indicative pricing only · Two-hour minimum · Prices exclude GST</p>
        </div>

        <div className="vineyard-visual" aria-label="Stylised vineyard rows at sunset">
          <div className="sun" />
          <div className="hill hill-back" />
          <div className="hill hill-front" />
          <div className="vine-row row-one" />
          <div className="vine-row row-two" />
          <div className="vine-row row-three" />
          <div className="visual-label"><span>Herbicide-free</span><strong>Undervine care</strong></div>
        </div>
      </section>

      <section className="service-ribbon" aria-label="Proposed services">
        <p>Undervine mowing</p><p>Mechanical cultivation</p><p>Fischer Tornado</p><p>Seasonal support</p>
      </section>

      <section className="section services-section">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow">The proposed service</p>
            <h2>Precise work, row by row.</h2>
          </div>
          <p>Purpose-built equipment and a local operator, with a practical focus on the work beneath the vine.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <div className="card-top"><span>{service.number}</span><span className="rate-pill">{service.rate}</span></div>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section concept-section">
        <div className="concept-image-wrap">
          <img className="concept-image" src="/og.png" alt="12Grapes vineyard tractor working between vine rows in Gippsland" />
        </div>
        <div className="concept-copy">
          <p className="eyebrow">Built around the vineyard</p>
          <h2>A cleaner alternative under the vine.</h2>
          <p>The proposed set-up pairs a compact vineyard tractor with a front-mounted, dual-sided Fischer system. Where practical, a grower&apos;s rear-mounted equipment could be used during the same pass.</p>
          <ul className="benefit-list">
            {benefits.map((benefit) => <li key={benefit}><span aria-hidden="true">✓</span>{benefit}</li>)}
          </ul>
          <a className="text-link" href="/about">Read about the 12Grapes approach <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="section estimate-callout">
        <div>
          <p className="eyebrow light">Test the numbers</p>
          <h2>What could your block cost?</h2>
        </div>
        <div>
          <p>Start with a five-acre example, adjust the services, then email the estimate to Mat as an expression of interest.</p>
          <a className="button button-cream" href="/estimate">Build an estimate <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <Footer />
    </main>
  );
}
