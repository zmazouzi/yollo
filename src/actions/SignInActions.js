import jwtDecode from 'jwt-decode'
import {auth, firestore} from "../fire";


export const signInSuccess = (payload) => {
	return {type: "SIGN_IN_SUCCESS", payload}
};

export const signInError = (payload) => {
	return {type: "SIGN_IN_ERROR", payload}
};

export const signingIn = (payload) => {
	return {type: "SIGNING_IN", payload}
};

export const signIn = (googleyolo) => {
	return dispatch => {
		dispatch(signingIn({signingIn: true, signedIn: false}))
		auth.onAuthStateChanged(async user => {
			if (user) {
				// User is signed in.
				// alert("signedIn");
				const userSnap = await firestore.collection("users").doc(user.uid).get();
				dispatch(signInSuccess({userData: userSnap.data(), signedIn: true, signingIn: false}))
			}
			else {
				// User is signed out.
				dispatch(signInError({signedIn: false, signingIn: false}));
				alert("signed out");
				const credentials = await signInWithYolo(googleyolo);

				const userData = jwtDecode(credentials.idToken);
				console.log(userData);
				const {email, picture, name} = userData;

				auth.createUserWithEmailAndPassword(email, email)
					.then(async res => {
						console.log("account", res);
						await firestore.collection("users").doc(res.user.uid).set({email, picture, name})


					})
					.catch(err => {
						if (err.code === 'auth/email-already-in-use') {
							auth.signInWithEmailAndPassword(email, email)
						}
					})
			}
		});
	}
};


export function signInWithYolo(googleyolo) {
	// The 'googleyolo' object is ready for use.

	const hintPromise = googleyolo.hint({
		supportedAuthMethods: [
			"https://accounts.google.com"
		],
		supportedIdTokenProviders: [
			{
				uri: "https://accounts.google.com",
				clientId: "48532707235-09sqliuj7blmj2r4ap0pb03icejto0tv.apps.googleusercontent.com"
			}
		]
	});

	return hintPromise

}