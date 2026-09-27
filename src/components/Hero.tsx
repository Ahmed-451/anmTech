import { useState, type FormEvent } from 'react';
import { getContent } from '../content/site';
import { useMotion } from '../lib/motion/MotionProvider';
import { scenarios, fallbackScenario, type Scenario } from './builder/scenarios';
import { useBuilder } from './builder/useBuilder';
import { BuilderPreview } from './builder/BuilderPreview';
import { setSelectedScenario } from '../lib/builderSelection';
import styles from './Hero.module.css';

const SUGGESTED = scenarios.slice(0, 4); // one chip per built-in scenario

export function Hero() {
  const content = getContent().hero;
  const { scrollTo, prefersReducedMotion } = useMotion();
  const [inputValue, setInputValue] = useState('');
  const builder = useBuilder();

  function handleChipClick(scenario: Scenario) {
    setInputValue(scenario.label);
    builder.selectScenario(scenario);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!inputValue.trim()) return;
    builder.selectFromText(inputValue);
  }

  function handleGetQuote() {
    if (!builder.isFallback) {
      setSelectedScenario(builder.scenario.id);
    }
    scrollTo('#quote');
  }

  const revealCount =
    builder.status === 'done' ? builder.scenario.steps.length : builder.stepIndex;

  return (
    <section id="hero" className={styles.section} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 id="hero-heading" className={styles.headline}>
            {content.headline}
          </h1>
          <p className={styles.subheadline}>{content.subheadline}</p>

          <form className={styles.promptForm} onSubmit={handleSubmit}>
            <label htmlFor="builder-input" className={styles.promptLabel}>
              What does your business need?
            </label>
            <div className={styles.promptRow}>
              <input
                id="builder-input"
                type="text"
                className={`${styles.promptInput} input`}
                placeholder="e.g. a booking system, an invoice automation…"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Show me
              </button>
            </div>
            <div className={styles.chips} role="group" aria-label="Example needs">
              {SUGGESTED.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={styles.chip}
                  data-active={builder.scenario.id === s.id}
                  onClick={() => handleChipClick(s)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </form>
        </div>

        <div className={styles.demoColumn}>
          <div className={styles.demoBadge}>Live demo preview</div>

          <div className={styles.demoStage}>
            <BuilderPreview
              previewType={builder.scenario.previewType}
              revealCount={revealCount}
              done={builder.status === 'done'}
            />
          </div>

          <p className={styles.caption} aria-live="polite">
            {builder.status === 'idle'
              ? 'Pick an example above, or type what you need.'
              : builder.caption}
          </p>

          {builder.status === 'done' && (
            <div className={styles.demoActions}>
              {!builder.isFallback && (
                <button type="button" className="btn btn-secondary" onClick={builder.replay}>
                  Replay
                </button>
              )}
              <button type="button" className="btn btn-primary" onClick={handleGetQuote}>
                {builder.isFallback ? fallbackScenario.ctaLabel : builder.scenario.ctaLabel}
              </button>
            </div>
          )}

          {prefersReducedMotion && builder.status === 'idle' && (
            <p className={styles.reducedMotionNote}>
              Pick an example to see what we'd build.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}