import { MODAL_CLOSE, MODAL_OPEN } from "./modalConstants";

export const openModalAction = (modalType, modalProps) => {
	return {
		type: MODAL_OPEN,
		payload: {
			modalType,
			modalProps
		}
	};
};

export const closeModalAction = () => {
	return {
		type: MODAL_CLOSE
	};
};
