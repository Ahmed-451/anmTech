import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollToOptions {
  offset?: number;
  duration?: number;
}

interface MotionContextValue {
  /** True if the user's OS/browser is set to reduce motion. Never changes at runtime. */
  prefersReducedMotion: boolean;
  /** Smoothly scrolls to a selector, element, or numeric offset. No-ops gracefully if Lenis isn't running. */
  scrollTo: (target: string | HTMLElement | number, options?: ScrollToOptions) => void;
  /** The live Lenis instance, if motion is enabled. Null when reduced motion is active. */
  lenis: Lenis | null;
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function useMotion(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) {
    throw new Error('useMotion must be used within a MotionProvider');
  }
  return ctx;
}

const HEADER_OFFSET = 80; // px — keep in sync with the sticky header's height

export function MotionProvider({ children }: { children: ReactNode }) {
  const [prefersReducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Reduced motion: do not initialise Lenis or any scroll-driven animation.
    // Native scrolling is used, and every animated component must render its
    // final state immediately when prefersReducedMotion is true.
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Keep ScrollTrigger's own measurements correct on Lenis-driven scroll.
    ScrollTrigger.defaults({ scroller: document.body });

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
    // Intentionally empty deps: this runs once. prefersReducedMotion is fixed
    // at mount (it does not change without a page reload in practice).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollTo = useMemo<MotionContextValue['scrollTo']>(
    () => (target, options) => {
      const offset = options?.offset ?? -HEADER_OFFSET;

      if (prefersReducedMotion || !lenisRef.current) {
        const el =
          typeof target === 'string' ? document.querySelector(target) : target;
        if (el instanceof HTMLElement) {
          const top = el.getBoundingClientRect().top + window.scrollY + offset;
          window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
          el.focus?.({ preventScroll: true });
        } else if (typeof target === 'number') {
          window.scrollTo({ top: target + offset, behavior: 'auto' });
        }
        return;
      }

      lenisRef.current.scrollTo(target, {
        offset,
        duration: options?.duration ?? 1.2,
      });

      if (typeof target === 'string') {
        const el = document.querySelector(target);
        if (el instanceof HTMLElement) {
          window.setTimeout(() => el.focus?.({ preventScroll: true }), 400);
        }
      }
    },
    [prefersReducedMotion]
  );

  const value = useMemo<MotionContextValue>(
    () => ({ prefersReducedMotion, scrollTo, lenis: lenisRef.current }),
    [prefersReducedMotion, scrollTo]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}