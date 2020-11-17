import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

const myKey = `${process.env.googleMapsKey}`;

Vue.use(VueGoogleMaps, {
  load: {
    key: myKey,
    libraries: "places",
  },
});
