import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBMADBtVpwuR-v5J5zCCjHdRTLbFJT7Mc4",

  authDomain: "vuetest-b6af0.firebaseapp.com",

  projectId: "vuetest-b6af0",

  storageBucket: "vuetest-b6af0.appspot.com",

  messagingSenderId: "1086798918776",

  appId: "1:1086798918776:web:45ec7cd02eeeac56dae98d"

};
 
firebase.initializeApp(firebaseConfig);
  

export const fireauth =  firebase.auth();
export const firebasedatabase = firebase.firestore();
  
  