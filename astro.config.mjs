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
      display: 'standalone',
      theme_color: '#45a1b4',
      background_color: '#d8e373',
    }),
  ],
  experimental: {
    actions: true,
  },
  adapter: netlify(),
});
