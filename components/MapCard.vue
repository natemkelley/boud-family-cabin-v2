<template>
  <div>
    <GmapMap
      ref="map"
      :center="center"
      :options="options"
      style="width: 100%; height: 300px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({ components: {} })
export default class MapCard extends Vue {
  markers = [];

  mapTypeControl = false;

  options = {
    zoom: 11.5,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  center = { lat: 40.63661, lng: -111.699347 };

  mounted() {}
}
</script>
