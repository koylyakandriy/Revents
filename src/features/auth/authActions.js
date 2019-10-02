import { SubmissionError, reset } from "redux-form";
import { toastr } from "react-redux-toastr";

import { closeModalAction } from "../modals/modalActions";

export const loginAction = creds => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		try {
			await firebase
				.auth()
				.signInWithEmailAndPassword(creds.email, creds.password);
			dispatch(closeModalAction());
		} catch (err) {
			throw new SubmissionError({
				_error: err.message
			});
		}
	};
};

export const registerUserAction = user => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firebase = getFirebase();
	const firestore = getFirestore();

	try {
		//  create the user in auth
		let createdUser = await firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password);

		//  update the auth profile
		await createdUser.user.updateProfile({
			displayName: user.displayName
		});

		//  create a new profile in firestore
		let newUser = {
			displayName: user.displayName,
			createdAt: firestore.FieldValue.serverTimestamp()
		};
		await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
		dispatch(closeModalAction());
	} catch (err) {
		throw new SubmissionError({
			_error: err.message
		});
	}
};

export const socialLoginAction = selectedProvider => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	try {
		dispatch(closeModalAction());
		const user = await firebase.login({
			provider: selectedProvider,
			type: "popup"
		});
		if (user.additionalUserInfo.isNewUser) {
			await firestore.set(`users/${user.user.uid}`, {
				displayName: user.profile.displayName,
				photoURL: user.profile.avatarUrl,
				createdAt: firestore.FieldValue.serverTimestamp()
			});
		}
	} catch (err) {
		console.log("err", err);
	}
};

export const updatePasswordAction = creds => async (
	dispatch,
	getState,
	{ getFirebase }
) => {
	const firebase = getFirebase();
	const user = firebase.auth().currentUser;
	try {
		await user.updatePassword(creds.newPassword1);
		await dispatch(reset("account"));
		toastr.success("Success", "Your password has been updated");
	} catch (err) {
		throw new SubmissionError({
			_error: err.message
		});
	}
};
