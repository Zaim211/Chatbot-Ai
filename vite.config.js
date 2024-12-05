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
    'process.env': {}, // This will define process.env as an empty object, preventing the error
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for imports
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/chatbot-widget.jsx'),
      name: 'ChatbotWidget',
      fileName: (format) => `chatbot-widget.${format}.js`,
      formats: ['umd', 'es'], // UMD for global scope, ES for modern imports
    },
    outDir: 'dist', // The folder where both the widget and website will be bundled
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'), // Your website's entry point
        widget: path.resolve(__dirname, 'src/chatbot-widget.jsx'), // The widget entry point
      },
      output: {
        // Disable inline dynamic imports to resolve conflict
        inlineDynamicImports: false,
        entryFileNames: '[name].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      },
    },
  },
});
