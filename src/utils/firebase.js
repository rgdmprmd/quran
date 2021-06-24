import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCLaLSq4noUIWqYE38iNdH8xbFGw0KH_lA",
	authDomain: "bdcode-quran.firebaseapp.com",
	projectId: "bdcode-quran",
	storageBucket: "bdcode-quran.appspot.com",
	messagingSenderId: "780756997101",
	appId: "1:780756997101:web:32b460aadcd137ac21cde4",
	measurementId: "G-G2XRXP8NXC",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
