import { toastr } from "react-redux-toastr";

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
	return async dispatch => {
		try {
			dispatch({
				type: CREATE_EVENT,
				payload: { event }
			});
			toastr.success("Success!", "Event has been created");
		} catch (err) {
			toastr.error("Ops", "Something went wrong");
		}
	};
};

export const updateEventAction = event => {
	return async dispatch => {
		try {
			dispatch({
				type: UPDATE_EVENT,
				payload: { event }
			});
			toastr.success("Success!", "Event has been updated");
		} catch (err) {
			toastr.error("Ops", "Something went wrong");
		}
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
			dispatch(asyncErrorAction());
		}
	};
};
