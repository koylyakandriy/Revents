import React from "react";
import { Grid } from "semantic-ui-react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import SettingsNav from "./SettingsNav";
import BasicPage from "./BasicPage";
import AboutPage from "./AboutPage";
import PhotosPage from "./PhotosPage";
import AccountPage from "./AccountPage";
import { updatePasswordAction } from "../../auth/authActions";
import { updateProfileAction } from "../userActions";

const SettingsDashboard = ({
	updatePasswordAction,
	providerId,
	user,
	updateProfileAction
}) => {
	return (
		<Grid>
			<Grid.Column width={12}>
				<Switch>
					<Redirect exact from='/settings' to='/settings/basic' />
					<Route
						path='/settings/basic'
						render={() => (
							<BasicPage
								initialValues={user}
								updateProfile={updateProfileAction}
							/>
						)}
					/>
					<Route
						path='/settings/about'
						render={() => (
							<AboutPage
								initialValues={user}
								updateProfile={updateProfileAction}
							/>
						)}
					/>
					<Route path='/settings/photos' component={PhotosPage} />
					<Route
						path='/settings/account'
						render={() => (
							<AccountPage
								updatePassword={updatePasswordAction}
								providerId={providerId}
							/>
						)}
					/>
				</Switch>
			</Grid.Column>
			<Grid.Column width={4}>
				<SettingsNav />
			</Grid.Column>
		</Grid>
	);
};

const mapStateToProps = state => ({
	providerId: state.firebase.auth.providerData[0].providerId,
	user: state.firebase.profile
});

const mapDispatchToProps = {
	updatePasswordAction,
	updateProfileAction
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsDashboard);
