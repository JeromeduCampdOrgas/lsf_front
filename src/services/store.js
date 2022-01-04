import store from "../store/index";
export default {
  razUserLogged() {
    store.dispatch("getUserLogged", false);
  },
  razIsAdmin() {
    store.dispatch("getUserIsAdmin", "");
  },
  razUserName() {
    store.dispatch("getUserName", "");
  },
  razUserId() {
    store.dispatch("getUserId", "");
  },
  razUserMail() {
    store.dispatch("getUserEmail", "");
  },
};
