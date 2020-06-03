const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");

const config = {
  apiKey: "AIzaSyAPmKqj9lSLOJEnTOn-fl23OBrc15UbXBw",
  authDomain: "sarpcolombia-3c64c.firebaseapp.com",
  databaseURL: "https://sarpcolombia-3c64c.firebaseio.com",
  projectId: "sarpcolombia-3c64c",
  storageBucket: "sarpcolombia-3c64c.appspot.com",
  messagingSenderId: "1039099622903",
  appId: "1:1039099622903:web:d2fb5841bbde412d486af2",
  measurementId: "G-2F1BTJ49H3"
};

// Initialize Firebase
firebase.initializeApp(config);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, db, auth, storage }