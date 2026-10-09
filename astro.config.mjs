import { defineConfig } from 'astro/config';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  integrations: [keystatic()],
  adapter: vercel(),
});