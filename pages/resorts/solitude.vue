<template>
  <div>
    {{ test }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ResortPage extends Vue {
  @Prop(Number) readonly propA: number | undefined;

  test = "this the solitude page";
}
</script>
