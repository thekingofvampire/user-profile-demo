import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createBlockletPlugin } from 'vite-plugin-blocklet';
import { resolve } from 'path';
// import scss from 'scss';

export default defineConfig(() => {
  return {
    plugins: [vue(), createBlockletPlugin()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    css: {
      css: {
        // css预处理器
        preprocessorOptions: {
          scss: {
            charset: false,
          },
        },
      },
    },
  };
});
