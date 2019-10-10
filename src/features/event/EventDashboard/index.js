import React, { Component, createRef } from "react";
import { Grid, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import EventList from "../EventList/EventList";
import { getEventForDashboardAction } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity";

const query = [
	{
		collection: "activity",
		orderBy: ["timestamp", "desc"],
		limit: 5
	}
];

class EventDashboard extends Component {
	contextRef = createRef();

	state = {
		moreEvents: false,
		loadingInitial: true,
		loadedEvents: []
	};

	async componentDidMount() {
		const { getEventForDashboardAction } = this.props;
		let next = await getEventForDashboardAction();

		if (next && next.docs && next.docs.length > 1) {
			this.setState({
				moreEvents: true,
				loadingInitial: false
			});
		}
	}

	componentDidUpdate = prevProps => {
		const { loadedEvents } = this.state;
		const { events } = this.props;
		if (events !== prevProps.events) {
			this.setState({
				loadedEvents: [...loadedEvents, ...events]
			});
		}
	};

	getNextEvents = async () => {
		const { events, getEventForDashboardAction } = this.props;
		let lastEvent = events && events[events.length - 1];
		let next = await getEventForDashboardAction(lastEvent);
		if (next && next.docs && next.docs.length <= 1) {
			this.setState({
				moreEvents: false
			});
		}
	};

	render() {
		const { loadingInitial, loadedEvents, moreEvents } = this.state;
		const { loading, activities } = this.props;
		if (loadingInitial) return <LoadingComponent />;

		return (
			<Grid>
				<Grid.Column width={10}>
					<div ref={this.contextRef}>
						<EventList
							events={loadedEvents}
							getNextEvents={this.getNextEvents}
							moreEvents={moreEvents}
							loading={loading}
						/>
					</div>
				</Grid.Column>

				<Grid.Column width={6}>
					<EventActivity activities={activities} contextRef={this.contextRef} />
				</Grid.Column>
				<Grid.Column width={10}>
					<Loader active={loading} />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapStateToProps = state => ({
	events: state.events.events,
	loading: state.async.loading,
	activities: state.firestore.ordered.activity
});

const mapDispatchToProps = {
	getEventForDashboardAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(firestoreConnect(query)(EventDashboard));
