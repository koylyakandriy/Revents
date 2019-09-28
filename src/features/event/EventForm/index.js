/*global google */

import React, { Component } from "react";
import { Button, Segment, Form, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import cuid from "cuid";
import { reduxForm, Field } from "redux-form";
import {
	composeValidators,
	combineValidators,
	isRequired,
	hasLengthGreaterThan
} from "revalidate";

import { createEventAction, updateEventAction } from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
// import DateInput from "../../../app/common/form/DateInput";

//  Uncomment if you need use google places API
import PlaceInput from "../../../app/common/form/PlaceInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

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

	onFormSubmit = values => {
		//  Uncomment if you need use google places API
		const { venueLatLng } = this.state;

		const {
			createEventAction,
			updateEventAction,
			history,
			initialValues
		} = this.props;

		//  Uncomment if you need use google places API
		values.venueLatLng = venueLatLng;

		if (initialValues.id) {
			updateEventAction(values);
			history.push(`/events/${initialValues.id}`);
		} else {
			const newEvent = {
				...values,
				id: cuid(),
				hostPhotoURL: "/assets/user.png",
				//temporary
				hostedBy: "Bob"
			};
			createEventAction(newEvent);

			history.push(`/events/${newEvent.id}`);
		}
	};

	//  Uncomment if you need use google places API
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
			pristine
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

							{/* without google form */}
							{/*<Field
								name='city'
								component={TextInput}
								placeholder='Event City'
							/>
							<Field
								name='venue'
								component={TextInput}
								placeholder='Event Venue'
							/>*/}
							{/*Uncomment if you need use google places API*/}
							{/*Limit to request one per day, but free*/}

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
							{/*<Field*/}
							{/*	name='date'*/}
							{/*	component={DateInput}*/}
							{/*	placeholder='Event Date'*/}
							{/*	dateFormat='dd LLL yyyy'*/}
							{/*/>*/}
							<Button
								disabled={invalid || submitting || pristine}
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
							>
								Cancel
							</Button>
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

	if (eventId && state.events.length > 0) {
		event = state.events.filter(event => event.id === eventId)[0];
	}

	return {
		initialValues: event
	};
};

const mapDispatchToProps = {
	createEventAction,
	updateEventAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(reduxForm({ form: "eventForm", validate })(EventForm));
