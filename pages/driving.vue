<template>
  <div class="swiper-ind">
    <SwiperCard @cardClick="cardClick" :cardData="cameraData" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SwiperCard from "@/components/SwipeCard.vue";
import { getCameraData } from "@/config/camera.ts";

@Component({ components: { SwiperCard } })
export default class DrivingPage extends Vue {
  cameraData = getCameraData();

  cardClick() {}
}
</script>

<style lang="scss" scoped>
.swiper-ind {
  margin-left: -24px;
  margin-right: -24px;
}
</style>
