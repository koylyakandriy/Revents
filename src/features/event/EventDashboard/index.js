import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect, isLoaded } from "react-redux-firebase";

import EventList from "../EventList/EventList";
import { createEventAction, updateEventAction } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity";

class EventDashboard extends Component {
	state = {};

	handleDeleteEvent = id => {
		const { deleteEventAction } = this.props;
		deleteEventAction(id);
	};

	render() {
		const { events } = this.props;

		if (!isLoaded(events)) return <LoadingComponent />;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={events} deleteEvent={this.handleDeleteEvent} />
				</Grid.Column>

				<Grid.Column width={6}>
					<EventActivity />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	events: state.firestore.ordered.events
});

const mapDispatchToProps = {
	createEventAction,
	updateEventAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(firestoreConnect([{ collection: "events" }])(EventDashboard));
