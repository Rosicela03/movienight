import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({

  //repo name 
  base: '/movienight/',

  plugins: [ react(), svgr()],
});
