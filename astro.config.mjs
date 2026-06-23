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

export default defineConfig({
  output: 'server',

  adapter,

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
  },
});
