import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Contact from './components/Contact';
import { BackgroundGradientAnimation } from './components/ui/background-gradient-animation';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="fixed inset-0 -z-10"
      >
        <BackgroundGradientAnimation
          interactive
          containerClassName="!h-full !w-full"
          className="h-full w-full"
        />
      </motion.div>

      <Header />

      <main className="relative z-10 pt-24 md:pt-0">
        <Hero />

        <section className="relative -mt-24 overflow-visible pt-24 md:-mt-32 md:pt-0">
          <div className="flex flex-col">
            <About />
            <Journey />
            <Skills />
            <Contact />
            <Footer />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
