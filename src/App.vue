<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAY3rOqi6SX9NSyOX14DmTt8p2BQyUeP3A",
    authDomain: "ketchup-e0b85.firebaseapp.com",
    databaseURL: "https://ketchup-e0b85.firebaseio.com/"
  };

var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.database()

export default {
  name: 'app'
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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  background: map-get($u-colors, 'aqua haze');
}






</style>

