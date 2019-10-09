import React, { Component } from "react";
import { Modal, Button, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { closeModalAction, openModalAction } from "./modalActions";

class UnauthModal extends Component {
	handleCloseModal = () => {
		const {
			history,
			closeModalAction,
			location: { pathname }
		} = this.props;
		if (pathname.includes("/events")) {
			closeModalAction();
		} else {
			history.goBack();
			closeModalAction();
		}
	};

	render() {
		const { openModalAction } = this.props;
		return (
			<Modal size='mini' open={true} onClose={this.handleCloseModal}>
				<Modal.Header>You need to be signed in to do that!</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<p>Please either login or register to see this page</p>
						<Button.Group widths={4}>
							<Button
								fluid
								color='teal'
								onClick={() => openModalAction("LoginModal")}
							>
								Login
							</Button>
							<Button.Or />
							<Button
								fluid
								positive
								onClick={() => openModalAction("RegisterModal")}
							>
								Register
							</Button>
						</Button.Group>
						<Divider />
						<div style={{ textAlign: "center" }}>
							<p>Or click cancel to continue as a guest</p>
							<Button onClick={this.handleCloseModal}>Cancel</Button>
						</div>
					</Modal.Description>
				</Modal.Content>
			</Modal>
		);
	}
}

const mapDispatchToProps = { openModalAction, closeModalAction };

export default withRouter(
	connect(
		null,
		mapDispatchToProps
	)(UnauthModal)
);
