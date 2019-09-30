import {
	CREATE_EVENT,
	DELETE_EVENT,
	FETCH_EVENTS,
	UPDATE_EVENT
} from "./eventConstants";
import {
	asyncErrorAction,
	asyncFinishAction,
	asyncStartAction
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";

export const createEventAction = event => {
	return {
		type: CREATE_EVENT,
		payload: { event }
	};
};

export const updateEventAction = event => {
	return {
		type: UPDATE_EVENT,
		payload: { event }
	};
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
			console.log("err", err);
			dispatch(asyncErrorAction());
		}
	};
};
