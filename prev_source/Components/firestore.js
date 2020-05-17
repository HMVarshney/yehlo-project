import firebase from 'firebase'

var firebaseConfig = {
  apiKey: "AIzaSyCbuPPP7Sl-tjyC-QvYKeV6m6qkA5fdNb8",
  authDomain: "yehlo-project1.firebaseapp.com",
  databaseURL: "https://yehlo-project1.firebaseio.com",
  projectId: "yehlo-project1",
  storageBucket: "yehlo-project1.appspot.com",
  messagingSenderId: "363972537625",
  appId: "1:363972537625:web:8be0e5b4c7d8a68e4b6988",
  measurementId: "G-WGYS2ZDVWE"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const storage = firebase.storage()

  export {storage, firebase as default}
