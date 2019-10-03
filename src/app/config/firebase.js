import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDF_-jmv0EqRdMuDHBJ6vHBf8BfaDyiw68",
	authDomain: "revent-35b0d.firebaseapp.com",
	databaseURL: "https://revent-35b0d.firebaseio.com",
	projectId: "revent-35b0d",
	storageBucket: "revent-35b0d.appspot.com",
	messagingSenderId: "444300861838",
	appId: "1:444300861838:web:1a5448668ffe3b3c3984df"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
