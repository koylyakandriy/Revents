import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";

const UserDetailedSidebar = () => {
	return (
		<Grid.Column width={4}>
			<Segment>
				<Button color='teal' fluid basic content='Edit Profile' />
			</Segment>
		</Grid.Column>
	);
};

export default UserDetailedSidebar;
