// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   assetsInclude: ['**/*.PNG'],
//   // define: {
//   //   'process.env': '{}',  // Define process.env as an empty object
//   // },
// })


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// // Vite configuration for building the chatbot widget
// export default defineConfig({
//   plugins: [react()],
//   assetsInclude: ['**/*.PNG'],
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'src'), // Alias for imports
//     },
//   },
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, 'src/chatbot-widget.jsx'), // Entry point
//       name: 'ChatbotWidget', // Name of the global variable when embedded
//       fileName: (format) => `chatbot-widget.${format}.js`,
//       formats: ['umd', 'es'], // UMD for global scope, ES for modern imports
//     },
//   },
// })


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist', // Output folder for the build
//     assetsInclude: ['**/*.PNG'], // Include assets
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
    'process.env': {}, // This will define process.env as an empty object, preventing the error
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for imports
    },
  },
  build: {
    // Building the website
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),  // The entry HTML file for your website
    },
    lib: {
      entry: path.resolve(__dirname, 'src/chatbot-widget.jsx'),
      name: 'ChatbotWidget',
      fileName: (format) => `chatbot-widget.${format}.js`,
      formats: ['umd', 'es'], // UMD for global scope, ES for modern imports
    },
  },
})



