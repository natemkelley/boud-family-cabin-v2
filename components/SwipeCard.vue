<template>
  <div>
    <swiper
      ref="mySwiper"
      class="swiper"
      :options="swiperOption"
      @slideChange="slideChange"
    >
      <swiper-slide class="test" v-for="card in cardData" :key="card.id">
        <component
          :is="createCameraCard(card)"
          :card="card"
          :cardBeingShown="cardBeingShown"
          @cardClick="cardClicked"
        />
      </swiper-slide>
    </swiper>
    <transition name="page">
      <ImageModal
        v-if="showModal"
        :card="imageModalCard"
        @closeModal="toggleModal(false)"
      />
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import CameraCard from "@/components/CameraCard.vue";
import { CardData } from "@/config/camera";
import ImageModal from "@/components/imageModal.vue";
import YouTubeCard from "@/components/SwiperYoutube.vue";

import "swiper/swiper-bundle.min.css";

@Component({
  components: {
    Swiper,
    SwiperSlide,
    CameraCard,
    ImageModal,
    YouTubeCard,
  },
})
export default class SwipeCard extends Vue {
  @Prop() cardData: CardData[];
  @Prop() activeCamera: CardData;

  imageModalCard: CardData | null = null;
  showModal = false;
  cardBeingShown: CardData | null = null;

  swiperOption = {
    slidesPerView: "auto",
    spaceBetween: 15,
    centeredSlides: true,
    loop: false,
    autoHeight: false,
  };

  createCameraCard(card: CardData) {
    if (card.isVideo) {
      return YouTubeCard;
    }
    return CameraCard;
  }

  slideTo(number: number) {
    if (this.$refs.mySwiper) {
      const swiper = (this.$refs.mySwiper as any).$swiper;
      swiper.slideTo(number, 550, false);
    }
  }

  cardClicked(cardData: CardData | null) {
    this.imageModalCard = cardData;
    this.toggleModal(true);
  }

  toggleModal(show: boolean) {
    this.showModal = show;
  }

  mounted() {
    const startingIndex = 0;
    this.imageModalCard = this.cardData[startingIndex];
    this.slideChange({ realIndex: startingIndex });
  }

  @Emit("slideChange")
  slideChange(data: any) {
    const { realIndex } = data;
    this.cardBeingShown = this.cardData[realIndex];
    return this.cardData[realIndex];
  }

  @Watch("activeCamera")
  activeCameraChange() {
    const cardIndex = this.activeCamera.id;
    this.slideTo(cardIndex - 1);
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
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  max-width: 85vw;
  flex-direction: column;
}
</style>
