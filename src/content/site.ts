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

export interface AboutContent {
  headline: string;
  body: string[];
  values: Array<{ title: string; description: string }>;
  stats: Array<{ value: string; label: string }>;
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
}const siteContentEn: SiteContent = {
  nav: {
    items: [
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
      { label: 'Proof', href: '#proof' },
      { label: 'Contact', href: '#contact' },
    ],
    cta: { label: 'Get a quote', href: '#quote' },
  },
  hero: {
    headline: 'We build digital products that work for your business',
    subheadline: 'From custom software and mobile apps to AI automation and IT resourcing — ANM Technologies delivers outcomes, not just code.',
    ctaPrimary: { label: 'Start a project', href: '#quote' },
    ctaSecondary: { label: 'See our work', href: '#proof' },
  },
  services: [
    {
      id: 'resourcing',
      title: 'IT Resourcing',
      description: 'Senior developers and engineers who integrate with your team from day one.',
      longDescription: 'We provide vetted senior developers, DevOps engineers, and technical leads who join your team seamlessly. No junior contractors, no handoff delays — just experienced professionals who deliver.',
      icon: 'users',
      features: [
        'Senior-level talent only',
        '2-week replacement guarantee',
        'Flexible engagement models',
        'Belgium-based, EU compliant',
      ],
    },
    {
      id: 'custom-software',
      title: 'Custom Software',
      description: 'Tailored applications that solve your specific business problems.',
      longDescription: 'We design and build custom web applications, APIs, and backend systems using modern architectures. From legacy modernisation to greenfield platforms, we focus on maintainability and scale.',
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
      longDescription: 'We build fast, accessible, SEO-ready websites using modern frameworks. Whether you need a marketing site, a headless CMS implementation, or a complex web platform, we deliver pixel-perfect results.',
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
      longDescription: 'We build iOS and Android applications using React Native and native tooling. From consumer apps to enterprise tools, we handle the full lifecycle — strategy, design, development, and App Store deployment.',
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
      longDescription: 'We implement AI solutions that solve real problems: document processing, customer support automation, data extraction, and workflow orchestration. No hype — just measurable efficiency gains.',
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
      longDescription: 'We build data platforms, ETL pipelines, and interactive dashboards that give leadership real-time visibility. From setting up warehouses to designing self-serve analytics, we make data usable.',
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
    headline: 'Built on Belgian engineering, trusted across Europe',
    body: [
      'ANM Technologies was founded in Zaventem with a simple premise: software should create measurable value, not just check boxes. We\'ve grown into a team of 50+ engineers, designers, and strategists who share that standard.',
      'We work with scale-ups, enterprises, and public sector clients across Benelux and beyond. Our track record spans fintech, logistics, healthcare, and government — domains where reliability and compliance aren\'t optional.',
    ],
    values: [
      { title: 'Outcomes over output', description: 'We measure success by business impact, not lines of code shipped.' },
      { title: 'Senior by default', description: 'Every project is led by experienced architects and engineers.' },
      { title: 'Transparent partnership', description: 'No hidden costs, no vendor lock-in, honest advice — even when it means saying no.' },
      { title: 'Local presence, global reach', description: 'Based in Zaventem, working across Europe with on-site availability.' },
    ],
    stats: [
      { value: '50+', label: 'Engineers & designers' },
      { value: '100+', label: 'Projects delivered' },
      { value: '95%', label: 'Client retention rate' },
      { value: '7', label: 'Years in business' },
    ],
  },
  proof: [
    {
      type: 'case-study',
      headline: '[PLACEHOLDER: Real case study needed]',
      body: 'A European fintech needed to modernise their core banking platform. We delivered a phased migration to a cloud-native architecture, reducing deployment time from weeks to hours.',
      metrics: [
        { value: '80%', label: 'Faster deployments' },
        { value: '40%', label: 'Cost reduction' },
        { value: '99.99%', label: 'Uptime achieved' },
      ],
      placeholder: true,
    },
    {
      type: 'case-study',
      headline: '[PLACEHOLDER: Real case study needed]',
      body: 'A logistics company automated their customs documentation pipeline using AI-powered document processing, eliminating 200+ hours of manual work per month.',
      metrics: [
        { value: '200h+', label: 'Monthly hours saved' },
        { value: '95%', label: 'Accuracy rate' },
        { value: '3 weeks', label: 'Time to production' },
      ],
      placeholder: true,
    },
    {
      type: 'testimonial',
      headline: '[PLACEHOLDER: Real testimonial needed]',
      body: 'ANM didn\'t just build our platform — they challenged our assumptions and delivered a better product than we specified. True partners.',
      author: 'CTO',
      role: 'Scale-up, Brussels',
      placeholder: true,
    },
    {
      type: 'partner',
      headline: 'Technology partners',
      body: 'We work with the best tools in the ecosystem.',
      placeholder: true,
    },
  ],
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
    social: [
      { label: 'LinkedIn', href: 'https://linkedin.com/company/anm-technologies', icon: 'linkedin' },
      { label: 'GitHub', href: 'https://github.com/anmtech', icon: 'github' },
      { label: 'Twitter', href: 'https://twitter.com/anmtech', icon: 'twitter' },
    ],
    copyright: '© 2025 ANM Technologies. All rights reserved.',
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
