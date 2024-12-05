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

// Vite configuration for both website and chatbot widget
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG'],
  define: {
    'process.env': {}, // This will define process.env as an empty object, preventing the error
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for imports
    },
  },
  build: {
    // Website build
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // Your main website entry
      },
    },
    lib: {
      entry: path.resolve(__dirname, 'src/chatbot-widget.jsx'), // Entry for chatbot widget
      name: 'ChatbotWidget', // The global name for the widget
      fileName: (format) => `chatbot-widget.${format}.js`, // Output for widget
      formats: ['umd', 'es'], // UMD for global scope, ES for modern imports
    },
  },
});




