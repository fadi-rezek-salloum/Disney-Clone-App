import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCl3Y5-_EHy7A0qi4lKwhHcziVtgyW_RlI",
    authDomain: "disneycloneapp-f9250.firebaseapp.com",
    projectId: "disneycloneapp-f9250",
    storageBucket: "disneycloneapp-f9250.appspot.com",
    messagingSenderId: "1066282905735",
    appId: "1:1066282905735:web:582a37db2c83474d3bc822",
    measurementId: "G-RXJH81R7MX"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = app.firestore();
const storage = firebase.storage

export { auth, provider, storage };
export default db;