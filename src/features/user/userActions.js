import { toastr } from "react-redux-toastr";
import cuid from "cuid";

import {
	asyncErrorAction,
	asyncFinishAction,
	asyncStartAction
} from "../async/asyncActions";
import firebase from "../../app/config/firebase";
import { FETCH_USER_EVENTS } from "../event/eventConstants";

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
		console.log(err);
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
		console.log(err);
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
		console.log(err);
		throw new Error("Problem deleting photo");
	}
};

export const setMainPhotoAction = photo => async (dispatch, getState) => {
	const firestore = firebase.firestore();
	const user = firebase.auth().currentUser;
	const today = new Date();
	let userDocRef = firestore.collection("users").doc(user.uid);
	let eventAttendeeRef = firestore.collection("event_attendee");

	try {
		dispatch(asyncStartAction());
		let batch = firestore.batch();

		batch.update(userDocRef, { photoURL: photo.url });

		let eventQuery = await eventAttendeeRef
			.where("userUid", "==", user.uid)
			.where("eventDate", ">=", today);

		let eventQuerySnap = await eventQuery.get();

		for (let i = 0; i < eventQuerySnap.docs.length; i++) {
			let eventDocRef = await firestore
				.collection("events")
				.doc(eventQuerySnap.docs[i].data().eventId);

			let event = await eventDocRef.get();

			if (event.data().hostUid === user.uid) {
				batch.update(eventDocRef, {
					hostPhotoURL: photo.url,
					[`attendees.${user.uid}.photoURL`]: photo.url
				});
			} else {
				batch.update(eventDocRef, {
					[`attendees.${user.uid}.photoURL`]: photo.url
				});
			}
		}
		await batch.commit();
		dispatch(asyncFinishAction());
	} catch (err) {
		console.log(err);
		dispatch(asyncErrorAction());
		throw new Error("Problem setting main photo");
	}
};

export const goingToEventAction = event => async (dispatch, getState) => {
	dispatch(asyncStartAction());
	const firestore = firebase.firestore();
	const user = firebase.auth().currentUser;
	const profile = getState().firebase.profile;
	const attendee = {
		going: true,
		joinDate: Date.now(),
		photoURL: profile.photoURL || "/assets/user.png",
		displayName: profile.displayName,
		host: false
	};

	try {
		let eventDocRef = firestore.collection("events").doc(event.id);
		let eventAttendeeDocRef = firestore
			.collection("event_attendee")
			.doc(`${event.id}_${user.uid}`);

		await firestore.runTransaction(async transaction => {
			await transaction.get(eventDocRef);
			await transaction.update(eventDocRef, {
				[`attendees.${user.uid}`]: attendee
			});
			await transaction.set(eventAttendeeDocRef, {
				eventId: event.id,
				userUid: user.uid,
				eventDate: event.date,
				host: false
			});
		});
		dispatch(asyncFinishAction());
		toastr.success("Success", "You have signed up to the event");
	} catch (err) {
		console.log(err);
		dispatch(asyncErrorAction());
		toastr.error("Oops", "Problem signing up to the event");
	}
};

export const cancelGoingEventAction = event => async (
	dispatch,
	getState,
	{ getFirestore, getFirebase }
) => {
	const firestore = getFirestore();
	const firebase = getFirebase();
	const user = firebase.auth().currentUser;

	try {
		await firestore.update(`events/${event.id}`, {
			[`attendees.${user.uid}`]: firestore.FieldValue.delete()
		});
		await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
		toastr.success("Success", "You have removed yourself from the event");
	} catch (err) {
		console.log(err);
		toastr.error("Oops", "Something went wrong");
	}
};

export const getUserEventsAction = (userUid, activeTab) => async (
	dispatch,
	getState
) => {
	dispatch(asyncStartAction());
	const firestore = firebase.firestore();
	const today = new Date(Date.now());
	let eventsRef = firestore.collection("event_attendee");
	let query;
	switch (activeTab) {
		case 1: //past events
			query = eventsRef
				.where("userUid", "==", userUid)
				.where("eventDate", "<=", today)
				.orderBy("eventDate", "desc");
			break;

		case 2: //future events
			query = eventsRef
				.where("userUid", "==", userUid)
				.where("eventDate", ">=", today)
				.orderBy("eventDate");
			break;

		case 3: //hosted events
			query = eventsRef
				.where("userUid", "==", userUid)
				.where("host", "==", true)
				.orderBy("eventDate", "desc");
			break;

		default:
			query = eventsRef
				.where("userUid", "==", userUid)
				.orderBy("eventDate", "desc");
	}
	try {
		let querySnap = await query.get();
		let events = [];

		for (let i = 0; i < querySnap.docs.length; i++) {
			let evt = await firestore
				.collection("events")
				.doc(querySnap.docs[i].data().eventId)
				.get();
			events.push({ ...evt.data(), id: evt.id });
		}

		dispatch({ type: FETCH_USER_EVENTS, payload: { events } });

		dispatch(asyncFinishAction());
	} catch (err) {
		console.log(err);
		dispatch(asyncErrorAction());
	}
};

export const followUserAction = userToFollow => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const user = firestore.auth().currentUser;
	const following = {
		photoURL: userToFollow.photoURL || "/assets/user.png",
		city: userToFollow.city || "Unknown city",
		displayName: userToFollow.displayName
	};

	try {
		await firestore.set(
			{
				collection: "users",
				doc: user.uid,
				subcollections: [{ collection: "following", doc: userToFollow.id }]
			},
			following
		);
	} catch (err) {
		console.log(err);
	}
};

export const unfollowUserAction = userToUnfollow => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const user = firestore.auth().currentUser;

	try {
		await firestore.delete({
			collection: "users",
			doc: user.uid,
			subcollections: [{ collection: "following", doc: userToUnfollow.id }]
		});
	} catch (err) {
		console.log(err);
	}
};
