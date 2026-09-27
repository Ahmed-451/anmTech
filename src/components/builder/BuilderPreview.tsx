import type { PreviewType } from './scenarios';
import styles from './BuilderPreview.module.css';

interface PreviewProps {
  /** How many of this preview's pieces should be visible (0 = none yet). */
  revealCount: number;
  done: boolean;
}

function Layer({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div className={styles.layer} data-active={active}>
      {children}
    </div>
  );
}

function WebsitePreview({ revealCount }: PreviewProps) {
  return (
    <div className={styles.frame} aria-hidden="true">
      <Layer active={revealCount >= 1}>
        <div className={styles.browserBar}>
          <span /><span /><span />
        </div>
      </Layer>
      <Layer active={revealCount >= 2}>
        <div className={styles.wsHero}>
          <div className={styles.wsHeroLine} style={{ width: '70%' }} />
          <div className={styles.wsHeroLine} style={{ width: '45%' }} />
        </div>
      </Layer>
      <Layer active={revealCount >= 3}>
        <div className={styles.wsCards}>
          <div className={styles.wsCard} />
          <div className={styles.wsCard} />
          <div className={styles.wsCard} />
        </div>
      </Layer>
      <Layer active={revealCount >= 4}>
        <div className={styles.wsForm}>
          <div className={styles.wsInput} />
          <div className={styles.wsButton} />
        </div>
      </Layer>
    </div>
  );
}

function AppPreview({ revealCount }: PreviewProps) {
  return (
    <div className={styles.phoneFrame} aria-hidden="true">
      <Layer active={revealCount >= 1}>
        <div className={styles.phoneNotch} />
      </Layer>
      <Layer active={revealCount >= 2}>
        <div className={styles.calendarGrid}>
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className={styles.calendarCell} data-highlight={i === 8} />
          ))}
        </div>
      </Layer>
      <Layer active={revealCount >= 3}>
        <div className={styles.slotPill}>2:30 PM booked</div>
      </Layer>
      <Layer active={revealCount >= 4}>
        <div className={styles.confirmBanner}>✓ Confirmation sent</div>
      </Layer>
    </div>
  );
}

function AutomationPreview({ revealCount }: PreviewProps) {
  const stations = ['Email received', 'Data extracted', 'Checked', 'Filed'];
  return (
    <div className={styles.pipelineFrame} aria-hidden="true">
      {stations.map((label, i) => (
        <div key={label} className={styles.pipelineStation} data-active={revealCount >= i + 1}>
          <span className={styles.pipelineDot} />
          <span className={styles.pipelineLabel}>{label}</span>
          {i < stations.length - 1 && <span className={styles.pipelineArrow}>→</span>}
        </div>
      ))}
    </div>
  );
}

function AssistantPreview({ revealCount }: PreviewProps) {
  return (
    <div className={styles.chatFrame} aria-hidden="true">
      <Layer active={revealCount >= 1}>
        <div className={styles.chatHeader}>Support assistant</div>
      </Layer>
      <Layer active={revealCount >= 2}>
        <div className={`${styles.bubble} ${styles.bubbleUser}`}>Do you deliver on weekends?</div>
      </Layer>
      <Layer active={revealCount >= 3}>
        <div className={`${styles.bubble} ${styles.bubbleAssistant}`}>
          Yes — weekend delivery is available in most areas.
        </div>
      </Layer>
      <Layer active={revealCount >= 4}>
        <div className={styles.handoffPill}>Talk to a person instead →</div>
      </Layer>
    </div>
  );
}

const renderers: Record<PreviewType, (props: PreviewProps) => React.ReactElement> = {
  website: WebsitePreview,
  app: AppPreview,
  automation: AutomationPreview,
  assistant: AssistantPreview,
};

export function BuilderPreview({
  previewType,
  revealCount,
  done,
}: PreviewProps & { previewType: PreviewType }) {
  const Renderer = renderers[previewType];
  return <Renderer revealCount={revealCount} done={done} />;
}