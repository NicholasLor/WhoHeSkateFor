import {defineConfig} from 'vite';
import { fileURLToPath } from 'url';

export default defineConfig({
    base:'',

    build: {
        outDir: 'dist',
        rollupOptions: {
          input: {
            index: fileURLToPath(new URL('index.html', import.meta.url)),
            game: fileURLToPath(new URL('game.html', import.meta.url)),
          },
        },
      },
})