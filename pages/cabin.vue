<template>
  <div class="cabin">
    <div class="settings" ref="settings">
      <div v-if="loadedCameraList" class="select-camera">
        <vs-select class="cabin-select" label="Choose a camera" v-model="cameraSelect">
          <vs-option v-for="option in cameraOptions" :key="option.id" :label="option.name" :value="option.id">
            {{ option.name }}
          </vs-option>
        </vs-select>
      </div>
      <SlideYDownTransition :duration="500" :delay="200">
        <div v-show="cameraSelect" class="cabin-meta">
          <NumberToggle :number.sync="numberOfImages" label="Number of Images" />
          <vs-switch v-model="showSettings">INFO</vs-switch>
        </div>
      </SlideYDownTransition>
    </div>

    <div class="loading-list" key="loading" v-show="!loadedList" ref="loadingList"></div>

    <div v-show="loadedList" class="cabin-card-container">
      <CabinCard v-for="card in images" :key="card.path" :card="card" :showSettings="showSettings" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { SlideYUpTransition, SlideYDownTransition } from 'vue2-transitions';
import { apiURL, getCabinImages, getCameraList } from '@/config/cabinCameraApi';
import CabinCard from '@/components/Cabin/CabinCard.vue';
import NumberToggle from '@/components/shared/NumberToggle.vue';
import { getCameraData } from '~/config';

@Component({ components: { CabinCard, NumberToggle, SlideYUpTransition, SlideYDownTransition } })
export default class CabinPage extends Vue {
  images = [];
  numberOfImages = 1;
  showSettings = false;
  cameraSelect = '';
  loadedCameraList = false;
  loadedList: boolean | null = null;
  cameraList: { name: string; room: string }[] = [];

  get cameraOptions() {
    const defaultOptions = [{ name: 'All Cameras' }];
    return [...defaultOptions, ...this.cameraList].map((camera, index) => ({ name: camera.name, id: index }));
  }

  async getCameraList() {
    const c_loading = this.$vs.loading({
      target: this.$refs.loadingList,
      color: '#fff',
      background: 'dark',
      text: 'getting cameras',
      opacity: 1,
    });
    this.cameraList = await getCameraList();
    c_loading.close();
    this.loadedCameraList = true;
  }

  mounted() {
    this.getCameraList();
  }

  @Watch('loadedList')
  onLoadedListChange() {
    const loading = this.$vs.loading({
      target: this.$refs.loadingList,
      color: '#fff',
      background: 'dark',
      text: 'getting image list',
      opacity: 1,
    });
    if (this.loadedList === true) {
      loading.close();
    }
  }

  @Watch('cameraSelect')
  onCameraSelect() {
    this.getImages();
  }

  @Watch('numberOfImages')
  async getImages() {
    this.loadedList = false;
    const cameras = await getCabinImages(this.numberOfImages);
    this.loadedList = true;

    this.images = cameras.reduce((accumulator: any, camera: any) => {
      return [...accumulator, ...camera.images];
    }, []);
  }
}
</script>

<style lang="scss">
$dark-background: #1e2023;

.cabin {
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .input {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .settings {
    width: 100%;
    background: #1e2023;
    margin-bottom: 10px;
    border-radius: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: 0.5s ease all;

    .select-camera {
      display: flex;
      padding: 0px 15px;
      padding-top: 35px;
      margin-bottom: 16px;
      min-height: 30px;
      .vs-select-content {
        width: 100%;
        max-width: none;
      }
    }
    .cabin-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 15px;
      padding-bottom: 15px;
      padding-top: 20px;
    }

    label {
      font-size: 16px;
      padding-bottom: 13px;
    }
  }

  .loading-list {
    height: 180px;
    width: 100%;
    border-radius: 20px;
    background: none;
    position: relative;
  }
}

.cabin-card-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.cabin-select,
.cabin-meta {
  .vs-select__input,
  .vs-input,
  .vs-switch,
  .off {
    background-color: rgba(20, 20, 23) !important;
    background: rgba(20, 20, 23) !important;
    color: white !important;
  }

  .vs-switch {
    padding: 10px;
    height: 32px;
  }
}

//.vs-select.activeOptions .vs-select__input,
.vs-select.activeOptions .vs-select__chips,
.vs-select__options {
  background: rgba(30, 32, 35) !important;
  &.isHover {
    background: rgb(47, 51, 58) !important;
  }
}

.vs-select__option {
  background: none;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
  &.isHover {
    background: rgba(0, 0, 0, 0.445);
    color: rgba(var(--vs-primary));
  }
}
</style>
