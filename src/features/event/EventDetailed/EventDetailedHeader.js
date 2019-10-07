import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Segment } from "semantic-ui-react";
import { format } from "date-fns";

const eventImageStyle = {
	filter: "brightness(30%)"
};

const eventImageTextStyle = {
	position: "absolute",
	bottom: "5%",
	left: "5%",
	width: "100%",
	height: "auto",
	color: "white"
};

const EventDetailedHeader = ({
	event,
	isHost,
	isGoing,
	goingToEvent,
	cancelGoingEvent
}) => {
	const { id, category, title, date, hostedBy, hostUid } = event;

	return (
		<Segment.Group>
			<Segment basic attached='top' style={{ padding: "0" }}>
				<Image
					src={`/assets/categoryImages/${category}.jpg`}
					fluid
					style={eventImageStyle}
				/>

				<Segment basic style={eventImageTextStyle}>
					<Item.Group>
						<Item>
							<Item.Content>
								<Header
									size='huge'
									content={title}
									style={{ color: "white" }}
								/>
								<p> {date && format(date.toDate(), "EEEE do LLLL")}</p>
								<p>
									Hosted by{" "}
									<strong>
										<Link to={`/profile/${hostUid}`} style={{ color: "#fff" }}>
											{hostedBy}
										</Link>
									</strong>
								</p>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
			</Segment>

			<Segment attached='bottom' clearing>
				{!isHost && (
					<Fragment>
						{isGoing ? (
							<Button onClick={() => cancelGoingEvent(event)}>
								Cancel My Place
							</Button>
						) : (
							<Button onClick={() => goingToEvent(event)} color='teal'>
								JOIN THIS EVENT
							</Button>
						)}
					</Fragment>
				)}

				{isHost && (
					<Button as={Link} to={`/manage/${id}`} color='orange' floated='right'>
						Manage Event
					</Button>
				)}
			</Segment>
		</Segment.Group>
	);
};

export default EventDetailedHeader;
