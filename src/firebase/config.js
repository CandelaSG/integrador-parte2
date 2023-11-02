import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDe9PKJCSABJ5qOp1JVjrMDcGTCY1fqa4Q",
  authDomain: "integrador-p3.firebaseapp.com",
  projectId: "integrador-p3",
  storageBucket: "integrador-p3.appspot.com",
  messagingSenderId: "46399141008",
  appId: "1:46399141008:web:410914645914aeaffe5415"
};

  app.initializeApp(firebaseConfig)

  export const auth = firebase.auth()
  export const storage = app.storage()
  export const db = app.firestore()