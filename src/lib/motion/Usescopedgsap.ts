import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { useMotion } from './MotionProvider';

/**
 * Runs `setup` inside a gsap.context() scoped to `scopeRef`, and reverts
 * (cleans up) every tween, timeline and ScrollTrigger it created when the
 * component unmounts or deps change. Skips entirely when reduced motion
 * is active — call site must still render a correct final state.
 */
export function useScopedGsap(
  scopeRef: RefObject<HTMLElement>,
  setup: (context: gsap.Context) => void,
  deps: unknown[] = []
) {
  const { prefersReducedMotion } = useMotion();
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (prefersReducedMotion || !scopeRef.current) {
      return;
    }

    const ctx = gsap.context(() => setup(ctx), scopeRef);
    ctxRef.current = ctx;

    return () => {
      ctx.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefersReducedMotion, ...deps]);
}