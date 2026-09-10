import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import { sites } from '@openai/sites-vite-plugin';

const githubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: githubPages
    ? 'https://somethingsomethinglabs.github.io/website-12Grapes'
    : 'https://twelve-grapes-gippsland-eoi.rowanjpaterson.chatgpt.site',
  base: githubPages ? '/website-12Grapes' : '/',
  output: 'static',
  outDir: './dist/client',
  integrations: [svelte()],
  vite: {
    plugins: [sites()],
  },
});
