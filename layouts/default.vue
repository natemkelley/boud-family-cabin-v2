<template>
  <div class="default">
    <Nuxt class="container" :nuxt-child-key="key" />
    <Navigation />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Navigation from "@/components/Navigation.vue";

@Component({ components: { Navigation } })
export default class defaultLayout extends Vue {
  get key() {
    return this.$nuxt.$route.path;
  }
}
</script>

<style lang="scss" scoped>
.default,
.container {
  height: 100%;
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  padding-bottom: 120px; //TODO
}

.container {
  padding: 15px;
}
</style>
