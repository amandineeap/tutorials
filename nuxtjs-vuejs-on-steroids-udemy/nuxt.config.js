export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxtjs-vuejs-on-steroids-udemy",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
      }
    ]
  },

  // Customize loading bar
  // loading: {
  //   color: "#ffffff",
  //   height: "4px",
  //   duration: 5000
  // },

  // loadingIndicator: {
  //   name: "circle",
  //   color: "#fa923f"
  // },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/styles/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  // Things to reuse throughout the app and set once
  plugins: ["~plugins/core-components.js", "~plugins/date-filter.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  // Add extra third party functionalities
  modules: ["@nuxtjs/axios"],
  axios: {
    baseURL:
      process.env.BASE_URL ||
      "https://nuxtjs-vuejs-on-steroid-default-rtdb.europe-west1.firebasedatabase.app",
    credentials: false
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Environment variables
  env: {
    baseUrl:
      process.env.BASE_URL ||
      "https://nuxtjs-vuejs-on-steroid-default-rtdb.europe-west1.firebasedatabase.app",
    fbAPIKey: "AIzaSyDS5p3BxYj3xqkk5r68MIva_Tz3_zHDnys"
  },

  // router: {
  //   // extendRoutes(routes, resolve) {
  //   //   routes.push({
  //   //     path: "*",
  //   //     component: resolve(__dirname, "pages/index.vue")
  //   //   });
  //   // }
  //   linkActiveClass: "active"
  // }

  transition: {
    name: "fade",
    mode: "out-in"
  }
};
