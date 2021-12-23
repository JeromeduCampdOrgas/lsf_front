<template>
  <div class="container-fluid vh-100" style="margin-top: 50px">
    <div class="" style="margin-top: 100px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 v-if="this.inscrit == true" class="text-primary">
              Créer un compte
            </h3>

            <h3 v-if="this.inscrit == false" class="text-primary">
              Se connecter
            </h3>
          </div>
          <div class="p-4">
            <form action="">
              <div v-if="this.inscrit == true" class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-user-plus"></i
                ></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-envelope"></i>
                </span>
                <input type="email" class="form-control" placeholder="Email" />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-key"></i
                ></span>
                <input
                  type="password"
                  class="form-control"
                  placeholder="password"
                />
              </div>
              <div class="d-grid col-12 mx-auto">
                <button
                  v-if="this.inscrit == true"
                  class="btn btn-primary"
                  type="button"
                >
                  <span></span> S'inscrire
                </button>
                <button
                  v-if="this.inscrit == false"
                  class="btn btn-primary"
                  type="button"
                >
                  <span></span> Se connecter
                </button>
              </div>
              <p v-if="this.inscrit == false" class="text-center mt-3">
                Pas encore de compte?
                <span class="text-primary register" @click="displayInscrit"
                  >S'inscrire</span
                >
              </p>
              <p v-if="this.inscrit == true" class="text-center mt-3">
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
export default {
  data() {
    return {
      inscrit: false,
    };
  },
  methods: {
    displayInscrit() {
      this.inscrit = !this.inscrit;
      console.log(this.inscrit);
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
