<template>
  <div class="cabin">
    <div v-if="!isLoggedIn && hasLoaded" class="card">
      <div class="header"><h2>ATTENTION</h2></div>
      <div class="text">
        You must be logged in and approved to view this page.
      </div>
      <div class="sign-in">
        <vs-button @click="signInWithGoogle" size="xl" gradient block>
          <img :src="GoogleIcon" /> SIGN WITH GOOGLE
        </vs-button>
      </div>
    </div>

    <ViewCabinCards v-if="hasLoaded" :cabinCards="cabinCards" />

    <AddCardModal v-if="hasLoaded" :active.sync="openModal" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";
import GoogleIcon from "assets/logos/google-white.png";
import AddCardModal from "@/components/Cabin/AddCard.vue";
import ViewCabinCards from "@/components/Cabin/ViewCabinCards.vue";
import { cabinCardsCollection, CabinCards } from "@/config/firebaseConfig";

const auth = namespace("auth");

@Component({ components: { AddCardModal, ViewCabinCards } })
export default class CabinPage extends Vue {
  @auth.State("user") user: any;
  @auth.Getter("isLoggedIn") isLoggedIn: boolean;

  GoogleIcon = GoogleIcon;
  openModal = false;
  cabinCards: CabinCards[] = [];
  loading: any = {};

  get hasLoaded() {
    return !this.loading.isVisible;
  }

  signInWithGoogle() {
    var provider = new this.$fireAuthObj.GoogleAuthProvider();

    this.$fireAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.credential);
      })
      .catch((error) => {});
  }

  signOut() {
    this.$fireAuth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("signout");
      })
      .catch(function(error) {
        // An error happened.
      });
  }

  mounted() {
    this.loading = this.$vs.loading({
      target: this.$refs.loading,
      scale: "1.5",
      background: "primary",
      opacity: 0.001,
      color: "#fff",
    });

    this.$fireStore
      .collection(cabinCardsCollection)
      .where("active", "==", true)
      .onSnapshot((data) => {
        this.cabinCards =
          (data.docs.map((doc) => doc.data()) as CabinCards[]) || [];
        this.loading.close();
      });
  }
}
</script>

<style scoped lang="scss">
.cabin {
  min-height: 75vh;
}

.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
