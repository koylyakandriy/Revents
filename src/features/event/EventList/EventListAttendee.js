import React, { Component } from "react";
import { Image, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

class EventListAttendee extends Component {
	state = {};

	render() {
		const { attendee } = this.props;

		const { photoURL, id } = attendee;
		return (
			<List.Item>
				<Image
					as={Link}
					to={`/profile/${id}`}
					size='mini'
					circular
					src={photoURL}
				/>
			</List.Item>
		);
	}
}

export default EventListAttendee;
