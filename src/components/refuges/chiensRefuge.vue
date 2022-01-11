<template>
  <h1>Refuge sélectionné: {{ this.refuge }}</h1>
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
