import { getContent } from '../content/site';
import styles from './About.module.css';

export function About() {
  const content = getContent().about;

  return (
    <section id="about" className={styles.section} aria-labelledby="about-heading">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.content}>
            <h2 id="about-heading" className={styles.headline}>
              {content.headline}
            </h2>
            <div className={styles.body}>
              {content.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className={styles.stats} aria-label="Company statistics">
            {content.stats.map((stat, i) => (
              <div key={i} className={styles.stat}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.values} aria-labelledby="values-heading">
          <h3 id="values-heading" className={styles.valuesHeadline}>
            How we work
          </h3>
          <div className={styles.valuesGrid}>
            {content.values.map((value, i) => (
              <article key={i} className={styles.valueCard}>
                <h4 className={styles.valueTitle}>{value.title}</h4>
                <p className={styles.valueDescription}>{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}