import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import purgecss from "@fullhuman/postcss-purgecss";

const isProd = process.env.NODE_ENV === "production";
const purge = purgecss.default || purgecss;

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    ...(isProd
      ? [
          purge({
            content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
            safelist: {
              standard: [
                // 🔒 Classes Tailwind à garder
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
              ],
            },
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
