import path from "path"

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // port: 8080, // 设置服务启动端口号
    open: true, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      //第一访问地址
      '/api': { //apiTest是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会进到代理来
        target: 'https://api.apiopen.top/', // 需要代理的域名
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace(/^\/api/, ""), //重写匹配的字段，如果不需要放在请求路径上，可以重写为""
      },
      //第二访问地址，以此类推可写多个
      '^/amap/.*': { //apiTest是自行设置的请求前缀，按照这个来匹配请求，有这个字段的请求，就会进到代理来
        target: 'https://restapi.amap.com', // 需要代理的域名
        changeOrigin: true, // 是否跨域
        rewrite: (path) => path.replace(/^\/amap/, ""), //重写匹配的字段，如果不需要放在请求路径上，可以重写为""
      }
    }
  }
})
