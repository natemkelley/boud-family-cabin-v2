<template>
  <div class="image-modal" @click="closeModal">
    <div class="image-modal-image" ref="content" :limitZoom="2">
      <img :src="card.src" @load="imageLoaded" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { CardData } from "~/config/camera";

@Component({ components: {} })
export default class ImageModal extends Vue {
  @Prop() card: CardData;

  //TODO CREATE GALLERY

  loading = null;

  created() {
    this.loading = this.$vs.loading({
      target: this.$refs.content,
      color: "#fff",
      background: "#000",
      scale: 2,
    });
  }

  imageLoaded() {
    //@ts-ignore
    this.loading.close();
  }

  @Emit("closeModal")
  closeModal() {
    return false;
  }
}
</script>

<style lang="scss" scoped>
.image-modal {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(32, 32, 32, 0.65) !important;
  backdrop-filter: blur(10px);
  z-index: 999;
  color: black;

  display: flex;
  justify-content: center;
  align-items: center;

  &-image {
    width: 100%;
    height: 90%;
    display: flex;
    background: none;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0) !important;
  }
  img {
    min-width: 100vw;
  }
}
</style>
