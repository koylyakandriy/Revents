import React, { Component } from "react";
import { Button, Segment, Form } from "semantic-ui-react";
import { connect } from "react-redux";
import cuid from "cuid";

import { createEventAction, updateEventAction } from "../eventActions";

class EventForm extends Component {
	state = { ...this.props.event };

	componentDidMount() {
		const { selectedEvent } = this.props;
		if (selectedEvent !== null) {
			this.setState({
				...selectedEvent
			});
		}
	}

	handleFormSubmit = e => {
		const { createEventAction, updateEventAction, history } = this.props;
		e.preventDefault();

		if (this.state.id) {
			updateEventAction(this.state);
			history.push(`/events/${this.state.id}`);
		} else {
			const newEvent = {
				...this.state,
				id: cuid(),
				hostPhotoURL: "/assets/user.png"
			};
			createEventAction(newEvent);

			history.push("/events");
		}
	};

	handleInputChange = ({ target: { name, value } }) => {
		this.setState({
			[name]: value
		});
	};

	render() {
		const { title, date, city, venue, hostedBy } = this.state;
		const { history } = this.props;
		return (
			<Segment>
				<Form onSubmit={this.handleFormSubmit} autoComplete='off'>
					<Form.Field>
						<label>Event Title</label>
						<input
							name='title'
							value={title}
							onChange={this.handleInputChange}
							placeholder='Event Title'
						/>
					</Form.Field>
					<Form.Field>
						<label>Event Date</label>
						<input
							name='date'
							value={date}
							onChange={this.handleInputChange}
							type='date'
							placeholder='Event Date'
						/>
					</Form.Field>
					<Form.Field>
						<label>City</label>
						<input
							name='city'
							value={city}
							onChange={this.handleInputChange}
							placeholder='City event is taking place'
						/>
					</Form.Field>
					<Form.Field>
						<label>Venue</label>
						<input
							name='venue'
							value={venue}
							onChange={this.handleInputChange}
							placeholder='Enter the Venue of the event'
						/>
					</Form.Field>
					<Form.Field>
						<label>Hosted By</label>
						<input
							name='hostedBy'
							value={hostedBy}
							onChange={this.handleInputChange}
							placeholder='Enter the name of person hosting'
						/>
					</Form.Field>
					<Button positive type='submit'>
						Submit
					</Button>
					<Button type='button' onClick={history.goBack}>
						Cancel
					</Button>
				</Form>
			</Segment>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const eventId = ownProps.match.params.id;

	let event = {
		title: "",
		date: "",
		city: "",
		venue: "",
		hostedBy: ""
	};

	if (eventId && state.events.length > 0) {
		event = state.events.filter(event => event.id === eventId)[0];
	}

	return {
		event
	};
};

const mapDispatchToProps = {
	createEventAction,
	updateEventAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EventForm);
