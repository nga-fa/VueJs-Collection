import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Report from './views/Report.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Dashboard from './views/Dashboard.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/report',
      name: 'report',
      component: Report,
        props: true,
    },{
      path: '/login',
      name: 'login',
      component: Login,
        props: true,
    },{
      path: '/register',
      name: 'register',
      component: Register,
        props: true,
    },{
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
        props: true,
    },
  ],
});
