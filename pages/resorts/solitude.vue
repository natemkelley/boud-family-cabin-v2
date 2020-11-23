<template>
  <div class="solitude-page">
    <SwipeWebcamCard :webcams="solitudeApiWebcams" />
    <SolitudeAlert :alert="solitudeAlert" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {
  getSolitudeInfo,
  SolitudeApi,
  getSolitudeWebcams,
} from "@/config/skiResortApi";
import SwipeWebcamCard from "@/components/Solitude/SwipeWebcamCard.vue";
import SolitudeAlert from "@/components/Solitude/SolitudeAlert.vue";
import moment from "moment";

@Component({ components: { SwipeWebcamCard, SolitudeAlert } })
export default class ResortPage extends Vue {
  solitudeApi = {};
  solitudeApiWebcams = [];

  get solitudeAlert() {
    return this.solitudeApi?.SnowReport?.Report;
  }

  async created() {
    this.solitudeApi = await getSolitudeInfo();
    this.solitudeApiWebcams = await getSolitudeWebcams();
    console.log(this.solitudeApi);
  }
}
</script>

<style scoped lang="scss">
.solitude-page {
  margin-left: -24px;
  margin-right: -24px;
  margin-bottom: 114px;
}
</style>
