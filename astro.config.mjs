import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://liligga.github.io',
  base: '/backend-lessons',
	integrations: [mdx(), sitemap()],
});
