// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

import firebase from 'firebase'
import firebaseui from 'firebaseui'
import VueFire from 'vuefire'
import Vuex from 'vuex'



Vue.use(VueFire)
Vue.use(Vuex)
Vue.use(Buefy)

Vue.config.productionTip = false

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";


var uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ]
};

var config = {
    apiKey: "AIzaSyAY3rOqi6SX9NSyOX14DmTt8p2BQyUeP3A",
    authDomain: "ketchup-e0b85.firebaseapp.com",
    databaseURL: "https://ketchup-e0b85.firebaseio.com/"
  };

var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.database()

const store = new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('token'),
    userDetails: JSON.parse(localStorage.getItem(Object.keys(window.localStorage)
           .filter(it => it.startsWith('firebase:authUser'))[0])),
    isPending: false
  },
  actions: {
     login({ commit }, creds) {
       commit(LOGIN); // show spinner

       var provider = new firebase.auth.GoogleAuthProvider();

       firebase.auth().signInWithPopup(provider).then(function(result) {
 
         var token = result.credential.accessToken;

         localStorage.setItem('token', JSON.stringify(token));

         const userKey = Object.keys(window.localStorage)
           .filter(it => it.startsWith('firebase:authUser'))[0];
         const user = userKey ? JSON.parse(localStorage.getItem(userKey)) : undefined;

         commit(LOGIN_SUCCESS, user);
         
         // ...
       }).catch(function(error) {
         // Handle Errors here.
         var errorCode = error.code;
         var errorMessage = error.message;
         // The email of the user's account used.
         var email = error.email;
         // The firebase.auth.AuthCredential type that was used.
         var credential = error.credential;
         // ...
       });

     },
     logout({ commit }) {

        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          localStorage.removeItem("token");
          commit(LOGOUT);
        }).catch(function(error) {
          // An error happened.
        });
     }
   },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    isPending: state => {
      return state.isPending
    },
    getUserDetails: state => {
      return state.userDetails
    }
  },
  mutations: {
    LOGIN (state) {
      state.isLoggedIn = false;
      state.isPending = true;
    },
    LOGIN_SUCCESS (state, payload) {
      state.isLoggedIn = true;
      state.userDetails = payload;
      state.isPending = false;
    },
    LOGOUT (state) {
      state.isLoggedIn = false;
      state.userDetails = null;
    }
  }
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  store: store,
  components: { App }
})
