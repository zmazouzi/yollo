import firebase from 'firebase'
import firebaseapp from 'firebase/app'

let config =  {
	apiKey: "AIzaSyB5bbDHeLR5rON10cbHXyPy-xTDKnLnfKk",
	authDomain: "yollo-df7e2.firebaseapp.com",
	databaseURL: "https://yollo-df7e2.firebaseio.com",
	projectId: "yollo-df7e2",
	storageBucket: "yollo-df7e2.appspot.com",
	messagingSenderId: "691134800305"
};

export const fire = firebase.initializeApp(config);

// RTDB config
export const db =  firebaseapp.database();

//fireStore Config
let firestoreInit = firebaseapp.firestore();
const settings = {timestampsInSnapshots: true};
firestoreInit.settings(settings);

export const firestore = firestoreInit;



// auth config
export const auth =  fire.auth();

firebaseapp.messaging().usePublicVapidKey("BLL4fDZOzCkJm8x7tagUJTXLt_02JykvQ4dxxsX9Jn2RqflNvN3D9CqtVLS3MrHwpyj-xBqZ5dOOrDKOMAXotuU")
// messaging config
export const messaging = firebaseapp.messaging();



// querySnapshot to list

export function snapShotToList(querySnapshot) {
	let list = [];
	querySnapshot.forEach( doc => {
		list.push({ uid : doc.id, data : doc.data()});
	});
	return list;
};