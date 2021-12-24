import Vuex from "vuex";

/********* STATE **************************/
const state = {
  /*User*/
  userLogged: false,
  isAdmin: "",
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
};

/********* ACTIONS ***********************/
const actions = {
  /*User*/
  getUserLogged: ({ commit }, logged) => {
    commit("SET_USER_LOGGED", logged);
  },
  getUserIsAdmin: ({ commit }, isAdmin) => {
    commit("SET_USER_ISADMIN", isAdmin);
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {},
});
