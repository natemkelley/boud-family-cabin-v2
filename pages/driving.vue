<template>
  <div class="swiper-ind">
    <SwiperCard
      class="initial-card"
      :class="{ 'small-screen': !isLargeScreen }"
      @slideChange="slideChange"
      :cardData="cameraData"
      :activeCamera="activeCamera"
    />
    <div class="second-card">
      <MapCard
        class="center-card"
        :cameraData="cameraData"
        :activeCamera="activeCamera"
        @markerClicked="markerClicked"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import SwiperCard from '@/components/SwipeCard.vue';
import MapCard from '@/components/MapCard.vue';
import { CardData, getCameraData } from '@/config/camera.ts';

const size = namespace('size');

@Component({ components: { SwiperCard, MapCard } })
export default class DrivingPage extends Vue {
  cameraData = getCameraData();
  activeCamera: CardData | null = null;
  @size.Getter('isLargeScreen') isLargeScreen: boolean;

  created() {
    this.activeCamera = this.cameraData[0];
  }

  markerClicked(cardData: CardData) {
    this.activeCamera = cardData;
  }

  slideChange(card: CardData) {
    this.activeCamera = card;
  }
}
</script>

<style lang="scss" scoped>
.swiper-ind {
  display: flex;
  flex-flow: column;
  height: calc(100vh - 63px);
  .small-screen {
    margin-left: -24px;
    margin-right: -24px;
  }
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
