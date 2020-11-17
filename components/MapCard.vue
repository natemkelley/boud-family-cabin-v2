<template>
  <div>
    <div class="map-card">
      <GmapMap
        ref="map"
        :center="center"
        :options="options"
        :style="computedMapStyle"
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
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({ components: {} })
export default class MapCard extends Vue {
  markers = [];

  mapTypeControl = false;

  options = {
    zoom: 11,
    zoomControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  center = { lat: 40.63661, lng: -111.699347 };

  get computedMapStyle() {
    return { width: "100%", height: "400px" };
  }

  mounted() {}
}
</script>

<style lang="scss" scoped>
.map-card {
  width: 85%;
  border-radius: 25px;
  overflow: hidden;
  max-width: 320px;
}
</style>
