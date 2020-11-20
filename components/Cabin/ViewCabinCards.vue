<template>
  <div>
    <transition name="bounce">
      <CabinCard
        v-for="card in cabinCards"
        :key="card.uuid"
        :card="card"
        @deleteClicked="toggleCardToDelete"
      ></CabinCard>

      <div v-if="!cabinCards.length">Nothing to see here...</div>
    </transition>

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
          <vs-button warn gradient flat @click="deleteCard">
            Delete Card
          </vs-button>
          <vs-button @click="cardToDelete = null" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Emit, Prop } from "vue-property-decorator";
import { cabinCardsCollection, CabinCards } from "@/config/firebaseConfig";
import CabinCard from "@/components/Cabin/CabinCard.vue";

@Component({ components: { CabinCard } })
export default class ViewCabinCards extends Vue {
  @Prop() cabinCards: CabinCards[];

  cardToDelete: CabinCards | null = null;

  get showModal() {
    return Boolean(this.cardToDelete);
  }

  toggleCardToDelete(card: CabinCards) {
    this.cardToDelete = card;
  }

  deleteCard(card: CabinCards) {
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
