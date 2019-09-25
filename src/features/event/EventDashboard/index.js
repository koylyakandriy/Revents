import React, { Component } from "react";
import { Button, Grid } from "semantic-ui-react";

import EventList from "../EventList/EventList";
import EventForm from "../EventForm";

class EventDashboard extends Component {
	state = {};

	render() {
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList />
				</Grid.Column>

				<Grid.Column width={6}>
					<Button positive content='Create event' />
					<EventForm />
				</Grid.Column>
			</Grid>
		);
	}
}

export default EventDashboard;
