import React, { useState, useEffect, Fragment } from "react";
import { Button, Divider, Grid, Header, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import DropzoneInput from "./DropzoneInput";
import CropperInput from "./CropperInput";
import {
	uploadProfileImageAction,
	deletePhotoAction,
	setMainPhotoAction
} from "../../userActions";
import UserPhotos from "./UserPhotos";

const PhotosPage = ({
	uploadProfileImageAction,
	photos,
	profile,
	deletePhotoAction,
	setMainPhotoAction,
	loading
}) => {
	const [files, setFiles] = useState([]);
	const [image, setImage] = useState([null]);

	useEffect(() => {
		return () => {
			files.forEach(file => URL.revokeObjectURL(file.preview));
		};
	}, [files]);

	const handleUploadImage = async () => {
		try {
			await uploadProfileImageAction(image, files[0].name);
			handleCancelCrop();
			toastr.success("Success", "Photo has benn uploaded");
		} catch (err) {
			console.log("err", err);
			toastr.error("Oops", "Something went wrong");
		}
	};

	const handleCancelCrop = () => {
		setFiles([]);
		setImage(null);
	};

	const handleDeletePhoto = async photo => {
		try {
			await deletePhotoAction(photo);
		} catch (err) {
			console.log("err", err);
			toastr.error("Oops", err.message);
		}
	};

	const handleSetMainPhoto = async photo => {
		try {
			await setMainPhotoAction(photo);
		} catch (err) {
			toastr.error("Oopss", err.message);
		}
	};

	return (
		<Segment>
			<Header dividing size='large' content='Your Photos' />
			<Grid>
				<Grid.Row />
				<Grid.Column width={4}>
					<Header color='teal' sub content='Step 1 - Add Photo' />
					<DropzoneInput setFiles={setFiles} />
				</Grid.Column>
				<Grid.Column width={1} />
				<Grid.Column width={4}>
					<Header sub color='teal' content='Step 2 - Resize image' />
					{files.length > 0 && (
						<CropperInput setImage={setImage} imagePreview={files[0].preview} />
					)}
				</Grid.Column>
				<Grid.Column width={1} />
				<Grid.Column width={4}>
					<Header sub color='teal' content='Step 3 - Preview & Upload' />
					{files.length > 0 && (
						<Fragment>
							<div
								className='img-preview'
								style={{
									minHeight: "200px",
									minWidth: "200px",
									overflow: "hidden"
								}}
							/>
							<Button.Group>
								<Button
									loading={loading}
									onClick={handleUploadImage}
									style={{ width: "100px" }}
									positive
									icon='check'
								/>
								<Button
									disabled={loading}
									onClick={handleCancelCrop}
									style={{ width: "100px" }}
									icon='close'
								/>
							</Button.Group>
						</Fragment>
					)}
				</Grid.Column>
			</Grid>

			<Divider />
			<UserPhotos
				photos={photos}
				profile={profile}
				deletePhoto={handleDeletePhoto}
				setMainPhoto={handleSetMainPhoto}
			/>
		</Segment>
	);
};

const query = ({ auth }) => {
	return [
		{
			collection: "users",
			doc: auth.uid,
			subcollections: [{ collection: "photos" }],
			storeAs: "photos"
		}
	];
};

const mapStateToProps = state => ({
	auth: state.firebase.auth,
	profile: state.firebase.profile,
	photos: state.firestore.ordered.photos,
	loading: state.async.loading
});

const mapDispatchToProps = {
	uploadProfileImageAction,
	deletePhotoAction,
	setMainPhotoAction
};

export default compose(
	connect(
		mapStateToProps,
		mapDispatchToProps
	),
	firestoreConnect(auth => query(auth))
)(PhotosPage);
