import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import { compose } from "redux";
import moment from "moment";

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
import { openModalAction } from "../../modals/modalActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import NotFound from "../../../app/layout/NotFound";

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
			eventChat,
			loading,
			openModalAction,
			requesting,
			match
		} = this.props;
		const attendees =
			event &&
			event.attendees &&
			objectToArray(event.attendees).sort((a, b) => {
				return moment(a.joinDate).toDate() - moment(b.joinDate).toDate();
			});
		const isHost = event.hostUid === auth.uid;
		const isGoing = attendees && attendees.some(a => a.id === auth.uid);
		const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);
		const authenticated = auth.isLoaded && !auth.isEmpty;
		const loadingEvent = requesting[`events/${match.params.id}`];

		if (loadingEvent) return <LoadingComponent />;
		if (Object.keys(event).length === 0) return <NotFound />;

		return (
			<Grid>
				<Grid.Column width={10}>
					<EventDetailedHeader
						loading={loading}
						event={event}
						isGoing={isGoing}
						isHost={isHost}
						goingToEvent={goingToEventAction}
						cancelGoingEvent={cancelGoingEventAction}
						authenticated={authenticated}
						openModal={openModalAction}
					/>
					<EventDetailedInfo event={event} />
					{authenticated && (
						<EventDetailedChat
							addEventComment={addEventCommentAction}
							eventId={event.id}
							eventChat={chatTree}
						/>
					)}
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
		loading: state.async.loading,
		auth: state.firebase.auth,
		requesting: state.firestore.status.requesting,
		eventChat:
			!isEmpty(state.firebase.data.event_chat) &&
			objectToArray(state.firebase.data.event_chat[ownProps.match.params.id])
	};
};

const mapDispatchToProps = {
	goingToEventAction,
	cancelGoingEventAction,
	addEventCommentAction,
	openModalAction
};

export default compose(
	withFirestore,
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firebaseConnect(props => [`event_chat/${props.match.params.id}`])
)(EventDetailed);
