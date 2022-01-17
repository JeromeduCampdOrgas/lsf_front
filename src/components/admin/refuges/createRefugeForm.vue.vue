<template>
  <div class="container-fluid vh-100" style="margin-top: 50px">
    <div class="" style="margin-top: 100px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 class="text-primary">Créer un refuge</h3>
          </div>
          <div class="p-4">
            <form action="" enctype="multipart/form-data">
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-user-plus"></i
                ></span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  class="form-control"
                  placeholder="name"
                  v-model="dataRefuge.name"
                />
              </div>
              <!-------------------------- Image ------------------------->
              <div class="col-md-12 pe-5">
                <input
                  class="form-control"
                  id="avatar"
                  type="file"
                  name="imageUrl"
                  method="post"
                  @change="onFileChange"
                />
                <div class="small text-muted mt-2">choisissez une photo</div>
              </div>
              <!-------------------- Image ---------------------------->
              <div
                class="d-flex flex-row justify-content-between col-12 mx-auto"
              >
                <button
                  class="btn btn-primary col-5 j"
                  type="button"
                  @click="createRefuge"
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
              <div class="erreur">
                <span v-if="this.refuge == 'Ce refuge existe déjà'"
                  >Ce refuge existe déjà</span
                >
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import configAxios from "../../../config/axios/configAxios";
//import store from "../../../store/index";
export default {
  data() {
    return {
      dataRefuge: {
        name: null,
        picture: null,
      },
      refuge: "",
    };
  },
  methods: {
    retour() {
      this.$router.push("/admin/refuges");
    },
    onFileChange(event) {
      this.dataRefuge.picture = event.target.files[0];
    },
    createRefuge() {
      const formData = new FormData();
      formData.set("name", this.dataRefuge.name);
      formData.set("picture", this.dataRefuge.picture);
      configAxios
        .post(`/refuge`, formData, {
          headers: {
            // Multer only parses "multipart/form-data" requests
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response !== null) {
            if (response.data.message == "Refuge successfully created") {
              this.refuge = "Le refuge a été créé avec succès";
              this.$router.push("/admin/refuges");
              location.replace("/admin/refuges");
            } else {
              this.refuge = "Ce refuge existe déjà";
              return this.refuge;
            }
          }
        })
        .catch(() => {
          this.refuge = "Une erreur est survenue";
          //console.log(this.refuge);
        });
    },
  },
};
</script>

<style lang="scss">
.erreur {
  margin-top: 10px;
  color: red;
  font-weight: bold;
}
</style>
