<template>
  <div>
    <div v-for="num in 100" :key="num">
      {{ test }}
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class IndexPage extends Vue {
  test = "this the driving page";
}
</script>
