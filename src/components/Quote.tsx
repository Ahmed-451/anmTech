import { getContent } from '../content/site';
import styles from './Quote.module.css';

export function Quote() {
  const contact = getContent().contact;

  return (
    <section id="quote" className={styles.section} aria-labelledby="quote-heading">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 id="quote-heading" className={styles.headline}>
              Start a project
            </h2>
            <p className={styles.subheadline}>
              Tell us what you&apos;re building. We&apos;ll respond within one business day with a clear next step.
            </p>

            <form className={styles.form} noValidate>
              <div className={styles.field}>
                <label htmlFor="name" className="label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className="label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="company" className="label">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="input"
                  placeholder="Company name"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="service" className="label">Service of interest</label>
                <select id="service" name="service" className="input">
                  <option value="">Select a service</option>
                  <option value="resourcing">IT Resourcing</option>
                  <option value="custom-software">Custom Software</option>
                  <option value="website-development">Website Development</option>
                  <option value="mobile-apps">Mobile Apps</option>
                  <option value="ai-automation">AI & Automation</option>
                  <option value="data-bi">Data & BI</option>
                  <option value="other">Other / Not sure</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className="label">Project details</label>
                <textarea
                  id="message"
                  name="message"
                  className="input"
                  rows={5}
                  placeholder="What are you building? Timeline? Budget range? Team size?"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Request a quote
              </button>

              <p className={styles.formNote}>
                By submitting, you agree to our <a href="#">Privacy Policy</a>. No spam, ever.
              </p>
            </form>
          </div>

          <aside className={styles.sidebar} aria-labelledby="contact-heading">
            <h3 id="contact-heading" className={styles.sidebarTitle}>
              Other ways to reach us
            </h3>
            <address className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Email</span>
                <a href={`mailto:${contact.email}`} className={styles.contactValue}>
                  {contact.email}
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Phone</span>
                <a href={`tel:${contact.phone}`} className={styles.contactValue}>
                  {contact.phone}
                </a>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Office</span>
                <address className={styles.contactValue}>
                  {contact.address.street}<br />
                  {contact.address.postalCode} {contact.address.city}<br />
                  {contact.address.country}
                </address>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactLabel}>Hours</span>
                <span className={styles.contactValue}>{contact.hours}</span>
              </div>
            </address>
          </aside>
        </div>
      </div>
    </section>
  );
}