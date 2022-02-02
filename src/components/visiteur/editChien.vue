<template>
  <h1>Fiche chien</h1>
</template>

<script>
import store from "../../store/index";
export default {
  data() {
    return {
      refuge: store.state.refuge,
    };
  },
};
</script>

<style></style>
