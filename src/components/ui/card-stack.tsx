import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Card {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

// --- Apple Glass Effect Wrapper ---
const GlassEffect: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`relative overflow-hidden rounded-3xl ${className}`}
    style={{
      background: "rgba(255,255,255,0.25)",
      boxShadow: "0 6px 6px rgba(0,0,0,0.2), 0 0 20px rgba(0,0,0,0.1)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255,255,255,0.3)",
    }}
  >
    <div
      className="absolute inset-0 rounded-3xl"
      style={{
        boxShadow:
          "inset 2px 2px 1px 0 rgba(255,255,255,0.5), inset -1px -1px 1px 1px rgba(255,255,255,0.5)",
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

export default function CardStack() {
  const cards: Card[] = [
    { id: 1, src: "/WASH.png", alt: "WASH", title: "WASH", description: "Service de nettoyage moderne et innovant." },
    { id: 2, src: "/KIN.png", alt: "KIN", title: "KIN", description: "Solutions digitales et développement web." },
    { id: 3, src: "/FELIZBELLA.png", alt: "FELIZBELLA", title: "FELIZBELLA", description: "Beauté et bien-être au naturel." },
    { id: 4, src: "/TRANSPORT.png", alt: "TRANSPORT", title: "TRANSPORT", description: "Logistique et transport intelligents." },
    { id: 5, src: "/GEODIS.png", alt: "GEODIS", title: "GEODIS", description: "Partenaire logistique international." },
    { id: 6, src: "/CTBG.png", alt: "CTBG", title: "CTBG", description: "Solutions de construction et BTP modernes." },
    { id: 7, src: "/CAZY.png", alt: "CAZY", title: "CAZY", description: "Concepts créatifs et expériences uniques." },
    { id: 8, src: "/KRGLOBAL.png", alt: "KRGLOBAL", title: "KRGLOBAL", description: "Expansion et stratégie internationale." },
    { id: 9, src: "/SCHOOL.png", alt: "SCHOOL", title: "SCHOOL", description: "Plateforme éducative nouvelle génération." },
    { id: 10, src: "/KIN.png", alt: "KIN", title: "KIN", description: "Solutions de croissance pour le digital." },
  ];

  const [showInfo, setShowInfo] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const slideVariants = {
    enter: (dir: 1 | -1) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (dir: 1 | -1) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      filter: "blur(6px)",
    }),
  };

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* --- Stack principal --- */}
      <div className="relative w-[600px] h-[400px] z-10 flex items-center justify-center">
        <ul className="relative w-full h-full m-0 p-0">
          {cards.map(({ id, src, alt, title, description }, i) => {
            const indexOffset = (i - currentIndex + cards.length) % cards.length;
            const offset = indexOffset * -20;
            const scale = 1 - indexOffset * 0.05;
            const brightness = 1 - indexOffset * 0.1;
            const zIndex = cards.length - indexOffset;

            return (
              <li
                key={id}
                className="absolute w-full h-full list-none overflow-hidden rounded-2xl border border-gray-300 shadow-2xl bg-white cursor-pointer transition-transform duration-500 ease-out"
                style={{
                  top: offset,
                  zIndex,
                  transform: `scale(${scale})`,
                  filter: `brightness(${brightness})`,
                }}
                onMouseEnter={() => indexOffset === 0 && setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
                onClick={() => indexOffset === 0 && setSelectedIndex(i)}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-contain p-8 pointer-events-none select-none bg-white"
                  draggable={false}
                />
                {indexOffset === 0 && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: showInfo ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold">{title}</h3>
                    <p className="text-white/80 text-sm mt-1">{description}</p>
                  </motion.div>
                )}
              </li>
            );
          })}
        </ul>

        {/* --- Flèches principales --- */}
        <button
          onClick={handlePrev}
          className="absolute left-[-80px] top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md shadow-xl border border-white/30 transition z-50"
        >
          <ChevronLeft className="w-7 h-7 text-gray-800" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-[-80px] top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md shadow-xl border border-white/30 transition z-50"
        >
          <ChevronRight className="w-7 h-7 text-gray-800" />
        </button>
      </div>

      {/* --- Barre de progression --- */}
      <div className="absolute bottom-16 w-[300px] h-2 rounded-full bg-gray-200 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #5c6ff4, #e870c2)",
            width: `${((currentIndex + 1) / cards.length) * 100}%`,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* --- Carte zoomée --- */}
      <AnimatePresence custom={direction}>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              key={cards[selectedIndex].id}
              className="relative"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <GlassEffect className="w-[900px] h-[550px] flex relative overflow-hidden">
                <div className="w-1/2 h-full flex items-center justify-center bg-white">
                  <img
                    src={cards[selectedIndex].src}
                    alt={cards[selectedIndex].alt}
                    className="w-[80%] h-auto object-contain rounded-l-3xl"
                  />
                </div>

                <div className="w-1/2 p-10 flex flex-col justify-center text-gray-800 relative">
                  <h2 className="text-4xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">
                    {cards[selectedIndex].title}
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {cards[selectedIndex].description}
                  </p>

                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="absolute top-4 right-4 p-2 bg-white/30 rounded-full hover:bg-white/50 transition"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </GlassEffect>

              {/* --- Flèches internes --- */}
              <button
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev! > 0 ? prev! - 1 : prev
                  )
                }
                className="absolute left-[-80px] top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md shadow-xl border border-white/30 transition z-50"
              >
                <ChevronLeft className="w-7 h-7 text-gray-800" />
              </button>
              <button
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev! < cards.length - 1 ? prev! + 1 : prev
                  )
                }
                className="absolute right-[-80px] top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md shadow-xl border border-white/30 transition z-50"
              >
                <ChevronRight className="w-7 h-7 text-gray-800" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
