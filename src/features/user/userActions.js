import { toastr } from "react-redux-toastr";

export const updateProfileAction = user => async (
	dispatch,
	getState,
	{ getFirebase }
) => {
	const firebase = getFirebase();
	const { isLoaded, isEmpty, ...updatedUser } = user;
	try {
		await firebase.updateProfile(updatedUser);
		toastr.success("Success", "Your  profile has been updated");
	} catch (err) {
		console.log("err", err);
	}
};
