import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";

import HomePage from "../../features/home";
import EventDashboard from "../../features/event/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import EventDetailed from "../../features/event/EventDetailed/EventDetailed";
import PeopleDashboard from "../../features/user/PeopleDashboard";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import EventForm from "../../features/event/EventForm";
import TestComponent from "../../features/testarea/TestComponent";
import ModalManager from "../../features/modals/modalManager";
import { UserIsAuthenticated } from "../../features/auth/authWrapper";
import NotFound from "./NotFound";

class App extends Component {
	render() {
		const { location } = this.props;
		return (
			<Fragment>
				<ModalManager />
				<Route exact path='/' component={HomePage} />
				<Route
					path='/(.+)'
					render={() => (
						<Fragment>
							<NavBar />
							<Container className='main'>
								<Switch key={location.key}>
									<Route exact path='/events' component={EventDashboard} />
									<Route path='/events/:id' component={EventDetailed} />
									<Route
										path='/people'
										component={UserIsAuthenticated(PeopleDashboard)}
									/>
									<Route
										path='/profile/:id'
										component={UserIsAuthenticated(UserDetailedPage)}
									/>
									<Route
										path='/settings'
										component={UserIsAuthenticated(SettingsDashboard)}
									/>
									<Route
										path={["/createEvent", "/manage/:id"]}
										component={UserIsAuthenticated(EventForm)}
									/>
									<Route path='/test' component={TestComponent} />
									<Route component={NotFound} />
								</Switch>
							</Container>
						</Fragment>
					)}
				/>
			</Fragment>
		);
	}
}

export default withRouter(App);
