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
            <div class="btnValidation">
              <button
                class="btn btn-success col-5 j"
                type="submit"
                @click="createCarousel"
              >
                <span></span> Valider
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="droite">
      <div class="fiche">
        <h2>{{ chien.nom }}</h2>
        <p>
          Puce : <span>{{ chien.puce }}</span>
        </p>
        <p>
          Sexe: <span>{{ chien.sexe }}</span>
        </p>
        <p>
          Age: <span>{{ chien.age }}</span> ans
        </p>
        <p>
          Taille: <span>{{ chien.taille }}</span>
        </p>

        <p>
          Test chats: <span>{{ chien.chats }}</span>
        </p>
        <p>
          Santé: <span>{{ chien.sante }}</span>
        </p>
        <p>
          Statut: <span>{{ chien.statut }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../../store/index";
import configAxios from "../../../config/axios/configAxios";
//import CAROUSEL_CHIEN from "../../../components/admin/chiens/carouselChien.vue";
export default {
  data() {
    return {
      chien: store.state.selectedDog,
      carousel: [],
      refuge: store.state.refuge,
      visionneuse: [],
    };
  },
  components: {},
  methods: {
    onCarouselChange(e) {
      let files = Array.prototype.slice.call(e.target.files);
      this.carousel = files;

      this.createImage(files);
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
      console.log(this.carousel);
    },
    createCarousel() {
      const formData = new FormData();

      formData.append("refuge", this.refuge);
      formData.append("nom", this.chien.nom);
      formData.append("chienId", this.chien.id);
      formData.append("refugeId", this.chien.refugeId);
      for (let i = 0; i < this.carousel.length; i++) {
        formData.append("carousel", this.carousel[i]);
      }

      //console.log(this.carousel);
      configAxios
        .post("/chiens/carousel", formData, {
          headers: {
            // Multer only parses "multipart/form-data" requests
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => console.log("C'est fait"));
    },
  },
};
</script>

<style lang="scss" scoped>
.droite {
  width: 30%;
  height: 500px;
  & .fiche {
    width: 90%;
    margin: 50px auto;
    padding: 15px;
    text-align: left;
    border-radius: 3%;
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
  }
}
.gauche {
  width: 70%;
}
.modif {
  width: 90%;
  margin: 50px auto;
  padding: 15px;
  text-align: left;
  border-radius: 3%;
  box-shadow: 2px 2px 2px 2px #cbcff8;

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
.btn {
  margin: 60px auto 30px auto;
}
.btnValidation {
  text-align: center;
}
</style>
