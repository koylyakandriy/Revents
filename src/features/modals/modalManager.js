import React from "react";
import { connect } from "react-redux";

import TestModal from "./TestModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import UnauthModal from "./UnauthModal";

const modalLookup = {
	TestModal,
	LoginModal,
	RegisterModal,
	UnauthModal
};

const ModalManager = ({ currentModal }) => {
	let renderModal;

	if (currentModal) {
		const { modalType, modalProps } = currentModal;
		const ModalComponent = modalLookup[modalType];

		renderModal = <ModalComponent {...modalProps} />;
	}

	return <span>{renderModal}</span>;
};

const mapStateToProps = state => ({
	currentModal: state.modal
});

export default connect(mapStateToProps)(ModalManager);
