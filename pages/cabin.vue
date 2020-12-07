<template>
  <div class="cabin">
    Cabin Page
    {{ JSON.stringify(images) }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { getCabinImages } from '@/config/cabinCameraApi';

@Component({ components: {} })
export default class CabinPage extends Vue {
  images = [];

  async getImages() {
    const images = await getCabinImages();
    console.log(images);

    this.images = images;
  }

  created() {
    this.getImages();
  }
}
</script>

<style lang="scss" scoped></style>
