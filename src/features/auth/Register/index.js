import React from "react";
import { Form, Segment, Button, Label, Divider } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { combineValidators, isRequired } from "revalidate";

import TextInput from "../../../app/common/form/TextInput";
import { registerUserAction } from "../authActions";
import SocialLogin from "../SocialLogin";

const validate = combineValidators({
	displayName: isRequired("name"),
	email: isRequired("email"),
	password: isRequired("password")
});

const RegisterForm = ({
	handleSubmit,
	registerUserAction,
	error,
	invalid,
	submitting
}) => {
	return (
		<div>
			<Form
				size='large'
				autoComplete='off'
				onSubmit={handleSubmit(registerUserAction)}
			>
				<Segment>
					<Field
						name='displayName'
						type='text'
						component={TextInput}
						placeholder='Known As'
					/>
					<Field
						name='email'
						type='text'
						component={TextInput}
						placeholder='Email'
					/>
					<Field
						name='password'
						type='password'
						component={TextInput}
						placeholder='Password'
					/>
					{error && (
						<Label basic color='red'>
							{error}
						</Label>
					)}
					<Button
						disabled={invalid || submitting}
						fluid
						size='large'
						color='teal'
					>
						Register
					</Button>
					<Divider horizontal>Or</Divider>
					<SocialLogin />
				</Segment>
			</Form>
		</div>
	);
};

const mapDispatchToProps = {
	registerUserAction
};

export default connect(
	null,
	mapDispatchToProps
)(reduxForm({ form: "RegisterForm", validate })(RegisterForm));
