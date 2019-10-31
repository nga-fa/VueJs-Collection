<template>
  <div id="app">
    <myHeader/>
    <router-view/>
    <myFooter/>
  </div>
</template>

<script>

import myHeader from './components/Header'
import myFooter from './components/Footer'

export default {
  name: 'app',
  components: {
    myHeader,
    myFooter
  }
}
</script>
