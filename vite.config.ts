import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/nisha-ah-111-midterm-flashcards/",
  plugins: [react(), tailwindcss()],
});
