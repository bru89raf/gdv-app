import firebase from "firebase/app"
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
 
firebase.initializeApp(firebaseConfig);
  

export const fireauth =  firebase.auth();
export const firebasedatabase = firebase.firestore();
  
  