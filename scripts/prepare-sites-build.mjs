import { access, cp, mkdir, rm } from 'node:fs/promises';

await access('dist/client/index.html');
await access('dist/.openai/hosting.json');
await rm('dist/server', { recursive: true, force: true });
await mkdir('dist/server', { recursive: true });
await cp('worker/index.js', 'dist/server/index.js');
await cp('worker/wrangler.json', 'dist/server/wrangler.json');
