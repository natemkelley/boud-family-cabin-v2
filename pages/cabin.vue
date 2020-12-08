<template>
  <div class="cabin">
    Cabin Page

    <input type="number" v-model="imageNum" />

    <div v-for="(image, index) in images" :key="index" class="images">
      <img :src="datImages(image)" />
      <div>{{ index }} {{ humanDate(image.creationTime, index) }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { apiURL, getCabinImages } from '@/config/cabinCameraApi';
import moment from 'moment';
@Component({ components: {} })
export default class CabinPage extends Vue {
  images = [];
  imageNum = 1;

  datImages(imageObject: any) {
    return apiURL + imageObject.path;
  }

  humanDate(creationTime: string, index: number) {
    const date = new Date(creationTime);
    return moment(date).format('LLLL');
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
