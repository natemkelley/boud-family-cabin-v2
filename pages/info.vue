<template>
  <div class="info">
    <vs-row justify="center">
      <InfoCard v-if="!isLoggedIn && hasLoaded" color="dark" :canShowDelete="false">
        <div class="header"><h2>ATTENTION</h2></div>
        <div class="text">You must be logged in and <strong>approved</strong> to view this page.</div>
        <div class="sign-in">
          <vs-button @click="signInWithGoogle" size="xl" gradient block>
            <NateIcons class="sign-in-logo" icon="google" :size="21" :gradient="false" color="white" />
            SIGN WITH GOOGLE
          </vs-button>
        </div>
      </InfoCard>

      <InfoCard v-if="cannotViewCards" color="danger" :card="notAuthorizedCard"></InfoCard>

      <InfoCard v-if="showNoInfoCard" color="danger" :card="alertCard" :canShowDelet="false"></InfoCard>

      <ViewInfoCards v-if="canViewCards" :cards="infoCards" />
    </vs-row>

    <AddCardModal v-if="isAuthorized" :active.sync="openModal" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import AddCardModal from '@/components/Info/AddCard.vue';
import ViewInfoCards from '@/components/Info/ViewInfoCards.vue';
import NateIcons from '@/components/NateIcons.vue';
import InfoCardComponent from '@/components/Info/InfoCard.vue';
import { infoCardsCollection, InfoCard, usersCollection } from '@/config/firebaseConfig';
import { isEmpty } from 'lodash';
import { User } from 'store/interfaces';
import moment from 'moment';
import { timeFromNowInMinutes } from '~/helpers';

const auth = namespace('auth');

@Component({ components: { AddCardModal, ViewInfoCards, NateIcons, InfoCardComponent } })
export default class CabinPage extends Vue {
  @auth.State('user') user: User;
  @auth.Getter('isLoggedIn') isLoggedIn: boolean;
  @auth.Getter('isAuthorized') isAuthorized: boolean;
  @auth.Getter('isAdmin') isAdmin: boolean;

  openModal = false;
  calledGetCards = false;
  infoCards: InfoCard[] = [];
  loading: any = {};

  notAuthorizedCard = {
    title: 'Authorization Error',
    info: `You are not authorized to view this page.`,
  };
  alertCard = {
    title: 'No information added',
    info: `Please use the "+" button below to add some information!`,
  };

  get hasLoaded() {
    return !this.loading.isVisible;
  }

  get canViewCards() {
    return this.isLoggedIn && this.isAuthorized && this.hasLoaded;
  }

  get cannotViewCards() {
    return this.isLoggedIn && !this.isAuthorized && this.hasLoaded;
  }

  get showNoInfoCard() {
    return this.hasLoaded && this.isAuthorized && !this.infoCards.length;
  }

  signInWithGoogle() {
    var provider = new this.$fireAuthObj.GoogleAuthProvider();

    this.$fireAuth
      .signInWithPopup(provider)
      .then(result => {
        //console.log(result.credential);
      })
      .catch(error => {});
  }

  signOut() {
    this.$fireAuth.signOut().then(() => {
      console.log('signout');
    });
  }

  closeLoader() {
    this.loading.close();
  }

  getInfoCards() {
    this.calledGetCards = true;

    this.loading = this.$vs.loading({
      target: this.$refs.loading,
      scale: '1.5',
      background: 'primary',
      opacity: 0.001,
      color: '#fff',
    });

    this.$fireStore
      .collection(infoCardsCollection)
      .where('active', '==', true)
      .orderBy('createdAt', 'desc')
      .onSnapshot(data => {
        this.infoCards = data.docs.map(doc => doc.data()) as InfoCard[];
        this.closeLoader();
      });
  }

  beforeMount() {
    if (this.isLoggedIn) this.getInfoCards();
  }

  @Watch('user')
  logUserEntry() {
    if (!isEmpty(this.user)) {
      const showNotification = timeFromNowInMinutes(this.user.lastSeen as Date) >= 5;

      if (showNotification) {
        this.$vs.notification({
          color: 'success',
          position: 'top-center',
          title: 'Welcome Back',
          text: `You are currently logged in as "${this.user.displayName}"`,
        });
      }

      !this.calledGetCards && this.getInfoCards();
    }
  }
}
</script>

<style scoped lang="scss">
.info {
  min-height: 85vh;
}

.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  margin-left: -10px;
  margin-right: -10px;
  &-logo {
    margin-right: 10px;
  }
}
</style>
