import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

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
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/admin/users/allUsers.vue"
      ),
  },
  {
    path: "/admin/users/edit",
    name: "userForm",
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/admin/users/userForm.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
