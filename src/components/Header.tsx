import { useState, useEffect } from 'react';
import { getContent } from '../content/site';
import { useMotion } from '../lib/motion/MotionProvider';
import styles from './Header.module.css';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const content = getContent();
  const { scrollTo } = useMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    // Only intercept in-page anchors (e.g. "#services"). Let external/real
    // links (e.g. "/", a future "/careers") behave normally.
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    scrollTo(href);
    window.history.pushState(null, '', href);
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="/" className={styles.wordmark} aria-label="ANM Technologies home">
          ANM Technologies
        </a>

        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <ul className={`${styles.navList} ${mobileMenuOpen ? styles.open : ''}`}>
            {content.nav.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={content.nav.cta.href}
            className={`${styles.navCta} btn btn-primary`}
            onClick={(e) => handleNavClick(e, content.nav.cta.href)}
          >
            {content.nav.cta.label}
          </a>

          <button
            className={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="main-nav"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={styles.hamburger} aria-hidden="true">
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`}></span>
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`}></span>
              <span className={`${styles.bar} ${mobileMenuOpen ? styles.barOpen : ''}`}></span>
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}