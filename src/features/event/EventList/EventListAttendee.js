import React, { Component } from "react";
import { Image, List } from "semantic-ui-react";

class EventListAttendee extends Component {
	state = {};

	render() {
		return (
			<List.Item>
				<Image
					as='a'
					size='mini'
					circular
					src='https://randomuser.me/api/portraits/women/42.jpg'
				/>
			</List.Item>
		);
	}
}

export default EventListAttendee;
