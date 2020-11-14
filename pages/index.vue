<template>
  <div>
    {{ test }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class IndexPage extends Vue {
  test = "this the index page";
}
</script>
