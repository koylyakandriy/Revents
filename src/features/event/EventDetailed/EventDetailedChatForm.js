import React, { Component } from "react";
import { Button, Form } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextArea from "../../../app/common/form/TextArea";

class EventDetailedChatForm extends Component {
	state = {};

	handleCommentSubmit = values => {
		const { addEventComment, reset, eventId, closeForm, parentId } = this.props;
		addEventComment(eventId, values, parentId);
		reset();
		if (parentId !== 0) {
			closeForm();
		}
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<Form reply onSubmit={handleSubmit(this.handleCommentSubmit)}>
				<Field name='comment' type='text' component={TextArea} rows={2} />
				<Button content='Add Reply' labelPosition='left' icon='edit' primary />
			</Form>
		);
	}
}

export default reduxForm({ Fields: "comment" })(EventDetailedChatForm);
