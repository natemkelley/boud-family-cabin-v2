import { isEmpty } from "lodash";

export const state = {
  user: {},
};

export const getters = {
  isLoggedIn: (state) => {
    return !isEmpty(state.user);
  },
};

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {
    if (authUser) {
      const { uid, email, emailVerified, displayName, photoURL } = authUser;
      const logInTime = new Date();
      state.user = {
        uid,
        email,
        emailVerified,
        displayName,
        photoURL,
        logInTime,
      };
    }
  },
};

export const actions = {
  onAuthStateChangedAction: (ctx, { authUser, claims }) => {
    if (!authUser) {
      // claims = null
      // Perform logout operations
    } else {
      // Do something with the authUser and the claims object...
    }
  },
};
