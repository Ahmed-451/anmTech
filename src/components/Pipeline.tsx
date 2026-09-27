import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotion } from '../lib/motion/MotionProvider';
import { useScopedGsap } from '../lib/motion/useScopedGsap';
import styles from './Pipeline.module.css';

// TODO: move into src/content/site.ts once its shape is settled, so this
// copy lives alongside the rest of the marketing content.
const PIPELINE_CONTENT = {
  heading: 'From scattered inputs to one clean system',
  body: "Emails, spreadsheets, forms and chat messages come in every shape. Here's how we turn that into something your team can actually work with.",
};

const STATIONS = [
  {
    id: 'understand',
    title: 'Understand',
    body: 'AI reads and classifies each item as it comes in.',
    service: 'AI and automation',
  },
  {
    id: 'route',
    title: 'Route',
    body: 'Rules send each item to the right place automatically.',
    service: 'Custom software',
  },
  {
    id: 'build',
    title: 'Build',
    body: 'The data lands inside a working app or website.',
    service: 'Web and mobile development',
  },
  {
    id: 'deliver',
    title: 'Deliver',
    body: 'Everything comes together in one clean dashboard.',
    service: 'Data and BI',
  },
] as const;

const ITEMS = ['Email', 'Spreadsheet', 'Paper form', 'Chat message'] as const;
const SCROLL_DISTANCE = 2600; // px of scroll consumed while the stage is pinned
const MOBILE_BREAKPOINT = 860;

export function Pipeline() {
  const content = PIPELINE_CONTENT;
  const { scrollTo, prefersReducedMotion } = useMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [activeStation, setActiveStation] = useState(0);

  useEffect(() => {
    const check = () => setIsPinned(window.innerWidth >= MOBILE_BREAKPOINT && !prefersReducedMotion);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [prefersReducedMotion]);

  useScopedGsap(
    stageRef,
    () => {
      if (!isPinned || !stageRef.current) return;

      const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
      const stations = stationRefs.current.filter(Boolean) as HTMLDivElement[];

      gsap.set(items, { x: 0, y: 0, rotate: () => gsap.utils.random(-6, 6), opacity: 0.6 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: 'top top',
          end: `+=${SCROLL_DISTANCE}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const stationIndex = Math.min(
              STATIONS.length - 1,
              Math.floor(self.progress * STATIONS.length)
            );
            setActiveStation((prev) => (prev === stationIndex ? prev : stationIndex));
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
            if (captionRef.current) {
              captionRef.current.textContent = STATIONS[stationIndex].body;
            }
          },
        },
      });

      STATIONS.forEach((_, i) => {
        tl.addLabel(`station-${i}`, i)
          .to(
            stations,
            {
              opacity: (idx) => (idx <= i ? 1 : 0.35),
              duration: 0.3,
            },
            i
          )
          .to(
            items,
            {
              x: (idx) => (i / (STATIONS.length - 1)) * 40 * (idx + 1) - 60,
              rotate: () => (i === STATIONS.length - 1 ? 0 : gsap.utils.random(-4, 4)),
              opacity: i === STATIONS.length - 1 ? 1 : 0.6 + i * 0.1,
              duration: 0.6,
            },
            i
          );
      });

      tl.to(items, { rotate: 0, opacity: 1, duration: 0.4 }, STATIONS.length - 0.4);
    },
    [isPinned]
  );

  function jumpToStation(index: number) {
    const st = ScrollTrigger.getAll().find((t) => t.trigger === stageRef.current);
    if (!st) return;
    const target = st.start + (index / (STATIONS.length - 1)) * (st.end - st.start);
    scrollTo(target, { duration: 1 });
  }

  return (
    <section ref={sectionRef} id="pipeline" className={styles.section} aria-labelledby="pipeline-heading">
      <div className={styles.intro}>
        <h2 id="pipeline-heading">{content.heading}</h2>
        <p className={styles.introText}>{content.body}</p>
      </div>

      {isPinned ? (
        <div ref={stageRef} className={styles.stage}>
          <div className={styles.progressTrack} aria-hidden="true">
            <div ref={progressBarRef} className={styles.progressFill} />
          </div>

          <div className={styles.itemsLane} aria-hidden="true">
            {ITEMS.map((label, i) => (
              <div
                key={label}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={styles.item}
                style={{ top: `${i * 22}%` }}
              >
                {label}
              </div>
            ))}
          </div>

          <div className={styles.stationsRow}>
            {STATIONS.map((station, i) => (
              <div
                key={station.id}
                ref={(el) => {
                  stationRefs.current[i] = el;
                }}
                className={styles.station}
              >
                <span className={styles.stationIndex}>{i + 1}</span>
                <h3 className={styles.stationTitle}>{station.title}</h3>
                <span className={styles.stationService}>{station.service}</span>
              </div>
            ))}
          </div>

          <p ref={captionRef} className={styles.caption} aria-live="polite">
            {STATIONS[0].body}
          </p>

          <nav className={styles.stationNav} aria-label="Jump to pipeline stage">
            {STATIONS.map((station, i) => (
              <button
                key={station.id}
                type="button"
                className={styles.navDot}
                data-active={activeStation === i}
                onClick={() => jumpToStation(i)}
                aria-label={`Go to ${station.title}`}
              />
            ))}
          </nav>
        </div>
      ) : (
        <div className={styles.staticList}>
          {STATIONS.map((station, i) => (
            <div key={station.id} className={styles.staticStation}>
              <span className={styles.stationIndex}>{i + 1}</span>
              <div>
                <h3 className={styles.stationTitle}>{station.title}</h3>
                <p className={styles.staticBody}>{station.body}</p>
                <span className={styles.stationService}>{station.service}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}