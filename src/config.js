import firebase from 'firebase';
var config = {
   apiKey: "AIzaSyC7GkW3KZMvbakRdzKeDbV-61l1-6UKzE0",
   authDomain: "humbleinnovations-2018.firebaseapp.com",
   databaseURL: "https://humbleinnovations-2018.firebaseio.com",
   projectId: "humbleinnovations-2018",
   storageBucket: "humbleinnovations-2018.appspot.com",
   messagingSenderId: "184206426193"
 };
  firebase.initializeApp(config);

 export const db =firebase.database();
export const auth = firebase.auth();
