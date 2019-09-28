import React, { Component } from "react";
import { connect } from "react-redux";

import { decrementCounter, incrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";
import SimpleMap from "./SimpleMap";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const mapStateToProps = state => ({
	data: state.test.data
});

const mapDispatchToProps = {
	incrementCounter,
	decrementCounter
};

class TestComponent extends Component {
	state = {
		latLng: {
			lat: 48.9194107,
			lng: 24.7051122
		}
	};

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => {
				this.setState({
					latLng: latLng
				});
			})
			.catch(error => console.error("Error", error));
	};

	render() {
		const { incrementCounter, decrementCounter } = this.props;
		const { latLng } = this.state;
		return (
			<div>
				<h1>Test Component</h1>
				<h3>The number is: {this.props.data}</h3>
				<Button onClick={incrementCounter} positive content='Increment' />
				<Button onClick={decrementCounter} negative content='Decrement' />
				<br />
				<br />
				<TestPlaceInput selectAddress={this.handleSelect} />
				<SimpleMap key={latLng.lng} latLng={latLng} />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TestComponent);
