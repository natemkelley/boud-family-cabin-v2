<template>
  <div class="cabin-card" @click.prevent.stop="cardClickToggle">
    <vs-alert gradient shadow :color="cardColor">
      <template #title>
        <div>
          {{ card.title }}
          <div class="date" v-if="card.createdAt">
            {{ formattedDate(card.createdAt) }}
          </div>
        </div>
      </template>
      <div class="textarea">{{ card.info }}</div>
    </vs-alert>

    <transition name="bounce">
      <vs-button
        v-show="cardClicked && canShowDelete"
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
import { Vue, Component, PropSync, Emit, Prop } from 'vue-property-decorator';
import { firebaseTimestampToDate, InfoCard } from '@/config/firebaseConfig';
import moment from 'moment';

@Component({})
export default class ViewInfoCards extends Vue {
  @Prop() card: InfoCard;
  @Prop({ default: true }) canShowDelete: boolean;
  @Prop() color: string;

  cardClicked = false;
  active = true;

  get cardColor() {
    return this.color || this.card.color;
  }

  cardClickToggle() {
    this.cardClicked = !this.cardClicked;
  }

  @Emit('deleteClicked')
  deleteButtonClicked() {
    this.cardClicked = false;
    return this.card;
  }

  formattedDate(date: FirebaseFirestore.Timestamp) {
    const parseDate = firebaseTimestampToDate(date);
    return moment(parseDate).format('ll');
  }
}
</script>

<style lang="scss">
.cabin-card {
  position: relative;
  &:not(:first-child) {
    margin-top: 15px;
  }
  .date {
    font-size: 0.8em;
    margin-top: 10px;
    color: white//rgba(var(--vs-primary));
  }
  .delete {
    position: absolute;
    right: -20px;
    top: -15px;
    z-index: 98;
  }
}
</style>
