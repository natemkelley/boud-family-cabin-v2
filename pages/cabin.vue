<template>
  <div class="cabin">
    Cabin Page

    <div class="settings">
      <vs-input class="input" type="number" v-model="imageNum" label="Number of Images" />
      <vs-switch v-model="showSettings">meta</vs-switch>
    </div>

    <div class="cabin-card-container">
      <CabinCard
        v-for="card in images"
        :key="card.path"
        :card="card"
        :showSettings="showSettings"
        @imageRefresh="imageRefresh"
      >
      </CabinCard>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { apiURL, getCabinImages } from '@/config/cabinCameraApi';
import CabinCard from '@/components/Cabin/CabinCard.vue';

@Component({ components: { CabinCard } })
export default class CabinPage extends Vue {
  images = [];
  imageNum = 1;
  showSettings = false;

  async imageRefresh(card: any) {
    console.log(card);
  }

  created() {
    this.getImages();
  }

  @Watch('imageNum')
  async getImages() {
    const cameras = await getCabinImages(this.imageNum);

    this.images = cameras.reduce((accumulator: any, camera: any) => {
      return [...accumulator, ...camera.images];
    }, []);

    console.log(this.images);
  }
}
</script>

<style lang="scss" scoped>
.cabin-card-container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.cabin {
  margin-bottom: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .input {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}

.settings {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
</style>
