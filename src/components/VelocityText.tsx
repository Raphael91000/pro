import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TEXT = "Not a CS grad. Not a bootcamp kid. Just me, the internet, and way too many late nights. —";

export default function VelocityText() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const textRef     = useRef<HTMLParagraphElement>(null);
  const [scrollLen, setScrollLen] = useState(5000);

  // Mesure la largeur réelle du texte après chargement des fonts
  useEffect(() => {
    document.fonts.ready.then(() => {
      if (!textRef.current) return;
      const textWidth = textRef.current.scrollWidth;
      const viewportW = window.innerWidth;
      // scroll distance = ce qu'il faut parcourir pour voir tout le texte
      setScrollLen(Math.max(textWidth - viewportW + 200, 3000));
    });
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollLen]);

  return (
    <div
      ref={sectionRef}
      style={{ height: `calc(100vh + ${scrollLen}px)`, position: "relative", zIndex: 100 }}
      className="bg-white"
    >
      <div
        style={{ position: "sticky", top: 0, height: "100vh" }}
        className="flex items-center bg-white"
      >
        <motion.p
          ref={textRef}
          style={{ x }}
          className="whitespace-nowrap text-5xl font-black uppercase leading-[0.85] md:text-7xl md:leading-[0.85] pl-8"
        >
          <span style={{
            backgroundImage: "linear-gradient(145deg, #1a0a2e 0%, #6b0f4e 35%, #d4005a 65%, #e8005a 80%, #ff0066 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {TEXT}
          </span>
        </motion.p>
      </div>
    </div>
  );
}
