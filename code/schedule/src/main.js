import Vue from 'vue'
import Vuetify from 'vuetify'
import DaySpanVuetify from 'dayspan-vuetify'
import Datetime from 'vue-datetime'

import App from './App.vue'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'dayspan-vuetify/dist/lib/dayspan-vuetify.min.css'
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)

Vue.use(Vuetify)

Vue.use(DaySpanVuetify, {
  methods: {
    getDefaultEventColor: () => '#1976d2'
  }
})

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
