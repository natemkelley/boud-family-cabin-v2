<template>
  <div>
    <swiper ref="mySwiper" class="swiper" :options="swiperOption">
      <swiper-slide>
        <WebcamCard
          :webcam="{
            ThumbnailUrl:
              'https://s3.amazonaws.com/assets.quicktrax.com/solitude/webcams/roundhouse',
          }"
        />
      </swiper-slide>

      <swiper-slide v-for="(card, index) in cards" :key="index + 'cam'">
        <SwiperYoutube :src="card.src" />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
import SwiperYoutube from "@/components/SwiperYoutube.vue";
import WebcamCard from "@/components/Solitude/WebcamCard.vue";

@Component({ components: { Swiper, SwiperSlide, SwiperYoutube, WebcamCard } })
export default class SwipeWebcamCard extends Vue {
  @Prop() webcams: any;

  get cards() {
    return this.webcams as any;
  }

  swiperOption = {
    slidesPerView: "auto",
    spaceBetween: 10,
    centeredSlides: true,
    loop: false,
    autoHeight: false,
  };
}
</script>

<style lang="scss"></style>

<style lang="scss">
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
  max-width: 85vw;
}
</style>
