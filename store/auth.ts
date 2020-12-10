import { isEmpty } from 'lodash';
import { User } from './interfaces';
import firebase from 'firebase';
import { usersCollection } from '~/config';

export const state = () => ({
  user: {},
  userLoaded: false,
});

export const getters = {
  isLoggedIn: (state: any) => {
    return !isEmpty(state.user);
  },
  isAuthorized: (state: any) => {
    return state.user.authorized;
  },
  isAdmin: (state: any) => {
    return state.user.admin;
  },
};

export const mutations = {
  SET_USER(state: any, user: User) {
    state.user = user;
  },
  SET_USER_LOADED(state: any, status: boolean) {
    state.userLoaded = status;
  },
};

export const actions = {
  onAuthStateChangedAction: async (ctx: any, { authUser, claims }: any) => {
    if (!authUser) return;

    const { uid, email, displayName, photoURL } = authUser;
    const db = firebase.firestore();
    const userRef = db.collection(usersCollection).doc(uid);
    const userData = await userRef.get();
    const parsedUserData = userData.data() as User;

    const authorized = parsedUserData.authorized || false;
    const admin = parsedUserData.admin || false;
    const lastSeen = new Date();

    const userInfo = { ...parsedUserData, lastSeen, uid, email, displayName, photoURL, admin, authorized };

    ctx.commit('SET_USER', userInfo);

    userRef.update({ lastSeen }).then(() => {
      ctx.commit('SET_USER_LOADED', true);
    });
  },
};
