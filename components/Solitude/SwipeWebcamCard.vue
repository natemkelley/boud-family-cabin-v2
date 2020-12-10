<template>
  <div>
    <swiper ref="mySwiper" class="swiper" :options="swiperOption">
      <swiper-slide v-for="(card, index) in cards" :key="index + 'web'">
        <WebcamCard :webcam="card" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.min.css';
import WebcamCard from '@/components/Solitude/WebcamCard.vue';
import moment from 'moment';

@Component({ components: { Swiper, SwiperSlide, WebcamCard } })
export default class SwipeWebcamCard extends Vue {
  @Prop() webcams: any;

  get cards() {
    return (this.webcams as any).WebCams;
  }

  swiperOption = {
    slidesPerView: 'auto',
    spaceBetween: 15,
    centeredSlides: true,
    loop: false,
    autoHeight: false,
  };

  lastUpdated(webcam: any) {
    return `Updated at ${moment(webcam.LastUpdate).format('LT')}`;
  }
}
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  max-width: 85%;
}
</style>
