<template>
  <div>
    <vs-dialog v-model="activeSync">
      <template #header>
        <h4 class="not-margin">Add an <b>Info Card</b></h4>
      </template>

      <div class="the-form">
        <vs-input v-model="header" placeholder="Title">
          <template #icon>
            <img src="@/assets/logos/pencil.png" />
          </template>
        </vs-input>

        <div class="test">
          <div
            class="vs-input-parent vs-input-parent--state-null vs-component--primary"
            placeholder="Info"
          >
            <div class="vs-input-content">
              <textarea
                class="vs-input vs-input--has-icon"
                name="Text1"
                cols="40"
                rows="5"
                v-model="textarea"
              ></textarea>

              <label for="Text1" class="vs-input__label">Info</label
              ><span class="vs-input__icon">
                <img src="@/assets/logos/info.png" />
              </span>
              <div class="vs-input__affects">
                <div class="vs-input__affects__1"></div>
                <div class="vs-input__affects__2"></div>
                <div class="vs-input__affects__3"></div>
                <div class="vs-input__affects__4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="addCard" :loading="savingCard" gradient>
            Add Card
          </vs-button>
        </div>
      </template>
    </vs-dialog>

    <svgicon name="plu" color="white"></svgicon>

    <vs-button
      v-show="!active"
      class="add-card-btn"
      size="xl"
      @click="activeSync = !activeSync"
      gradient
      circle
      icon
      floating
    >
      <NateIcons icon="plus" color="white" :gradient="false" :size="18" />
    </vs-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Emit } from "vue-property-decorator";
import NateIcons from "@/components/NateIcons.vue";
import { cabinCardsCollection } from "@/config/firebaseConfig";
import { v4 as uuidv4 } from "uuid";

@Component({ components: { NateIcons } })
export default class AddCard extends Vue {
  @PropSync("active", { type: Boolean }) activeSync!: boolean;

  header = "";
  textarea = "";
  savingCard = false;

  async addCard() {
    this.savingCard = true;

    const uuid = uuidv4();
    const cardData = {
      title: this.header,
      info: this.textarea,
      createdAt: new Date(),
      active: true,
      uuid,
    };

    await this.$fireStore
      .collection(cabinCardsCollection)
      .doc(uuid)
      .set(cardData);

    setTimeout(() => {
      this.activeSync = false;
      this.savingCard = false;
    }, 250);
  }
}
</script>

<style lang="scss">
.not-margin {
  margin: 0;
  padding-top: 12px;
  font-weight: 400;
}

.the-form {
  .vs-input-content {
    margin: 10px 0;
    input,
    textarea {
      width: 100%;
      font-family: "Poppins";
    }
  }
  img,
  svg {
    height: 16px;
  }
}

.add-card-btn {
  position: fixed;
  bottom: 85px;
  right: 21px;
  padding: 10px 10px;
  opacity: 0.9;
  img,
  svg {
    margin: 0 !important;
  }
}
</style>
