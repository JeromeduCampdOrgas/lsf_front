<template>
  <div
    class="container-fluid d-flex flex-direction-row justify-content-between"
  >
    <div class="gauche">
      <h1>{{ this.selectedDog.nom }}</h1>
      <div class="textChien">
        <pre class="comments" rows="150">{{
          this.selectedDog.commentaires
        }}</pre>
      </div>
    </div>

    <div
      v-if="this.carousel.length > 0"
      class="droite d-flex flex-direction-row justify-content-around"
    >
      <div class="compteur">
        <span>
          <i @click="compteurMoins" class="fas fa-arrow-alt-circle-left"></i>
        </span>
      </div>

      <div class="image">
        <img
          :src="this.carousel[this.count].images"
          alt=""
          @click="$refs.modalName.openModal()"
        />
      </div>
      <div class="compteur">
        <span>
          <i @click="compteurPlus" class="fas fa-arrow-alt-circle-right"></i>
        </span>
      </div>
    </div>
    <div class="fakeImage" v-if="this.carousel.length == 0">
      <div class="image">
        <img src="https://fakeimg.pl/300/" />
      </div>
    </div>
  </div>
  <Modal ref="modalName">
    <template v-slot:body> </template>
  </Modal>
</template>

<script>
import store from "../../store/index";
//import configAxios from "../../config/axios/configAxios";
import Modal from "../../components/visiteur/Modal.vue";
export default {
  components: { Modal },
  data() {
    return {
      refuge: store.state.refuge,
      carousel: store.state.chiensCarousel,
      selectedDog: store.state.selectedDog,
      count: 0,
    };
  },

  methods: {
    compteurPlus() {
      if (this.count + 2 > this.carousel.length) {
        this.count = 0;
      } else {
        this.count = this.count += 1;
      }
    },
    compteurMoins() {
      if (this.count <= 0) {
        this.count = this.carousel.length - 1;
      } else {
        this.count = this.count -= 1;
      }
    },
  },
  beforeMount() {},
};
</script>

<style lang="scss" scoped>
.gauche,
.droite {
  width: 50%;
}
.droite {
  //background: #eee;
  border-radius: 5px;
  height: 500px;

  & .image {
    height: 500px;
    object-fit: cover;
    & img {
      margin-top: 50px;
      height: 80%;
    }
  }
}
.fakeImage {
  border: 2px black solid;
  margin-right: 100px;
}
.gauche {
  & h1 {
    background-image: linear-gradient(
      to right bottom,
      #f6f6fb,
      #f4f4fa,
      #f1f1fa,
      #efeff9,
      #ecedf9,
      #e9eaf9,
      #e5e7f9,
      #e2e4f9,
      #dde0fa,
      #d8dbfb,
      #d2d7fc,
      #cdd3fd
    );
  }
  & .textChien {
    max-width: 100%;
    background-image: linear-gradient(
      to right bottom,
      #f6f6fb,
      #f4f4fa,
      #f1f1fa,
      #efeff9,
      #ecedf9,
      #e9eaf9,
      #e5e7f9,
      #e2e4f9,
      #dde0fa,
      #d8dbfb,
      #d2d7fc,
      #cdd3fd
    );
    & .comments {
      margin: 30px 30px;
      padding: 10px;
      text-align: left;
      text-indent: 15px;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  }
}
.compteur {
  width: 50px;
  height: 50px;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
