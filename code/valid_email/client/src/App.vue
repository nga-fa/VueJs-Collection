<template>
  <div id="app">
    <Headr/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
    import Headr from "./components/Headr.vue";
    import Footer from "./components/Footer";

    export default {
        components: {
            Headr: Headr,
            Footer: Footer,
      }
    }
</script>

<style>

</style>
