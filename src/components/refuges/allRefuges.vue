<template>
  <div class="hello">
    <div class="d-flex flex-direction-row justify-content-around mb-5">
      <h1>Tous les refuges</h1>
      <button class="btn btn-success" @click="createRefuge">
        Nouveau refuge
      </button>
    </div>
  </div>
</template>

<script>
//import configAxios from "../../config/axios/configAxios";
export default {
  methods: {
    createRefuge() {
      this.$router.push("/admin/refuges/create");
    },
  },
};
</script>

<style></style>
