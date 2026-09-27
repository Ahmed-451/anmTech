import { getContent } from '../content/site';
import styles from './Contact.module.css';

export function Contact() {
  const contact = getContent().contact;

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="contact-heading" className={styles.headline}>
            Let&apos;s talk
          </h2>
          <p className={styles.subheadline}>
            Whether you have a project in mind or just want to say hello, we&apos;d love to hear from you.
          </p>
        </header>

        <div className={styles.grid}>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <h3 className={styles.infoTitle}>Email</h3>
              <a href={`mailto:${contact.email}`} className={styles.infoLink}>
                {contact.email}
              </a>
            </div>

            <div className={styles.infoItem}>
              <h3 className={styles.infoTitle}>Phone</h3>
              <a href={`tel:${contact.phone}`} className={styles.infoLink}>
                {contact.phone}
              </a>
            </div>

            <div className={styles.infoItem}>
              <h3 className={styles.infoTitle}>Office</h3>
              <address className={styles.infoLink}>
                {contact.address.street}<br />
                {contact.address.postalCode} {contact.address.city}<br />
                {contact.address.country}
              </address>
            </div>

            <div className={styles.infoItem}>
              <h3 className={styles.infoTitle}>Hours</h3>
              <span className={styles.infoLink}>{contact.hours}</span>
            </div>
          </div>

          <div className={styles.mapPlaceholder} aria-label="Map placeholder">
            <p>[Map embed &mdash; Phase 2]</p>
            <p className={styles.mapNote}>Interactive map with directions will be added.</p>
          </div>
        </div>
      </div>
    </section>
  );
}