<template>
  <div class="image-modal" @click="closeModal">
    <div v-if="card.src" class="image-modal-image">
      <!--TODO ADD LAODER -->
      <PinchZoom :limitZoom="3">
        <img :src="card.src" />
      </PinchZoom>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { CardData } from "~/config/camera";
import PinchZoom from "vue-pinch-zoom";

@Component({ components: { PinchZoom } })
export default class ImageModal extends Vue {
  @Prop() card: CardData;

  src =
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=1950&q=80";

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
  background: rgba(32, 32, 32, 0.75);
  backdrop-filter: blur(10px);
  z-index: 999;
  color: black;

  display: flex;
  justify-content: center;
  align-items: center;

  &-image {
    width: 100%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    min-width: 100vw;
  }
}
</style>
