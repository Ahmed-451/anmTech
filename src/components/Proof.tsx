import { getContent } from '../content/site';
import styles from './Proof.module.css';

export function Proof() {
  const items = getContent().proof;

  return (
    <section id="proof" className={styles.section} aria-labelledby="proof-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="proof-heading" className={styles.headline}>
            Proof
          </h2>
          <p className={styles.subheadline}>
            Real outcomes for real clients. Placeholders shown where case studies are being finalised.
          </p>
        </header>

        <div className={styles.grid} role="list">
          {items.map((item, index) => (
            <article key={index} className={`${styles.card} ${item.placeholder ? styles.placeholder : ''}`} role="listitem">
              {item.type === 'case-study' && (
                <div className={styles.badge}>Case study</div>
              )}
              {item.type === 'testimonial' && (
                <div className={styles.badge}>Testimonial</div>
              )}
              {item.type === 'partner' && (
                <div className={styles.badge}>Partners</div>
              )}

              <h3 className={styles.title}>{item.headline}</h3>
              <p className={styles.body}>{item.body}</p>

              {item.metrics && (
                <ul className={styles.metrics} aria-label="Key metrics">
                  {item.metrics.map((metric, i) => (
                    <li key={i}>
                      <span className={styles.metricValue}>{metric.value}</span>
                      <span className={styles.metricLabel}>{metric.label}</span>
                    </li>
                  ))}
                </ul>
              )}

              {(item.author || item.role) && (
                <footer className={styles.attribution}>
                  {item.author && <cite className={styles.author}>{item.author}</cite>}
                  {item.role && <span className={styles.role}>{item.role}</span>}
                  {item.company && <span className={styles.company}>{item.company}</span>}
                </footer>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}