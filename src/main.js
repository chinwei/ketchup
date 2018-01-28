// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import auth from './auth'
import store from './store'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import firebase from 'firebase'
import firebaseui from 'firebaseui'
import VueFire from 'vuefire'
import Vuex from 'vuex'



Vue.use(VueFire)
Vue.use(Buefy)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store: store,
  auth: auth,
  components: { App }
})
