export type PreviewType = 'website' | 'app' | 'automation' | 'assistant';

export interface ScenarioStep {
  id: string;
  /** Shown in the live caption / aria-live region while this step plays. */
  caption: string;
  durationMs: number;
}

export interface Scenario {
  id: string;
  /** Shown as a suggestion chip. */
  label: string;
  /** Words matched against free-text input. Lowercase. */
  keywords: string[];
  previewType: PreviewType;
  steps: ScenarioStep[];
  /** Shown once the build finishes. */
  summary: string;
  ctaLabel: string;
}

export const scenarios: Scenario[] = [
  {
    id: 'website',
    label: 'A website that brings in customers',
    keywords: ['website', 'site', 'web', 'landing', 'marketing', 'online presence'],
    previewType: 'website',
    steps: [
      { id: 'layout', caption: 'Laying out the header and navigation', durationMs: 900 },
      { id: 'hero', caption: 'Writing a headline that says what you do', durationMs: 1000 },
      { id: 'services', caption: 'Adding your services', durationMs: 900 },
      { id: 'form', caption: 'Wiring up a working contact form', durationMs: 900 },
    ],
    summary: 'A fast, responsive website with working navigation and a contact form that actually sends.',
    ctaLabel: 'Get a quote for a website',
  },
  {
    id: 'booking',
    label: 'A booking and scheduling app',
    keywords: ['booking', 'schedule', 'appointment', 'calendar', 'reservation'],
    previewType: 'app',
    steps: [
      { id: 'frame', caption: 'Setting up the app screen', durationMs: 800 },
      { id: 'calendar', caption: 'Building the calendar view', durationMs: 1000 },
      { id: 'slot', caption: 'A customer books a slot', durationMs: 900 },
      { id: 'confirm', caption: 'Sending the confirmation', durationMs: 900 },
    ],
    summary: 'A booking flow your customers can use in seconds, with automatic confirmations.',
    ctaLabel: 'Get a quote for a booking app',
  },
  {
    id: 'invoices',
    label: 'Automate invoices and admin',
    keywords: ['invoice', 'invoicing', 'admin', 'automation', 'accounting', 'paperwork', 'billing'],
    previewType: 'automation',
    steps: [
      { id: 'receive', caption: 'An invoice email arrives', durationMs: 800 },
      { id: 'extract', caption: 'Extracting the data automatically', durationMs: 1000 },
      { id: 'check', caption: 'Checking it against your records', durationMs: 900 },
      { id: 'book', caption: 'Adding it to your accounting system', durationMs: 900 },
    ],
    summary: 'Invoices read, checked and filed automatically, with no manual data entry.',
    ctaLabel: 'Get a quote for automation',
  },
  {
    id: 'assistant',
    label: 'An AI assistant for customer questions',
    keywords: ['ai', 'chatbot', 'assistant', 'support', 'customer questions', 'chat'],
    previewType: 'assistant',
    steps: [
      { id: 'open', caption: 'Setting up the chat window', durationMs: 800 },
      { id: 'question', caption: 'A customer asks a question', durationMs: 900 },
      { id: 'answer', caption: 'The assistant answers instantly', durationMs: 1000 },
      { id: 'handoff', caption: 'Offering a handover to a person if needed', durationMs: 900 },
    ],
    summary: 'A support assistant that answers common questions and knows when to bring in a person.',
    ctaLabel: 'Get a quote for an AI assistant',
  },
];

export const fallbackScenario: Scenario = {
  id: 'custom',
  label: 'Something else',
  keywords: [],
  previewType: 'automation',
  steps: [
    { id: 'listen', caption: 'Every business is a little different', durationMs: 900 },
    { id: 'plan', caption: "Let's talk about what would help most", durationMs: 900 },
  ],
  summary: "Tell us what you're working on and we'll figure out the right build together.",
  ctaLabel: 'Talk to us about your project',
};

/** Very small keyword scorer — no network call, no LLM. Good enough for a demo. */
export function matchScenario(input: string): Scenario {
  const q = input.trim().toLowerCase();
  if (!q) return fallbackScenario;

  let best: Scenario | null = null;
  let bestScore = 0;

  for (const scenario of scenarios) {
    let score = 0;
    for (const kw of scenario.keywords) {
      if (q.includes(kw)) score += kw.length; // longer/more specific matches score higher
    }
    if (score > bestScore) {
      bestScore = score;
      best = scenario;
    }
  }

  return best ?? fallbackScenario;
}