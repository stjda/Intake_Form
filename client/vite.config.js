import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa';
// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: [
      "@mui/material/Box",
    ],
 },
  logLevel: 'info',
  server: {
    proxy: {
      '/api': {
           target: 'http://34.135.9.49:3000',
           changeOrigin: true,
           secure: false,
       }
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', '*.jpg', '*.png'],
      manifest: {
        name: 'STJDA Intake',
        short_name: 'STJDA',
        description: 'Intake forms process for STJDA',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/STJDA_Intake/',
        id: '/STJDA_Intake/',
        scope: '/STJDA_Intake/',
        icons: [
          {
            src: '/STJDA_Intake/192x192Icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/STJDA_Intake/512x512Icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
        ],
        screenshots: [
          {
            src: '/STJDA_Intake/Screenshot1280x720.png',
            sizes: '1280x720',
            type: 'image/png',
            label: 'Desktop Screenshot',
            form_factor: 'wide',
          },
          {
            src: '/STJDA_Intake/Screenshot640x1136.png',
            sizes: '640x1136',
            type: 'image/png',
            label: 'Mobile Screenshot',
            form_factor: 'narrow',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}'],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    base: '/STJDA_Intake/',
  },
});