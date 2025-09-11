// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
    site: 'https://brantial.ai',
    integrations: [mdx(), sitemap(), react()],

    vite: {
        plugins: [tailwindcss()],
    },

    adapter: cloudflare(),
});