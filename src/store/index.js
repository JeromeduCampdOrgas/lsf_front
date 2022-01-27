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
  //Admin
  ///Users
  users: "",
  selectedUser: "",
  ///Refuges
  refuges: "",
  refuge: "",
  modif: false,
  refugeId: "",
  ///chiens
  chiens: "",
  selectedDog: "",
  chiensCarousel: "",
  imagesCarousel: "",
  donnees: "",
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
  //Admin
  ///Users
  getUsers: () => {
    return state.users;
  },
  getSelectedUser: () => {
    return state.selectedUser;
  },
  //refuges
  getRefuges: () => {
    return state.refuges;
  },
  getSelectedRefuge: () => {
    return state.refuge;
  },
  getModif: () => {
    return state.modif;
  },
  getRefugeId: () => {
    return state.refugeId;
  },
  //chiens
  getChiens: () => {
    return state.chiens;
  },
  getSelectedDog: () => {
    return state.selectedDog;
  },
  getChiensCarousel: () => {
    return state.chiensCarousel;
  },
  getImagesCarousel: () => {
    return state.imagesCarousel;
  },
  getDonneesCarousel: () => {
    return state.donnees;
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
  //Admin
  /// Users
  SET_ALL_USERS: (state, users) => {
    state.users = users;
  },
  SET_SELECTED_USERID: (state, selectedUser) => {
    state.selectedUser = selectedUser;
  },
  //Refuges
  SET_ALL_REFUGES: (state, refuges) => {
    state.refuges = refuges;
  },
  SET_SELECTED_REFUGE: (state, refuge) => {
    state.refuge = refuge;
  },
  SET_MODIF: (state, modif) => {
    state.modif = modif;
  },
  SET_REFUGE_ID: (state, refugeId) => {
    state.refugeId = refugeId;
  },
  //Chiens
  SET_ALL_CHIENS: (state, chiens) => {
    state.chiens = chiens;
  },
  SET_SELECTED_DOG: (state, chien) => {
    state.selectedDog = chien;
  },
  SET_CHIENS_CAROUSEL: (state, chiens) => {
    state.chiensCarousel = chiens;
  },
  SET_IMAGES_CAROUSEL: (state, images) => {
    state.imagesCarousel = images;
  },
  SET_DONNEES_CAROUSEL: (state, images) => {
    state.donnees = images;
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
  // Admin
  /////Users
  getUsers: ({ commit }, users) => {
    commit("SET_ALL_USERS", users);
  },
  getSelectedUser: ({ commit }, selectedUser) => {
    commit("SET_SELECTED_USERID", selectedUser);
  },
  //Refuges
  getRefuges: ({ commit }, refuges) => {
    commit("SET_ALL_REFUGES", refuges);
  },
  getSelectedRefuge: ({ commit }, refuge) => {
    commit("SET_SELECTED_REFUGE", refuge);
  },
  getModif: ({ commit }, modif) => {
    commit("SET_MODIF", modif);
  },
  getRefugeId: ({ commit }, id) => {
    commit("SET_REFUGE_ID", id);
  },
  //Chiens
  getChiens: ({ commit }, chiens) => {
    commit("SET_ALL_CHIENS", chiens);
  },
  getSelectedDog: ({ commit }, chien) => {
    commit("SET_SELECTED_DOG", chien);
  },
  getChiensCarousel: ({ commit }, chiens) => {
    commit("SET_CHIENS_CAROUSEL", chiens);
  },
  getImagesCarousel: ({ commit }, images) => {
    commit("SET_IMAGES_CAROUSEL", images);
  },
  getDonnees: ({ commit }, images) => {
    commit("SET_DONNEES_CAROUSEL", images);
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
