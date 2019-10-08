import React, { Component, Fragment } from "react";
import { Comment, Header, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

import EventDetailedChatForm from "./EventDetailedChatForm";

class EventDetailedChat extends Component {
	state = {
		showReplayForm: false,
		selectedCommentId: null
	};

	handleOpenReplayForm = id => () => {
		this.setState({
			showReplayForm: true,
			selectedCommentId: id
		});
	};

	handleCloseReplayForm = () => {
		this.setState({
			selectedCommentId: null,
			showReplayForm: false
		});
	};

	render() {
		const { addEventComment, eventId, eventChat } = this.props;
		const { showReplayForm, selectedCommentId } = this.state;
		return (
			<Fragment>
				<Segment
					textAlign='center'
					attached='top'
					inverted
					color='teal'
					style={{ border: "none" }}
				>
					<Header>Chat about this event</Header>
				</Segment>

				<Segment attached>
					<Comment.Group>
						{eventChat &&
							eventChat.map(comment => (
								<Comment key={comment.id}>
									<Comment.Avatar
										src={comment.photoURL || "/assets/user.png"}
									/>
									<Comment.Content>
										<Comment.Author as={Link} to={`/profile/${comment.uid}`}>
											{comment.displayName}
										</Comment.Author>
										<Comment.Metadata>
											<div>{formatDistance(comment.date, Date.now())}</div>
										</Comment.Metadata>
										<Comment.Text>{comment.text}</Comment.Text>
										<Comment.Actions>
											<Comment.Action
												onClick={this.handleOpenReplayForm(comment.id)}
											>
												Reply
											</Comment.Action>
											{showReplayForm && selectedCommentId === comment.id && (
												<EventDetailedChatForm
													addEventComment={addEventComment}
													eventId={eventId}
													form={`replay_${comment.id}`}
													closeForm={this.handleCloseReplayForm}
													parentId={comment.id}
												/>
											)}
										</Comment.Actions>
									</Comment.Content>

									{comment.childNodes &&
										comment.childNodes.map(child => (
											<Comment.Group>
												<Comment key={child.id}>
													<Comment.Avatar
														src={child.photoURL || "/assets/user.png"}
													/>
													<Comment.Content>
														<Comment.Author
															as={Link}
															to={`/profile/${child.uid}`}
														>
															{child.displayName}
														</Comment.Author>
														<Comment.Metadata>
															<div>
																{formatDistance(child.date, Date.now())}
															</div>
														</Comment.Metadata>
														<Comment.Text>{child.text}</Comment.Text>
														<Comment.Actions>
															<Comment.Action
																onClick={this.handleOpenReplayForm(child.id)}
															>
																Reply
															</Comment.Action>
															{showReplayForm &&
																selectedCommentId === child.id && (
																	<EventDetailedChatForm
																		addEventComment={addEventComment}
																		eventId={eventId}
																		form={`replay_${child.id}`}
																		closeForm={this.handleCloseReplayForm}
																		parentId={child.parentId}
																	/>
																)}
														</Comment.Actions>
													</Comment.Content>
												</Comment>
											</Comment.Group>
										))}
								</Comment>
							))}
					</Comment.Group>

					<EventDetailedChatForm
						addEventComment={addEventComment}
						eventId={eventId}
						form={"newComment"}
						parentId={0}
					/>
				</Segment>
			</Fragment>
		);
	}
}

export default EventDetailedChat;
