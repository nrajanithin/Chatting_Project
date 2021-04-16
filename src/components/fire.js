import firebase from 'firebase'
var firebaseConfig = {
    apiKey: "AIzaSyB329cFeZQCwLaNIifGPmXWyqDLqXXGjtU",
    authDomain: "ccmessage-3bce9.firebaseapp.com",
    projectId: "ccmessage-3bce9",
    storageBucket: "ccmessage-3bce9.appspot.com",
    messagingSenderId: "698198942071",
    appId: "1:698198942071:web:5188ed3ab76444e1c84172",
    databaseURL: "https://ccmessage-3bce9-default-rtdb.firebaseio.com"
  };
const fire = firebase.initializeApp(firebaseConfig);
export default fire;