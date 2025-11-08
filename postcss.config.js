import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import purgecss from "@fullhuman/postcss-purgecss";

const isProd = process.env.NODE_ENV === "production";

const purge = purgecss.default || purgecss; // ✅ pour compat ESM/CommonJS

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    ...(isProd
      ? [
          purge({
            content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
            defaultExtractor: (content) =>
              content.match(/[\w-/:]+(?<!:)/g) || [],
          }),
        ]
      : []),
  ],
};
