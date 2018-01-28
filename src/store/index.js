import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../auth'

Vue.use(Vuex)

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const state = {
  isLoggedIn: localStorage.getItem('token'),
  userDetails: JSON.parse(localStorage.getItem(Object.keys(window.localStorage)
         .filter(it => it.startsWith('firebase:authUser'))[0])),
  isPending: false
  
}

const getters = {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    isPending: state => {
      return state.isPending
    },
    getUserDetails: state => {
      return state.userDetails
  }
}

const mutations = {
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

const actions = {

  login({ commit }, creds) {
    commit(LOGIN); // show spinner
    auth.login();

  },
  logout({ commit }) {
    commit(LOGOUT);
    auth.logout();
  }
  
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
