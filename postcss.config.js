import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import purgecss from "@fullhuman/postcss-purgecss";

// Active PurgeCSS uniquement en production
const isProd = process.env.NODE_ENV === "production";

// Compatibilité ESM / CJS
const purge = purgecss.default || purgecss;

export default {
  plugins: [
    // Tailwind et Autoprefixer toujours actifs
    tailwindcss(),
    autoprefixer(),

    // PurgeCSS uniquement pour les builds de production
    ...(isProd
      ? [
          purge({
            content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
            safelist: {
              // 🔒 Garde les classes dynamiques et utilitaires importantes
              standard: [
                /object-/,
                /rounded-/,
                /aspect-/,
                /blur-/,
                /translate-/,
                /scale-/,
                /opacity-/,
                /bg-/,
                /text-/,
                /from-/,
                /to-/,
                /via-/,
                /animate-/,
                /flex-/,
                /grid-/,
                /items-/,
                /justify-/,
                /gap-/,
                /p-/,
                /m-/,
                /w-/,
                /h-/,
              ],
            },
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
