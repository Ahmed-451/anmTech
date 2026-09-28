import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { getContent } from '../content/site';
import { getSelectedScenario } from '../lib/builderSelection';
import styles from './Quote.module.css';

// Maps a hero scenario id to the site.ts service id it should pre-check.
const SCENARIO_TO_SERVICE_ID: Record<string, string> = {
  website: 'website-development',
  booking: 'mobile-apps',
  invoices: 'ai-automation',
  assistant: 'ai-automation',
};

const SIZE_OPTIONS = [
  { id: 'small', label: 'A focused project', hint: 'One clear goal, a few weeks' },
  { id: 'medium', label: 'A bigger build', hint: 'Multiple features, a few months' },
  { id: 'ongoing', label: 'Ongoing support', hint: 'A team that grows with us' },
  { id: 'unsure', label: "Not sure yet", hint: "Let's talk it through" },
] as const;

type Step = 1 | 2 | 3;

interface FormState {
  serviceIds: string[];
  size: string;
  name: string;
  company: string;
  email: string;
  message: string;
}

interface FormErrors {
  services?: string;
  size?: string;
  name?: string;
  email?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Quote() {
  const content = getContent();
  const services = content.services;
  const contact = content.contact;

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>({
    serviceIds: [],
    size: '',
    name: '',
    company: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const firstErrorRef = useRef<HTMLElement | null>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scenarioId = getSelectedScenario();
    const serviceId = scenarioId ? SCENARIO_TO_SERVICE_ID[scenarioId] : undefined;
    if (serviceId && services.some((s) => s.id === serviceId)) {
      setForm((f) => (f.serviceIds.includes(serviceId) ? f : { ...f, serviceIds: [serviceId] }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstErrorRef.current) {
      firstErrorRef.current.focus();
    }
  }, [errors]);

  function announce(text: string) {
    if (liveRegionRef.current) liveRegionRef.current.textContent = text;
  }

  function toggleService(id: string) {
    setForm((f) => ({
      ...f,
      serviceIds: f.serviceIds.includes(id)
        ? f.serviceIds.filter((s) => s !== id)
        : [...f.serviceIds, id],
    }));
  }

  function serviceTitles(ids: string[]): string[] {
    return ids
      .map((id) => services.find((s) => s.id === id)?.title)
      .filter((t): t is string => Boolean(t));
  }

  function validateStep(current: Step): FormErrors {
    const e: FormErrors = {};
    if (current === 1 && form.serviceIds.length === 0) {
      e.services = 'Pick at least one service.';
    }
    if (current === 2 && !form.size) {
      e.size = 'Choose the option closest to your project.';
    }
    if (current === 3) {
      if (!form.name.trim()) e.name = 'Your name is required.';
      if (!form.email.trim()) e.email = 'Your email is required.';
      else if (!EMAIL_RE.test(form.email)) e.email = 'That email address looks incomplete.';
    }
    return e;
  }

  function goNext() {
    const e = validateStep(step);
    setErrors(e);
    if (Object.keys(e).length > 0) {
      announce('Please fix the highlighted field before continuing.');
      return;
    }
    setErrors({});
    setStep((s) => (s < 3 ? ((s + 1) as Step) : s));
  }

  function goBack() {
    setErrors({});
    setStep((s) => (s > 1 ? ((s - 1) as Step) : s));
  }

  function buildMailto(): { href: string; text: string } {
    const to = contact.email;
    const titles = serviceTitles(form.serviceIds);
    const subject = `Quote request: ${titles.join(', ') || 'General enquiry'}`;
    const sizeLabel = SIZE_OPTIONS.find((s) => s.id === form.size)?.label ?? '';
    const lines = [
      `Name: ${form.name}`,
      form.company ? `Company: ${form.company}` : null,
      `Email: ${form.email}`,
      `Services: ${titles.join(', ') || 'Not specified'}`,
      sizeLabel ? `Project size: ${sizeLabel}` : null,
      form.message ? `\nMessage:\n${form.message}` : null,
    ].filter(Boolean);
    const body = lines.join('\n');
    return {
      href: `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      text: `To: ${to}\nSubject: ${subject}\n\n${body}`,
    };
  }

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault();

    const finalErrors = validateStep(3);
    setErrors(finalErrors);
    if (Object.keys(finalErrors).length > 0) {
      announce('Please fix the highlighted field before sending.');
      return;
    }

    try {
      const { href } = buildMailto();
      window.location.href = href;
    } catch (err) {
      // A blocked or unhandled mailto: should never trap the user — fall
      // through to the success screen either way, where "Copy request"
      // gives them a working alternative.
      console.error('Could not open mail client:', err);
    }

    setSubmitted(true);
    announce('Your request has been prepared in your email app.');
  }

  async function handleCopy() {
    const { text } = buildMailto();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      announce('Request copied to clipboard.');
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      announce('Could not copy automatically — please select and copy the text manually.');
    }
  }

  const summaryText = useMemo(() => {
    const parts: string[] = [];
    const titles = serviceTitles(form.serviceIds);
    if (titles.length) parts.push(titles.join(', '));
    const size = SIZE_OPTIONS.find((s) => s.id === form.size);
    if (size) parts.push(size.label.toLowerCase());
    return parts.length ? parts.join(' — ') : 'Tell us what you need to see it here.';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.serviceIds, form.size, services]);

  if (submitted) {
    return (
      <section id="quote" className={styles.section} aria-labelledby="quote-heading">
        <div className={styles.container}>
          <div className={styles.successCard} role="status">
            <h2 id="quote-heading">Your request is ready</h2>
            <p>
              We've opened your email app with everything filled in. If nothing opened —
              common if your browser has no default mail app set — use "Copy request" below
              and paste it into an email to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
            </p>
            <div className={styles.actions}>
              <button type="button" className="btn btn-secondary" onClick={handleCopy}>
                {copied ? 'Copied' : 'Copy request'}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  setSubmitted(false);
                  setStep(1);
                }}
              >
                Start another request
              </button>
            </div>
            <p className={styles.privacyNote}>
              Nothing here is stored on our servers — this just prepares an email for you to send.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className={styles.section} aria-labelledby="quote-heading">
      <div className={styles.container}>
        <div className={styles.formColumn}>
          <h2 id="quote-heading">Let's build your next project</h2>
          <p className={styles.intro}>A few quick questions, then we'll prepare an email for you.</p>

          <ol className={styles.stepper} aria-label="Form progress">
            {[1, 2, 3].map((s) => (
              <li key={s} data-active={step === s} data-done={step > s}>
                {s}
              </li>
            ))}
          </ol>

          <form onSubmit={handleSubmit} noValidate>
            {step === 1 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>What do you need?</legend>
                <div className={styles.checkGrid}>
                  {services.map((service) => (
                    <label key={service.id} className={styles.checkOption}>
                      <input
                        type="checkbox"
                        checked={form.serviceIds.includes(service.id)}
                        onChange={() => toggleService(service.id)}
                      />
                      {service.title}
                    </label>
                  ))}
                </div>
                {errors.services && (
                  <p
                    className={styles.error}
                    ref={(el) => {
                      if (el) firstErrorRef.current = el;
                    }}
                    tabIndex={-1}
                  >
                    {errors.services}
                  </p>
                )}
              </fieldset>
            )}

            {step === 2 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>What size project is this?</legend>
                <div className={styles.radioGrid}>
                  {SIZE_OPTIONS.map((opt) => (
                    <label key={opt.id} className={styles.radioOption}>
                      <input
                        type="radio"
                        name="size"
                        checked={form.size === opt.id}
                        onChange={() => setForm((f) => ({ ...f, size: opt.id }))}
                      />
                      <span>
                        <strong>{opt.label}</strong>
                        <small>{opt.hint}</small>
                      </span>
                    </label>
                  ))}
                </div>
                {errors.size && (
                  <p
                    className={styles.error}
                    ref={(el) => {
                      if (el) firstErrorRef.current = el;
                    }}
                    tabIndex={-1}
                  >
                    {errors.size}
                  </p>
                )}
              </fieldset>
            )}

            {step === 3 && (
              <fieldset className={styles.fieldset}>
                <legend className={styles.legend}>Your details</legend>

                <label className={styles.field}>
                  Name
                  <input
                    type="text"
                    className="input"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    ref={(el) => {
                      if (errors.name && el) firstErrorRef.current = el;
                    }}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className={styles.error}>{errors.name}</span>}
                </label>

                <label className={styles.field}>
                  Company <span className={styles.optional}>(optional)</span>
                  <input
                    type="text"
                    className="input"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  />
                </label>

                <label className={styles.field}>
                  Email
                  <input
                    type="email"
                    className="input"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    ref={(el) => {
                      if (errors.email && el) firstErrorRef.current = el;
                    }}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className={styles.error}>{errors.email}</span>}
                </label>

                <label className={styles.field}>
                  Message <span className={styles.optional}>(optional)</span>
                  <textarea
                    className="input"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                </label>
              </fieldset>
            )}

            <div className={styles.navRow}>
              {step > 1 && (
                <button key="back" type="button" className="btn btn-secondary" onClick={goBack}>
                  Back
                </button>
              )}
              {step < 3 && (
                <button key="continue" type="button" className="btn btn-primary" onClick={goNext}>
                  Continue
                </button>
              )}
              {step === 3 && (
                <button
                  key="send"
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSubmit()}
                >
                  Send request
                </button>
              )}
            </div>
          </form>

          <div ref={liveRegionRef} aria-live="polite" className={styles.srOnly} />
        </div>

        <aside className={styles.summaryColumn} aria-label="Request summary">
          <div className={styles.summaryCard}>
            <h3>Your request so far</h3>
            <p className={styles.summaryText}>{summaryText}</p>
            {(form.name || form.email) && (
              <p className={styles.summaryContact}>
                {form.name}
                {form.name && form.email ? ' · ' : ''}
                {form.email}
              </p>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
}