import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  define: {
    __RAPID_API_KEY__: JSON.stringify(process.env.RAPID_API_KEY),
    __RAPID_API_HOST__: JSON.stringify(process.env.RAPID_API_HOST),
  },
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    alias: [
      {
        find: "@public", replacement: path.resolve(__dirname, "./public"),
      },
      {
        find: "@src", replacement: path.resolve(__dirname, "./src"),
      },
      {
        find: "@components", replacement: path.resolve(__dirname, "./src/components"),
      },
      {
        find: "@index-page", replacement: path.resolve(__dirname, "./src/pages/index-page"),
      },
      {
        find: "@result-page", replacement: path.resolve(__dirname, "./src/pages/result-page"),
      },
      {
        find: "@favorite-page", replacement: path.resolve(__dirname, "./src/pages/favorite-page"),
      },
      {
        find: "@zustand", replacement: path.resolve(__dirname, "./src/zustand"),
      },
    ]
  }
});
