<template>
  <div class="cabin-card" ref="imageCont">
    <div class="cabin-image" @click.stop.prevent="onImageClicked">
      <img :src="imageSRC" @load="loaded" />
      <div key="timestamp" class="timestamp" :class="{ active: showRefresh }">
        {{ timeStamp }}
      </div>
    </div>
    <transition name="bounce">
      <vs-button key="refresh" v-if="showRefresh" color="primary" gradient class="cabin-refresh" @click="imageRefresh">
        <NateIcons icon="refresh" :size="21" :gradient="false" color="white" />
      </vs-button>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Emit, Prop } from 'vue-property-decorator';
import { apiURL, requestUpdatedImage } from '@/config/cabinCameraApi';
import moment from 'moment';

@Component({})
export default class CabinCard extends Vue {
  @Prop() card: any;

  loading = null;
  showRefresh = false;
  recentImage = null;

  get imageSRC() {
    return apiURL + (this.recentImage || this.card.path);
  }

  get timeStamp() {
    const date = new Date(this.card.creationTime);
    return moment(date).format('lll');
  }

  onImageClicked() {
    this.showRefresh = !this.showRefresh;
  }

  loaded() {
    (this.loading as any).close();
  }

  onLoading(text?: string) {
    this.loading = this.$vs.loading({
      target: this.$refs.imageCont,
      text: text || 'loading',
      type: 'default',
      color: '#fff',
      background: 'primary',
    });
  }

  mounted() {
    this.onLoading();
  }

  humanDate(creationTime: string, index: number) {}

  async imageRefresh() {
    this.onLoading('getting new image');

    try {
      const imageData = await requestUpdatedImage('camera1');
      this.recentImage = imageData.path;
      console.log(imageData);
    } catch {
      alert('something went wrong');
    }
  }
}
</script>

<style lang="scss">
.cabin-card {
  background: none;
  color: rgba(var(--vs-text), 1);
  width: 100%;
  max-width: 850px;
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, var(--vs-shadow-opacity));
  transition: all 0.25s ease;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  min-height: 180px;
  .cabin-image {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;
    border-radius: 20px;
    overflow: hidden;
    img {
      width: 100%;
      display: block;
    }
  }

  .vs-loading {
    z-index: 1;
  }

  .cabin-refresh {
    position: absolute;
    top: 0px;
    right: 2px;
    width: 34px;
    height: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 11.5px;
    overflow: hidden;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.473);
  }

  .timestamp {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    width: 100%;
    background: rgba(30, 32, 35);
    border-radius: 0px 0px 12px 12px;
    opacity: 0;
    padding: 6px;
    transform: translateY(-30px);
    margin-bottom: -36px;
    position: relative;
    z-index: -1;
    transition: 0.25s all ease;
    transition-delay: 400ms all;
  }

  .timestamp.active {
    opacity: 1;

    transform: translateY(0px);
    margin-bottom: 0px;
  }
}
</style>
