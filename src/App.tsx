import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Footer from './components/Footer';
import { TextRevealByWord } from './components/ui/text-reveal';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <Hero />

        <TextRevealByWord text="Hello, my name is Raphael, I'm 25 years old and I'm passionate about web development, AI, and entrepreneurship. Throughout this journey, you'll find my professional experiences and projects. Enjoy!" />

        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;
