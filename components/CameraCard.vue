<template>
  <vs-card type="4" class="camera-card">
    <template #title>
      <h3>Pot with a plant</h3>
    </template>
    <template #img>
      <img src="https://vuesax.com/foto2.jpg" alt="" />
    </template>
    <template #text>
      <p v-if="false">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
      </p>
    </template>
    <template #interactions>
      <vs-button class="btn-chat" shadow primary>
        <!--<i class="bx bx-chat"></i>-->
        <span class="span">
          54
        </span>
      </vs-button>
    </template>
  </vs-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class CameraCard extends Vue {
  @Prop(Number) readonly propA: number | undefined;
}
</script>

<style lang="scss" scoped>
.camera-card {
  //width: 90%;
}
</style>
