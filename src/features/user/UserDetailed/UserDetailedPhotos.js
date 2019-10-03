import React from "react";
import { Grid, Header, Image, Segment } from "semantic-ui-react";

const UserDetailedPhotos = () => {
	return (
		<Grid.Column width={12}>
			<Segment attached>
				<Header icon='image' content='Photos' />

				<Image.Group size='small'>
					<Image src='https://randomuser.me/api/portraits/men/20.jpg' />
					<Image src='https://randomuser.me/api/portraits/men/20.jpg' />
					<Image src='https://randomuser.me/api/portraits/men/20.jpg' />
					<Image src='https://randomuser.me/api/portraits/men/20.jpg' />
				</Image.Group>
			</Segment>
		</Grid.Column>
	);
};

export default UserDetailedPhotos;
