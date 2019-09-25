import React, { Component } from "react";
import { Button, Icon, Item, List, Segment } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";

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
			selectEvent,
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
						<Icon name='clock' /> {date} |
						<Icon name='marker' /> {venue}
					</span>
				</Segment>
				<Segment secondary>
					<List horizontal>
						{attendees &&
							attendees.map(attendee => (
								<EventListAttendee key={attendee.id} attendee={attendee} />
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
						onClick={() => selectEvent(event)}
						as='a'
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
