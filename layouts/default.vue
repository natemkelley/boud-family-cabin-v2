<template>
  <div class="default">
    <Nuxt class="container" :nuxt-child-key="key" />
    <Navigation class="navigation" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import Navigation from '@/components/Navigation.vue';

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
  max-height: 100vh;
  overflow-x: hidden;
}

.container {
  padding: 25px;
  height: calc(100vh - 100px);
  overflow-y: auto;
}

.navigation {
  position: absolute;
  bottom: 0;
  width: 100%;
  z-index: 500;
}
</style>
