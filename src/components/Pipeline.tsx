import styles from './Pipeline.module.css';

export function Pipeline() {
  const stations = [
    { id: 'understand', title: 'Understand', description: 'Parse emails, forms, spreadsheets, chat', icon: '📥' },
    { id: 'route', title: 'Route', description: 'Classify, prioritise, assign to workflow', icon: '🔀' },
    { id: 'build', title: 'Build', description: 'Generate code, configs, responses', icon: '⚙️' },
    { id: 'deliver', title: 'Deliver', description: 'Deploy, notify, update dashboard', icon: '📤' },
  ];

  return (
    <section id="pipeline" className={styles.section} aria-labelledby="pipeline-heading">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="pipeline-heading" className={styles.headline}>
            Automation pipeline
          </h2>
          <p className={styles.subheadline}>
            Messy inputs travel through stations — understand, route, build, deliver — and emerge as clean, actionable dashboards.
          </p>
        </header>

        <div className={styles.pipeline} role="list" aria-label="Automation pipeline stations">
          {stations.map((station, index) => (
            <article key={station.id} className={styles.station} role="listitem">
              <div className={styles.stationConnector} aria-hidden="true">
                <span className={styles.connectorLine}></span>
                {index < stations.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}
              </div>
              <div className={styles.stationCard}>
                <div className={styles.stationIcon} aria-hidden="true">{station.icon}</div>
                <h3 className={styles.stationTitle}>{station.title}</h3>
                <p className={styles.stationDescription}>{station.description}</p>
                <span className={styles.stationBadge}>Maps to services</span>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.placeholderNotice}>
          <p>
            <strong>[Automation pipeline demo — Phase 2]</strong> Scroll-driven animation will show
            data flowing through stations. Each station highlights its corresponding service.
            Respects prefers-reduced-motion.
          </p>
        </div>
      </div>
    </section>
  );
}