import firebase from 'firebase'
import firebaseui from 'firebaseui'
import store from '../store'

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

console.log(store);
var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.database()

export default {
      methodOne: function() {
        console.log('one');
      },
      login: function() {

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          var token = result.credential.accessToken;
          localStorage.setItem('token', JSON.stringify(token));

          const userKey = Object.keys(window.localStorage)
            .filter(it => it.startsWith('firebase:authUser'))[0];
          const user = userKey ? JSON.parse(localStorage.getItem(userKey)) : undefined;

          store.commit(LOGIN_SUCCESS, user);
          
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
      logout: function() {
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          localStorage.removeItem("token");
          store.commit(LOGOUT);
        }).catch(function(error) {
          // An error happened.
        });
      }
 };