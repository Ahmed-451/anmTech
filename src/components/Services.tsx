import { getContent } from '../content/site';
import styles from './Services.module.css';
import type { ReactNode } from 'react';

export function Services() {
  const services = getContent().services;

  return (
    <section id="services" className={styles.section} aria-labelledby="services-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="services-heading" className={styles.headline}>
            What we do
          </h2>
          <p className={styles.subheadline}>
            Six core capabilities, delivered by senior teams who stay accountable from discovery to deployment.
          </p>
        </header>

        <div className={styles.grid} role="list">
          {services.map((service) => (
            <article key={service.id} className={styles.card} role="listitem">
              <div className={styles.icon} aria-hidden="true">
                {getServiceIcon(service.icon)}
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
              <ul className={styles.features} aria-label={`${service.title} features`}>
                {service.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <a href="#quote" className={styles.link}>
                Learn more
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function getServiceIcon(name: string): ReactNode {
  switch (name) {
    case 'users':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'code':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case 'globe':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case 'smartphone':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case 'sparkles':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2l1 4 4 1-1 4 4 1-4 1 1 4-4 1-1-4-4-1 4-1 1-4z" />
          <path d="M18 8l1 4 4 1-1 4 4 1-4 1 1 4-4 1-1-4-4-1 4-1 1-4z" />
          <path d="M6 14l1 4 4 1-1 4 4 1-4 1 1 4-4 1-1-4-4-1 4-1 1-4z" />
        </svg>
      );
    case 'chart':
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      );
    default:
      return null;
  }
}