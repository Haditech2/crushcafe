import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  
  return {
    base: isProduction ? '/' : '/',
    
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
    },
    
    preview: {
      port: 8080,
      strictPort: true,
    },
    
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,
      emptyOutDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            vendor: ['@tanstack/react-query'],
          },
        },
      },
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
      })
    ],
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '~': resolve(__dirname, 'public'),
      },
    },
    
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis',
        },
      },
    },
    
    define: {
      'process.env': {},
      __APP_ENV__: env.APP_ENV,
    },
  };
});
