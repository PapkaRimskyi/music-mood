import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  define: {
    __RAPID_API_KEY__: JSON.stringify(process.env.RAPID_API_KEY),
    __RAPID_API_HOST__: JSON.stringify(process.env.RAPID_API_HOST),
    __SPOTIFY_CLIENT_ID__: JSON.stringify(process.env.SPOTIFY_CLIENT_ID),
    __SPOTIFY_SECRET_CODE__: JSON.stringify(process.env.SPOTIFY_SECRET_CODE),
  },
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: {
      "Public": path.resolve(__dirname, 'public'),
      "Src": path.resolve(__dirname, 'src'),
    }
  }
})
