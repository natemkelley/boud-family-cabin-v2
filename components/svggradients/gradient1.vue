<template>
  <svg style="position: absolute; width: 0; opacity: 0">
    <defs>
      <linearGradient id="gradient-1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stop-color="#57f0c2" />
        <stop offset="95%" stop-color="#147d58" />
      </linearGradient>
      <linearGradient id="gradient-2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stop-color="#7295c2" />
        <stop offset="95%" stop-color="#252e3d" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Gradient1 extends Vue {}
