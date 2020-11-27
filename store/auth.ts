import { isEmpty } from 'lodash';
import { User } from './interfaces';

export const state = {
  user: {},
};

export const getters = {
  isLoggedIn: (state: any) => {
    return !isEmpty(state.user);
  },
};

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state: any, { authUser }: { authUser: firebase.UserInfo }) => {
    if (authUser) {
      const { uid, email, displayName, photoURL } = authUser;
      const lastSeen = new Date();
      state.user = {
        uid,
        email,
        displayName,
        photoURL,
        lastSeen,
      } as User;
    }
  },
};

export const actions = {
  onAuthStateChangedAction: (ctx: any, { authUser, claims }: any) => {},
};
