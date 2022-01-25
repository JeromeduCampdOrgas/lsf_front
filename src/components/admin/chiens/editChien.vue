<template>
  <div class="container-fluid d-flex justify-content-between">
    <div class="gauche">
      <h2>Modifications</h2>
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
            <div v-if="visionneuse">
              <div v-for="(image, index) in visionneuse" :key="image">
                <img :src="image" />
                <button @click="removeImage(index)">Remove image</button>
              </div>
            </div>
          </div>
          <button
            class="btn btn-success col-5 j"
            type="submit"
            @click="createCarousel"
          >
            <span></span> Valider
          </button>
        </form>
        <!--<div v-if="carousel">
          <div v-for="(image, index) in this.carousel" :key="image.id">
            <img :src="image" />
            <button @click="removeImage(index)">Remove image</button>
          </div>
        </div>-->
      </div>
    </div>
    <div class="droite">
      <h2>{{ chien.nom }}</h2>
      <div class="fiche">
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
      donnees: [],
      refuge: store.state.refuge,
      count: 0,
      visionneuse: [],
    };
  },
  components: {
    //CAROUSEL_CHIEN,
  },
  methods: {
    onCarouselChange(e) {
      this.count = this.count + 1;
      let files = e.target.files;
      //console.log(e.target.files);
      for (let i = 0; i < files.length; i++) {
        this.carousel = files[i];
      }
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
      console.log(this.carousel);
      let tblo = Array.from(this.carousel);
      console.log(tblo);
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

<style lang="scss">
.gauche,
.droite {
  width: 70%;
  height: 500px;
}
.gauche {
  & .fiche {
    width: 30%;
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
    & p {
      font-size: 1.2rem;
    }
  }
}
.modif {
  width: 50%;
  margin: 50px auto;
  padding: 15px;
  text-align: left;
  border-radius: 3%;
  box-shadow: 2px 2px #d8e1e3;
}
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>
