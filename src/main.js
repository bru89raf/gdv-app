import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {BootstrapVue, IconsPlugin, FormRatingPlugin, FormSelectPlugin, BFormSelect  } from 'bootstrap-vue';

// import firebase from "firebase/app"
// import 'firebase/firestore'
import { fireauth } from './firebaseDb';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vuelidate from 'vuelidate'

import VueExcelXlsx from 'vue-excel-xlsx';


Vue.config.productionTip = false
Vue.prototype.$emailjscom = 'user_mqgDkBOmSvWzPbckGjQPC';
Vue.prototype.$emailS = 'service_gdv_mail';
Vue.prototype.$emailT = 'template_1dftzlv';
Vue.prototype.$emailTC = 'template_7vewybp';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(FormRatingPlugin)
Vue.use(FormSelectPlugin)

Vue.use(Vuelidate)

Vue.component('b-form-select', BFormSelect)

Vue.use(VueExcelXlsx);






let app;

fireauth.onAuthStateChanged(user => {
// fireauth.onAuthStateChanged(() => {
  //  console.log("userEmailLogin", user.email);

  Vue.prototype.$emailLoginOK = user.email;

  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});


// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
