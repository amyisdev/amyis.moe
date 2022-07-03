import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/color-mode', ['unplugin-icons/nuxt']],

  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'stylesheet', href: 'https://rsms.me/inter/inter.css' },
      ],

      title: 'Home',
      titleTemplate: "%s - Amy's Lab",
    },
  },

  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  colorMode: {
    classSuffix: '',
    storageKey: 'color-mode',
  },

  css: ['~/assets/index.css'],

  nitro: {
    preset: 'vercel',
  },

  ssr: false,

  typescript: {
    shim: false,
    strict: true,
  },

  vueuse: {
    ssrHandlers: true,
  },
});
