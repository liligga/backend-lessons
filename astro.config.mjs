import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from "vite";
import vue from "@astrojs/vue";
const {
  MAIN_SITE
} = loadEnv(process.env.NODE_ENV, process.cwd(), '');


// https://astro.build/config
export default defineConfig({
  site: MAIN_SITE,
  base: '/',
  integrations: [mdx(), sitemap(), vue()]
});