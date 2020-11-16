<template>
  <div>
    <swiper class="swiper" :options="swiperOption" @slideChange="slideChange">
      <swiper-slide v-for="card in cardData" :key="card.id">
        <CameraCard :card="card" @cardClick="cardClicked" />
      </swiper-slide>
    </swiper>
    <transition name="page">
      <ImageModal
        v-if="activeCard"
        :card="activeCard"
        @cardClick="cardClicked"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import CameraCard from "@/components/CameraCard.vue";
import "swiper/swiper-bundle.min.css";
import { CardData } from "@/config/camera";
import ImageModal from "@/components/imageModal.vue";

@Component({
  components: {
    Swiper,
    SwiperSlide,
    CameraCard,
    ImageModal,
  },
})
export default class SwipeCard extends Vue {
  @Prop() cardData: CardData;

  activeCard: CardData | null = null;

  swiperOption = {
    slidesPerView: "auto",
    spaceBetween: -10,
    centeredSlides: true,
    loop: false,
    autoHeight: true,
  };

  slideTo(number: number) {
    const swiper = (this.$refs.mySwiper as any).$swiper;
    swiper.slideTo(number, 1000, false);
  }

  cardClicked(cardData: CardData | null) {
    this.activeCard = cardData;
  }

  @Emit("slideChange")
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
  width: 95%;
  max-width: 350px;
}
</style>
