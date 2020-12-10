<template>
  <div>
    <ZoomCenterTransition class="test" group :duration="750" :delay="150">
      <InfoCard v-for="card in cards" :key="card.uuid" :card="card" @deleteClicked="toggleCardToDelete"></InfoCard>
    </ZoomCenterTransition>

    <div ref="loading" class="loading-box"></div>

    <vs-dialog width="350px" not-center v-model="showModal">
      <template #header>
        <h3 class="not-margin">
          What to delete <b>{{ cardToDelete && cardToDelete.title }}</b
          >?
        </h3>
      </template>

      <div class="content">
        <p>
          Choose an option below
        </p>
      </div>

      <template #footer>
        <div class="footer">
          <vs-button danger size="xl" gradient flat @click="deleteCard">
            Delete Card
          </vs-button>
          <vs-button size="xl" @click="cardToDelete = null" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Emit, Prop } from 'vue-property-decorator';
import { infoCardsCollection, InfoCard } from '@/config/firebaseConfig';
import InfoCardComponent from '@/components/Info/InfoCard.vue';
import { FadeTransition, ZoomCenterTransition } from 'vue2-transitions';
import { firebaseTimestampToDate } from '@/config/firebaseConfig';

@Component({
  components: {
    InfoCardComponent,
    ZoomCenterTransition,
  },
})
export default class ViewInfoCards extends Vue {
  @Prop() cards: InfoCard[];

  cardToDelete: InfoCard | null = null;

  get showModal() {
    return Boolean(this.cardToDelete);
  }

  toggleCardToDelete(card: InfoCard) {
    this.cardToDelete = card;
  }

  deleteCard() {
    this.$fireStore
      .collection(infoCardsCollection)
      .doc(this.cardToDelete?.uuid)
      .update({ active: false });

    this.cardToDelete = null;
  }
}
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: flex-end;
}

.loading-box {
  max-height: 50px;
}
</style>
