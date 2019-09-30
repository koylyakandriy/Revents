import React, { Component } from "react";
import { Image, List } from "semantic-ui-react";

class EventListAttendee extends Component {
	state = {};

	render() {
		const {
			attendee: { photoURL }
		} = this.props;

		return (
			<List.Item>
				<Image as='a' size='mini' circular src={photoURL} />
			</List.Item>
		);
	}
}

export default EventListAttendee;
