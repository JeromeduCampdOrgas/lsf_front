<template>
  <div class="container-fluid vh-100" style="margin-top: 50px">
    <h1>Mon profil</h1>
    <div class="" style="margin-top: 100px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
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
                  v-model="store.state.userName"
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
                  v-model="store.state.userEmail"
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
              <!-------------------------- Image ------------------------->
              <div class="col-md-9 pe-5">
                <input class="form-control" id="avatar" type="file" />
                <div class="small text-muted mt-2">choisissez une photo</div>
              </div>
              <!-------------------- Image ---------------------------->
              <div class="d-grid col-12 mx-auto">
                <button
                  @click="validationModif"
                  class="btn btn-primary"
                  type="button"
                >
                  <span></span> Modifier
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
//import configAxios from "@/config/axios/configAxios.js";
//import jwtDecode from "jwt-decode";
import store from "../../store/index";

export default {
  data() {
    return {
      store,
    };
  },
  methods: {
    validationModif() {
      let username = document.getElementById("username").value;
      let email = document.getElementById("email").value;
      console.log(username);
      console.log(email);
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
