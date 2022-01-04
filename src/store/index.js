import Vuex from "vuex";
import persistedState from "vuex-persistedstate";

/********* STATE **************************/
const state = {
  /*User*/
  userLogged: false,
  isAdmin: "",
  userName: "",
  userId: "",
  userEmail: "",
  inscription: false,
};

/********* GETTERS ************************/
const getters = {
  /*User*/
  getUserLogged: () => {
    return state.userLogged;
  },

  getUserIsAdmin: () => {
    return state.isAdmin;
  },
  getUserUserName: () => {
    return state.userName;
  },
  getUserUserId: () => {
    return state.userId;
  },
  getUserUserEmail: () => {
    return state.userEmail;
  },
  getInscription: () => {
    return state.inscription;
  },
};

/********* MUTATIONS  ********************/
const mutations = {
  /*User*/
  SET_USER_LOGGED: (state, logged) => {
    state.userLogged = logged;
  },

  SET_USER_ISADMIN: (state, isAdmin) => {
    state.isAdmin = isAdmin;
  },
  SET_USER_USERNAME: (state, username) => {
    state.userName = username;
  },
  SET_USER_ID: (state, id) => {
    state.userId = id;
  },
  SET_USER_EMAIL: (state, email) => {
    state.userEmail = email;
  },
  SET_INSCRIPTION: (state, inscription) => {
    state.inscription = inscription;
  },
};

/********* ACTIONS ***********************/
const actions = {
  /*User*/
  getUserLogged: ({ commit }, logged) => {
    commit("SET_USER_LOGGED", logged);
  },

  getUserIsAdmin: ({ commit }, isadmin) => {
    commit("SET_USER_ISADMIN", isadmin);
  },
  getUserName: ({ commit }, username) => {
    commit("SET_USER_USERNAME", username);
  },
  getUserId: ({ commit }, id) => {
    commit("SET_USER_ID", id);
  },
  getUserEmail: ({ commit }, email) => {
    commit("SET_USER_EMAIL", email);
  },
  getInscription: ({ commit }, inscription) => {
    commit("SET_INSCRIPTION", inscription);
  },
};

export default new Vuex.Store({
  plugins: [persistedState()],
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
