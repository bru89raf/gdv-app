import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

import Login from '../views/Login.vue'

import Socio from '../views/Socio.vue'

import SocioList from '../views/SocioList.vue'
import SocioListPrint from '../views/SocioListPrint.vue'

import SocioEdit from '../views/SocioEdit.vue'

import SaveSocioCota from '../views/RegisEditCotaOnSocio.vue'

import Register from '../views/Register.vue'

import CotasList from '../views/cotasList.vue'

import Pacotes from '../views/Pacotes.vue'
import PacotesList from '../views/PacotesList.vue'
import PacotesEdit from '../views/PacotesEdit.vue'


import firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/socio',
    name: 'Socio',
    component: Socio
    , meta : {requiresAuth : true}
  },
  {
    path: '/socioList',
    name: 'SocioList',
    component: SocioList
    , meta : {requiresAuth : true}
  },
  {
    path: '/socioListPrint',
    name: 'SocioListPrint',
    component: SocioListPrint
    , meta : {requiresAuth : true}
  },

  {
    path: '/socioEdit/:id',
    name: 'SocioEdit',
    component: SocioEdit
    , meta : {requiresAuth : true}
  },

  {
    path: '/cotasList',
    name: 'cotasList',
    component: CotasList
    , meta : {requiresAuth : true}
  },

  {
    path: '/saveSocioCota/:id',
    name: 'saveSocioCota',
    component: SaveSocioCota
    , meta : {requiresAuth : true}
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/pacotes',
    name: 'Pacotes',
    component: Pacotes
    , meta : {requiresAuth : true}

  },
  {
    path: '/pacotesList',
    name: 'PacotesList',
    component: PacotesList
    , meta : {requiresAuth : true}
  },
  {
    path: '/pacotesEdit/:id',
    name: 'PacotesEdit',
    component: PacotesEdit
    , meta : {requiresAuth : true}
  },
  
  {
    path: '/register',
    name: 'Register',
    component: Register
    , meta : {requiresAuth : true}
  },




  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach( (to, from, next ) => {
    const requiresAuth = to.matched.some( record => record.meta.requiresAuth);
    const isAuthenticated = firebase.auth().currentUser;

    if(requiresAuth && !isAuthenticated){
      next("/login");
    }else{
      next();
    }


  });



export default router
