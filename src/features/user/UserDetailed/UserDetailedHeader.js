import React from "react";
import { Grid, Header, Item, Segment } from "semantic-ui-react";
import { differenceInYears } from "date-fns";
import LazyLoad from "react-lazyload";

const UserDetailedHeader = ({
	profile: { displayName, dateOfBirth, occupation, city, photoURL }
}) => {
	let age;

	if (dateOfBirth) {
		age = differenceInYears(Date.now(), dateOfBirth.toDate());
	} else {
		age = "unknown age";
	}

	return (
		<Grid.Column width={16}>
			<Segment>
				<Item.Group>
					<Item>
						<LazyLoad
							height={150}
							placeholder={
								<Item.Image avatar size='small' src='/assets/user.png' />
							}
						>
							<Item.Image
								avatar
								size='small'
								src={photoURL || "/assets/user.png"}
							/>
						</LazyLoad>

						<Item.Content verticalAlign='bottom'>
							<Header as='h1'>{displayName}</Header>
							<br />
							<Header as='h3'>{occupation}</Header>
							<br />
							<Header as='h3'>
								{age}, Lives in {city || "unknown city"}
							</Header>
						</Item.Content>
					</Item>
				</Item.Group>
			</Segment>
		</Grid.Column>
	);
};

export default UserDetailedHeader;
