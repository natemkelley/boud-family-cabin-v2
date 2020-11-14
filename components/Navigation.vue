<template>
  <div class="navigation">
    <div class="navigation-primary">
      {{ test }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Navigation extends Vue {
  test = "this the navigation";
}
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  bottom: 0;
  width: 100%;

  &-primary {
    height: 94px;
    background-color: #ffffff;
    border-radius: 25px 25px 0px 0px;
    overflow: hidden;
    box-shadow: 0px -1px 5px #0000001f;
  }
}

.sub-navigation {
}
</style>
