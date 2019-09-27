import React, { Component } from "react";
import { connect } from "react-redux";

import { decrementCounter, incrementCounter } from "./testActions";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";

const mapStateToProps = state => ({
	data: state.test.data
});

const mapDispatchToProps = {
	incrementCounter,
	decrementCounter
};

class TestComponent extends Component {
	state = {};

	render() {
		const { incrementCounter, decrementCounter } = this.props;
		return (
			<div>
				<h1>Test Component</h1>
				<h3>The number is: {this.props.data}</h3>
				<Button onClick={incrementCounter} positive content='Increment' />
				<Button onClick={decrementCounter} negative content='Decrement' />
				<br/><br/>
				<TestPlaceInput />
			</div>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(TestComponent);
