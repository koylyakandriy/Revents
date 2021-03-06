import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button, Header, Image, Item, Label, Segment } from "semantic-ui-react";
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
	loading,
	event,
	isHost,
	isGoing,
	goingToEvent,
	cancelGoingEvent,
	authenticated,
	openModal
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
				{event.cancelled && (
					<Label
						size='large'
						color='red'
						content='This event has been cancelled'
					/>
				)}
				{!isHost && (
					<Fragment>
						{isGoing && !event.cancelled && (
							<Button onClick={() => cancelGoingEvent(event)}>
								Cancel My Place
							</Button>
						)}

						{!isGoing && authenticated && !event.cancelled && (
							<Button
								onClick={() => goingToEvent(event)}
								loading={loading}
								color='teal'
							>
								JOIN THIS EVENT
							</Button>
						)}

						{!authenticated && !event.cancelled && (
							<Button
								onClick={() => openModal("UnauthModal")}
								loading={loading}
								color='teal'
							>
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
