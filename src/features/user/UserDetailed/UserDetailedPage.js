import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";

import UserDetailedHeader from "./UserDetailedHeader";
import UserDetailedDescription from "./UserDetailedDescription";
import UserDetailedSidebar from "./UserDetailedSidebar";
import UserDetailedPhotos from "./UserDetailedPhotos";
import UserDetailedEvents from "./UserDetailedEvents";
import { userDetailedQuery } from "../userQueries";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { getUserEventsAction } from "../userActions";

class UserDetailedPage extends Component {
	async componentDidMount() {
		const { getUserEventsAction, userUid } = this.props;
		await getUserEventsAction(userUid);
		// let events = await getUserEventsAction(userUid);
	}

	changeTab = (e, data) => {
		const { getUserEventsAction, userUid } = this.props;
		getUserEventsAction(userUid, data.activeIndex);
	};

	render() {
		const {
			profile,
			photos,
			auth,
			match,
			requesting,
			events,
			eventsLoading
		} = this.props;
		const isCurrentUser = auth.uid === match.params.id;
		const loading = Object.values(requesting).some(a => a === true);

		if (loading) return <LoadingComponent />;
		return (
			<Grid>
				<UserDetailedHeader profile={profile} />
				<UserDetailedDescription profile={profile} />
				<UserDetailedSidebar isCurrentUser={isCurrentUser} />
				{photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
				<UserDetailedEvents
					events={events}
					eventsLoading={eventsLoading}
					changeTab={this.changeTab}
				/>
			</Grid>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	let userUid = null;
	let profile = {};

	if (ownProps.match.params.id === state.auth.uid) {
		profile = state.firebase.profile;
	} else {
		profile =
			!isEmpty(state.firestore.ordered.profile) &&
			state.firestore.ordered.profile[0];
		userUid = ownProps.match.params.id;
	}
	return {
		profile,
		userUid,
		auth: state.firebase.auth,
		photos: state.firestore.ordered.photos,
		requesting: state.firestore.status.requesting,
		events: state.events,
		eventsLoading: state.async.loading
	};
};

const mapDispatchToProps = {
	getUserEventsAction
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);
