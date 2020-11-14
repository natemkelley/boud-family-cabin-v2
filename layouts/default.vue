<template>
  <div class="default">
    <Nuxt class="container" />
    <Navigation />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";

@Component({ components: { Navigation } })
export default class defaultLayout extends Vue {
  test = "this the navigation";
}
</script>

<style lang="scss" scoped>
.default,
.container {
  height: 100%;
  position: relative;
}

.default {
  min-height: 100vh;
  overflow-x: hidden;
}
</style>
