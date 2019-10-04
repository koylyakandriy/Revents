import React from "react";
import { Grid, Header, Icon, Item, List, Segment } from "semantic-ui-react";
import format from "date-fns/format";

const UserDetailedDescription = ({
	profile: { createdAt, occupation, origin, displayName, interests, about }
}) => {
	let sinceFrom;
	if (createdAt) {
		sinceFrom = format(createdAt.toDate(), "d MMM yyyy");
	}

	return (
		<Grid.Column width={12}>
			<Segment>
				<Grid columns={2}>
					<Grid.Column width={10}>
						<Header icon='smile' content={displayName} />
						<p>
							I am a: <strong>{occupation || "tbn"}</strong>
						</p>
						<p>
							Originally from <strong>{origin || "tbn"}</strong>
						</p>
						<p>
							Member Since: <strong>{sinceFrom}</strong>
						</p>
						<p>{about}</p>
					</Grid.Column>
					<Grid.Column width={6}>
						<Header icon='heart outline' content='Interests' />
						{interests ? (
							<List>
								{interests &&
									interests.map(interest => (
										<Item key={interest}>
											<Icon name='heart' />
											<Item.Content>{interest}</Item.Content>
										</Item>
									))}
							</List>
						) : (
							<p>No interests</p>
						)}
					</Grid.Column>
				</Grid>
			</Segment>
		</Grid.Column>
	);
};

export default UserDetailedDescription;
