import React, { Component, Fragment } from "react";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";

import HomePage from "../../features/home";
import EventDashboard from "../../features/event/EventDashboard";
import NavBar from "../../features/nav/NavBar";
import EventDetailed from "../../features/event/EventDetailed";
import PeopleDashboard from "../../features/user/PeopleDashboard";
import UserDetailed from "../../features/user/UserDetailed";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import EventForm from "../../features/event/EventForm";
import TestComponent from "../../features/testarea/TestComponent";

class App extends Component {
	render() {
		return (
			<Fragment>
				<Route exact path='/' component={HomePage} />
				<Route
					path='/(.+)'
					render={() => (
						<Fragment>
							<NavBar />
							<Container className='main'>
								<Switch>
									<Route path='/events' component={EventDashboard} />
									<Route path='/events/:id' component={EventDetailed} />
									<Route path='/people' component={PeopleDashboard} />
									<Route path='/profile/:id' component={UserDetailed} />
									<Route path='/settings' component={SettingsDashboard} />
									<Route path='/createEvent' component={EventForm} />
									<Route path='/test' component={TestComponent} />
								</Switch>
							</Container>
						</Fragment>
					)}
				/>
			</Fragment>
		);
	}
}

export default App;
