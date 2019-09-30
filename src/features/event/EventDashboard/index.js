import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

import EventList from "../EventList/EventList";
import {
	createEventAction,
	updateEventAction,
	deleteEventAction
} from "../eventActions";

class EventDashboard extends Component {
	state = {};

	handleDeleteEvent = id => {
		const { deleteEventAction } = this.props;
		deleteEventAction(id);
	};

	render() {
		const { events } = this.props;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={events} deleteEvent={this.handleDeleteEvent} />
				</Grid.Column>

				<Grid.Column width={6}>
					<h2>Activity Feed</h2>
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	events: state.events
});

const mapDispatchToProps = {
	createEventAction,
	updateEventAction,
	deleteEventAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventDashboard);
