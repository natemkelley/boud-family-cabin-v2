<template>
  <div class="map-card">
    <GmapMap ref="map" :center="center" :options="options" :style="computedMapStyle">
      <GmapMarker
        :key="index"
        v-for="(m, index) in cameraData"
        :position="createMarker(m)"
        :clickable="true"
        :draggable="false"
        @click="mapMarkerClicked(m)"
      />
    </GmapMap>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { gmapApi } from 'vue2-google-maps';
import { CardData } from '~/config/camera';
import { getStyle } from '~/helpers';

@Component({})
export default class MapCard extends Vue {
  @Prop() cameraData: CardData[];
  @Prop() activeCamera: CardData;

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
    return { width: '100%', height: '100%' };
  }

  get google() {
    return gmapApi;
  }

  createMarker(cardData: CardData) {
    return { lat: cardData.lat, lng: cardData.lon };
  }

  panTo(cardData: CardData) {
    const myLatLng = this.createMarker(cardData);

    //@ts-ignore
    this.$refs.map.$mapPromise.then(map => {
      const currentZoomLevel = map.getZoom();
      const goodZoom = 13;

      map.panTo(myLatLng);

      if (currentZoomLevel < goodZoom) {
        map.setZoom(goodZoom);
      }
    });
  }

  @Emit('markerClicked')
  mapMarkerClicked(cardData: CardData) {
    this.panTo(cardData);
  }

  @Watch('activeCamera')
  activeCameraChange() {
    this.panTo(this.activeCamera);
  }

  async mounted() {
    //@ts-ignore
    const mymap = await this.$refs.map.$mapPromise;
    //@ts-ignore
    const trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(mymap);
  }
}
</script>

<style lang="scss" scoped>
.map-card {
  width: 100%;
  border-radius: 25px;
  overflow: hidden;
  background: rgb(65, 65, 65);
  height: 100%;
}
</style>
