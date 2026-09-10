import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import { sites } from '@openai/sites-vite-plugin';

export default defineConfig({
  site: 'https://twelve-grapes-gippsland-eoi.rowanjpaterson.chatgpt.site',
  output: 'static',
  outDir: './dist/client',
  integrations: [svelte()],
  vite: {
    plugins: [sites()],
  },
});
