// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// assetsInclude: ['**/*.PNG'],

// })





















// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// // Vite configuration for building the website and chatbot widget
// export default defineConfig({
//   plugins: [react()],
//   assetsInclude: ['**/*.PNG'],
//   define: {
//     'process.env': {}, // This will define process.env as an empty object, preventing the error
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'), // Alias for imports
//     },
//   },
//   build: {   
//     lib: {
//       entry: path.resolve(__dirname, 'src/chatbot-widget.jsx'),
//       name: 'ChatbotWidget',
//       fileName: (format) => `chatbot-widget.${format}.js`,
//       formats: ['umd', 'es'], // UMD for global scope, ES for modern imports
//     },
//   },
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Vite configuration for building the website and chatbot widget
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG'],
  define: {
    'process.env': {}, // Prevent process.env errors
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist', // Output directory for the Vercel build (use the default dist folder)
    lib: {
      entry: path.resolve(__dirname, 'src/chatbot-widget.jsx'),
      name: 'ChatbotWidget',
      fileName: (format) => `chatbot-widget.${format}.js`,
      formats: ['es'], // Only ES format for code splitting (UMD is incompatible)
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // Website entry point
        widget: path.resolve(__dirname, 'src/chatbot-widget.jsx'), // Widget entry point
      },
      output: {
        inlineDynamicImports: false,
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        dir: 'dist', // Output directory for the widget build
      },
    },
  },
});





