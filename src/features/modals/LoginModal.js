import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import { connect } from "react-redux";

import LoginForm from "../auth/Login";
import { closeModalAction } from "./modalActions";

class LoginModal extends Component {
	render() {
		return (
			<Modal size='mini' open={true} onClose={this.props.closeModalAction}>
				<Modal.Header>Login to Re-vents</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<LoginForm />
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
)(LoginModal);
