<template>
  <div
    class="container-fluid d-flex flex-direction-row justify-content-between"
  >
    <div class="gauche col-8">
      <button class="btn btn-success" @click="createChien">
        Nouveau chien
      </button>
      <div class="entete d-flex flex-direction-row justify-content-around">
        <h1>{{ this.refuge }}</h1>
        <div class="entete-img">
          <img :src="this.refugeImg" :alt="this.refuge" />
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
        >
          <div class="sidebar-img">
            <img :src="refuge.imageUrl" :alt="refuge.name" />
          </div>
          <p>{{ refuge.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../../store/index";
export default {
  data() {
    return {
      refuge: store.state.refuge,
      refuges: store.state.refuges,
      refugeImg: "",
    };
  },
  methods: {
    createChien() {
      this.$router.push("/admin/chiens/create");
    },
  },
  beforeMount() {
    for (let i = 0; i < this.refuges.length; i++) {
      if (this.refuges[i].name == this.refuge) {
        this.refugeImg = this.refuges[i].imageUrl;
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.gauche {
  & .entete {
    & .entete-img {
      width: 50px;
      height: 50px;
      object-fit: cover;
      & img {
        height: 100%;
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
