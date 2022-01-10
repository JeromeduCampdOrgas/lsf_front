<template>
  <h1>utilisateur</h1>
  <div class="container-fluid vh-100" style="margin-top: 50px">
    <div class="" style="margin-top: 100px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 class="text-primary">Créer un compte</h3>
          </div>
          <div class="p-4">
            <form action="">
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-user-plus"></i
                ></span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  class="form-control"
                  placeholder="username"
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
                  placeholder="email"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-user-shield"></i
                ></span>

                <select class="custom-select" id="role" v-model="selectDefault">
                  <option value="isAdmin">Administrateur</option>
                  <option value="delegue">Délégué</option>
                  <option value="0">Visiteur</option>
                </select>
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
              <div
                class="d-flex flex-row justify-content-between col-12 mx-auto"
              >
                <button
                  class="btn btn-primary col-5"
                  type="button"
                  @click="createUser"
                >
                  <span></span> Valider
                </button>
                <button
                  @click="retour"
                  class="btn btn-danger col-5"
                  type="button"
                >
                  <span></span> Fermer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../../store/index";
import configAxios from "../../../config/axios/configAxios";
export default {
  data() {
    return {
      store,
      selectDefault: "Visiteur",
    };
  },
  methods: {
    retour() {
      this.$router.push("/admin/users");
    },
    createUser() {
      let username = document.getElementById("username").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      let isAdmin = document.getElementById("role").value;

      configAxios
        .post("signup", {
          username: username,
          email: email,
          password: password,
          isAdmin: isAdmin,
        })
        .then(() => console.log("C'est fait!!!"))
        .catch((err) => err);
    },
  },
};
</script>

<style scoped>
#disabled {
  background: red;
}
</style>
