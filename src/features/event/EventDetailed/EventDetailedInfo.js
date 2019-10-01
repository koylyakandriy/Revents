import React, { useState } from "react";
import { Button, Grid, Icon, Segment } from "semantic-ui-react";
import { format, parseISO } from "date-fns";

import EventDetailedMap from "./EventDetailedMap";

const EventDetailedInfo = ({
	event: { description, date, venue, venueLatLng }
}) => {
	const [isMapOpen, showMapToggle] = useState(false);
	return (
		<Segment.Group>
			<Segment attached='top'>
				<Grid>
					<Grid.Column width={1}>
						<Icon size='large' color='teal' name='info' />
					</Grid.Column>
					<Grid.Column width={15}>
						<p>{description}</p>
					</Grid.Column>
				</Grid>
			</Segment>
			{date && (
				<Segment attached>
					<Grid verticalAlign='middle'>
						<Grid.Column width={1}>
							<Icon name='calendar' size='large' color='teal' />
						</Grid.Column>
						<Grid.Column width={15}>
							{date && <span>
								{format(parseISO(date), "EEEE do LLL")} at{" "}
								{format(parseISO(date), "h:mm a")}
							</span>}
						</Grid.Column>
					</Grid>
				</Segment>
			)}
			<Segment attached>
				<Grid verticalAlign='middle'>
					<Grid.Column width={1}>
						<Icon name='marker' size='large' color='teal' />
					</Grid.Column>
					<Grid.Column width={11}>
						<span>{venue}</span>
					</Grid.Column>
					<Grid.Column width={4}>
						<Button
							onClick={() => showMapToggle(!isMapOpen)}
							color='teal'
							size='tiny'
							content={isMapOpen ? "Hide Map" : "Show Map"}
						/>
					</Grid.Column>
				</Grid>
			</Segment>
			{isMapOpen && (
				<EventDetailedMap lat={venueLatLng.lat} lng={venueLatLng.lng} />
			)}
		</Segment.Group>
	);
};

export default EventDetailedInfo;
