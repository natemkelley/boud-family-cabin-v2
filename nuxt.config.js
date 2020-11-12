require("dotenv").config({
  path: ".env",
});

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: "static",

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Boud Family Cabin",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "vuesax/dist/vuesax.css",
    "~/assets/css/transitions.css",
    "~/assets/css/main.scss",
  ],

  loading: {
    name: "folding-cube",
    color: "#d66354",
  },

  pageTransition: {
    name: "slide-left",
    mode: "out-in",
    beforeEnter(el) {
      console.log("Before enter in config...", el);
    },
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["@/plugins/vuesax"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    [
      // https://go.nuxtjs.dev/typescript
      "@nuxt/typescript-build",
      "@nuxtjs/google-fonts",
      "@nuxtjs/dotenv",
      {
        filename: ".env",
      },
    ],
  ],

  googleFonts: {
    families: {
      Roboto: true, //TODO REMOVE
      Poppins: { display: "swap", wght: [100, 400, 700], download: true },
    },
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    [
      "@nuxtjs/firebase",
      {
        config: {
          apiKey: process.env.apiKey,
          authDomain: process.env.authDomain,
          databaseURL: process.env.databaseURL,
          projectId: process.env.projectId,
          storageBucket: process.env.storageBucket,
          messagingSenderId: process.env.messagingSenderId,
          appId: process.env.appId,
          measurementId: process.env.measurementId,
        },
        services: {
          auth: true,
          firestore: true,
          functions: true,
          storage: true,
        },
      },
    ],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  pwa: {
    meta: {
      title: "Boud Cabin",
      name: "Boud Family Cabin",
      mobileApp: true,
      theme_color: process.env.theme,
      mobileAppIOS: true,
      nativeUI: true,
    },
    manifest: {
      name: "Boud Family Cabin",
      short_name: "Boud Cabin",
      description: "An application for the Boud Family Cabin",
      background_color: process.env.theme,
      lang: "en",
    },
  },
};
