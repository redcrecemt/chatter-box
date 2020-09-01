import firebase from "firebase";

const firebaseApp = firebase.initializeApp( {
    apiKey: "AIzaSyBQAMU0eDu6nPI-WSf-uMHXiIy3_BSdfM4",
    authDomain: "chatterbox-e2c5e.firebaseapp.com",
    databaseURL: "https://chatterbox-e2c5e.firebaseio.com",
    projectId: "chatterbox-e2c5e",
    storageBucket: "chatterbox-e2c5e.appspot.com",
    messagingSenderId: "345124685800",
    appId: "1:345124685800:web:d8e4b8dc7217fba358c65d"
  });

  const db=firebaseApp.firestore();
  export default db;