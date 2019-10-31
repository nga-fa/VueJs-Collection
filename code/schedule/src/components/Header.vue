<template>
<div style="position: relative">
      <b-nav>
        <b-nav-item><router-link to="/">Home</router-link></b-nav-item>
        <b-nav-item><router-link to="/about">About</router-link></b-nav-item>
        <b-nav-item><router-link to="/new">New</router-link></b-nav-item>
        <b-nav-item><router-link to="/list">List</router-link></b-nav-item>
      </b-nav>
    </div>
</template>

<script>
export default {
  name: 'myHeader'
}
</script>

<style lang="scss">
#app {
  font-family: 'Be Vietnam', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
