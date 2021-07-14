import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyB_WHEMl33WLvxWpIgsThf5IEoJpkd7F3E",
  authDomain: "chatting-41976.firebaseapp.com",
  projectId: "chatting-41976",
  storageBucket: "chatting-41976.appspot.com",
  messagingSenderId: "953847033845",
  appId: "1:953847033845:web:31164fed11b6b9663cbabc",
  databaseURL:"https://chatting-41976-default-rtdb.firebaseio.com/"
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;