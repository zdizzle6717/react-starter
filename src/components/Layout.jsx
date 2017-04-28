import React from 'react'
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Animation from 'react-addons-css-transition-group';
import {configureAuthRoute} from '../library/authentication';
import {RedirectWithStatus} from '../library/routing';
import {Alerts} from '../library/alerts'
import {Loader} from '../library/loader';
import {UserActions} from '../library/authentication';
import initInterceptors from '../interceptors';
import {apiRoutes} from '../constants/apiBaseRoutes';
import roleConfig from '../../roleConfig';
const AuthRoute = configureAuthRoute(roleConfig);

// Routes
import TopNav from './pieces/TopNav';
import About from './pages/About';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Providers from './pages/Providers';
import Tabs from './pages/Tabs';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Topics from './pages/Topics';

// Initialize global interceptors such as 401, 403
initInterceptors(apiRoutes.dev, 300);

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		'setUser': UserActions.setUser
	}, dispatch);
}

class Layout extends React.Component {
	constructor() {
        super();
    }

    render() {
		return (
			<div>
				<header>
					<TopNav/>
				</header>

				<Animation transitionName="view" transitionAppear={true} transitionAppearTimeout={250} transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250} component='div' className='content-container'>
					<Switch>
						<Route location={this.props.location} path="/" exact component={Home}/>
						<RedirectWithStatus location={this.props.location} status={301} from="/redirect" to="/"/>
						<Route location={this.props.location} path="/contacts" component={Contacts}/>
						<Route location={this.props.location} path="/login" component={Login}/>
						<Route location={this.props.location} path="/register" component={Register}/>
						<Route location={this.props.location} path="/providers" component={Providers}/>
						<AuthRoute access={['siteAdmin']} location={this.props.location} path="/tabs" component={Tabs}/>
						<Route location={this.props.location} path="/topics" component={Topics}/>
						<Route location={this.props.location} component={NotFound}/>
						<Route location={this.props.location} component={Login}/>
					</Switch>
				</Animation>

				<Alerts></Alerts>
				<Loader></Loader>

				<footer>This is the footer.</footer>
			</div>
		)
	}
}

export default withRouter(connect(null, mapDispatchToProps)(Layout));
