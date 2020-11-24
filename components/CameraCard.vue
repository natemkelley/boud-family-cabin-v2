<template>
  <div class="camera-card" @click="cardClick">
    <div class="camera-img">
      <img :src="card.src" />
    </div>
    <div class="camera-label">
      <NateIcons
        class="camera-label-icon"
        :icon="card.icon || 'solitude'"
        :size="20"
        color="black"
      />
      {{ card.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { CardData } from "~/config/camera";
import NateIcons from "@/components/NateIcons.vue";

@Component({ components: { NateIcons } })
export default class CameraCard extends Vue {
  @Prop() card: CardData;

  @Emit("cardClick")
  cardClick() {
    return this.card;
  }
}
</script>

<style lang="scss">
.camera {
  &-card {
    max-width: 50vh;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 25px;
    overflow: hidden;
    transition: 0.15s all ease;
    position: relative;
    &:hover {
      transform: scale(0.9);
    }
  }
  &-img {
    margin-top: -16px;
    width: 100%;
    height: 100%;
    min-height: 29vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;
    img {
      width: 100%;
    }
  }

  &-label {
    width: 100%;
    color: black;
    font-size: 16px;
    padding: 7.5px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.75),
      rgb(255, 255, 255)
    );
    text-transform: uppercase;
    &-icon {
      margin-right: 7.5px;
    }
  }
}

.camera-card {
}
</style>
