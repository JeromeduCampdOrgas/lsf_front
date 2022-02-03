<template>
  <h1>Fiche chien</h1>

  <div class="compteur">
    {{ this.count }}<button @click="compteur">click</button>
  </div>
  <!--<p>{{ this.carousel[1] }}</p>-->
  <div class="image">
    <img
      :src="this.carousel[this.count].images"
      alt=""
      v-if="this.carousel.length > 0"
    />
    <!--<p v-for="elem in this.carousel" :key="elem">{{ elem }}</p>-->
  </div>
</template>

<script>
import store from "../../store/index";
//import configAxios from "../../config/axios/configAxios";
export default {
  data() {
    return {
      refuge: store.state.refuge,
      carousel: store.state.chiensCarousel,
      count: 0,
    };
  },
  methods: {
    compteur() {
      if (this.count + 2 > this.carousel.length) {
        this.count = 0;
      } else {
        this.count = this.count += 1;
      }
    },
  },
  beforeMount() {
    /*let chienId = store.state.selectedDog.id;
    configAxios.get(`/chiens/carousel/${chienId}`).then((response) => {
      console.log(response.data);
      store.dispatch("getChiensCarousel", response.data);
    });*/
  },
};
</script>

<style lang="scss" scoped>
.compteur {
  width: 50px;
  height: 50px;
  border: 1px black solid;
}
.image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  & img {
    height: 100%;
  }
}
</style>
