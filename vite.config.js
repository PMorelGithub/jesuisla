// import { fileURLToPath, URL } from 'url';

// import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue';

// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [vue()],
//     resolve: {
//         alias: {
//             vue: 'vue/dist/vue.esm-bundler.js'
//         }
//     }
// });

import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [vue()],
});
