<template>
  <swiper class="swiper" :options="swiperOption" @slideChange="slideChange">
    <swiper-slide v-for="i in 4" :key="i">
      <CameraCard />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import CameraCard from "@/components/CameraCard.vue";
import "swiper/swiper-bundle.min.css";

@Component({
  components: {
    Swiper,
    SwiperSlide,
    CameraCard,
  },
})
export default class SwipeCard extends Vue {
  swiperOption = {
    slidesPerView: "auto",
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    autoHeight: true,
  };

  get swiper() {
    return (this.$refs.mySwiper as any).$swiper;
  }

  slideTo(number: number) {
    this.swiper.slideTo(number, 1000, false);
  }

  slideChange(slideData: any) {
    const { activeIndex, realIndex } = slideData;
    console.log("changed", activeIndex);
  }
}
</script>

<style lang="scss">
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 350px;

  //adjust for dumb stuff
  margin-left: -12px;
  margin-right: -12px;
}
</style>
