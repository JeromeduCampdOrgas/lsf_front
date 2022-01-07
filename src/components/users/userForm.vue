<template>
  <div class="container-fluid vh-100" style="margin-top: 50px">
    <div class="" style="margin-top: 100px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 v-if="store.state.inscription == true" class="text-primary">
              Créer un compte
            </h3>

            <h3 v-if="store.state.inscription == false" class="text-primary">
              Se connecter
            </h3>
          </div>
          <div class="p-4">
            <form action="">
              <div
                v-if="store.state.inscription == true"
                class="input-group mb-3"
              >
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-user-plus"></i
                ></span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  class="form-control"
                  placeholder="Username"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-envelope"></i>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-key"></i
                ></span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  class="form-control"
                  placeholder="password"
                />
              </div>
              <!-------------------------- Image -------------------------
              <div class="col-md-9 pe-5" v-if="this.inscription == true">
                <input class="form-control" id="avatar" type="file" />
                <div class="small text-muted mt-2">choisissez une photo</div>
              </div>
              -------------------- Image ---------------------------->
              <div class="d-grid col-12 mx-auto">
                <button
                  v-if="store.state.inscription == true"
                  class="btn btn-primary"
                  type="button"
                  @click="register"
                >
                  <span></span> S'inscrire
                </button>
                <button
                  @click="login"
                  v-if="store.state.inscription == false"
                  class="btn btn-primary"
                  type="button"
                >
                  <span></span> Se connecter
                </button>
              </div>
              <p
                v-if="store.state.inscription == false"
                class="text-center mt-3"
              >
                Pas encore de compte?
                <span class="text-primary register" @click="displayInscrit"
                  >S'inscrire</span
                >
              </p>
              <p
                v-if="store.state.inscription == true"
                class="text-center mt-3"
              >
                Déjà un compte?
                <span class="text-primary register" @click="displayInscrit"
                  >Se connecter</span
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import configAxios from "@/config/axios/configAxios.js";
import jwtDecode from "jwt-decode";
import store from "../../store/index";

export default {
  data() {
    return {
      admin: false,
      logged: false,
      username: "",
      userid: "",
      useremail: "",
      store,
    };
  },
  methods: {
    displayInscrit() {
      store.dispatch("getInscription", !store.state.inscription);
      let username = document.getElementById("username");
      let email = document.getElementById("email");
      let password = document.getElementById("password");
      if (username) {
        username.value = "";
      }
      if (password) {
        password.value = "";
      }
      if (email) {
        email.value = "";
      }
    },
    register() {
      let username = document.getElementById("username").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;

      configAxios
        .post("signup", {
          username: username,
          email: email,
          password: password,
        })
        .then(function () {
          console.log("C'est tout bon");
          store.dispatch("getInscription", false);
        })
        .catch(function (error) {
          console.log("message" + error);
        });
    },
    login() {
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      configAxios
        .post("login", {
          email: email,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          const decoded = jwtDecode(response.data.token);
          this.admin = decoded.isAdmin;
          this.username = decoded.username;
          this.userid = decoded.userId;
          this.useremail = decoded.email;
          this.logged = true;

          store.dispatch("getUserLogged", this.logged);
          store.dispatch("getUserIsAdmin", this.admin);
          store.dispatch("getUserName", this.username);
          store.dispatch("getUserId", this.userid);
          store.dispatch("getUserEmail", this.useremail);

          this.$router.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.input-group-text {
  width: 15%;
}
.register:hover {
  cursor: pointer;
}

@media (min-width: 1025px) {
  .h-custom {
    height: 100vh !important;
  }
}
</style>
