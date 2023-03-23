import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'xiaocheng',
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/Hell-World/' : '/',
  // runtimePublicPath: {},
});
