import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Pipeline } from './components/Pipeline';
import { Services } from './components/Services';
import { About } from './components/About';
import { Proof } from './components/Proof';
import { Quote } from './components/Quote';
import { Contact } from './components/Contact';
import styles from './App.module.css';

function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main" className={styles.main}>
        <Hero />
        <Pipeline />
        <Services />
        <About />
        <Proof />
        <Quote />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;