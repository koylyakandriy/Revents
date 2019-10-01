import { SIGN_OUT_USER } from "./authConstants";
import { closeModalAction } from "../modals/modalActions";

export const loginAction = creds => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		console.log("firebase:", firebase);
		try {
			await firebase
				.auth()
				.signInWithEmailAndPassword(creds.email, creds.password);
			dispatch(closeModalAction());
		} catch (err) {
			console.log("err", err);
		}
	};
};

export const logoutAction = () => {
	return {
		type: SIGN_OUT_USER
	};
};
