import { toastr } from "react-redux-toastr";

import { DELETE_EVENT, FETCH_EVENTS, UPDATE_EVENT } from "./eventConstants";
import {
	asyncErrorAction,
	asyncFinishAction,
	asyncStartAction
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";
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

	try {
		await firestore.update(`events/${eventId}`, { cancelled: cancelled });
	} catch (err) {
		console.log("err", err);
	}
};

export const deleteEventAction = eventId => {
	return {
		type: DELETE_EVENT,
		payload: { eventId }
	};
};

export const loadEvents = () => {
	return async dispatch => {
		try {
			dispatch(asyncStartAction());

			const events = await fetchSampleData();

			dispatch({ type: FETCH_EVENTS, payload: { events } });
			dispatch(asyncFinishAction());
		} catch (err) {
			dispatch(asyncErrorAction());
		}
	};
};
