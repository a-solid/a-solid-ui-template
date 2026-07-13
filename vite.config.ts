import path from 'node:path'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // base: 构建后所有资源 URL 前缀。
  //  - 默认 '/'        → A 模式（独立部署，丢 nginx 根目录）
  //  - BASE_URL=/ui/   → B 模式（塞进 Spring Boot，带 context-path）
  base: process.env.BASE_URL ?? '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // outDir: 产物输出目录。
    //  - 默认 'dist' → A 模式
    //  - OUT_DIR=... → B 模式直落后端 static 目录
    outDir: process.env.OUT_DIR ?? 'dist',
    emptyOutDir: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    css: true,
  },
})
