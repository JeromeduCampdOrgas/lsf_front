<template>
  <div class="d-flex flex-direction-row justify-content-around mb-5">
    <h1>{{ this.refuge }}: Tous les chiens</h1>
    <button class="btn btn-success" @click="newDog">Nouveau Chien</button>
  </div>
  <div class="d-flex flex-direction-row justify-content-around flex-wrap mb-10">
    <div
      v-for="chien in this.chiens"
      :key="chien.id"
      class="card"
      style="width: 18rem"
    >
      <img :src="chien.imageUrl" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{{ chien.nom }}</h5>
        <p class="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <button @click="editChien" class="btn btn-warning col-5" type="button">
          <span></span> Voir
        </button>
        <button @click="deleteChien" class="btn btn-danger col-5" type="button">
          <span></span> Supprimer
        </button>
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
      refuge: store.state.refuge,
      refugeId: store.state.refugeId,
      chiens: "",
      selectedDog: "",
    };
  },
  methods: {
    newDog() {
      this.$router.push("/admin/chiens/create");
    },
    editChien(e) {
      store.dispatch("getChiensCarousel", "");
      let selectedDog = e.target.parentNode.childNodes[0].innerHTML;
      for (let i = 0; i < this.chiens.length; i++) {
        if (this.chiens[i].nom === selectedDog) {
          this.selectedDog = this.chiens[i];
        }
      }
      store.dispatch("getSelectedDog", this.selectedDog);
      this.$router.push("/admin/chiens/edit");
      /*********************************** */
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
          location.replace("/admin/chiens/edit");
        });
    },

    deleteChien(e) {
      let selectedDog = e.target.parentNode.childNodes[0].innerHTML;
      for (let i = 0; i < this.chiens.length; i++) {
        if (this.chiens[i].nom === selectedDog) {
          this.selectedDog = this.chiens[i];
        }
      }
      configAxios
        .get(`/chiens/${selectedDog.id}`, {
          where: {
            id: selectedDog.id,
          },
        })
        .then(() => {
          console.log("c'est fait!!!");
          //location.replace("/admin/chiens/edit");
        });
    },
    /************************************ */
  },
  beforeMount() {
    configAxios.get(`chiens/${this.refugeId}`).then((response) => {
      store.dispatch("getChiens", response.data);
      this.chiens = store.state.chiens;
    });
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.card {
  max-width: 25%;
  margin-bottom: 20px;
}
</style>
