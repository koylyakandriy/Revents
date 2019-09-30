import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import RegisterForm from "../auth/Register";
import { closeModalAction } from "./modalActions";

class RegisterModal extends Component {
	render() {
		return (
			<Modal size='mini' open={true} onClose={this.props.closeModalAction}>
				<Modal.Header>Sign Up to Re-vents!</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<RegisterForm />
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

const mapDispatchToProps = {
	closeModalAction
};

export default connect(
	null,
	mapDispatchToProps
)(RegisterModal);
