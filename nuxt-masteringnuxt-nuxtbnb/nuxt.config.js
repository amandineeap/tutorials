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
  modules: ['~/modules/auth', '~/modules/algolia'],
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
    },
    algolia:{
      appId : "Y8FIN6RMEZ",
      key : "04ffd36c08ca41539b0971eab04ca5e5"
    }
  },
  privateRuntimeConfig: {
    algolia: {
      appId : "Y8FIN6RMEZ",
      key: '010cf1f480dd3f8984cb7fadabd60db3'
    }
  }
};
