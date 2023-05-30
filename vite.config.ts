import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import type { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [
        AntDesignVueResolver({
          // 参数配置可参考：https://github.com/antfu/unplugin-vue-components/blob/main/src/core/resolvers/antdv.ts
          // 自动引入 ant-design/icons-vue中的图标，需要安装@ant-design/icons-vue
          // resolveIcons: true
          /**
           * 一定要开启importStyle，否则会报错[plugin:vite:import-analysis] Failed to resolve import "ant-design-vue/es/button/style/css" from "src/components/HelloWorld.vue". Does the file exist?
           */
          importStyle: 'less',
        })
      ],
      dts: 'src/components.d.ts',
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/, /[\\/]\.history[\\/]/],
      // types: [{
      //   from: 'vue-router',
      //   names: ['RouterLink', 'RouterView'],
      // }],
    })
  ],
  build: {},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/gateway': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gateway/, ''),
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      },
      '/socket.io': {
        target: 'ws://localhost:5174',
        ws: true
      }
    }
  },
}

export default defineConfig(config)
