import firebase from "firebase/app"
import 'firebase/firestore'


// const firebaseConfig = {
//     apiKey: "AIzaSyBMADBtVpwuR-v5J5zCCjHdRTLbFJT7Mc4",
//     authDomain: "vuetest-b6af0.firebaseapp.com",
//     projectId: "vuetest-b6af0",
//     storageBucket: "vuetest-b6af0.appspot.com",
//     messagingSenderId: "1086798918776",
//     appId: "1:1086798918776:web:45ec7cd02eeeac56dae98d"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyBKP3_1DJs4W4-UwcQWcuEVcOPEj1EdqrM",
  authDomain: "gdvsocios.firebaseapp.com",
  projectId: "gdvsocios",
  storageBucket: "gdvsocios.appspot.com",
  messagingSenderId: "685886783950",
  appId: "1:685886783950:web:e88e55644dc5be07202b9f"
};
 
  firebase.initializeApp(firebaseConfig);
  

  export const fireauth =  firebase.auth();
  export const firebasedatabase = firebase.firestore();
  
  