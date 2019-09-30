import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import TextInput from "../../../app/common/form/TextInput";
import { loginAction } from "../authActions";

const LoginForm = ({ loginAction, handleSubmit }) => {
	return (
		<Form
			error
			size='large'
			onSubmit={handleSubmit(loginAction)}
			autoComplete='off'
		>
			<Segment>
				<Field
					name='email'
					component={TextInput}
					type='text'
					placeholder='Email Address'
				/>
				<Field
					name='password'
					component={TextInput}
					type='password'
					placeholder='password'
				/>
				<Button fluid size='large' color='teal'>
					Login
				</Button>
			</Segment>
		</Form>
	);
};

const mapDispatchToProps = {
	loginAction
};

export default connect(
	null,
	mapDispatchToProps
)(reduxForm({ form: "LoginForm" })(LoginForm));
