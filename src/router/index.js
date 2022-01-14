import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";
function guardMyroute(to, from, next) {
  let isAuthenticated = false;
  let token = localStorage.getItem("token");
  if (token) {
    isAuthenticated = true;
  } else {
    isAuthenticated = false;
  }
  if (isAuthenticated) {
    if (store.state.isAdmin == "isAdmin") {
      next();
    } else {
      next("/");
    }
  } else {
    next("/");
  }
}
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  // Users routes
  {
    path: "/user",
    name: "User",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/users/userForm.vue"),
  },
  {
    path: "/user/profil",
    name: "userProfil",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/users/userProfil.vue"),
  },

  // Admin routes
  {
    path: "/admin/users",
    name: "allUsers",
    beforeEnter: guardMyroute,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/admin/users/allUsers.vue"
      ),
  },
  {
    path: "/admin/users/edit",
    name: "userForm",
    beforeEnter: guardMyroute,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/admin/users/userForm.vue"
      ),
  },
  {
    path: "/admin/users/create",
    name: "createUserForm",
    beforeEnter: guardMyroute,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/admin/users/createUserForm.vue"
      ),
  },
  //Refuges
  {
    path: "/admin/refuges",
    name: "allRefuges",
    beforeEnter: guardMyroute,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/admin/refuges/allRefuges.vue"
      ),
  },
  {
    path: "/admin/refuges/create",
    name: "createRefugeForm",
    beforeEnter: guardMyroute,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/admin/refuges/createRefugeForm.vue"
      ),
  },
  {
    path: "/admin/refuges/update",
    name: "updateRefugeForm",
    beforeEnter: guardMyroute,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/admin/refuges/updateRefugeForm.vue"
      ),
  },
  {
    path: "/admin/refuges/:refuge",
    component: () =>
      import(
        /* webpackChunkName: "login" */ "../views/admin/refuges/chiensRefuge.vue"
      ),
    beforeEnter: (to, from, next) => {
      localStorage.getItem("token") ? next() : next({ name: "Login" });
    },
  },
  //Chiens
  {
    path: "/admin/chiens/:refugeId",
    name: "allChiens",
    beforeEnter: guardMyroute,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/admin/chiens/allChiens.vue"
      ),
  },
  {
    path: "/admin/chiens/create",
    name: "createChienForm",
    beforeEnter: guardMyroute,
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/admin/chiens/createChienForm.vue"
      ),
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
