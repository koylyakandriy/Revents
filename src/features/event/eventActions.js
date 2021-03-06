import { toastr } from "react-redux-toastr";

import { createNewEvent } from "../../app/common/utill/helpers";
import firebase from "../../app/config/firebase";
import { FETCH_EVENTS } from "./eventConstants";
import {
	asyncErrorAction,
	asyncFinishAction,
	asyncStartAction
} from "../async/asyncActions";

export const createEventAction = event => {
	return async (dispatch, getState, { getFirestore, getFirebase }) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		const user = firebase.auth().currentUser;
		const photoURL = getState().firebase.profile.photoURL;
		const newEvent = createNewEvent(user, photoURL, event);
		try {
			dispatch(asyncStartAction());
			let createdEvent = await firestore.add("events", newEvent);
			await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
				eventId: createdEvent.id,
				userUid: user.uid,
				eventDate: event.date,
				host: true
			});
			toastr.success("Success!", "Event has been created");
			dispatch(asyncFinishAction());
			return createdEvent;
		} catch (err) {
			toastr.error("Ops", "Something went wrong");
			dispatch(asyncErrorAction());
		}
	};
};

export const updateEventAction = event => {
	return async (dispatch, getState) => {
		const firestore = firebase.firestore();
		try {
			dispatch(asyncStartAction());
			let eventDocRef = firestore.collection("events").doc(event.id);
			let dateEqual = getState().firestore.ordered.events[0].date.isEqual(
				event.date
			);
			if (!dateEqual) {
				let batch = firestore.batch();
				batch.update(eventDocRef, event);

				let eventAttendeeRef = firestore.collection("event_attendee");
				let eventAttendeeQuery = await eventAttendeeRef.where(
					"eventId",
					"==",
					event.id
				);
				let eventAttendeeQuerySnap = await eventAttendeeQuery.get();

				for (let i = 0; i < eventAttendeeQuerySnap.docs.length; i++) {
					let eventAttendeeDocRef = await firestore
						.collection("event_attendee")
						.doc(eventAttendeeQuerySnap.docs[i].id);

					batch.update(eventAttendeeDocRef, {
						eventDate: event.date
					});
				}
				await batch.commit();
			} else {
				await eventDocRef.update(event);
			}
			dispatch(asyncFinishAction());
			toastr.success("Success!", "Event has been updated");
		} catch (err) {
			dispatch(asyncErrorAction());
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
		console.log(err);
	}
};

export const getEventForDashboardAction = lastEvent => async (
	dispatch,
	getState
) => {
	const firestore = firebase.firestore();
	const eventsRef = firestore.collection("events");
	try {
		dispatch(asyncStartAction());
		let startAfter =
			lastEvent &&
			(await firestore
				.collection("events")
				.doc(lastEvent.id)
				.get());
		let query;

		lastEvent
			? (query = eventsRef
					.orderBy("date")
					.startAfter(startAfter)
					.limit(2))
			: (query = eventsRef
					.orderBy("date")
					.limit(2));

		let querySnap = await query.get();

		if (querySnap.docs.length === 0) {
			dispatch(asyncFinishAction());
			return querySnap;
		}

		let events = [];

		for (let i = 0; i < querySnap.docs.length; i++) {
			let evt = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
			events.push(evt);
		}
		dispatch({ type: FETCH_EVENTS, payload: { events } });
		dispatch(asyncFinishAction());
		return querySnap;
	} catch (err) {
		console.log(err);
		dispatch(asyncErrorAction());
	}
};

export const addEventCommentAction = (eventId, values, parentId) => async (
	dispatch,
	getState,
	{ getFirebase }
) => {
	const firebase = getFirebase();
	const profile = getState().firebase.profile;
	const user = firebase.auth().currentUser;
	let newComment = {
		parentId: parentId,
		displayName: profile.displayName,
		photoURL: profile.photoURL || "/assets/user.png",
		uid: user.uid,
		text: values.comment,
		date: Date.now()
	};
	try {
		await firebase.push(`event_chat/${eventId}`, newComment);
	} catch (err) {
		console.log(err);
		toastr.error("Oops", "Problem adding comment");
	}
};
