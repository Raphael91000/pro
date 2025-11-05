import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Card {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

// --- Effet Glass Apple ---
const GlassEffect: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div
    className={`relative overflow-hidden rounded-3xl ${className}`}
    style={{
      background: "rgba(255, 255, 255, 0.25)",
      boxShadow:
        "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
    }}
  >
    <div
      className="absolute inset-0 rounded-3xl"
      style={{
        boxShadow:
          "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
      }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

export default function CardStack() {
  const initialCards: Card[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1000&h=600&fit=crop",
      alt: "Card 1",
      title: "Alpine Peaks",
      description: "Majestic snow-capped mountains with breathtaking views.",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&h=600&fit=crop",
      alt: "Card 2",
      title: "Tropical Paradise",
      description: "Crystal clear beach waters and endless summer vibes.",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1000&h=600&fit=crop",
      alt: "Card 3",
      title: "Enchanted Forest",
      description: "Lush green wilderness with a mystical atmosphere.",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1000&h=600&fit=crop",
      alt: "Card 4",
      title: "Misty Valley",
      description: "Dreamy landscape photography from the clouds.",
    },
  ];

  const [cards, setCards] = useState<Card[]>(initialCards);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const moveToEnd = () => setCards((prev) => [...prev.slice(1), prev[0]]);
  const moveToStart = () =>
    setCards((prev) => [prev[prev.length - 1], ...prev.slice(0, -1)]);

  const slideVariants = {
    enter: (direction: 1 | -1) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      filter: "blur(6px)",
    }),
    center: { x: 0, opacity: 1, filter: "blur(0px)" },
    exit: (direction: 1 | -1) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      filter: "blur(6px)",
    }),
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setDirection(1);
    setSelectedIndex((prev) => (prev! + 1) % cards.length);
  };

  const handlePrev = () => {
    if (selectedIndex === null) return;
    setDirection(-1);
    setSelectedIndex((prev) => (prev! - 1 + cards.length) % cards.length);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Flèches du stack */}
      <button
        onClick={moveToStart}
        className="absolute left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-gray-300 z-20 hover:scale-105 transition-transform"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        onClick={moveToEnd}
        className="absolute right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-gray-300 z-20 hover:scale-105 transition-transform"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Stack */}
      <div className="relative w-[600px] h-[400px] z-10">
        <ul className="relative w-full h-full m-0 p-0">
          {cards.map(({ id, src, alt, title, description }, i) => {
            const isFront = i === 0;
            const offset = i * -20;
            const scale = 1 - i * 0.05;
            const brightness = 1 - i * 0.1;
            const zIndex = cards.length - i;

            return (
              <li
                key={id}
                className="absolute w-full h-full list-none overflow-hidden rounded-2xl border border-gray-300 shadow-2xl bg-white cursor-pointer"
                style={{
                  top: offset,
                  zIndex,
                  transform: `scale(${scale})`,
                  filter: `brightness(${brightness})`,
                }}
                onMouseEnter={() => isFront && setShowInfo(true)}
                onMouseLeave={() => setShowInfo(false)}
                onClick={() => isFront && setSelectedIndex(i)}
              >
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  draggable={false}
                />
                {isFront && (
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
      </div>

      {/* Carte agrandie */}
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
                {/* Image */}
                <div className="w-1/2 h-full">
                  <img
                    src={cards[selectedIndex].src}
                    alt={cards[selectedIndex].alt}
                    className="w-full h-full object-cover rounded-l-3xl"
                  />
                </div>

                {/* Texte */}
                <div className="w-1/2 p-10 flex flex-col justify-center text-gray-800 relative">
                  <h2 className="text-4xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">
                    {cards[selectedIndex].title}
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {cards[selectedIndex].description} — Smooth Apple-like slide
                    transition between cards. The previous card slides out
                    gracefully while the next glides in.
                  </p>

                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="absolute top-4 right-4 p-2 bg-white/30 rounded-full hover:bg-white/50 transition"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </GlassEffect>

              {/* Flèches visibles sur les bords */}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
