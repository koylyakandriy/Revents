import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedSidebar from "./UserDetailedSidebar";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedEvents from "./UserDetailedEvents";

class UserDetailedPage extends Component {
	render() {
		return (
			<Grid>
				<UserDetailedHeader />
				<UserDetailedDescription />
				<UserDetailedSidebar />
				<UserDetailedPhotos />
				<UserDetailedEvents />
			</Grid>
		);
	}
}

export default UserDetailedPage;
