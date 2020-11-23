<template>
  <div class="webcam-card" @click="onCardClicked">
    <div class="webcam-img">
      <img :src="webcamImage" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import moment from "moment";
@Component({ components: {} })
export default class WebcamCard extends Vue {
  @Prop() webcam: any;

  cardClicked = false;

  get webcamImage() {
    return this.webcam.ThumbnailUrl;
  }

  get webcamFullRes() {
    return this.webcam.FullImageUrl;
  }

  onCardClicked() {
    this.cardClicked = !this.cardClicked;
  }
}
</script>

<style scoped lang="scss">
.webcam {
  position: relative;
  &-card {
    max-width: 50vh;
    width: 100%;
    height: 95%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 25px;
    overflow: hidden;
    transition: 0.15s all ease;
  }
  &-img {
    width: 425px;
    height: 250px;
    min-height: 29vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    position: relative;
    img {
      width: 100%;
      display: block;
    }
  }

  &-label {
    position: absolute;
    top: 10px;
    right: 59px;
    text-transform: uppercase;
    padding: 3px 15px;
    opacity: 0.95;
  }
}

.webcam-card {
  &:hover {
    transform: scale(0.98);
  }
}
</style>
