import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

const ls = new SecureLS({ isCompression: false });

export default createStore({
  state: {
    sessionToken: null,
    userId: null,
    adminProfil: false,
  },
  getters: {},
  mutations: {
    myToken: (state, value) =>
      value ? (state.sessionToken = value) : (state.sessionToken = null), // si il y a une valeur, l'assigner au state
    myId: (state, value) =>
      value ? (state.userId = value) : (state.userId = null),
    myAdmin: (state, value) =>
      value ? (state.adminProfil = value) : (state.adminProfil = false),
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({ // Permet d'avoir un state qui ne change pas au rafraichissement de la page
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
});
