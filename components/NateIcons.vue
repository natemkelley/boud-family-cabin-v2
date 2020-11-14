<template>
  <span class="nate-icon" :style="computedStyle">
    <svgicon
      :name="icon"
      :class="{ gradient: gradient }"
      :color="color"
    ></svgicon>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ components: {} })
export default class NateIcons extends Vue {
  @Prop() icon!: string;
  @Prop({ default: 55 }) size: number;
  @Prop({ default: true }) gradient: boolean;
  @Prop({ default: "black" }) color: string;

  get computedStyle() {
    return {
      fontSize: this.size + "px",
    };
  }
}
</script>

<style lang="scss">
.nate-icon {
  font-size: 20px;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.svg {
  &-icon {
    width: 1em;
    display: flex;
    display: flex;
    color: inherit;
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
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.57), rgb(0, 0, 0));
}
</style>
