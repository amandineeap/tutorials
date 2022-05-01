export default {
  components: true,
  head: {
    titleTemplate: "BNB - %s",
    htmlAttrs: {
      lang: "en",
    },
    bodyAttrs: {
      class: ["my-style"],
    },
    meta: [
      {
        charset: "utf-8",
      },
    ],
  },
  router: {
    prefetchLinks: false,
  },
  plugins: ["~/plugins/maps.client", "~/plugins/dataApi", "~/plugins/auth.client"],
  modules: [],
  buildModules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/sass/app.scss'],
  build: {
    extractCSS: true,
    loaders: {
      limit: 0
    }
  },
  publicRuntimeConfig: {
    auth: {
      cookieName: 'idToken',
      clientId: '157765723100-hhdj1bteito2tpbmjh5uvb2ngi2bth61.apps.googleusercontent.com'
    }
  },
  privateRuntimeConfig: {
  }
};
