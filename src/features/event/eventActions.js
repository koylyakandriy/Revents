import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT } from "./eventConstants";

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
