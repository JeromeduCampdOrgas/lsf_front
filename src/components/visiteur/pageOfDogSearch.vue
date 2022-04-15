<template>
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th>refuge</th>
        <th>nom</th>
        <th>age</th>
        <th>photo</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="dog in this.$store.state.dogsFound" :key="dog.id">
        <td>{{ dog.refugeId }}</td>
        <td>{{ dog.nom }}</td>
        <td>{{ dog.age }}</td>
        <td class="image"><img :src="dog.imageUrl" alt="" /></td>
        <td><button class="btn btn-success" @click="voir">Voir</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import store from "../../store";
import configAxios from "../../config/axios/configAxios";
export default {
  data() {
    return {
      selectedDog: store.selectedDog,
      refuge: "",
      chien: "",
    };
  },
  methods: {
    voir(e) {
      let refugeId = e.target.parentNode.parentNode.childNodes[0].innerHTML;
      let dog = e.target.parentNode.parentNode.childNodes[1].innerHTML;
      store.dispatch("getChiensCarousel", "");
      for (let i = 0; i < this.$store.state.allDogs.length; i++) {
        if (
          this.$store.state.allDogs[i].nom == dog &&
          this.$store.state.allDogs[i].refugeId == refugeId
        ) {
          this.chien = this.$store.state.allDogs[i].nom;
          for (let j = 0; j < this.$store.state.refuges.length; j++) {
            if (this.$store.state.refuges[j].id == refugeId) {
              this.refuge = this.$store.state.refuges[j].name;
              store.dispatch(
                "getSelectedRefuge",
                this.$store.state.refuges[j].name
              );
            }
          }
          store.dispatch("getSelectedDog", this.$store.state.allDogs[i]);
          store.dispatch("getRefugeId", refugeId);
        }

        //this.$router.push("/refuges/" + this.refuge + "/" + this.chien);
      }
      let chienId = this.$store.state.selectedDog.id;
      console.log("test");
      console.log(this.$store.state.selectedDog.id);
      configAxios.get(`/chiens/carousel/${chienId}`).then((response) => {
        console.log(response.data.length);
        if (response.data.length > 0) {
          store.dispatch("getChiensCarousel", response.data);
          this.$router.push("/refuges/" + this.refuge + "/" + this.chien);
        } else {
          this.$router.push("/refuges/" + this.refuge + "/" + this.chien);
          console.log("Pas de carousel for this dog");
        }
      });
    },
  },

  mounted() {},
};
</script>

<style lang="scss" scoped>
table,
th,
td {
  height: 100px;
  border: 1px black solid;
  border-collapse: collapse;
  vertical-align: middle;
  table-layout: fixed;
}
.image {
  width: 100px;
  object-fit: cover;
  & img {
    height: 300%;
  }
  & img:hover {
    cursor: pointer;
  }
}
</style>
