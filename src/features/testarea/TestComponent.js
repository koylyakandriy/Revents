import React, { Component } from "react";
import { connect } from "react-redux";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Button } from "semantic-ui-react";

import { decrementCounter, incrementCounter } from "./testActions";
import TestPlaceInput from "./TestPlaceInput";
import SimpleMap from "./SimpleMap";
import { openModalAction } from "../modals/modalActions";

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
		const { incrementCounter, decrementCounter, openModalAction } = this.props;
		const { latLng } = this.state;
		return (
			<div>
				<h1>Test Component</h1>
				<h3>The number is: {this.props.data}</h3>
				<Button onClick={incrementCounter} positive content='Increment' />
				<Button onClick={decrementCounter} negative content='Decrement' />
				<Button
					onClick={() => openModalAction("TestModal", { data: 42 })}
					color='teal'
					content='Open Modal'
				/>
				<br />
				<br />
				<TestPlaceInput selectAddress={this.handleSelect} />
				<SimpleMap key={latLng.lng} latLng={latLng} />
			</div>
		);
	}
}
const mapStateToProps = state => ({
	data: state.test.data
});

const mapDispatchToProps = {
	incrementCounter,
	decrementCounter,
	openModalAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TestComponent);
