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

// Vite configuration for building both the website and the chatbot widget
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG'],
  define: {
    'process.env': {}, // Define process.env to prevent errors
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for cleaner imports
    },
  },
  build: {
    rollupOptions: {
      // Define multiple entry points: one for the website and one for the widget
      input: {
        main: path.resolve(__dirname, 'index.html'), // Website entry point
        widget: path.resolve(__dirname, 'src/chatbot-widget.jsx'), // Widget entry point
      },
      output: {
        entryFileNames: 'assets/[name].[hash].js', // Output for JS files
        chunkFileNames: 'assets/[name].[hash].js', // Output for chunks
        assetFileNames: 'assets/[name].[hash].[ext]', // Output for assets
      },
    },
    outDir: 'dist', // Specify the output directory
  },
});
