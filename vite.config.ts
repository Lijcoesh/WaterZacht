import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
    // GitHub Pages serveert de site onder https://lijcoesh.github.io/WaterZacht/
    base: command === 'build' ? '/WaterZacht/' : '/',
    plugins: [react()],
    resolve: {
        alias: {
            src: fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
}));
