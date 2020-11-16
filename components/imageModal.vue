<template>
  <div class="image-modal" @click="closeModal">
    <div class="image-modal-image"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { CardData } from "~/config/camera";

@Component({})
export default class ImageModal extends Vue {
  @Prop() card: CardData;

  @Emit("cardClick")
  closeModal() {
    return null;
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
  background: rgba(32, 32, 32, 0.85);
  backdrop-filter: blur(10px);
  z-index: 999;
  color: black;
}
</style>
