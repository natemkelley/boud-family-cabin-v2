<template>
  <div class="swiper-ind">
    <SwiperCard
      class="initial-card"
      @slideChange="slideChange"
      :cardData="cameraData"
    />
    <div class="second-card">
      <MapCard class="center-card" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SwiperCard from "@/components/SwipeCard.vue";
import MapCard from "@/components/MapCard.vue";
import { CardData, getCameraData } from "@/config/camera.ts";

@Component({ components: { SwiperCard, MapCard } })
export default class DrivingPage extends Vue {
  cameraData = getCameraData();
  activeCamera: CardData | null = null;

  slideChange(card: CardData) {
    this.activeCamera = card;
  }
}
</script>

<style lang="scss" scoped>
.swiper-ind {
  margin-left: -24px;
  margin-right: -24px;

  display: flex;
  flex-flow: column;
  height: calc(100vh - 63px);
}

.initial-card {
  min-height: 275px;
}

.second-card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex: 1;
  margin-bottom: calc(43px);
}
</style>
