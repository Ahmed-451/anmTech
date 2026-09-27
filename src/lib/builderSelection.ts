const KEY = 'anm:selectedScenario';

export function setSelectedScenario(scenarioId: string) {
  try {
    sessionStorage.setItem(KEY, scenarioId);
  } catch {
    // sessionStorage can throw in some privacy modes — fail silently, it's a nice-to-have.
  }
}

export function getSelectedScenario(): string | null {
  try {
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}