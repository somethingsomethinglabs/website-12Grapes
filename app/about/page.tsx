import type { Metadata } from 'next';
import Link from 'next/link';
import { Footer, Header } from '../components/SiteChrome';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story, proposed services and year-round vineyard approach behind 12Grapes in Gippsland.',
};

const serviceGroups = [
  ['Establish', 'Vineyard establishment', 'New block development', 'Irrigation support'],
  ['Grow', 'Pruning and training', 'Canopy management', 'Pest and disease monitoring'],
  ['Harvest', 'Crop estimation', 'Yield management', 'Harvest coordination'],
];

export default function AboutPage() {
  return (
    <main>
      <Header />
      <section className="page-hero about-hero">
        <p className="eyebrow">About 12Grapes</p>
        <h1>Care that follows the whole growing year.</h1>
        <p>12Grapes is a proposed Gippsland vineyard service built around steady, practical work and better outcomes for growers.</p>
      </section>

      <section className="section story-grid">
        <div className="story-number" aria-hidden="true">12</div>
        <div className="story-copy">
          <p className="eyebrow">What the name means</p>
          <h2>Twelve months. Twelve grapes. One growing cycle.</h2>
          <p>The name comes from the tradition of twelve grapes of prosperity, one for every month of the year. For us, it is a useful reminder that strong vineyards come from consistent work through every season.</p>
          <p>That same idea shapes the proposed service: reliable support, careful timing and attention to the details that affect vine health and fruit quality.</p>
        </div>
      </section>

      <section className="dark-section">
        <div className="section-heading split-heading">
          <div><p className="eyebrow light">Across the season</p><h2>Support beyond the undervine strip.</h2></div>
          <p>Ground management is the starting point. The wider service concept covers the practical jobs that keep a vineyard moving.</p>
        </div>
        <div className="service-group-grid">
          {serviceGroups.map(([title, ...items], index) => (
            <article key={title}>
              <span className="group-number">0{index + 1}</span>
              <h3>{title}</h3>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section local-section">
        <div className="local-art" aria-hidden="true"><span>Gippsland</span><i /></div>
        <div>
          <p className="eyebrow">Locally focused</p>
          <h2>Designed for Gippsland vineyards.</h2>
          <p>The expression-of-interest stage is about listening first. Vineyard layout, timing, terrain and weed pressure all change how the work needs to happen. Grower feedback will help shape a service that fits local conditions.</p>
          <Link className="button button-primary" href="/estimate">Estimate your property</Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}

