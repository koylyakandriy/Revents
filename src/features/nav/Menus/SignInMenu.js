import React from "react";
import { Menu, Dropdown, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SignInMenu = ({ signOut, profile: { photoURL, displayName }, auth }) => {
	return (
		<Menu.Item position='right'>
			<Image avatar spaced='right' src={photoURL || "/assets/user.png"} />
			<Dropdown pointing='top left' text={displayName}>
				<Dropdown.Menu>
					<Dropdown.Item
						as={Link}
						to='/createEvent'
						text='Create Event'
						icon='plus'
					/>
					<Dropdown.Item
						as={Link}
						to='/people'
						text='My Network'
						icon='users'
					/>
					<Dropdown.Item
						as={Link}
						to={`/profile/${auth.uid}`}
						text='My Profile'
						icon='user'
					/>
					<Dropdown.Item
						as={Link}
						to='/settings'
						text='Settings'
						icon='settings'
					/>
					<Dropdown.Item onClick={signOut} text='Sign Out' icon='power' />
				</Dropdown.Menu>
			</Dropdown>
		</Menu.Item>
	);
};

export default SignInMenu;
