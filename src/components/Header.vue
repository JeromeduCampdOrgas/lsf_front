<template>
  <img src="../assets/logo/logo.png" alt="" />
  <h1>Lévriers sans frontières</h1>

  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <!--<a class="navbar-brand" href="#">Navbar</a>-->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link active" aria-current="page"
                >Accueil</router-link
              >
            </li>
            <administration v-if="store.state.isAdmin === 'isAdmin'" />

            <li class="nav-item">
              <router-link to="/refuges" class="nav-link"
                >Les refuges</router-link
              >
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a class="dropdown-item" href="#">Something else here</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
          </ul>

          <form class="d-flex">
            <!-- Profil -->
            <div class="btn-group mx-5" v-if="store.state.userLogged">
              <button
                class="btn btn-light btn-sm dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Mon profil
              </button>
              <ul class="dropdown-menu">
                {{
                  store.state.username
                }}
                <li>
                  <router-link to="/user/profil">Mon compte</router-link>
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="deleteAccount"
                    >Supprimer mon compte</a
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
              </ul>
            </div>

            <!----------- FIN PROFIL     ------------@keyup="searchDog"-------------------->
            <!--<div class="d-flex flex-direction-column">-->
            <div id="recherche">
              <input
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                type="search"
                placeholder="Rechercher un chien"
                aria-label="Search"
                v-model="q"
                @keyup="searchDog"
              />
              <ul class="dropdown-menu" v-show="this.trouves.length > 0">
                <li
                  v-for="trouve in this.trouves"
                  :key="trouve"
                  class="dropdown-item"
                  @click="selectDog"
                >
                  {{ trouve.nom }}
                </li>
              </ul>
            </div>
            <!--</div>-->
            <button class="btn btn-outline-success" @click="dogFound">
              Recherche
            </button>
          </form>

          <router-link v-if="!store.state.userLogged" to="/user"
            >Se connecter</router-link
          >
          <router-link v-if="store.state.userLogged" to="/" @click="disconnect"
            >Se déconnecter</router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import administration from "./Admin.vue";
import store from "../store/index";
import configAxios from "../config/axios/configAxios";
import razStore from "../services/store";
export default {
  name: "Header",
  data() {
    return {
      store,
      q: "",
      trouves: [],
      dogsFound: [],
    };
  },
  components: {
    administration,
  },
  methods: {
    disconnect() {
      localStorage.clear();
      store.dispatch("getUserLogged", false);
      store.dispatch("getUserIsAdmin", "");
      store.dispatch("getUserName", "");
      store.dispatch("getUserId", "");
      store.dispatch("getUserEmail", "");
      store.dispatch("getSelectedRefuge", "");
      store.dispatch("getModif", false);
      store.dispatch("getUsers", "");
    },
    deleteAccount() {
      let userId = store.getters.getUserUserId;
      configAxios
        .delete(`users/${userId}`)
        .then(() => {
          console.log("votre compte a été supprimé avec succès");
          localStorage.clear();
          razStore.razUserLogged();
          razStore.razIsAdmin();
          razStore.razUserName();
          razStore.razUserId();
          razStore.razUserMail();
        })
        .catch((err) => console.log(err));
    },
    searchDog() {
      if (this.q.length > 0) {
        let nom = this.q;
        configAxios
          .get(`/search/` + nom)
          .then((response) => {
            this.trouves = [];
            for (let i = 0; i < response.data.length; i++) {
              this.trouves.push(response.data[i]);
            }
          })
          .catch((error) => console.log(error));
      }
    },

    selectDog(e) {
      this.q = "";
      let selectedDog = e.target.innerHTML;
      this.q = selectedDog;
      e.target.parentNode.parentNode.childNodes[0].value = selectedDog;
    },
    dogFound() {
      this.dogsFound = [];

      let nom = this.q;
      for (let i = 0; i < this.$store.state.allDogs.length; i++) {
        if (this.$store.state.allDogs[i].nom == nom) {
          let chien = this.$store.state.allDogs[i];

          this.dogsFound.push(chien);
        }
      }
      store.dispatch("getDogsFound", this.dogsFound);
      this.$router.push("/resultats");
    },
  },
};
</script>

<style lang="scss" scoped>
#recherche {
  position: relative;
}
</style>
