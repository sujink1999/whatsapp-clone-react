// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase"
const firebaseConfig = {
    apiKey: "AIzaSyBRocBDBypKuM_i8Fr6Cf3EakPHtH7sufc",
    authDomain: "whatsapp-clone-42b04.firebaseapp.com",
    projectId: "whatsapp-clone-42b04",
    storageBucket: "whatsapp-clone-42b04.appspot.com",
    messagingSenderId: "687116290016",
    appId: "1:687116290016:web:ff2b5f9098a898927acd85",
    measurementId: "G-YDK4V73REY"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;