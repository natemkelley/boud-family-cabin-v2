<template>
  <div
    class="camera-card youtube-video"
    :class="{ 'enabled-events': enablePointerEvents }"
  >
    <youtube
      class="youtube-video-video"
      :video-id="card.src"
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
  enablePointerEvents = false;

  get isShownCard() {
    return this.cardBeingShown && this.cardBeingShown.id === this.card.id;
  }

  get player() {
    return this.$refs.youtube.player;
  }

  onPlaying() {
    this.playing = true;
  }

  onPause() {
    this.playing = false;
  }

  onReady() {
    this.videoReady = true;
  }

  startEnablePointerEvents() {
    setTimeout(() => {
      this.enablePointerEvents = false;
    }, 250);
    this.enablePointerEvents = true;
  }

  async playVideo() {
    await this.player.playVideo();
  }

  async pauseVideo() {
    await this.player.pauseVideo();
  }

  cardClicked() {
    //this.playing ? this.pauseVideo() : this.playVideo();
  }

  @Watch("isShownCard")
  onisShownCard() {
    this.isShownCard ? this.playVideo() : this.pauseVideo();
  }

  @Watch("playing")
  onPlayingChange() {
    this.startEnablePointerEvents();
  }
}
</script>

<style lang="scss">
.youtube-video {
  border-radius: 25px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  background: rgb(65, 65, 65);
  display: flex;
  align-items: center;
  position: relative;

  iframe,
  object,
  embed {
    pointer-events: none;
    width: 100%;
    height: 100%;
  }

  &-video {
    margin-bottom: 25px;
  }

  .camera-label {
    position: absolute;
    bottom: 0;
  }
}

.enabled-events {
  pointer-events: all !important;
}
</style>
