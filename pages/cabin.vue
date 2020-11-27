<template>
  <div class="cabin">
    <div v-if="!isLoggedIn && hasLoaded" class="card">
      <div class="header"><h2>ATTENTION</h2></div>
      <div class="text">You must be logged in and <strong>approved</strong> to view this page.</div>
      <div class="sign-in">
        <vs-button @click="signInWithGoogle" size="xl" gradient block>
          <NateIcons class="sign-in-logo" icon="google" :size="21" :gradient="false" color="white" />
          SIGN WITH GOOGLE
        </vs-button>
      </div>
    </div>

    <div v-if="isLoggedIn && hasLoaded">
      <ViewCabinCards :cabinCards="cabinCards" />
      <AddCardModal :active.sync="openModal" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import AddCardModal from '@/components/Cabin/AddCard.vue';
import ViewCabinCards from '@/components/Cabin/ViewCabinCards.vue';
import NateIcons from '@/components/NateIcons.vue';
import { cabinCardsCollection, CabinCard, usersCollection } from '@/config/firebaseConfig';
import { isEmpty } from 'lodash';
import { User } from 'store/interfaces';
import moment from 'moment';
import { timeFromNowInMinutes } from '~/helpers';

const auth = namespace('auth');

@Component({ components: { AddCardModal, ViewCabinCards, NateIcons } })
export default class CabinPage extends Vue {
  @auth.State('user') user: User;
  @auth.Getter('isLoggedIn') isLoggedIn: boolean;

  openModal = false;
  cabinCards: CabinCard[] = [];
  loading: any = {};

  get hasLoaded() {
    return !this.loading.isVisible;
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

  getCabinCards() {
    this.$fireStore
      .collection(cabinCardsCollection)
      .where('active', '==', true)
      .onSnapshot(data => {
        this.cabinCards = data.docs.map(doc => doc.data()) as CabinCard[];
        this.loading.close();
      });
  }

  async beforeMount() {
    this.loading = this.$vs.loading({
      target: this.$refs.loading,
      scale: '1.5',
      background: 'primary',
      opacity: 0.001,
      color: '#fff',
    });

    this.logUserEntry();
    this.getCabinCards();
  }

  @Watch('user')
  async logUserEntry() {
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

      await this.$fireStore
        .collection(usersCollection)
        .doc(this.user.uid)
        .set(this.user);
    }
  }
}
</script>

<style scoped lang="scss">
.cabin {
  min-height: 85vh;
}

.sign-in {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  &-logo {
    margin-right: 10px;
  }
}
</style>
