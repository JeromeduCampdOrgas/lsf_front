<template>
  <div class="hello">
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>email</th>
          <th>isAdmin</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in this.users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin }}</td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-success" @click="afficheUsers">Valider</button>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
