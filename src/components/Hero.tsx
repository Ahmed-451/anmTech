import { getContent } from '../content/site';
import styles from './Hero.module.css';

export function Hero() {
  const content = getContent().hero;

  return (
    <section id="hero" className={styles.section} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 id="hero-heading" className={styles.headline}>
            {content.headline}
          </h1>
          <p className={styles.subheadline}>{content.subheadline}</p>
          <div className={styles.ctaGroup}>
            <a
              href={content.ctaPrimary.href}
              className="btn btn-primary"
            >
              {content.ctaPrimary.label}
            </a>
            <a
              href={content.ctaSecondary.href}
              className="btn btn-secondary"
            >
              {content.ctaSecondary.label}
            </a>
          </div>
        </div>
        <div className={styles.demoPlaceholder} aria-label="Build it live demo placeholder">
          <div className={styles.demoCard}>
            <div className={styles.demoHeader}>
              <span className={styles.demoDot} aria-hidden="true"></span>
              <span className={styles.demoDot} aria-hidden="true"></span>
              <span className={styles.demoDot} aria-hidden="true"></span>
            </div>
            <div className={styles.demoContent}>
              <p className={styles.demoTitle}>[Build it live demo]</p>
              <p className={styles.demoDescription}>
                Interactive preview will assemble here based on visitor input.
                Scripted scenarios for website, app, and automation flow.
              </p>
            </div>
            <div className={styles.demoBadge}>Phase 2</div>
          </div>
        </div>
      </div>
    </section>
  );
}