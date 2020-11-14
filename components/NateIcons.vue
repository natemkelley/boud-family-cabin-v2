<template>
  <span class="nate-icon">
    <svgicon
      :name="icon"
      :class="{ gradient: gradient }"
      :width="size"
      :color="color"
    ></svgicon>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: {} })
export default class NateIcons extends Vue {
  @Prop() icon!: string;
  @Prop({ default: "15vw" }) size: string;
  @Prop({ default: true }) gradient: boolean;
  @Prop({ default: "black" }) color: string;
}
</script>

<style lang="scss">
.nate-icon {
  margin: 3px;
}

.svg {
  &--icon {
    color: inherit;
    vertical-align: middle;
    fill: none;
    stroke: currentColor;
  }
  &.svg-fill {
    fill: currentColor;
    stroke: none;
  }
  &-up {
    transform: rotate(0deg);
  }
}

.gradient {
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.62), rgb(0, 0, 0));
}
</style>
