import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from 'path';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProduction = mode === 'production';
  
  return {
    base: '/', // Always use root-relative paths
    
    server: {
      host: "::",
      port: 8080,
      strictPort: true,
      fs: {
        // Allow serving files from one level up from the package root
        allow: ['..'],
      },
    },
    
    publicDir: 'public',
    assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg'],
    // Ensure public assets are copied as-is
    optimizeDeps: {
      exclude: ['**/gallery/*']
    },
    
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./public', import.meta.url)),
      },
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
      minify: 'terser',
      // Copy public directory to dist
      copyPublicDir: true,
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          format: 'esm',
          entryFileNames: 'assets/js/[name]-[hash].js',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const extType = assetInfo.name?.split('.').pop()?.toLowerCase() || '';
            if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'tiff', 'bmp', 'ico'].includes(extType)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            if (extType === 'css') {
              return 'assets/css/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
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
