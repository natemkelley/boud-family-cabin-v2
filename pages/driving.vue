<template>
  <div class="swiper-ind">
    <SwiperCard
      class="initial-card"
      @slideChange="slideChange"
      :cardData="cameraData"
    />
    <MapCard class="second-card" />
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
}

.second-card {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
