import React, { Component, Fragment } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withFirebase } from "react-redux-firebase";

import SignOutMenu from "../Menus/SignOutMenu";
import SignInMenu from "../Menus/SignInMenu";
import { openModalAction } from "../../modals/modalActions";

class NavBar extends Component {
	state = {};

	handleSignIn = () => this.props.openModalAction("LoginModal");

	handleRegister = () => this.props.openModalAction("RegisterModal");

	handleSignOut = () => {
		const { history, firebase } = this.props;
		firebase.logout();
		history.push("/");
	};

	render() {
		const { auth, profile } = this.props;
		const authenticated = auth.isLoaded && !auth.isEmpty;

		return (
			<Menu inverted fixed='top'>
				<Container>
					<Menu.Item exact as={NavLink} to='/' header>
						<img src='/assets/logo.png' alt='logo' />
						Re-vents
					</Menu.Item>
					<Menu.Item as={NavLink} exact to='/events' name='Events' />
					{authenticated && (
						<Fragment>
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
						</Fragment>
					)}
					{authenticated ? (
						<SignInMenu signOut={this.handleSignOut} profile={profile} />
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
	auth: state.firebase.auth,
	profile: state.firebase.profile
});

const mapDispatchToProps = {
	openModalAction
};

export default withRouter(
	withFirebase(
		connect(
			mapStateToProps,
			mapDispatchToProps
		)(NavBar)
	)
);
