<template>
  <div id="nav">
    <b-navbar class="navbar-static-top" toggleable="lg" type="light" variant="secondary">
      <b-navbar-brand href="#"><router-link class="link" to="/">Email Verifier</router-link></b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown class="link" text="Lang">
                <b-dropdown-item href="#">EN</b-dropdown-item>
                <b-dropdown-item href="#">FR</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item style="color: white !important;" class="link" to="/login">Login</b-nav-item>
            <b-nav-item style="color: white !important;" to="/register">Register</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
    export default {
        name: "Headr"
    }
</script>

<style scoped>
.link{
  text-decoration: none;
  text-underline: none;
  color: white;
}

  #nav{
    position: relative;
  }
</style>
