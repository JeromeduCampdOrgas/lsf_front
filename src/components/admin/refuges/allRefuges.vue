<template>
  <div class="hello">
    <div class="d-flex flex-direction-row justify-content-around mb-5">
      <h1>Tous les refuges</h1>
      <button class="btn btn-success" @click="createRefuge">
        Nouveau refuge
      </button>
    </div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="image">Logo</th>
          <th>Nom</th>

          <th id="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="refuge in this.refuges" :key="refuge.id">
          <td class="image">
            <img :src="refuge.imageUrl" :alt="refuge.name" />
          </td>
          <td>{{ refuge.name }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="editRefuge"
            >
              Visualiser
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="deleteUser"
            >
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>
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
      this.$router.push("/admin/refuges/create" + selectedRefuge);
    },
    editRefuge(e) {
      let selectedRefuge =
        e.target.parentNode.parentNode.childNodes[1].innerHTML;

      store.dispatch("getSelectedRefuge", selectedRefuge);
      store.dispatch("getModif", true);
      this.$router.push("/admin/refuges/update");
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
table {
  min-width: 98%;
  margin: auto;
  & thead {
    font-weight: bold;
    background: linear-gradient(rgb(243, 233, 241), #9667da);
  }
}
table,
th,
td {
  height: 30px;
  border: 1px black solid;
  border-collapse: collapse;
  table-layout: fixed;
}
.image {
  width: 100px;
  object-fit: cover;
  & img {
    height: 300%;
  }
}
</style>
