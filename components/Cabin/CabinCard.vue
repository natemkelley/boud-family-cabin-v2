<template>
  <div class="card" @click.prevent.stop="cardClickToggle">
    <div class="header">
      <h2>{{ card.title }}</h2>
      <div class="date">{{ formattedDate(card.date) }}</div>
    </div>
    <div class="textarea">{{ card.info }}</div>

    <transition name="bounce">
      <vs-button
        v-show="cardClicked"
        @click.prevent.stop="deleteButtonClicked"
        class="delete"
        danger
        gradient
        circle
        icon
        floating
      >
        <NateIcons icon="garbage" color="white" :gradient="false" :size="18" />
      </vs-button>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Emit, Prop } from "vue-property-decorator";
import { CabinCards } from "@/config/firebaseConfig";
import moment from "moment";

@Component({})
export default class ViewCabinCards extends Vue {
  @Prop() card: CabinCards;

  cardClicked = false;

  cardClickToggle() {
    this.cardClicked = !this.cardClicked;
  }

  @Emit("deleteClicked")
  deleteButtonClicked() {
    this.cardClicked = false;
    return this.card;
  }

  formattedDate(date: Date) {
    return moment(date).format("ll");
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  &:not(:first-child) {
    margin-top: 15px;
  }
  .date {
    color: rgba(var(--vs-primary));
  }
  .delete {
    position: absolute;
    right: -20px;
    top: -15px;
  }
}
</style>
