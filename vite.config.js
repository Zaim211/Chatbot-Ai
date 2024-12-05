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
    // Specify the build output directory for both website and widget
    outDir: 'dist/website', // For the website build (if you want to keep the website in 'dist/website')
    lib: {
      entry: path.resolve(__dirname, 'src/chatbot-widget.jsx'),
      name: 'ChatbotWidget',
      fileName: (format) => `chatbot-widget.${format}.js`,
      formats: ['umd', 'es'], // UMD for global scope, ES for modern imports
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
        // If you want to output widget in a separate folder like 'dist/widget'
        dir: 'dist/widget', // Set output directory for widget build here
      },
    },
  },
});



