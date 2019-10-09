import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";

import TextInput from "../../../app/common/form/TextInput";
import { loginAction, socialLoginAction } from "../authActions";
import SocialLogin from "../SocialLogin";

const LoginForm = ({
	loginAction,
	socialLoginAction,
	handleSubmit,
	error,
	submitting
}) => {
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
				{error && (
					<Label basic color='red'>
						{error}
					</Label>
				)}
				<Button loading={submitting} fluid size='large' color='teal'>
					Login
				</Button>
				<Divider horizontal>Or</Divider>
				<SocialLogin socialLogin={socialLoginAction} />
			</Segment>
		</Form>
	);
};

const mapDispatchToProps = {
	loginAction,
	socialLoginAction
};

export default connect(
	null,
	mapDispatchToProps
)(reduxForm({ form: "LoginForm" })(LoginForm));
