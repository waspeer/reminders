import db from '@astrojs/db';
import netlify from '@astrojs/netlify';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [db()],
  experimental: {
    actions: true,
  },
  adapter: netlify(),
});
