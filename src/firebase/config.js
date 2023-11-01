import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyAXto37zaETstM3GY_gpBJpiSHIbpE-oJE",
  authDomain: "fir-clase15.firebaseapp.com",
  projectId: "fir-clase15",
  storageBucket: "fir-clase15.appspot.com",
  messagingSenderId: "448987115406",
  appId: "1:448987115406:web:993b20da7322ccb2107edf"
};


  app.initializeApp(firebaseConfig)

  export const auth = firebase.auth()
  export const storage = app.storage()
  export const db = app.firestore()