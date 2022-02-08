<template>
  <div
    class="container-fluid d-flex flex-direction-row justify-content-between"
  >
    <div class="gauche col-10">
      <div class="entete d-flex flex-direction-row justify-content-around">
        <h1>{{ this.refuge }}</h1>

        <div class="entete-img">
          <img :src="this.refugeImg" :alt="this.refuge" />
        </div>
      </div>
      <div
        class="d-flex flex-direction-row justify-content-around flex-wrap mb-8"
      >
        <div v-for="chien in this.chiens" :key="chien.id" class="card">
          <div class="card-img">
            <img :src="chien.imageUrl" class="card-img-top" alt="..." />
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ chien.nom }}</h5>

            <button
              @click="editChien"
              class="btn btn-warning col-5"
              type="button"
            >
              Voir
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="droite col-2">
      <h5>Nos refuges</h5>
      <div class="sidebar">
        <div
          class="sidebar-link d-flex flex-direction-row justify-content-around"
          v-for="refuge in this.refuges"
          :key="refuge.id"
          @click="refugeSelect"
        >
          <div class="sidebar-img">
            <img :src="refuge.imageUrl" :alt="refuge.name" />
          </div>
          <div>
            <p>{{ refuge.name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import configAxios from "../../config/axios/configAxios";
export default {
  data() {
    return {
      refuge: store.state.refuge,
      refugeId: store.state.refugeId,
      refuges: store.state.refuges,
      refugeImg: "",
      chiens: store.state.chiens,
      selectedDog: "",
    };
  },
  methods: {
    refugeSelect(e) {
      let page =
        e.target.parentNode.parentNode.childNodes[1].childNodes[0].innerHTML;
      store.dispatch("getSelectedRefuge", page);
      for (let i = 0; i < this.refuges.length; i++) {
        if (this.refuges[i].name == page) {
          this.refugeId = this.refuges[i].id;
          this.refuge = this.refuges[i].name;
          store.dispatch("getRefugeId", this.refuges[i].id);
        }
      }
      for (let i = 0; i < this.refuges.length; i++) {
        if (this.refuges[i].name == this.refuge) {
          this.refugeImg = this.refuges[i].imageUrl;
        }
      }
      configAxios.get(`chiens/${this.refugeId}`).then((response) => {
        store.dispatch("getChiens", response.data);

        this.chiens = store.state.chiens;
      });

      this.$router.push("/refuges/" + page);
    },
    editChien(e) {
      store.dispatch("getChiensCarousel", "");
      let chien = e.target.parentNode.childNodes[0].innerHTML;
      for (let i = 0; i < this.chiens.length; i++) {
        if (this.chiens[i].nom === chien) {
          this.selectedDog = this.chiens[i];
          store.dispatch("getSelectedDog", this.chiens[i]);
        }
      }

      configAxios
        .get(`/chiens/carousel/${this.selectedDog.id}`)
        .then((response) => {
          console.log(response.data.length);
          if (response.data.length > 0) {
            store.dispatch("getChiensCarousel", response.data);
            this.$router.push("/refuges/" + this.refuge + "/" + chien);
          } else {
            this.$router.push("/refuges/" + this.refuge + "/" + chien);
            console.log("Pas de carousel for this dog");
          }
        });
    },
  },
  beforeMount() {
    for (let i = 0; i < this.refuges.length; i++) {
      if (this.refuges[i].name == this.refuge) {
        this.refugeImg = this.refuges[i].imageUrl;
      }
    }
    configAxios.get(`chiens/${this.refugeId}`).then((response) => {
      store.dispatch("getChiens", response.data);

      this.chiens = store.state.chiens;
    });
  },
};
</script>

<style lang="scss" scoped>
.gauche {
  & .entete {
    margin-bottom: 30px;
    & .entete-img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      & img {
        height: 100%;
      }
    }
  }
  .card {
    height: 350px;
    margin: 25px 20px;
    width: 25%;

    & .card-img {
      height: 70%;
      object-fit: cover;
      & img {
        max-height: 100%;
      }
    }
  }
}
.droite {
  min-height: 100vh;
  background-image: linear-gradient(
    to right bottom,
    #b5b4b4,
    #b1adae,
    #aca7aa,
    #a6a0a7,
    #9d9ba5,
    #9ea0ab,
    #9fa5b0,
    #a0aab4,
    #aebac2,
    #bdcbcf,
    #cddbdc,
    #dfebea
  );
  border-radius: 10px;
  .sidebar-link {
    margin-bottom: 20px;
    & .sidebar-img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      & img {
        height: 100%;
      }
    }
  }
}
</style>
