import React, { Component } from "react";
import { Button, Icon, Item, List, Segment, Label } from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { objectToArray } from "../../../app/common/utill/helpers";

class EventListItem extends Component {
	state = {};

	render() {
		const { event } = this.props;
		const {
			title,
			date,
			venue,
			description,
			hostPhotoURL,
			hostedBy,
			attendees,
			id,
			hostUid
		} = event;
		return (
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size='tiny' circular src={hostPhotoURL} />
							<Item.Content>
								<Item.Header as={Link} to={`/events/${id}`}>
									{title}
								</Item.Header>{" "}
								<Item.Description>
									Hosted by <Link to={`/profile/${hostUid}`}>{hostedBy}</Link>
								</Item.Description>
								{event.cancelled && (
									<Label
										style={{ top: "-40px" }}
										ribbon='right'
										color='red'
										content='This event has been cancelled'
									/>
								)}
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
							objectToArray(attendees).map(attendee => (
								<EventListAttendee key={attendee.id} attendee={attendee} />
							))}
					</List>
				</Segment>
				<Segment clearing>
					<span>{description}</span>
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
