import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBY98rxRGDxP-_Aryp-VU47br-dI2UdHIs",
    authDomain: "ecommerce-e2c5a.firebaseapp.com",
    projectId: "ecommerce-e2c5a",
    storageBucket: "ecommerce-e2c5a.appspot.com",
    messagingSenderId: "65601590925",
    appId: "1:65601590925:web:aeb89594eafda5fa93f4c4"
};


const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const db = app.firestore();


export default db;