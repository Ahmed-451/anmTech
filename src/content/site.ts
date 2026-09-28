/**
 * Site Content - All marketing copy lives here
 * i18n-ready structure with locale keying
 * Only 'en' is filled in for now
 */

export type Locale = 'en';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  features: string[];
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface AboutContent {
  headline: string;
  body: string[];
  values: Array<{ title: string; description: string }>;
  /** Only add stats here once ANM has verified real numbers. */
  stats: Array<{ value: string; label: string }>;
  team: TeamMember[];
}

export interface ProofItem {
  type: 'case-study' | 'testimonial' | 'partner';
  headline: string;
  body: string;
  author?: string;
  role?: string;
  company?: string;
  logo?: string;
  metrics?: Array<{ value: string; label: string }>;
  /** Items flagged as placeholder are never rendered by the Proof section. */
  placeholder?: boolean;
}

export interface ContactInfo {
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  email: string;
  phone: string;
  hours: string;
}

export interface FooterContent {
  tagline: string;
  links: {
    services: NavItem[];
    company: NavItem[];
    legal: NavItem[];
  };
  social: Array<{ label: string; href: string; icon: string }>;
  copyright: string;
}

export interface SiteContent {
  nav: {
    items: NavItem[];
    cta: { label: string; href: string };
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
  };
  services: Service[];
  about: AboutContent;
  proof: ProofItem[];
  contact: ContactInfo;
  footer: FooterContent;
}

const siteContentEn: SiteContent = {
  nav: {
    items: [
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
      { label: 'Our work', href: '#proof' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: { label: 'Get a quote', href: '#quote' },
  },
  hero: {
    headline: 'We build digital products that work for your business',
    subheadline:
      'From custom software and mobile apps to AI automation and IT resourcing — ANM Technologies delivers outcomes, not just code.',
    ctaPrimary: { label: 'Start a project', href: '#quote' },
    ctaSecondary: { label: 'Meet the team', href: '#about' },
  },
  services: [
    {
      id: 'resourcing',
      title: 'IT Resourcing',
      description: 'Skilled developers and engineers who join your team and get to work.',
      longDescription:
        'We help teams add developers, DevOps engineers, and technical leads. Engagements can be short or long, and we match people to what your project actually needs.',
      icon: 'users',
      features: [
        'Developers, DevOps and technical leads',
        'Flexible engagement models',
        'Short-term or long-term placements',
        'Based in Belgium',
      ],
    },
    {
      id: 'custom-software',
      title: 'Custom Software',
      description: 'Tailored applications that solve your specific business problems.',
      longDescription:
        'We design and build custom web applications, APIs, and backend systems using modern architectures. From legacy modernisation to greenfield platforms, we focus on maintainability and scale.',
      icon: 'code',
      features: [
        'Domain-driven design',
        'Clean architecture',
        'Automated testing & CI/CD',
        'Cloud-native deployment',
      ],
    },
    {
      id: 'website-development',
      title: 'Website Development',
      description: 'High-performance marketing sites and web platforms that convert.',
      longDescription:
        'We build fast, accessible, SEO-ready websites using modern frameworks. Whether you need a marketing site, a headless CMS implementation, or a complex web platform, we deliver pixel-perfect results.',
      icon: 'globe',
      features: [
        'Core Web Vitals optimised',
        'Headless CMS ready',
        'WCAG 2.1 AA compliant',
        'Editor-friendly content modeling',
      ],
    },
    {
      id: 'mobile-apps',
      title: 'Mobile Apps',
      description: 'Native and cross-platform apps your users will love.',
      longDescription:
        'We build iOS and Android applications using React Native and native tooling. From consumer apps to enterprise tools, we handle the full lifecycle — strategy, design, development, and App Store deployment.',
      icon: 'smartphone',
      features: [
        'React Native / Swift / Kotlin',
        'Offline-first architecture',
        'Push notifications & deep linking',
        'App Store & Play Store deployment',
      ],
    },
    {
      id: 'ai-automation',
      title: 'AI & Automation',
      description: 'Practical AI that reduces manual work and unlocks new capabilities.',
      longDescription:
        'We implement AI solutions that solve real problems: document processing, customer support automation, data extraction, and workflow orchestration. No hype — just measurable efficiency gains.',
      icon: 'sparkles',
      features: [
        'LLM integration & fine-tuning',
        'RAG & vector search',
        'Workflow automation (n8n, custom)',
        'Data privacy & EU compliance',
      ],
    },
    {
      id: 'data-bi',
      title: 'Data & BI',
      description: 'Turn scattered data into decisions with dashboards and pipelines.',
      longDescription:
        'We build data platforms, ETL pipelines, and interactive dashboards that give leadership real-time visibility. From setting up warehouses to designing self-serve analytics, we make data usable.',
      icon: 'chart',
      features: [
        'Modern data stack (dbt, Airflow, etc.)',
        'Self-serve dashboards (Metabase, Superset)',
        'Data quality & observability',
        'GDPR-compliant governance',
      ],
    },
  ],
  about: {
    headline: 'A Belgian software team building practical technology',
    body: [
      'ANM Technologies is a startup based in Zaventem, Belgium. We build websites, custom software, mobile apps, and AI automation, with a simple premise: software should create measurable value for the business that uses it.',
      'We are early in our journey, and we care more about doing our first projects properly than about looking bigger than we are. If you have a problem worth solving, we would like to hear about it.',
    ],
    values: [
      {
        title: 'Outcomes over output',
        description: 'We measure success by business impact, not lines of code shipped.',
      },
      {
        title: 'Simple and maintainable',
        description: 'We favour clear designs and tested code that your team can keep running.',
      },
      {
        title: 'Transparent partnership',
        description: 'Honest advice and clear communication, even when it means saying no.',
      },
      {
        title: 'Local and approachable',
        description: 'Based in Zaventem, Belgium, and happy to meet in person.',
      },
    ],
    // Intentionally empty until ANM has verified real numbers to show.
    stats: [],
    team: [
      { name: 'Neha Mishra', role: 'Founder & CEO' },
      { name: 'Akhileshwar Kumar', role: 'Co-founder' },
      { name: 'Ruchita Lovi', role: 'Finance Head' },
      { name: 'Rakesh Ranjan', role: 'Sales Head' },
    ],
  },
  // Intentionally empty. Add real, approved case studies here as they exist.
  // Anything flagged `placeholder: true` is never shown on the site.
  proof: [],
  contact: {
    address: {
      street: 'Vilvoordelaan 55',
      city: 'Zaventem',
      postalCode: '1930',
      country: 'Belgium',
    },
    email: 'contact@anmtech.be',
    phone: '+32 466 18 11 34',
    hours: 'Mon–Fri, 9:00–18:00 CET',
  },
  footer: {
    tagline: 'Building digital products that deliver outcomes.',
    links: {
      services: [
        { label: 'IT Resourcing', href: '#services' },
        { label: 'Custom Software', href: '#services' },
        { label: 'Website Development', href: '#services' },
        { label: 'Mobile Apps', href: '#services' },
        { label: 'AI & Automation', href: '#services' },
        { label: 'Data & BI', href: '#services' },
      ],
      company: [
        { label: 'About us', href: '#about' },
        { label: 'Careers', href: '#contact' },
        { label: 'Blog', href: '#' },
        { label: 'Privacy', href: '#' },
      ],
      legal: [
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'GDPR', href: '#' },
      ],
    },
    // TODO: add ANM's real social profile URLs. The previous entries were
    // guesses and may point at accounts belonging to other companies.
    social: [],
    copyright: '© 2026 ANM Technologies. All rights reserved.',
  },
};

const contentMap: Record<Locale, SiteContent> = {
  en: siteContentEn,
};

export function getContent(locale: Locale = 'en'): SiteContent {
  return contentMap[locale] ?? contentMap.en;
}

export function getContentByKey<K extends keyof SiteContent>(locale: Locale, key: K): SiteContent[K] {
  return getContent(locale)[key];
}