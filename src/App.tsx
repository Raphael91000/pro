
import Hero from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header supprimé pour laisser place à la navbar transparente intégrée dans Hero */}
      <main className="">
        <Hero />
        <About />
      </main>
      <Footer />
    </div>
  );
}

export default App;