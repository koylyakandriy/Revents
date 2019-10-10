import React, { Fragment } from "react";
import { Item, Label, List, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const EventDetailedSidebar = ({ attendees }) => {
	return (
		<Fragment>
			<Segment
				textAlign='center'
				style={{ border: "none" }}
				attached='top'
				secondary
				inverted
				color='teal'
			>
				{attendees && attendees.length}{" "}
				{attendees && attendees.length === 1 ? "Person" : "People"} Going
			</Segment>
			<Segment attached>
				<List relaxed divided>
					{attendees &&
						attendees.map(attendee => (
							<Item.Group key={attendee.id}>
								<Item style={{ position: "relative" }}>
									{attendee.host && (
										<Label
											style={{ position: "absolute" }}
											color='orange'
											ribbon='right'
										>
											Host
										</Label>
									)}
									<Item.Image size='tiny' src={attendee.photoURL} />
									<Item.Content verticalAlign='middle'>
										<Item.Header as='h3'>
											<Link to={`/profile/${attendee.id}`}>
												{attendee.displayName}
											</Link>
										</Item.Header>
									</Item.Content>
								</Item>
							</Item.Group>
						))}
				</List>
			</Segment>
		</Fragment>
	);
};

export default EventDetailedSidebar;
