import { useEffect } from "react";

/**
 * Hook global pour activer le mode "GPU-friendly"
 * - Met en pause les animations quand l’onglet est inactif
 * - Respecte prefers-reduced-motion
 * - Active un mode "low GPU" si les frames sont trop lentes
 */
export function useGPUEcoMode() {
  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const root = document.documentElement;

    // 🔄 Pause des animations si l’onglet est caché
    const handleVisibilityChange = () => {
      root.style.setProperty(
        "--pause-animations",
        document.hidden ? "paused" : "running"
      );
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // ♿ Si l'utilisateur préfère moins d'animations
    if (prefersReducedMotion) {
      root.classList.add("reduce-motion");
      root.style.setProperty("--pause-animations", "paused");
    }

    // 🚦 Détection simple de GPU lent (basée sur le nombre de frames)
    let frameCount = 0;
    const start = performance.now();
    const checkPerformance = () => {
      frameCount++;
      if (performance.now() - start > 1000) {
        if (frameCount < 40) {
          root.classList.add("gpu-low");
          console.warn("⚠️ Mode GPU faible activé");
        }
      }
      requestAnimationFrame(checkPerformance);
    };
    requestAnimationFrame(checkPerformance);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
}
