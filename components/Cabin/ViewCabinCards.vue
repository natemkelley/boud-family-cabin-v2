<template>
  <div>
    <ZoomCenterTransition group :duration="750" :delay="150">
      <CabinCard
        v-for="card in cabinCards"
        :key="card.uuid"
        :card="card"
        @deleteClicked="toggleCardToDelete"
      ></CabinCard>

      <CabinCard
        v-if="!cabinCards.length"
        key="alert"
        :danger="true"
        :card="alertCard"
        :canShowDelet="false"
        @deleteClicked="toggleCardToDelete"
      ></CabinCard>
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
import { cabinCardsCollection, CabinCard } from '@/config/firebaseConfig';
import CabinCardComponent from '@/components/Cabin/CabinCard.vue';
import { FadeTransition, ZoomCenterTransition } from 'vue2-transitions';

@Component({
  components: {
    CabinCardComponent,
    ZoomCenterTransition,
  },
})
export default class ViewCabinCards extends Vue {
  @Prop() cabinCards: CabinCard[];

  cardToDelete: CabinCard | null = null;

  alertCard = {
    title: 'No information added',
    info: `Please use the "+" button below to add some information!`,
  };

  get showModal() {
    return Boolean(this.cardToDelete);
  }

  toggleCardToDelete(card: CabinCard) {
    this.cardToDelete = card;
  }

  deleteCard() {
    this.$fireStore
      .collection(cabinCardsCollection)
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
