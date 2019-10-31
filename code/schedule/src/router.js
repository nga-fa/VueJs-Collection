import Vue from 'vue'
import Router from 'vue-router'

import Calendr from './views/Calendr.vue'
import About from './views/About.vue'
import New from './views/New.vue'
import List from './views/List.vue'
import Welcome from './views/Welcome.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: Welcome
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendr
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/new',
      name: 'new',
      component: New
    },
    {
      path: '/list',
      name: 'list',
      component: List
    }
  ]
})
