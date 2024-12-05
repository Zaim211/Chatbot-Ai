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

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.PNG'],
  define: {
    'process.env': {}, // Define process.env to avoid errors
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for imports in the src folder
    },
  },
  build: {
    // Output directory for everything in the build process
    outDir: 'dist',  // The output directory for both the website and widget builds
    
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'), // Main entry point for the website
      output: {
        // Configure the output filenames for the website build
        entryFileNames: 'website/[name].[hash].js', // Put website JS files in 'website' subfolder
        chunkFileNames: 'website/[name].[hash].js',  // Put chunks in 'website' subfolder
        assetFileNames: 'website/[name].[hash].[ext]', // Put assets in 'website' subfolder
      },
    },
    
    // For building the chatbot widget as a library
    lib: {
      entry: path.resolve(__dirname, 'src/chatbot-widget.jsx'), // Chatbot widget entry point
      name: 'ChatbotWidget', // Global name for the widget
      fileName: (format) => `chatbot-widget.${format}.js`, // Output file names
      formats: ['umd', 'es'], // Formats for the widget (UMD and ES)
    },
  },
});



