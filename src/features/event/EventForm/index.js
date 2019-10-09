/*global google */
import React, { Component } from "react";
import { Button, Segment, Form, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
	composeValidators,
	combineValidators,
	isRequired,
	hasLengthGreaterThan
} from "revalidate";
import { withFirestore } from "react-redux-firebase";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

import {
	cancelToggleAction,
	createEventAction,
	updateEventAction
} from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";

const validate = combineValidators({
	title: isRequired({ message: "The event title is required" }),
	category: isRequired({ message: "The category is required" }),
	description: composeValidators(
		isRequired({ message: "Please enter a description" }),
		hasLengthGreaterThan(4)({
			message: "Description needs to be at least 5 characters"
		})
	)(),
	city: isRequired("city"),
	venue: isRequired("venue"),
	date: isRequired("date")
});

const category = [
	{ key: "drinks", text: "Drinks", value: "drinks" },
	{ key: "culture", text: "Culture", value: "culture" },
	{ key: "film", text: "Film", value: "film" },
	{ key: "food", text: "Food", value: "food" },
	{ key: "music", text: "Music", value: "music" },
	{ key: "travel", text: "Travel", value: "travel" }
];

class EventForm extends Component {
	state = {
		cityLatLng: {},
		venueLatLng: {}
	};

	async componentDidMount() {
		const { firestore, match } = this.props;
		await firestore.setListener(`events/${match.params.id}`);
	}

	async componentWillUnmount() {
		const { firestore, match } = this.props;
		await firestore.unsetListener(`events/${match.params.id}`);
	}

	onFormSubmit = async values => {
		const { venueLatLng } = this.state;
		const { event } = this.props;

		const {
			createEventAction,
			updateEventAction,
			history,
			initialValues
		} = this.props;

		values.venueLatLng = venueLatLng;

		try {
			if (initialValues.id) {
				if (Object.keys(values.venueLatLng).length === 0) {
					values.venueLatLng = event.venueLatLng;
				}
				await updateEventAction(values);
				history.push(`/events/${initialValues.id}`);
			} else {
				let createdEvent = await createEventAction(values);
				history.push(`/events/${createdEvent.id}`);
			}
		} catch (err) {
			console.log(err);
		}
	};

	handleCitySelect = selectedCity => {
		geocodeByAddress(selectedCity)
			.then(results => getLatLng(results[0]))
			.then(latlng => {
				this.setState({ cityLatLng: latlng });
			})
			.then(() => {
				this.props.change("city", selectedCity);
			});
	};

	handleVenueSelect = selectedVenue => {
		geocodeByAddress(selectedVenue)
			.then(results => getLatLng(results[0]))
			.then(latlng => {
				this.setState({ venueLatLng: latlng });
			})
			.then(() => {
				this.props.change("venue", selectedVenue);
			});
	};

	render() {
		const {
			history,
			handleSubmit,
			initialValues,
			invalid,
			submitting,
			pristine,
			event,
			cancelToggleAction,
			loading
		} = this.props;
		return (
			<Grid>
				<Grid.Column width={10}>
					<Segment>
						<Header sub color='teal' content='Event Details' />
						<Form onSubmit={handleSubmit(this.onFormSubmit)} autoComplete='off'>
							<Field
								name='title'
								component={TextInput}
								placeholder='Give your event a name'
							/>
							<Field
								name='category'
								component={SelectInput}
								placeholder='What is your event about?'
								options={category}
							/>
							<Field
								name='description'
								component={TextArea}
								rows={3}
								placeholder='Tell us about your event'
							/>
							<Header sub color='teal' content='Event Location Details' />
							<Field
								name='city'
								component={PlaceInput}
								options={{ types: ["(cities)"] }}
								onSelect={this.handleCitySelect}
								placeholder='Event Google City'
							/>
							<Field
								name='venue'
								component={PlaceInput}
								options={{
									location: new google.maps.LatLng(this.state.cityLatLng),
									radius: 1000,
									types: ["establishment"]
								}}
								onSelect={this.handleVenueSelect}
								placeholder='Event Google Venue'
							/>
							<Field
								name='date'
								component={DateInput}
								placeholder='Event Date'
								dateFormat='dd LLL yyyy h:mm a'
								timeFormat='HH:mm'
								showTimeSelect
							/>
							<Button
								disabled={invalid || submitting || pristine}
								loading={loading}
								positive
								type='submit'
							>
								Submit
							</Button>
							<Button
								type='button'
								onClick={
									initialValues.id
										? () => history.push(`/events/${initialValues.id}`)
										: () => history.push("/events")
								}
								disabled={loading}
							>
								Cancel
							</Button>
							{event.id && (
								<Button
									type='button'
									color={event.cancelled ? "green" : "red"}
									floated='right'
									content={
										event.cancelled ? "Reactivate event" : "Cancel event"
									}
									onClick={() => cancelToggleAction(!event.cancelled, event.id)}
								/>
							)}
						</Form>
					</Segment>
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
		initialValues: event,
		event,
		loading: state.async.loading
	};
};

const mapDispatchToProps = {
	createEventAction,
	updateEventAction,
	cancelToggleAction
};

export default withFirestore(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(
		reduxForm({ form: "eventForm", validate, enableReinitialize: true })(
			EventForm
		)
	)
);
