// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import node from '@astrojs/node';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

const deployTarget =
  process.env.DEPLOY_TARGET ?? (process.env.NETLIFY ? 'netlify' : 'node');
const adapter =
  deployTarget === 'netlify' ? netlify() : node({ mode: 'standalone' });

// https://astro.build/config
export default defineConfig({
  // SSR output. Adapter is selected by DEPLOY_TARGET:
  // - DEPLOY_TARGET=netlify → Netlify Functions
  // - DEPLOY_TARGET=docker/node or unset locally → standalone Node server
  output: 'server',

  adapter,

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
