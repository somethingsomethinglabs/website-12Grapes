'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Footer, Header } from '../components/SiteChrome';

type ServiceKey = 'mowing' | 'cultivation' | 'tornado';
type Passes = Record<ServiceKey, number>;

const serviceData: Record<ServiceKey, { name: string; rate: number; productivity: number; note: string }> = {
  mowing: { name: 'Undervine mowing', rate: 180, productivity: 1, note: 'Mock assumption: 1.0 acre/hr' },
  cultivation: { name: 'Mechanical cultivation', rate: 200, productivity: 0.7, note: 'Mock assumption: 0.7 acre/hr' },
  tornado: { name: 'Fischer Tornado', rate: 220, productivity: 0.8, note: 'Indicative: 0.8 acre/hr' },
};

const money = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 });
const hoursFor = (acres: number, productivity: number, passes = 1) => Math.ceil(Math.max(2, (acres / productivity) * passes) * 4) / 4;

export default function EstimatePage() {
  const [mode, setMode] = useState<'quick' | 'detailed'>('quick');
  const [acres, setAcres] = useState(5);
  const [quickService, setQuickService] = useState<ServiceKey>('tornado');
  const [selected, setSelected] = useState<ServiceKey[]>(['mowing', 'tornado']);
  const [passes, setPasses] = useState<Passes>({ mowing: 1, cultivation: 1, tornado: 1 });
  const [operatorHours, setOperatorHours] = useState(0);
  const [workerCount, setWorkerCount] = useState(0);
  const [workerHours, setWorkerHours] = useState(0);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [prepared, setPrepared] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const [formError, setFormError] = useState('');
  const [serviceError, setServiceError] = useState('');
  const servicePlanRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const preparedRef = useRef<HTMLElement>(null);

  const quick = useMemo(() => {
    const service = serviceData[quickService];
    const hours = hoursFor(acres, service.productivity);
    return { hours, cost: hours * service.rate };
  }, [acres, quickService]);

  const details = useMemo(() => {
    const lines = selected.map((key) => {
      const service = serviceData[key];
      const hours = hoursFor(acres, service.productivity, passes[key]);
      return { key, name: service.name, hours, cost: hours * service.rate };
    });
    const operatorCost = operatorHours > 0 ? Math.max(2, operatorHours) * 47.35 : 0;
    const workerCost = workerCount > 0 && workerHours > 0 ? workerCount * Math.max(2, workerHours) * 39.68 : 0;
    return { lines, operatorCost, workerCost, total: lines.reduce((sum, line) => sum + line.cost, 0) + operatorCost + workerCost };
  }, [acres, selected, passes, operatorHours, workerCount, workerHours]);

  const activeTotal = mode === 'quick' ? quick.cost : details.total;
  const emailBody = mode === 'quick'
    ? `Hi Mat,\n\nI would like to register my interest in 12Grapes.\n\nName: ${name || 'Not provided'}\nVineyard location: ${location || 'Not provided'}\nArea: ${acres} acres\nService: ${serviceData[quickService].name}\nIndicative hours: ${quick.hours}\nIndicative price ex GST: ${money.format(quick.cost)}\n\nPlease contact me to discuss the property and service concept.`
    : `Hi Mat,\n\nI would like to register my interest in 12Grapes.\n\nName: ${name || 'Not provided'}\nVineyard location: ${location || 'Not provided'}\nArea: ${acres} acres\nServices:\n${details.lines.map((line) => `- ${line.name}: ${line.hours} hrs, ${money.format(line.cost)} ex GST`).join('\n')}\nOperator support: ${money.format(details.operatorCost)}\nWorker support: ${money.format(details.workerCost)}\nIndicative total ex GST: ${money.format(details.total)}\n\nPlease contact me to discuss the property and service concept.`;
  const toggleService = (key: ServiceKey) => {
    setServiceError('');
    setSelected((current) => current.includes(key) ? current.filter((item) => item !== key) : [...current, key]);
  };

  useEffect(() => {
    if (!prepared) return;
    preparedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    preparedRef.current?.focus({ preventScroll: true });
  }, [prepared]);

  const prepareEnquiry = () => {
    if (mode === 'detailed' && selected.length === 0) {
      setServiceError('Choose at least one service before preparing your enquiry.');
      setFormError('');
      servicePlanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    if (!name.trim() || !location.trim()) {
      setServiceError('');
      setFormError('Add your name and vineyard location before preparing your enquiry.');
      const missingField = !name.trim() ? nameRef.current : locationRef.current;
      missingField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      missingField?.focus({ preventScroll: true });
      return;
    }

    setServiceError('');
    setFormError('');
    setPrepared(true);
  };

  const copyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(emailBody);
      setCopyStatus('Copied. Paste it into an email to Mat.');
    } catch {
      setCopyStatus('Select the enquiry text and copy it manually.');
    }
  };

  return (
    <main>
      <Header />
      <section className="page-hero estimate-hero">
        <p className="eyebrow">Indicative cost calculator</p>
        <h1>Put your vineyard into the picture.</h1>
        <p>Start with five acres, compare proposed services, and send the result as an expression of interest.</p>
      </section>

      <section className="calculator-shell">
        <div className="calculator-main">
          <div className="mode-switch" role="group" aria-label="Estimate type">
            <button type="button" aria-pressed={mode === 'quick'} className={mode === 'quick' ? 'active' : ''} onClick={() => setMode('quick')}>Quick estimate</button>
            <button type="button" aria-pressed={mode === 'detailed'} className={mode === 'detailed' ? 'active' : ''} onClick={() => setMode('detailed')}>Detailed estimate</button>
          </div>

          <div className="field-block">
            <div className="field-heading"><div><span className="step-badge">1</span><h2>Property size</h2></div><strong>{acres} acres</strong></div>
            <input aria-label="Vineyard size in acres" className="range" type="range" min="1" max="100" step="1" value={acres} onChange={(event) => setAcres(Number(event.target.value))} />
            <div className="range-labels"><span>1 acre</span><span>100 acres</span></div>
            <label className="number-field">Enter exact acreage<input type="number" min="0.25" step="0.25" value={acres} onChange={(event) => setAcres(Math.max(0.25, Number(event.target.value)))} /></label>
          </div>

          {mode === 'quick' ? (
            <div className="field-block">
              <div className="field-heading"><div><span className="step-badge">2</span><h2>Choose one service</h2></div></div>
              <div className="option-grid" role="group" aria-label="Vineyard service">
                {(Object.keys(serviceData) as ServiceKey[]).map((key) => {
                  const item = serviceData[key];
                  return <button type="button" aria-pressed={quickService === key} key={key} className={`option-card ${quickService === key ? 'selected' : ''}`} onClick={() => setQuickService(key)}><span className="radio-dot" /><strong>{item.name}</strong><span>{money.format(item.rate)}/hr</span><small>{item.note}</small></button>;
                })}
              </div>
            </div>
          ) : (
            <>
              <div className="field-block" ref={servicePlanRef}>
                <div className="field-heading"><div><span className="step-badge">2</span><h2>Build the service plan</h2></div></div>
                <div className="detailed-services" role="group" aria-label="Selected vineyard services" aria-describedby={serviceError ? 'estimate-service-error' : undefined}>
                  {(Object.keys(serviceData) as ServiceKey[]).map((key) => {
                    const item = serviceData[key];
                    const checked = selected.includes(key);
                    return <div className={`detailed-row ${checked ? 'selected' : ''}`} key={key}>
                      <label><input type="checkbox" checked={checked} onChange={() => toggleService(key)} /><span><strong>{item.name}</strong><small>{item.note} · {money.format(item.rate)}/hr</small></span></label>
                      <label className="passes">Passes<input type="number" min="1" max="6" value={passes[key]} disabled={!checked} onChange={(event) => setPasses({ ...passes, [key]: Math.max(1, Number(event.target.value)) })} /></label>
                    </div>;
                  })}
                </div>
                {serviceError && <p className="form-error" id="estimate-service-error" role="alert">{serviceError}</p>}
              </div>
              <div className="field-block">
                <div className="field-heading"><div><span className="step-badge">3</span><h2>Optional labour support</h2></div></div>
                <p className="field-note">Machinery prices already include the operator. Add non-machinery support only if it is useful.</p>
                <div className="labour-grid">
                  <label>Operator-only hours<input type="number" min="0" step="0.5" value={operatorHours} onChange={(event) => setOperatorHours(Math.max(0, Number(event.target.value)))} /><small>$47.35/hr</small></label>
                  <label>Additional workers<input type="number" min="0" max="20" value={workerCount} onChange={(event) => setWorkerCount(Math.max(0, Number(event.target.value)))} /><small>$39.68/hr each</small></label>
                  <label>Hours per worker<input type="number" min="0" step="0.5" value={workerHours} onChange={(event) => setWorkerHours(Math.max(0, Number(event.target.value)))} /><small>Two-hour minimum</small></label>
                </div>
              </div>
            </>
          )}

          <div className="field-block contact-fields" id="interest-details">
            <div className="field-heading"><div><span className="step-badge">{mode === 'quick' ? 3 : 4}</span><h2>Add your details</h2></div></div>
            <div className="contact-grid"><label>Your name<input ref={nameRef} required autoComplete="name" aria-invalid={Boolean(formError) && !name.trim()} aria-describedby={formError ? 'estimate-form-error' : undefined} value={name} onChange={(event) => { setName(event.target.value); setFormError(''); }} placeholder="Name" /></label><label>Vineyard location<input ref={locationRef} required autoComplete="address-level2" aria-invalid={Boolean(formError) && !location.trim()} aria-describedby={formError ? 'estimate-form-error' : undefined} value={location} onChange={(event) => { setLocation(event.target.value); setFormError(''); }} placeholder="Town or region" /></label></div>
            {formError && <p className="form-error" id="estimate-form-error" role="alert">{formError}</p>}
          </div>
        </div>

        <aside className="estimate-summary" aria-live="polite">
          <p className="eyebrow light">Your indicative estimate</p>
          <div className="summary-total"><span>Estimated cost</span><strong>{money.format(activeTotal)}</strong><small>excluding GST</small></div>
          <div className="summary-lines">
            {mode === 'quick' ? <div><span>{serviceData[quickService].name}</span><strong>{quick.hours} hrs</strong></div> : <>
              {details.lines.map((line) => <div key={line.key}><span>{line.name}<small>{line.hours} hrs</small></span><strong>{money.format(line.cost)}</strong></div>)}
              {details.operatorCost > 0 && <div><span>Operator support</span><strong>{money.format(details.operatorCost)}</strong></div>}
              {details.workerCost > 0 && <div><span>Worker support</span><strong>{money.format(details.workerCost)}</strong></div>}
            </>}
          </div>
          <button type="button" className="button button-cream summary-button" onClick={prepareEnquiry}>Prepare expression of interest <span aria-hidden="true">↗</span></button>
          <p className="summary-note">This is a mock estimate, not a quote. Final timing and pricing will depend on vineyard layout, terrain, vine age, weed load, turning time and seasonal conditions.</p>
        </aside>
      </section>

      {prepared && (
        <section className="prepared-enquiry" ref={preparedRef} tabIndex={-1} aria-live="polite" aria-labelledby="prepared-enquiry-title">
          <div>
            <p className="eyebrow">Ready to send</p>
            <h2 id="prepared-enquiry-title">Your expression of interest is prepared.</h2>
            <p>Copy the text below into an email addressed to <strong>matmahlook@gmail.com</strong>.</p>
          </div>
          <div>
            <textarea aria-label="Prepared expression of interest" readOnly value={emailBody} />
            <button type="button" className="button button-primary" onClick={copyEnquiry}>Copy enquiry text</button>
            {copyStatus && <p className="copy-status">{copyStatus}</p>}
          </div>
        </section>
      )}

      <section className="assumptions-section">
        <p className="eyebrow">How this estimate works</p>
        <h2>Clear assumptions, easy to adjust.</h2>
        <div className="assumption-grid">
          <article><strong>Two-hour minimum</strong><p>Every selected service is estimated at a minimum of two hours.</p></article>
          <article><strong>Operator included</strong><p>All machinery rates include the operator and are shown before GST.</p></article>
          <article><strong>Coverage rates</strong><p>Tornado uses the documented 0.8 acres/hr. Mowing and cultivation use mock figures until field rates are confirmed.</p></article>
        </div>
      </section>
      <Footer />
    </main>
  );
}
