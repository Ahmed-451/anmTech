import { useState, useEffect } from 'react';
import { getContent } from '../content/site';
import styles from './Header.module.css';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const content = getContent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                <a href={item.href} className={styles.navLink}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={content.nav.cta.href}
            className={`${styles.navCta} btn btn-primary`}
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