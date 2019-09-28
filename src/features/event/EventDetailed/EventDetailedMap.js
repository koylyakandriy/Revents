import React from "react";
import { Icon, Segment } from "semantic-ui-react";
import GoogleMapReact from "google-map-react";

const Marker = () => <Icon name='marker' size='big' color='red' />;

const EventDetailedMap = ({ lat, lng }) => {
	const zoom = 12;

	return (
		<Segment attached='bottom' style={{ padding: 0 }}>
			<div style={{ height: "300px", width: "100%" }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: "AIzaSyAL1yJB02Z9mnBK32YT0KfE38giur34AW0" }}
					defaultCenter={{ lat, lng }}
					defaultZoom={zoom}
				>
					<Marker lat={lat} lng={lng} />
				</GoogleMapReact>
			</div>
		</Segment>
	);
};

export default EventDetailedMap;
