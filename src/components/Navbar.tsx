"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const gradientText = {
  background: "linear-gradient(135deg, #ff0066 0%, #d4005a 40%, #6b0f4e 100%)",
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent" as const,
  backgroundClip: "text" as const,
};

const gradientBg = {
  backgroundImage: "linear-gradient(135deg, #ff0066 0%, #d4005a 40%, #6b0f4e 100%)",
};

const links = [
  { label: "Home",    href: "#" },
  { label: "Journey", href: "#journey" },
  { label: "Skills",  href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ctaHovered, setCtaHovered] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    lastScrollY.current = window.scrollY;

    let ready = false;
    const readyTimer = setTimeout(() => {
      ready = true;
      lastScrollY.current = window.scrollY;
    }, 800);

    const onScroll = () => {
      if (!ready || window.innerWidth < 768) return;
      const current = window.scrollY;
      const diff = current - lastScrollY.current;
      if (Math.abs(diff) < 8) return;
      if (current < 60) setVisible(true);
      else if (diff > 0) { setVisible(false); setMenuOpen(false); }
      else setVisible(true);
      lastScrollY.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(readyTimer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  return (
    <header style={{
      position: "fixed",
      top: 16,
      // Mobile : left:50% + translateX(-50%) pour centrer sur le viewport réel
      // Desktop : left:0 right:0 + flexbox center (inchangé)
      ...(isMobile
        ? { left: "50%", transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-120px)" }
        : { left: 0, right: 0, display: "flex", justifyContent: "center", transform: visible ? "translateY(0)" : "translateY(-120px)" }
      ),
      zIndex: 9999,
      pointerEvents: "none",
      transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.4s ease",
      opacity: visible ? 1 : 0,
      willChange: "transform, opacity",
    }}>
      <div style={{ pointerEvents: "auto", width: isMobile ? "92vw" : "680px" }}>

        {/* Barre principale */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "16px 32px",
          borderRadius: "999px",
          border: "1px solid rgba(255,255,255,0.6)",
          background: "rgba(255,255,255,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 32px -8px rgba(15,23,42,0.12)",
          boxSizing: "border-box",
        }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Logo */}
          <a href="#" style={{ ...gradientText, fontSize: 22, fontWeight: 900, letterSpacing: "-0.03em", textDecoration: "none", flexShrink: 0 }}>
            Raphael
          </a>

          {/* Links desktop */}
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 32, marginLeft: 32 }}>
              {links.map((l) => (
                <a key={l.label} href={l.href} className="nav-link" style={{ fontSize: 16, fontWeight: 500, color: "#475569", textDecoration: "none" }}>
                  {l.label}
                </a>
              ))}
            </div>
          )}

          {/* CTA desktop */}
          {!isMobile && (
            <a
              href="#contact"
              onMouseEnter={() => setCtaHovered(true)}
              onMouseLeave={() => setCtaHovered(false)}
              style={{
                ...gradientBg,
                marginLeft: "auto",
                padding: "10px 22px",
                borderRadius: "999px",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                flexShrink: 0,
                position: "relative",
                overflow: "hidden",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <span style={{
                position: "absolute",
                inset: 0,
                background: "white",
                borderRadius: "inherit",
                transform: ctaHovered ? "translateX(0)" : "translateX(-101%)",
                transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
              }} />
              <span style={{
                position: "relative",
                zIndex: 1,
                ...(ctaHovered ? {
                  background: "linear-gradient(135deg, #ff0066 0%, #d4005a 40%, #6b0f4e 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                } : { color: "white" }),
              }}>Let's talk</span>
            </a>
          )}

          {/* Hamburger mobile */}
          {isMobile && (
            <button
              onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
              aria-label="Menu"
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                padding: 8,
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: 5,
                flexShrink: 0,
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span style={{ display: "block", height: 2, width: 24, background: "#334155", borderRadius: 2, transition: "all 0.3s", transformOrigin: "center", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", height: 2, width: 24, background: "#334155", borderRadius: 2, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", height: 2, width: 24, background: "#334155", borderRadius: 2, transition: "all 0.3s", transformOrigin: "center", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </button>
          )}
        </nav>

        {/* Dropdown mobile */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              style={{
                marginTop: 8,
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.6)",
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px -8px rgba(15,23,42,0.15)",
                overflow: "hidden",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", flexDirection: "column", padding: 12, gap: 4 }}>
                {links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    style={{ padding: "12px 16px", borderRadius: 12, fontSize: 14, fontWeight: 500, color: "#334155", textDecoration: "none" }}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  style={{ ...gradientBg, marginTop: 4, padding: "12px 16px", borderRadius: 12, fontSize: 14, fontWeight: 600, color: "white", textDecoration: "none", textAlign: "center" }}
                >
                  Let's talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
