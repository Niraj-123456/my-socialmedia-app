import firebase from 'firebase'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9YK9KVuNmN1q-HfE3eewFOy98PwxDh_A",
    authDomain: "social-media-app-979b2.firebaseapp.com",
    projectId: "social-media-app-979b2",
    storageBucket: "social-media-app-979b2.appspot.com",
    messagingSenderId: "453114933250",
    appId: "1:453114933250:web:0acf134c69bcae378cb71b"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, storage, provider};
  export default db;
