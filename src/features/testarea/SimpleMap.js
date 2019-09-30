import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "semantic-ui-react";

const AnyReactComponent = () => <Icon name='marker' size='big' color='red' />;

class SimpleMap extends Component {
	static defaultProps = {
		zoom: 11
	};

	render() {
		const { latLng, zoom } = this.props;
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: "300px", width: "100%" }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: "AIzaSyAL1yJB02Z9mnBK32YT0KfE38giur34AW0" }}
					defaultCenter={latLng}
					defaultZoom={zoom}
				>
					<AnyReactComponent lat={latLng.lat} lng={latLng.lng} />
				</GoogleMapReact>
			</div>
		);
	}
}

export default SimpleMap;
