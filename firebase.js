import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC2R_b8nySoyy0ljC1JzrNWla3Tz7Ye0pA",
    authDomain: "ecommerce-withstripe.firebaseapp.com",
    projectId: "ecommerce-withstripe",
    storageBucket: "ecommerce-withstripe.appspot.com",
    messagingSenderId: "769265959282",
    appId: "1:769265959282:web:0aacb02c2746850d4dddeb"
};


const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();


export default db;