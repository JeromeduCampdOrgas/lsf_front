<template>
  refugeId: {{ this.refugeId }}
  <div class="container-fluid vh-100" style="margin-top: 50px">
    <div class="" style="margin-top: 100px">
      <div class="rounded d-flex justify-content-center">
        <div class="col-md-4 col-sm-12 shadow-lg p-5 bg-light">
          <div class="text-center">
            <h3 class="text-primary">Créer un chien</h3>
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
                  v-model="this.dataChien.name"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-barcode"></i
                ></span>
                <input
                  id="puce"
                  name="puce"
                  type="text"
                  class="form-control"
                  placeholder="puce"
                  v-model="dataChien.puce"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-venus-mars"></i
                ></span>
                <select
                  id="sexe"
                  name="sexe"
                  class="form-control"
                  v-model="dataChien.sexe"
                >
                  <option value="male">Mâle</option>
                  <option value="female">Femelle</option>
                </select>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="far fa-arrow-alt-circle-right"></i
                ></span>
                <input
                  id="age"
                  name="age"
                  type="text"
                  class="form-control"
                  placeholder="age"
                  v-model="dataChien.age"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-text-height"></i
                ></span>
                <input
                  id="taille"
                  name="taille"
                  type="text"
                  class="form-control"
                  placeholder="taille"
                  v-model="dataChien.taille"
                />
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-cat"></i
                ></span>
                <select
                  id="chat"
                  name="chat"
                  class="form-control"
                  v-model="dataChien.chat"
                >
                  <option value="ok">OK</option>
                  <option value="ko">KO</option>
                  <option value="encours">En cours</option>
                </select>
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="fas fa-battery-quarter"></i
                ></span>
                <select
                  id="statut"
                  name="statut"
                  class="form-control"
                  v-model="dataChien.statut"
                >
                  <option value="Adopte">Adopté</option>
                  <option value="encours">Réservé</option>
                  <option value="encours">En cours</option>
                </select>
              </div>
              <!-------------------------- Image ------------------------->
              <h4>Photo principale</h4>
              <div class="input-group mb-3">
                <span class="input-group-text bg-primary"
                  ><i class="far fa-image"></i
                ></span>
                <input
                  class="form-control"
                  id="avatar"
                  type="file"
                  name="imageUrl"
                  method="post"
                  @change="onFileChange"
                />
              </div>
              <!-------------------- Image ---------------------------->

              <div
                class="d-flex flex-row justify-content-between col-12 mx-auto"
              >
                <button
                  @click="createChien"
                  class="btn btn-primary col-5 j"
                  type="button"
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
                <span v-if="this.chien == 'Ce chien existe déjà'"
                  >Ce chien existe déjà</span
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
import store from "../../../store/index";
export default {
  data() {
    return {
      dataChien: {
        refuge: null,
        name: null,
        puce: null,
        sexe: null,
        age: null,
        taille: null,
        chat: null,
        statut: null,
        picture: null,
        carousel: null,
      },
      carousel: [],
      refuge: store.state.refuge,
      refugeId: store.state.refugeId,
      refuges: store.state.refuges,
      chiens: store.state.chiens,
      chien: "",
    };
  },
  methods: {
    retour() {
      this.$router.push("/admin/refuges");
    },
    onFileChange(event) {
      this.dataChien.picture = event.target.files[0];
    },
    createChien() {
      let name = this.dataChien.name;
      let puce = this.dataChien.puce;
      let sexe = this.dataChien.sexe;
      let age = this.dataChien.age;
      let taille = this.dataChien.taille;
      let chat = this.dataChien.chat;
      let statut = this.dataChien.statut;

      if (this.chiens.length > 0) {
        for (let i = 0; i < this.chiens.length; i++) {
          if (this.chiens[i].nom == name) {
            this.chien = "Ce chien existe déjà";
          }
        }
      } else {
        const formData = new FormData();
        formData.set("refugeId", this.refugeId);
        formData.set("refuge", this.refuge);
        formData.set("name", name);
        formData.set("puce", puce);
        formData.set("sexe", sexe);
        formData.set("age", age);
        formData.set("taille", taille);
        formData.set("chat", chat);
        formData.set("statut", statut);
        formData.set("picture", this.dataChien.picture);

        configAxios
          .post(`/chiens`, formData, {
            headers: {
              // Multer only parses "multipart/form-data" requests
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            configAxios.get(`chiens/${this.refugeId}`).then((response) => {
              store.dispatch("getChiens", response.data);
              this.chiens = store.state.chiens;
            });
            this.$router.push("/admin/chiens/" + this.refugeId);
          })
          .catch(() => {
            this.refuge = "Une erreur est survenue";
            console.log(this.refuge);
          });
      }
    },
  },
};
</script>
<style></style>
