<template>
  <div class="container-fluid vh-100" style="margin-top: 50px">
    <div class="" style="margin-top: 100px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 class="text-primary">Modifier un refuge</h3>
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
                  :value="this.$store.state.refuge"
                  @blur="newName"
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
                  @click="updateRefuge"
                >
                  <span></span> Modifier
                </button>

                <button
                  @click="retour"
                  class="btn btn-danger col-5"
                  type="button"
                >
                  <span></span> Fermer
                </button>
              </div>
              <div>
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
import store from "../../../store/index";
import configAxios from "../../../config/axios/configAxios";
export default {
  data() {
    return {
      modifRefuge: [],
      refuge: store.state.refuge,
      nom: "",
      dataRefuge: {
        name: null,
        picture: null,
      },
    };
  },
  methods: {
    test() {
      console.log("name: " + this.dataRefuge.name);
      console.log("picture: " + this.dataRefuge.picture);
    },
    retour() {
      store.dispatch("getModif", false);
      store.dispatch("getSelectedRefuge", "");
      this.$router.push("/admin/refuges");
    },
    newName(e) {
      this.dataRefuge.name = e.target.value;
    },
    onFileChange(e) {
      this.dataRefuge.picture = e.target.files[0];
    },

    updateRefuge() {
      const formData = new FormData();
      formData.set("name", this.dataRefuge.name);
      formData.set("picture", this.dataRefuge.picture);
      let refugeId = store.state.refugeId;
      /*for (var p of formData) {
        console.log(p);
      }*/

      configAxios
        .put(`refuge/${refugeId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then(() => {
          this.$router.push("/admin/refuges");
          console.log("C'est fait!!!");
        })
        .catch((err) => err);
    },
  },
};
</script>
<style scoped></style>
