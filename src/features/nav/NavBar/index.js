import React, { Component } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import SignOutMenu from "../Menus/SignOutMenu";
import SignInMenu from "../Menus/SignInMenu";
import { openModalAction } from "../../modals/modalActions";
import { logoutAction } from "../../auth/authActions";

class NavBar extends Component {
	state = {};

	handleSignIn = () => this.props.openModalAction("LoginModal");

	handleRegister = () => this.props.openModalAction("RegisterModal");

	handleSignOut = () => {
		const { history } = this.props;
		this.props.logoutAction();
		history.push("/");
	};

	render() {
		const {
			auth: { authenticated, currentUser }
		} = this.props;
		return (
			<Menu inverted fixed='top'>
				<Container>
					<Menu.Item exact as={NavLink} to='/' header>
						<img src='/assets/logo.png' alt='logo' />
						Re-vents
					</Menu.Item>
					<Menu.Item as={NavLink} exact to='/events' name='Events' />
					<Menu.Item as={NavLink} to='/people' name='People' />
					<Menu.Item as={NavLink} to='/test' name='Test' />
					<Menu.Item>
						<Button
							as={Link}
							to='/createEvent'
							floated='right'
							positive
							inverted
							content='Create Event'
						/>
					</Menu.Item>
					{authenticated ? (
						<SignInMenu
							signOut={this.handleSignOut}
							currentUser={currentUser}
						/>
					) : (
						<SignOutMenu
							signIn={this.handleSignIn}
							register={this.handleRegister}
						/>
					)}
				</Container>
			</Menu>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

const mapDispatchToProps = {
	openModalAction,
	logoutAction
};

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(NavBar)
);
