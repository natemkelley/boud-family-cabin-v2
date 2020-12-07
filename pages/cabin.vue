<template>
  <div class="cabin">
    Cabin Page

    <input type="number" v-model="imageNum" />

    <div v-for="(image, index) in images" :key="index" class="images">
      <img :src="datImages(image)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { getCabinImages } from '@/config/cabinCameraApi';

@Component({ components: {} })
export default class CabinPage extends Vue {
  images = [];
  imageNum = 1;

  datImages(imageObject: any) {
    const url = 'https://boudfamilycabin.duckdns.org';
    return url + imageObject.path;
  }

  created() {
    this.getImages();
  }

  @Watch('imageNum')
  async getImages() {
    const images = await getCabinImages(this.imageNum);
    this.images = images[0].images;
    console.log(this.images);
  }
}
</script>

<style lang="scss" scoped>
.cabin {
  margin-bottom: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .images {
    max-width: 70vw;
    img {
      width: 100%;
    }
  }
}
</style>
