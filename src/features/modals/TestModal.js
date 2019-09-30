import React from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { closeModalAction } from "./modalActions";

const TestModal = ({ closeModalAction }) => {
	return (
		<Modal closeIcon='close' open={true} onClose={closeModalAction}>
			<Modal.Header>Test Modal</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<p>Test Modal... nothing to see here</p>
				</Modal.Description>
			</Modal.Content>
		</Modal>
	);
};

const mapDispatchToProps = {
	closeModalAction
};

export default connect(
	null,
	mapDispatchToProps
)(TestModal);
