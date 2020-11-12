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
  css: ["vuesax/dist/vuesax.css", "~/assets/css/transitions.css"],

  /* pageTransition: {
    name: "slide-right",
    mode: "out-in",
    beforeEnter(el) {
      console.log("Before enter...", el);
    },
  },*/

  pageTransition: "slide-left",

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ["@/plugins/vuesax"],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    [
      // https://go.nuxtjs.dev/typescript
      "@nuxtjs/style-resources",
      "@nuxt/typescript-build",
      "@nuxtjs/google-fonts",
      "@nuxtjs/dotenv",
      {
        filename: ".env",
      },
    ],
  ],

  styleResources: {
    scss: ["~/assets/css/main.scss"],
  },

  googleFonts: {
    families: {
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
          firestore: true,
          messaging: true,
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
      "mobile-web-app-capable": true,
      mobileApp: true,
      mobileAppIOS: true,
      "apple-mobile-web-app-capable": true,
      name: "Boud Family Cabin",
      description: "An application for the Boud Family Cabin",
      theme_color: "#e64d3c",
      "theme-color": "#e64d3c",
      nativeUI: true,
      appleStatusBarStyle: "black-translucent",
      display: "standalone",
    },
    manifest: {
      short_name: "Boud Cabin",
      name: "Boud Family Cabin",
      background_color: "#e64d3c",
    },
  },
};
