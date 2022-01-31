<template>
  <div class="container-fluid d-flex justify-content-between">
    <div class="gauche">
      <h2>CAROUSEL</h2>

      <div class="modif">
        <form action="">
          <h4>Carousel</h4>
          <div id="carousel">
            <div class="input-group mb-5">
              <span class="input-group-text bg-primary"
                >image<i class="far fa-images"></i>
              </span>
              <input
                name="carousel"
                class="form-control"
                type="file"
                multiple
                @change="onCarouselChange"
              />
            </div>
            <div class="btnValidation">
              <button
                v-if="this.existe == false && this.carousel.length > 0"
                class="btn btn-success col-5 j"
                type="submit"
                @click="createCarousel"
              >
                <span></span> Valider
              </button>
              <button class="btn btn-danger col-5 j" @click="retour">
                <span></span> Annuler
              </button>
            </div>
            <div v-if="this.existe == true" style="color: red">
              <span>
                Certain(s) fichier(s) existe(nt) déjà dans le carousel</span
              >
            </div>

            <!-- VISIONNEUSE -->
            <div v-if="visionneuse" class="visionneuse">
              <div
                v-for="(image, index) in visionneuse"
                :key="image"
                class="image"
              >
                <div class="imgCarousel">
                  <img :src="image" />
                </div>
                <div>
                  <button
                    class="btn btn-outline-danger"
                    @click="removeImage(index)"
                  >
                    Remove image
                  </button>
                </div>
              </div>
            </div>

            <!------------------------->
            <!---------------------------------------------------->

            <div v-if="visionneuse" class="visionneuse">
              <div v-for="donnee in donnees" :key="donnee" class="image">
                <div class="suppr"><span @click="supprImage">X</span></div>
                <div class="imgCarousel d-flex">
                  <img :src="donnee" />
                </div>
              </div>
            </div>
            <!----------------------------------------------------->
          </div>
        </form>
      </div>
    </div>
    <div class="droite">
      <div class="fiche">
        <h2>{{ chien.nom }}</h2>
        <div class="item">
          <div class="d-flex flex-direction-row justify-content-between">
            <p>Puce :</p>
            <p id="puce" class="active">
              {{ this.fPuce }}
            </p>
            <input class="inactive" type="text" v-model="fPuce" />
            <button class="btn btn-outline-primary" @click="modifFiche">
              Modifier
            </button>
          </div>
        </div>
        <div class="item">
          <div class="d-flex flex-direction-row justify-content-between">
            <p>Sexe :</p>
            <p id="sexe" class="active">
              {{ this.fSexe }}
            </p>
            <input class="inactive" type="text" v-model="fSexe" />

            <button class="btn btn-outline-primary" @click="modifFiche">
              Modifier
            </button>
          </div>
        </div>
        <div class="item">
          <div class="d-flex flex-direction-row justify-content-between">
            <p>Age :</p>
            <p id="age" class="active">
              {{ this.fAge }}
            </p>
            <input class="inactive" type="text" v-model="fAge" />
            <button class="btn btn-outline-primary" @click="modifFiche">
              Modifier
            </button>
          </div>
        </div>
        <div class="item">
          <div class="d-flex flex-direction-row justify-content-between">
            <p>Taille :</p>
            <p id="taille" class="active">
              {{ this.fTaille }}
            </p>
            <input class="inactive" type="text" v-model="fTaille" />
            <button class="btn btn-outline-primary" @click="modifFiche">
              Modifier
            </button>
          </div>
        </div>
        <div class="item">
          <div class="d-flex flex-direction-row justify-content-between">
            <p>Test chats :</p>
            <p id="chat" class="active">
              {{ this.fChats }}
            </p>
            <input class="inactive" type="text" v-model="fChats" />
            <button class="btn btn-outline-primary" @click="modifFiche">
              Modifier
            </button>
          </div>
        </div>
        <div class="item">
          <div class="d-flex flex-direction-row justify-content-between">
            <p>Santé :</p>
            <p id="sante" class="active">
              {{ this.fSante }}
            </p>
            <input class="inactive" type="text" v-model="fSante" />
            <button class="btn btn-outline-primary" @click="modifFiche">
              Modifier
            </button>
          </div>
        </div>
        <div class="item">
          <div class="d-flex flex-direction-row justify-content-between">
            <p>Statut :</p>
            <p id="statut" class="active">
              {{ this.fStatut }}
            </p>
            <input class="inactive" type="text" v-model="fStatut" />
            <button class="btn btn-outline-primary" @click="modifFiche">
              Modifier
            </button>
          </div>
        </div>

        <div class="validation">
          <button class="btn btn-success" @click="validModifications">
            Valider les modifications
          </button>
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
      chien: store.state.selectedDog,
      carousel: [],
      verifImages: [],
      refuge: store.state.refuge,
      visionneuse: [],
      donnees: [],
      existe: false,
      photoId: "",
      imageToDelete: "",
      /******Modif Fiche */
      fPuce: store.state.selectedDog.puce,
      fSexe: store.state.selectedDog.sexe,
      fAge: store.state.selectedDog.age,
      fTaille: store.state.selectedDog.taille,
      fChats: store.state.selectedDog.chats,
      fSante: store.state.selectedDog.sante,
      fStatut: store.state.selectedDog.statut,
      modif: {
        age: "",
        chats: "",
        id: store.state.selectedDog.id,
        imageUrl: store.state.selectedDog.imageUrl,
        nom: store.state.selectedDog.nom,
        puce: "",
        refugeId: store.state.selectedDog.refugeId,
        sante: "",
        sexe: "",
        statut: "",
        taille: "",
      },
    };
  },
  components: {},
  methods: {
    modifFiche(e) {
      let selection =
        e.target.parentNode.parentNode.childNodes[0].childNodes[1];
      let modification =
        e.target.parentNode.parentNode.childNodes[0].childNodes[2];
      selection.classList.remove("active");
      selection.classList.add("inactive");
      modification.classList.remove("inactive");
      modification.classList.add("active");
    },
    validModifications() {
      let puce = this.fPuce;
      let sexe = this.fSexe;
      let age = this.fAge;
      let taille = this.fTaille;
      let sante = this.fSante;
      let statut = this.fStatut;
      let chat = this.fChats;
      this.modif.puce = puce;
      this.modif.sexe = sexe;
      this.modif.age = age;
      this.modif.taille = taille;
      this.modif.sante = sante;
      this.modif.statut = statut;
      this.modif.chat = chat;
      store.dispatch("getSelectedDog", this.modif);
      configAxios.put(`/chiens/${this.chien.id}`, {
        puce: puce,
        sexe: sexe,
        age: age,
        taille: taille,
        sante: sante,
        statut: statut,
        chats: chat,
      });
      const p = document.getElementsByTagName("p");
      const input = document.getElementsByTagName("input");
      for (let elem of p) {
        elem.classList.remove("inactive");
        elem.classList.add("active");
      }
      for (let elem of input) {
        elem.classList.remove("active");
        elem.classList.add("inactive");
      }
      this.$router.push("/admin/chiens/edit");
    },
    retour() {
      this.$router.push("/admin/chiens/edit");
    },
    onCarouselChange(e) {
      let files = Array.prototype.slice.call(e.target.files);
      this.carousel = files;

      for (let j = 0; j < this.$store.state.chiensCarousel.length; j++) {
        let chaine = this.$store.state.chiensCarousel[j].images;
        let longueur = chaine.indexOf(".JPG") - chaine.lastIndexOf("/") + 3;
        let storeName = chaine.substr(chaine.indexOf("IMG"), longueur);
        this.verifImages.push(storeName);
      }

      for (let i = 0; i < files.length; i++) {
        if (this.verifImages.find((el) => el == files[i].name)) {
          this.existe = true;
          return console.log("existe déjà");
        } else {
          this.existe = false;
        }
      }
      this.createImage(files);
      //
    },
    createImage(files) {
      let vm = this;
      for (let index = 0; index < files.length; index++) {
        let reader = new FileReader();
        reader.onload = function (event) {
          const imageUrl = event.target.result;
          vm.visionneuse.push(imageUrl);
        };
        reader.readAsDataURL(files[index]);
      }
    },
    removeImage(i) {
      this.visionneuse.splice(i, 1);
      this.carousel.splice(i, 1);
    },
    createCarousel() {
      let chienId = store.state.selectedDog.id;
      let refugeId = store.state.selectedDog.refugeId;

      const formData = new FormData();
      formData.append("refuge", this.refuge);
      formData.append("nom", this.chien.nom);
      formData.append("chienId", this.chien.id);
      formData.append("refugeId", this.chien.refugeId);
      for (let i = 0; i < this.carousel.length; i++) {
        formData.append("carousel", this.carousel[i]);
      }
      configAxios
        .post(`/chiens/carousel`, formData, {
          headers: {
            // Multer only parses "multipart/form-data" requests
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          configAxios
            .get(`/chiens/carousel/${chienId}`, {
              where: {
                refugeId: refugeId,
                chienId: chienId,
              },
            })
            .then((response) => {
              store.dispatch("getChiensCarousel", response.data).then(() => {
                for (
                  let i = 0;
                  i < this.$store.state.chiensCarousel.length;
                  i++
                ) {
                  console.log(this.$store.state.chiensCarousel[i]);
                  this.donnees.push(this.$store.state.chiensCarousel[i].images);
                }
              });
              store.dispatch("getDonnees", this.donnees);
            });
        });
      this.retour();
      this.$router.push("/admin/chiens/edit");
    },
    supprImage(e) {
      //console.log(this.donnees);
      const photo =
        e.target.parentNode.parentNode.childNodes[1].childNodes[0].src;
      for (let i = 0; i < this.$store.state.chiensCarousel.length; i++) {
        if (this.$store.state.chiensCarousel[i].images == photo) {
          this.photoId = this.$store.state.chiensCarousel[i].id;
          this.imageToDelete = this.$store.state.chiensCarousel[i].images;
        }
      }
      configAxios
        .delete(`/chiens/carousel/${this.photoId}`, {
          images: this.imageToDelete,
        })
        .then(() => {
          let chienId = store.state.selectedDog.id;
          let refugeId = store.state.selectedDog.refugeId;
          this.carousel = "";
          this.donnees = [];
          store.dispatch("getChiensCarousel", "");
          store.dispatch("getDonnees", "");
          store.dispatch("getDonnees", "").then(() => {
            configAxios
              .get(`/chiens/carousel/${chienId}`, {
                where: {
                  refugeId: refugeId,
                  chienId: chienId,
                },
              })
              .then((response) => {
                store.dispatch("getChiensCarousel", response.data).then(() => {
                  for (
                    let i = 0;
                    i < this.$store.state.chiensCarousel.length;
                    i++
                  ) {
                    this.donnees.push(
                      this.$store.state.chiensCarousel[i].images
                    );
                  }
                  store.dispatch("getDonnees", this.donnees);
                });
              });
            this.$router.push("/admin/chiens/edit");
          });
        });
    },
  },
  beforeMount() {
    let chienId = store.state.selectedDog.id;
    let refugeId = store.state.selectedDog.refugeId;

    configAxios
      .get(`/chiens/carousel/${chienId}`, {
        where: {
          refugeId: refugeId,
          chienId: chienId,
        },
      })
      .then((response) => {
        store.dispatch("getChiensCarousel", response.data);
      });
    for (let i = 0; i < this.$store.state.chiensCarousel.length; i++) {
      this.donnees.push(this.$store.state.chiensCarousel[i].images);
    }
    store.dispatch("getDonnees", this.donnees);
    this.$router.push("/admin/chiens/edit");
  },
};
</script>

<style lang="scss" scoped>
.droite {
  width: 40%;
  height: 650px;
  & .fiche {
    width: 90%;
    height: 100%;
    margin: 85px auto;
    padding: 15px;
    text-align: left;
    border-radius: 15px;
    background-image: linear-gradient(
      to right bottom,
      #aaafec,
      #afb4ee,
      #b4b9f0,
      #babef2,
      #bfc3f4,
      #c3c7f5,
      #c7cbf7,
      #cbcff8,
      #cfd3fa,
      #d3d7fc,
      #d8dcfd,
      #dce0ff
    );

    box-shadow: 2px 2px #d8e1e3;

    & h2 {
      text-align: center;
    }
    & p {
      font-size: 1.2rem;
    }
    .validation {
      margin-top: 50px;
      text-align: center;
    }
    .item {
      border-radius: 15px;
      box-shadow: 2px 2px #d8e1e3;
      padding: 2px 5px;
      margin: 20px 5px;
    }
    .active {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .inactive {
      display: none;
    }
  }
}
.gauche {
  width: 60%;
}
.modif {
  display: relative;
  width: 90%;
  margin: 50px auto;
  padding: 15px;
  text-align: left;
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px #cbcff8;
  & .suppr {
    text-align: right;
    margin-right: 10px;
    color: red;
    font-weight: bold;
  }
  & .suppr:hover {
    cursor: pointer;
  }
  & .visionneuse {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;

    & .image {
      width: 30%;
      text-align: center;
      border-radius: 3%;
      box-shadow: 2px 2px 2px 2px #cbcff8;
      margin-top: 30px;

      & .imgCarousel {
        width: 80%;
        height: 100px;
        margin: 30px auto 20px auto;
        object-fit: cover;
        & img {
          height: 100%;
        }
      }
    }
  }
}

.btnValidation {
  text-align: center;
  display: flex;
  & .btn {
    margin: 60px auto 30px auto;
    width: 30%;
  }
}
</style>
