<template>
  <div class="hello">
    <div class="d-flex flex-direction-row justify-content-around mb-5">
      <div
        v-for="refuge in this.refuges"
        :key="refuge.id"
        class="card"
        style="width: 18rem"
        @click="selectedRefuge"
      >
        <img :src="refuge.imageUrl" class="card-img-top" :alt="refuge.name" />
        <div class="card-body d-flex align-items-end">
          <p class="card-text">{{ refuge.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import configAxios from "../../../config/axios/configAxios";
import store from "../../../store/index";
export default {
  data() {
    return {
      refuges: "",
    };
  },
  methods: {
    createRefuge() {
      this.$router.push("/admin/refuges/create");
    },
    selectedRefuge(e) {
      let selectedRefuge = e.target.parentNode.childNodes[0].alt;
      store.dispatch("getSelectedRefuge", selectedRefuge);
      this.$router.push("/admin/refuges/" + selectedRefuge);
    },
  },
  beforeMount() {
    configAxios.get(`refuge`).then((response) => {
      this.refuges = response.data;
      store.dispatch("getRefuges", this.refuges);
      store.dispatch("getSelectedRefuge", "");
    });
  },
};
</script>

<style lang="scss" scoped>
.card :hover {
  cursor: pointer;
}
.card {
  .card-text {
    font-weight: bold;
    width: 100%;
  }
}
</style>
