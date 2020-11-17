<template>
  <div class="swiper-ind">
    <SwiperCard
      class="initial-card"
      @slideChange="slideChange"
      :cardData="cameraData"
    />
    <MapCard />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SwiperCard from "@/components/SwipeCard.vue";
import MapCard from "@/components/MapCard.vue";
import { getCameraData } from "@/config/camera.ts";
import CameraCard from "@/components/CameraCard.vue";

@Component({ components: { SwiperCard, MapCard } })
export default class DrivingPage extends Vue {
  cameraData = getCameraData();
  activeCamera: CameraCard | null = null;

  slideChange(card: CameraCard) {
    this.activeCamera = card;
  }
}
</script>

<style lang="scss" scoped>
.swiper-ind {
  margin-left: -24px;
  margin-right: -24px;
}

.initial-card {
  padding-top: 20px;
}
</style>
