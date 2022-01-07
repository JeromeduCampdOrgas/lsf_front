<template>
  <div class="hello">
    <div class="d-flex flex-direction-row justify-content-around mb-5">
      <h1>Tous les inscrits</h1>
      <button class="btn btn-success" @click="createUser">
        Créer un compte
      </button>
    </div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th>Id</th>
          <th>Username</th>
          <th>email</th>
          <th>isAdmin</th>
          <th id="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in this.users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin }}</td>
          <td>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="editUser"
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
  name: "adminUsers",
  data() {
    return {
      users: "",
      selectedUser: {
        userId: "",
        username: "",
        userEmail: "",
        isAdmin: "",
      },
    };
  },
  props: {
    msg: String,
  },
  methods: {
    createUser() {
      this.$router.push("/admin/users/create");
    },
    editUser(e) {
      let elementId = e.target.parentNode.parentNode.childNodes[0].innerHTML;
      let elementUsername =
        e.target.parentNode.parentNode.childNodes[1].innerHTML;
      let elementUserEmail =
        e.target.parentNode.parentNode.childNodes[2].innerHTML;
      let elementUserisAdmin =
        e.target.parentNode.parentNode.childNodes[3].innerHTML;
      this.selectedUser.userId = elementId;
      this.selectedUser.username = elementUsername;
      this.selectedUser.userEmail = elementUserEmail;
      this.selectedUser.isAdmin = elementUserisAdmin;
      store.dispatch("getSelectedUser", this.selectedUser);

      this.$router.push("/admin/users/edit");
    },
    deleteUser(e) {
      let isAdmin = store.state.isAdmin;
      if (isAdmin === "isAdmin") {
        let elementId = e.target.parentNode.parentNode.childNodes[0].innerHTML;
        if (confirm("Tu veux vraiment supprimer?")) {
          configAxios.delete(`admin/users/${elementId}`);

          configAxios.get(`users`).then((response) => {
            this.users = response.data;
            store.dispatch("getUsers", this.users);
          });
          e.target.parentNode.parentNode.remove();
          this.$router.push("/admin/users");
          console.log("Le compte ayant pour id " + elementId + " est supprimé");
        } else {
          ("C'est sauvegardé");
        }
      } else {
        console.log("Vous n'avez pas les droits pour cette action");
      }
      //console.log(e.target.parentNode.parentNode.childNodes[0].innerHTML);
    },
  },
  beforeMount() {
    configAxios.get(`users`).then((response) => {
      this.users = response.data;
      store.dispatch("getUsers", this.users);
    });
  },
  updated() {},
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
.btn {
  font-size: 0.8rem;
  margin: 5px;
}
#actions {
  width: 18%;
}
td {
  border: 1px black dotted;
}
</style>
