<template>
  <div class="camera youtube-video" @click="cardClicked">
    <youtube
      class="youtube-video-video"
      :video-id="src"
      ref="youtube"
      :fitParent="true"
      :resize="true"
      @playing="onPlaying"
      @paused="onPause"
      @ready="onReady"
    ></youtube>
    <div class="camera-label">
      {{ card.label }}
    </div>
  </div>
</template>

<script lang="ts">
import VueYoutube from "vue-youtube";
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { CardData } from "@/config/camera";

Vue.use(VueYoutube);

@Component({ components: {} })
export default class SwiperYoutube extends Vue {
  @Prop() card: CardData;
  @Prop() cardBeingShown: CardData;

  playing = false;
  videoReady = false;

  onPlaying() {
    this.playing = true;
  }

  onPause() {
    this.playing = false;
  }

  onReady() {
    this.videoReady = true;
  }

  get src() {
    return this.card.src;
  }

  get isShownCard() {
    return this.cardBeingShown && this.cardBeingShown.id === this.card.id;
  }

  get player() {
    return this.$refs.youtube.player;
  }

  async playVideo() {
    await this.player.playVideo();
  }

  async pauseVideo() {
    await this.player.pauseVideo();
  }

  cardClicked() {
    this.playing ? this.pauseVideo() : this.playVideo();
  }

  @Watch("isShownCard")
  onisShownCard() {
    this.isShownCard ? this.playVideo() : this.pauseVideo();
  }
}
</script>

<style lang="scss">
.youtube-video {
  border-radius: 25px;
  overflow: hidden;
  height: 100%;
  background: rgb(65, 65, 65);
  display: flex;
  align-items: center;
  position: relative;
  iframe,
  object,
  embed {
    pointer-events: none;
    width: 100%;
  }

  &-video {
    margin-bottom: 25px;
  }

  .camera-label {
    position: absolute;
    bottom: 0;
  }
}
</style>
