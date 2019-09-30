import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants";
import { closeModalAction } from "../modals/modalActions";

export const loginAction = creds => {
	return dispatch => {
		dispatch({ type: LOGIN_USER, payload: { creds } });
		dispatch(closeModalAction());
	};
};

export const logoutAction = () => {
	return {
		type: SIGN_OUT_USER
	};
};
