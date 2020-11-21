<template>
  <div>
    <iframe
      id="vr-element"
      src="https://maps.ourkin.com/locations/11523/atlasvr/winter?weather=false&amp;toggled=true&amp;toggle[embed]=off"
      data-vr-src="https://maps.ourkin.com/locations/11523/atlasvr/winter?weather=false&amp;toggled=true&amp;toggle[embed]=off"
      allowfullscreen=""
      class="active"
    >
    </iframe>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ResortPage extends Vue {
  @Prop(Number) readonly propA: number | undefined;

  test = "this the brighton page";
}
</script>
