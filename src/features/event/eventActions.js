import { toastr } from "react-redux-toastr";

import { createNewEvent } from "../../app/common/utill/helpers";

export const createEventAction = event => {
	return async (dispatch, getState, { getFirestore, getFirebase }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		const user = firebase.auth().currentUser;
		const photoURL = getState().firebase.profile.photoURL;
		const newEvent = createNewEvent(user, photoURL, event);
		try {
			let createdEvent = await firestore.add("events", newEvent);
			await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
				eventId: createdEvent.id,
				userUid: user.uid,
				eventDate: event.date,
				host: true
			});
			toastr.success("Success!", "Event has been created");
			return createdEvent;
		} catch (err) {
			toastr.error("Ops", "Something went wrong");
		}
	};
};

export const updateEventAction = event => {
	return async (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		try {
			await firestore.update(`events/${event.id}`, event);
			toastr.success("Success!", "Event has been updated");
		} catch (err) {
			toastr.error("Ops", "Something went wrong");
		}
	};
};

export const cancelToggleAction = (cancelled, eventId) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const message = cancelled
		? "Are you sure you want to cancel the event?"
		: "This will reactivate the event, are you sure?";

	try {
		toastr.confirm(message, {
			onOk: async () =>
				await firestore.update(`events/${eventId}`, { cancelled: cancelled })
		});
	} catch (err) {
		console.log("err", err);
	}
};
