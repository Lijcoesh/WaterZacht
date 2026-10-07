import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(() => ({
    // De VPS serveert de site op /; de demo op GitHub Pages zet BASE_PATH=/WaterZacht/
    base: process.env.BASE_PATH ?? '/',
    plugins: [react()],
    build: {
        // MIT/BSD/ISC eisen dat de copyrightvermelding met de gebundelde code meegaat
        license: { fileName: 'licenses.md' },
    },
    resolve: {
        alias: {
            src: fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    server: {
        // De API (server/) draait lokaal met `dotnet run` op deze poort (launchSettings.json)
        proxy: { '/api': 'http://localhost:5080' },
    },
}));
