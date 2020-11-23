<template>
  <div class="brighton-page">
    <SwipeWebcamCard :webcams="webcamCards" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SwipeWebcamCard from "@/components/Brighton/SwipeWebcamCard.vue";
@Component({ components: { SwipeWebcamCard } })
export default class ResortPage extends Vue {
  @Prop(Number) readonly propA: number | undefined;

  test = "this the brighton page";

  webcamCards = [
    { src: "https://www.youtube.com/embed/YDyBL3bXOwA" },
    { src: "https://www.youtube.com/embed/7-fShR1SuEU" },
  ];
}
</script>

<style scoped lang="scss">
.brighton-page {
  margin-left: -24px;
  margin-right: -24px;
  margin-bottom: 114px;
}
</style>
