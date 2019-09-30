import { LOGIN_USER, SIGN_OUT_USER } from "./authConstants";

export const loginAction = creds => {
	return {
		type: LOGIN_USER,
		payload: { creds }
	};
};

export const logoutAction = () => {
	return {
		type: SIGN_OUT_USER
	};
};
