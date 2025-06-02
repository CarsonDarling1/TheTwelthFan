import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite';


// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',  // Ensure this matches the alias in tsconfig.json
    },
  },
  plugins: [
    tailwindcss(),
  ],
});
