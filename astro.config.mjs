import db from '@astrojs/db';
import netlify from '@astrojs/netlify';
import { defineConfig } from 'astro/config';
import webmanifest from 'astro-webmanifest';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    db(),
    webmanifest({
      name: 'Niet vergeten',
      icon: 'src/images/sun.svg',
      short_name: 'Niet vergeten',
      display: 'standalone',
    }),
  ],
  experimental: {
    actions: true,
  },
  adapter: netlify(),
});
