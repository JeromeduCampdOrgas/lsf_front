<template>
  <div class="hello">
    <h1>Au sud de l’Espagne…</h1>
    <p id="intro">
      … dans la belle région andalouse, à quelque cent cinquante kilomètres de
      Marbella – le « Saint-Tropez » espagnol –, loin des paillettes, des
      yachts, des plages et des touristes, des dizaines de milliers de lévriers
      galgos sont exterminés chaque année.
    </p>
  </div>
</template>

<script>
import configAxios from "../config/axios/configAxios";
import store from "../store/index";
export default {
  name: "HelloWorld",
  data() {
    return {
      users: "",
      store,
      dogs: "",
    };
  },
  props: {
    msg: String,
  },
  methods: {
    afficheUsers() {
      configAxios.get(`users`).then((response) => {
        this.users = response.data;
        console.log(this.users);
      });
    },
  },
  beforeMount() {
    configAxios.get(`chiens`).then((response) => {
      this.dogs = response.data;
      store.dispatch("getAllDogs", this.dogs);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1 {
  font-weight: bold;
  font-size: 40px;
  color: #888888;
  margin-top: 15px;
  margin-left: 30px;
  font-family: "Play";
  text-shadow: 1px 1px 0 white, 2px 2px 0 rgb(194, 56, 43 / 60%);
  text-align: left;
}
#intro {
  width: 50%;
  margin-top: 15px;
  margin-left: 30px;
  text-align: left;
}
</style>
