<template>
  <div id="app" style="padding-top: 90px;">
    <div class="app-header">
      <div></div>
      <div class="icon header__icon">
        <svg>
          <use href="/static/images/sprites.svg#tomato"></use>
        </svg>
      </div>
      <div>
        <button 
          :class="{'is-loading': isPending}"
          v-if="!isLoggedIn" 
          @click="$store.dispatch('login');" 
          class="button">Sign In</button>
        <button v-if="isLoggedIn" @click="$store.dispatch('logout')" class="button">Sign Out</button>
      </div>
      

    </div>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
import firebaseui from 'firebaseui'

export default {
  name: 'app',
  data() {
    return {
    }
  },
  created() {
    this.authListener();
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    isPending () {
      return this.$store.getters.isPending
    },
    userDetails () {
      return this.$store.getters.getUserDetails
    }
  },
  methods: {
    authListener() {
      firebase.auth().onAuthStateChanged(function(user){
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          console.log('auth changed!', user);
          // [END_EXCLUDE]
        } else {
          // User is signed out.
        }
      });
    }
    
  }
}
</script>

<style lang="scss">
$u-spacings: (
  xxl : 4.8px,
  xl  : 3.2px,
  l   : 2.4px,
  s   : 1.6px,
  xs   : 0.8px,
  0   : 0
) !default;

$u-font-size: (
  1: 3.2px,
  2: 2.1px,
  3: 1.8px,
  4: 1.6px,
  5: 1.4px,
  6: 1.3px,
  7: 1.1px
) !default;

$u-colors: (
  'aqua haze': #f6f9fa
) !default;


body {
  font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
}

.app-header {
  height: 50px;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #f3f3f3 solid;
  box-shadow: 0 0 4px #eee;
  position: fixed;
  top: 0;
  width: 100vw;
  background: white;
  z-index: 9999;
}

.container {
  padding: 8px;
}





</style>

