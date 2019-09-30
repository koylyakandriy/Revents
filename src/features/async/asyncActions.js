import {
	ASYNC_ACTION_ERROR,
	ASYNC_ACTION_FINISH,
	ASYNC_ACTION_START
} from "./asyncConstants";

export const asyncStartAction = () => {
	return {
		type: ASYNC_ACTION_START
	};
};

export const asyncFinishAction = () => {
	return {
		type: ASYNC_ACTION_FINISH
	};
};

export const asyncErrorAction = () => {
	return {
		type: ASYNC_ACTION_ERROR
	};
};
