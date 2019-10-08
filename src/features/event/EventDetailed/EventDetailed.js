import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";

import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import {
	objectToArray,
	createDataTree
} from "../../../app/common/utill/helpers";
import {
	goingToEventAction,
	cancelGoingEventAction
} from "../../user/userActions";
import { addEventCommentAction } from "../eventActions";

class EventDetailed extends Component {
	async componentDidMount() {
		const { firestore, match } = this.props;
		await firestore.setListener(`events/${match.params.id}`);
	}

	async componentWillUnmount() {
		const { firestore, match } = this.props;
		await firestore.unsetListener(`events/${match.params.id}`);
	}

	render() {
		const {
			event,
			auth,
			goingToEventAction,
			cancelGoingEventAction,
			addEventCommentAction,
			eventChat
		} = this.props;
		const attendees =
			event && event.attendees && objectToArray(event.attendees);
		const isHost = event.hostUid === auth.uid;
		const isGoing = attendees && attendees.some(a => a.id === auth.uid);
		const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventDetailedHeader
						event={event}
						isGoing={isGoing}
						isHost={isHost}
						goingToEvent={goingToEventAction}
						cancelGoingEvent={cancelGoingEventAction}
					/>
					<EventDetailedInfo event={event} />
					<EventDetailedChat
						addEventComment={addEventCommentAction}
						eventId={event.id}
						eventChat={chatTree}
					/>
				</Grid.Column>
				<Grid.Column width={6}>
					<EventDetailedSidebar attendees={attendees} />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;
	let event = {};
	if (
		state.firestore.ordered.events &&
		state.firestore.ordered.events.length > 0
	) {
		event =
			state.firestore.ordered.events.filter(event => event.id === eventId)[0] ||
			{};
	}
	return {
		event,
		auth: state.firebase.auth,
		eventChat:
			!isEmpty(state.firebase.data.event_chat) &&
			objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
	};
};

const mapDispatchToProps = {
	goingToEventAction,
	cancelGoingEventAction,
	addEventCommentAction
};

export default compose(
	withFirestore,
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailed);
