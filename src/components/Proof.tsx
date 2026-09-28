import { getContent } from '../content/site';
import { useMotion } from '../lib/motion/MotionProvider';
import styles from './Proof.module.css';

export function Proof() {
  const { scrollTo } = useMotion();
  // Placeholder items are drafts and must never be shown to visitors.
  const items = getContent().proof.filter((item) => !item.placeholder);
  const hasRealWork = items.length > 0;

  return (
    <section id="proof" className={styles.section} aria-labelledby="proof-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="proof-heading" className={styles.headline}>
            Our work
          </h2>
          <p className={styles.subheadline}>
            {hasRealWork
              ? 'Selected projects and what they achieved.'
              : "We're a young company, and our first case studies are on the way."}
          </p>
        </header>

        {hasRealWork ? (
          <div className={styles.grid} role="list">
            {items.map((item, index) => (
              <article key={index} className={styles.card} role="listitem">
                {item.type === 'case-study' && <div className={styles.badge}>Case study</div>}
                {item.type === 'testimonial' && <div className={styles.badge}>Testimonial</div>}
                {item.type === 'partner' && <div className={styles.badge}>Partners</div>}

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
        ) : (
          <div className={styles.grid}>
            <article className={styles.card}>
              <h3 className={styles.title}>Case studies coming soon</h3>
              <p className={styles.body}>
                When we have finished projects to show, they will appear here with real
                results and real client names. If you have a project in mind, we would
                love to hear about it.
              </p>
              <button type="button" className="btn btn-primary" onClick={() => scrollTo('#quote')}>
                Talk to us about your project
              </button>
            </article>
          </div>
        )}
      </div>
    </section>
  );
}