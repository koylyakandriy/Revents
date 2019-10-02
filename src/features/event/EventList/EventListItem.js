import React, { Component } from "react";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { format } from "date-fns";

class EventListItem extends Component {
	state = {};

	render() {
		const {
			event: {
				id,
				title,
				date,
				venue,
				description,
				hostPhotoURL,
				hostedBy,
				attendees
			},
			event,
			deleteEvent
		} = this.props;
		return (
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size='tiny' circular src={hostPhotoURL} />
							<Item.Content>
								<Item.Header as='a'>{title}</Item.Header>
								<Item.Description>
									Hosted by <a href='#!'>{hostedBy}</a>
								</Item.Description>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name='clock' /> {date && format(date.toDate(), "EEEE do LLL")}{" "}
						at {format(date.toDate(), "h:mm a")} |
						<Icon name='marker' /> {venue}
					</span>
				</Segment>
				<Segment secondary>
					<List horizontal>
						{attendees &&
							Object.values(attendees).map((attendee, index) => (
								<EventListAttendee key={index} attendee={attendee} />
							))}
					</List>
				</Segment>
				<Segment clearing>
					<span>{description}</span>
					<Button
						onClick={() => deleteEvent(id)}
						as='a'
						color='red'
						floated='right'
						content='Delete'
					/>
					<Button
						// onClick={() => selectEvent(event)}
						as={Link}
						to={`/events/${event.id}`}
						color='teal'
						floated='right'
						content='View'
					/>
				</Segment>
			</Segment.Group>
		);
	}
}

export default EventListItem;
