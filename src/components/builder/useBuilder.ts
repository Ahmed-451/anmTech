import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotion } from '../../lib/motion/MotionProvider';
import { fallbackScenario, matchScenario, scenarios, type Scenario } from './scenarios';

export type BuilderStatus = 'idle' | 'building' | 'done';

interface BuilderState {
  status: BuilderStatus;
  scenario: Scenario;
  /** Index of the step currently animating in, or steps.length once done. */
  stepIndex: number;
  caption: string;
}

const DEFAULT_SCENARIO = scenarios[0];

export function useBuilder() {
  const { prefersReducedMotion } = useMotion();
  const [state, setState] = useState<BuilderState>({
    status: 'idle',
    scenario: DEFAULT_SCENARIO,
    stepIndex: 0,
    caption: '',
  });
  const timeoutRef = useRef<number | null>(null);
  const runId = useRef(0);

  const clearPending = useCallback(() => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const play = useCallback(
    (scenario: Scenario) => {
      clearPending();
      const thisRun = ++runId.current;

      if (prefersReducedMotion) {
        // Skip straight to the final built state — no step-by-step animation.
        setState({
          status: 'done',
          scenario,
          stepIndex: scenario.steps.length,
          caption: scenario.summary,
        });
        return;
      }

      setState({ status: 'building', scenario, stepIndex: 0, caption: scenario.steps[0]?.caption ?? '' });

      const runStep = (index: number) => {
        if (runId.current !== thisRun) return; // a newer run superseded this one
        if (index >= scenario.steps.length) {
          setState({
            status: 'done',
            scenario,
            stepIndex: scenario.steps.length,
            caption: scenario.summary,
          });
          return;
        }
        const step = scenario.steps[index];
        setState({ status: 'building', scenario, stepIndex: index, caption: step.caption });
        timeoutRef.current = window.setTimeout(() => runStep(index + 1), step.durationMs);
      };

      timeoutRef.current = window.setTimeout(() => runStep(1), scenario.steps[0]?.durationMs ?? 0);
    },
    [prefersReducedMotion, clearPending]
  );

  const selectScenario = useCallback((scenario: Scenario) => play(scenario), [play]);

  const selectFromText = useCallback(
    (input: string) => {
      play(matchScenario(input));
    },
    [play]
  );

  const reset = useCallback(() => {
    clearPending();
    runId.current++;
    setState({ status: 'idle', scenario: DEFAULT_SCENARIO, stepIndex: 0, caption: '' });
  }, [clearPending]);

  const replay = useCallback(() => play(state.scenario), [play, state.scenario]);

  useEffect(() => clearPending, [clearPending]);

  return {
    ...state,
    isFallback: state.scenario.id === fallbackScenario.id,
    selectScenario,
    selectFromText,
    replay,
    reset,
  };
}