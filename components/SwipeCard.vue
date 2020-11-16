<template>
  <div>
    <swiper class="swiper" :options="swiperOption" @slideChange="slideChange">
      <swiper-slide v-for="card in cardData" :key="card.id">
        <CameraCard :card="card" @cardClick="cardClicked" />
      </swiper-slide>
    </swiper>
    <transition name="page">
      <ImageModal
        v-if="showModal"
        :card="activeCard"
        @closeModal="toggleModal(false)"
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
  @Prop() cardData: CardData[];

  activeCard: CardData | null = null;
  showModal = false;

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
    this.toggleModal(true);
  }

  toggleModal(show: boolean) {
    this.showModal = show;
  }

  created() {
    const startingIndex = 0;
    this.activeCard = this.cardData[startingIndex];
    this.slideChange({ realIndex: startingIndex });
  }

  @Emit("slideChange")
  slideChange({ realIndex }: { realIndex: number }) {
    return this.cardData[realIndex];
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
