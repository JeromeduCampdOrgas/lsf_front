<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png" />-->
    <ACCUEIL msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import ACCUEIL from "@/components/Accueil.vue";

export default {
  name: "Accueil",
  components: {
    ACCUEIL,
  },
};
</script>
