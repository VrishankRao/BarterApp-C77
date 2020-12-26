import firebase from 'firebase';
require("@firebase/firestore");


var firebaseConfig = {
    apiKey: "AIzaSyDL_cFz3L5aY9-YoXg-CYbJ0J-AVQRrydc",
    authDomain: "barterapp-dfb06.firebaseapp.com",
    databaseURL: "https://barterapp-dfb06.firebaseio.com",
    projectId: "barterapp-dfb06",
    storageBucket: "barterapp-dfb06.appspot.com",
    messagingSenderId: "144981953143",
    appId: "1:144981953143:web:8a234ec15b6b82d8df1472"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
