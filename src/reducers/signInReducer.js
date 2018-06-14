
export default function signInReducer(state = {},{type,payload}) {
	switch(type) {
		case "SIGN_IN_SUCCESS":
			return payload;
		case "SIGN_IN_ERROR":
			return payload;
		case "SIGNING_IN":
			return payload;
		default:
			return state
	}
}