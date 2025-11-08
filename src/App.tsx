import { Suspense, lazy } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
import { motion } from "framer-motion";
import { useGPUEcoMode } from "@/hooks/useGPUEcoMode";

// Lazy loading des sections non critiques
const About = lazy(() => import("./components/About"));
const Journey = lazy(() => import("./components/Journey"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  // 🌿 Active le mode éco GPU global (pause des anims, gestion CPU/GPU)
  useGPUEcoMode();

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      {/* 🌈 Animation de fond Apple-style, optimisée GPU */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed inset-0 -z-10 will-change-transform"
      >
        <BackgroundGradientAnimation
          interactive
          containerClassName="!h-full !w-full"
          className="h-full w-full"
        />
      </motion.div>

      {/* 🔝 Header toujours affiché */}
      <Header />

      <main className="relative z-10 pt-24 md:pt-0">
        {/* 🎯 Section Hero prioritaire (pour un LCP rapide) */}
        <Hero />

        {/* 💤 Sections secondaires chargées à la demande */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20 text-gray-500">
              Chargement du contenu...
            </div>
          }
        >
          <section className="relative -mt-24 overflow-visible pt-24 md:-mt-32 md:pt-0">
            <div className="flex flex-col">
              <About />
              <Journey />
              <Skills />
              <Contact />
              <Footer />
            </div>
          </section>
        </Suspense>
      </main>
    </div>
  );
}

export default App;
