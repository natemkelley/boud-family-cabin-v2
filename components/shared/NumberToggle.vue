<template>
  <div>
    <div class="toggle-container">
      <vs-button class="toggle" icon @click="decrease">
        <NateIcons class="toggle-icon" icon="minus" :size="12" color="white" />
      </vs-button>
      <div class="number">{{ internalNumber }}</div>
      <vs-button class="toggle" icon @click="increase">
        <NateIcons class="toggle-icon" icon="plus" :size="12" color="white" />
      </vs-button>
    </div>
    <div v-if="label" class="label">{{ label }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator';
import { SlideYDownTransition } from 'vue2-transitions';
import NateIcons from '@/components/NateIcons.vue';

@Component({ components: { SlideYDownTransition, NateIcons } })
export default class CabinPage extends Vue {
  @PropSync('number', { type: Number }) internalNumber!: number;
  @Prop() label: string;

  increase() {
    this.internalNumber++;
  }

  decrease() {
    this.internalNumber--;
    if (this.internalNumber <= 0) {
      this.internalNumber = 0;
    }
  }
}
</script>

<style lang="scss" scoped>
.toggle-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgb(20, 20, 23);
  padding: 1.5px 5px;
  min-width: 130px;
  border-radius: 12px;

  .toggle {
    padding: 0px 2px;
    &-icon {
      margin: 0px;
    }
  }

  .number {
    font-weight: bold;
  }
}

.label {
  position: absolute;
  position: absolute;
  transform: translate(6px, -275%);
}
</style>
