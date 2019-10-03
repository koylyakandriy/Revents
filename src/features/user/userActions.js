import { toastr } from "react-redux-toastr";
import cuid from "cuid";

import {
	asyncErrorAction,
	asyncFinishAction,
	asyncStartAction
} from "../async/asyncActions";

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

export const uploadProfileImageAction = (file, fileName) => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const imageName = cuid();
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;
	const path = `${user.uid}/user_images`;
	const options = {
		name: imageName
	};
	try {
		dispatch(asyncStartAction());
		//  upload the file to firebase storage
		let uploadedFile = await firebase.uploadFile(path, file, null, options);

		//  get url of image
		let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

		//  get userdoc
		let userDoc = await firestore.get(`users/${user.uid}`);

		//  check if user has photo, if not update profile
		if (!userDoc.data().photoURL) {
			await firebase.updateProfile({
				photoURL: downloadURL
			});
			await user.updateProfile({
				photoURL: downloadURL
			});
		}

		//  add image to firestore
		await firestore.add(
			{
				collection: "users",
				doc: user.uid,
				subcollections: [{ collection: "photos" }]
			},
			{
				name: imageName,
				url: downloadURL
			}
		);
		dispatch(asyncFinishAction());
	} catch (err) {
		console.log("err", err);
		dispatch(asyncErrorAction());
	}
};

export const deletePhotoAction = photo => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;
	try {
		await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
		await firestore.delete({
			collection: "users",
			doc: user.uid,
			subcollections: [{ collection: "photos", doc: photo.id }]
		});
	} catch (err) {
		console.log("err", err);
		throw new Error("Problem deleting photo");
	}
};

export const setMainPhotoAction = photo => async (
	dispatch,
	getState,
	{ getFirebase }
) => {
	const firebase = getFirebase();
	try {
		return await firebase.updateProfile({
			photoURL: photo.url
		});
	} catch (err) {
		console.log("err", err);
		throw new Error("Problem setting main photo");
	}
};
