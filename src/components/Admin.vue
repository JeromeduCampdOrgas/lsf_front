<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      id="navbarDropdown"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      Administration
    </a>
    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
      <router-link class="dropdown-item" to="/admin/users"
        >Utilisateurs</router-link
      >
      <router-link class="dropdown-item" to="/admin/refuges"
        >Refuges</router-link
      >
      <li><hr class="dropdown-divider" /></li>
      <li>
        <a class="dropdown-item" href="#">Something else here</a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: "administration",
};
</script>

<style></style>
