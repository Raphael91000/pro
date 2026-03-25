"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const gradientText = {
  background: "linear-gradient(135deg, #ff0066 0%, #d4005a 40%, #6b0f4e 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

const links = [
  { label: "Home",    href: "#" },
  { label: "Journey", href: "#journey" },
  { label: "Skills",  href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const diff = current - lastScrollY.current;

      if (Math.abs(diff) < 8) return; // ignore micro-mouvements

      if (current < 60) {
        setVisible(true);
      } else if (diff > 0) {
        setVisible(false); // scroll vers le bas
      } else {
        setVisible(true);  // scroll vers le haut
      }

      lastScrollY.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
        <motion.header
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-4 z-[1000]"
          style={{ left: "50%", x: "-50%" }}
        >
          <nav className="flex items-center gap-8 px-6 py-3 border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_-8px_rgba(15,23,42,0.12)]" style={{ borderRadius: "999px" }}>
            {/* Logo */}
            <a href="#" className="text-lg font-black tracking-tight mr-2" style={gradientText}>
              Raphael
            </a>

            {/* Links */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="ml-2 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-[0_4px_20px_-4px_rgba(212,0,90,0.4)] transition-transform duration-200 hover:scale-[1.03]"
              style={{ backgroundImage: "linear-gradient(135deg, #ff0066 0%, #d4005a 40%, #6b0f4e 100%)" }}
            >
              Let's talk
            </a>
          </nav>
        </motion.header>
  );
}
