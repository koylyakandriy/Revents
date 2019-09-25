import React, { Component } from "react";
import { Button, Segment, Form } from "semantic-ui-react";
import {} from "redux-form";

class EventForm extends Component {
	state = {
		title: "",
		date: "",
		city: "",
		venue: "",
		hostedBy: ""
	};

	handleFormSubmit = e => {
		e.preventDefault();
		this.props.createEvent(this.state);
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState({
			[name]: value
		});
	};

	render() {
		const { cancelFormOpen } = this.props;
		const { title, date, city, venue, hostedBy } = this.state;
		return (
			<Segment>
				<Form onSubmit={this.handleFormSubmit} autoComplete='off'>
					<Form.Field>
						<label>Event Title</label>
						<input
							name='title'
							value={title}
							onChange={this.handleChange}
							placeholder='Event Title'
						/>
					</Form.Field>
					<Form.Field>
						<label>Event Date</label>
						<input
							name='date'
							value={date}
							onChange={this.handleChange}
							type='date'
							placeholder='Event Date'
						/>
					</Form.Field>
					<Form.Field>
						<label>City</label>
						<input
							name='city'
							value={city}
							onChange={this.handleChange}
							placeholder='City event is taking place'
						/>
					</Form.Field>
					<Form.Field>
						<label>Venue</label>
						<input
							name='venue'
							value={venue}
							onChange={this.handleChange}
							placeholder='Enter the Venue of the event'
						/>
					</Form.Field>
					<Form.Field>
						<label>Hosted By</label>
						<input
							name='hostedBy'
							value={hostedBy}
							onChange={this.handleChange}
							placeholder='Enter the name of person hosting'
						/>
					</Form.Field>
					<Button positive type='submit'>
						Submit
					</Button>
					<Button type='button' onClick={cancelFormOpen}>
						Cancel
					</Button>
				</Form>
			</Segment>
		);
	}
}

export default EventForm;
