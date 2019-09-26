import React, { Component } from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { Link, NavLink, withRouter } from "react-router-dom";

import SignOutMenu from "../Menus/SignOutMenu";
import SignInMenu from "../Menus/SignInMenu";

class NavBar extends Component {
	state = {
		authenticated: true
	};

	handleSignIn = () => this.setState({ authenticated: true });
	handleSignOut = () => {
		const { history } = this.props;
		this.setState({ authenticated: false });
		history.push("/");
	};

	render() {
		const { authenticated } = this.state;
		return (
			<Menu inverted fixed='top'>
				<Container>
					<Menu.Item exact as={NavLink} to='/' header>
						<img src='/assets/logo.png' alt='logo' />
						Re-vents
					</Menu.Item>
					<Menu.Item as={NavLink} to='/events' name='Events' />
					<Menu.Item as={NavLink} to='/people' name='People' />
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
						<SignInMenu signOut={this.handleSignOut} />
					) : (
						<SignOutMenu signIn={this.handleSignIn} />
					)}
				</Container>
			</Menu>
		);
	}
}

export default withRouter(NavBar);
