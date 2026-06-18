// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // SSR output — Netlify adapter will deploy server routes as Netlify Functions.
  output: 'server',

  adapter: netlify(),

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
