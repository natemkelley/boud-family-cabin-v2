<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SwiperCard from "@/components/SwipeCard.vue";
import CameraCard from "@/components/CameraCard.vue";

@Component({ components: { CameraCard, SwiperCard } })
export default class DrivingPage extends Vue {}
</script>
