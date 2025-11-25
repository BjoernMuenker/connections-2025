export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  components: { global: false },
  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt', '@nuxtjs/supabase', '@formkit/nuxt'],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: {
        lang: 'de',
      },
      meta: [
        { charset: 'utf-8' },
        {
          hid: 'viewport',
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          hid: 'apple-mobile-web-app-title',
          name: 'apple-mobile-web-app-title',
          content: `Kompass`,
        },
        {
          hid: 'application-name',
          name: 'application-name',
          content: `Connection 2025`,
        },
        {
          hid: 'msapplication-TileColor',
          name: 'msapplication-TileColor',
          content: '#fff',
        },
        {
          hid: 'description',
          name: 'description',
          content: `Eine digitale Karte voller Erinnerungen und Empfehlungen deiner Freunde.`,
        },
        { hid: 'og:title', property: 'og:title', content: `Happy Birthday!` },
        {
          hid: 'og:description',
          property: 'og:description',
          content: `Eine digitale Karte voller Erinnerungen und Empfehlungen deiner Freunde.`,
        },
        { hid: 'og:image', property: 'og:image', content: 'https://www.patricks-kompass.de/meta/open-graph-image.png' },
        { hid: 'og:image:width', property: 'og:image:width', content: '1200' },
        { hid: 'og:image:height', property: 'og:image:height', content: '630' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'https://www.patricks-kompass.de/meta/twitter-image.png' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: ``,
        },
        { hid: 'twitter:image', name: 'twitter:image', content: '' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/meta/favicon.ico',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/meta/favicon-16x16.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/meta/favicon-32x32.png',
        },
        {
          rel: 'apple-touch-icon',
          type: 'image/png',
          sizes: '180x180',
          href: '/meta/apple-touch-icon.png',
        },
      ],
      title: 'Hohoho 2025',
      titleTemplate: `%s | Hohoho 2025`,
    },
  },
  vite: {
    resolve: {
      alias: {
        '@googlemaps/js-api-loader': '@googlemaps/js-api-loader/dist/index.mjs',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: '@use "sass:map"; @use "sass:math"; @import "@/assets/scss/global-inject.scss";',
          silenceDeprecations: ['import', 'global-builtin', 'color-functions'],
        },
      },
    },
  },
  css: ['@/assets/scss/global-once.scss'],
  supabase: {
    redirectOptions: {
      login: '',
      callback: '',
      exclude: ['*'],
      saveRedirectToCookie: false,
    },
    types: './types/database.types.ts',
  },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_BUILD_ID: process.env.NUXT_PUBLIC_BUILD_ID || '6925efbb0fd3c500086a6114',
      NUXT_PUBLIC_BUILD_TIMESTAMP: process.env.NUXT_PUBLIC_BUILD_TIMESTAMP || '25.11.2025 11:33',
      NUXT_PUBLIC_BUILD_GIT_TAG: process.env.NUXT_PUBLIC_BUILD_GIT_TAG || '1.0',
    },
  },
});
