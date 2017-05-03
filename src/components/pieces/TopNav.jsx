'use strict';

import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {CSSTransitionGroup as Animation} from 'react-transition-group';
import {AlertActions} from '../../library/alerts';
import {Link, withRouter} from 'react-router-dom';
import {UserActions} from '../../library/authentication';
import Menu from './Menu';

const mapStateToProps = (state) => {
	return {
		'user': state.user,
		'isAuthenticated': state.isAuthenticated
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
		'addAlert': AlertActions.addAlert,
		'logout': UserActions.logout
    }, dispatch);
};

class TopNav extends React.Component {
	constructor() {
		super();

		this.state = {
			'showMobileMenu': false
		}

		this.toggleMenu = this.toggleMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.showAlert = this.showAlert.bind(this);
		this.logout = this.logout.bind(this);
	}

	componentDidMount() {
	}

	toggleMenu() {
		this.setState({
			'showMobileMenu': !this.state.showMobileMenu
		});
	}

	closeMenu() {
		this.setState({
			'showMobileMenu': false
		});
	}

	logout() {
		this.props.logout();
		this.showAlert('logoutSuccess');
		this.props.history.push('/');
	}

	showAlert(selector) {
		const alerts = {
			'logoutSuccess': () => {
				this.props.addAlert({
					'title': 'Logout Success',
					'message': 'You have been successfully logged out.',
					'type': 'success',
					'delay': 3000
				});
			}
		}

		return alerts[selector]();
	}

	render() {
		let backdropClasses = classNames({
			'menu-backdrop': true,
			'show': this.state.showMobileMenu
		})

	    return (
			<div className="nav">
				<div className="home-link">
					<Link key="home" to="/" onClick={this.closeMenu}>Sandbox Home</Link>
				</div>
				<div className="menu-toggle" onClick={this.toggleMenu}>
					<i className="fa fa-bars"></i>
				</div>
				<Animation transitionName="slide-top" className="animation-wrapper" transitionEnter={true} transitionEnterTimeout={250} transitionLeave={true} transitionLeaveTimeout={250}>
					<Menu menuClass="menu-group" key="menu" isAuthenticated={this.props.isAuthenticated} closeMenu={this.closeMenu} logout={this.logout}/>
					{
						this.state.showMobileMenu &&
						<Menu menuClass="mobile-menu-group" key="mobile-menu" isAuthenticated={this.props.isAuthenticated} closeMenu={this.closeMenu} logout={this.logout}/>
					}
				</Animation>
				<div className={backdropClasses} onClick={this.closeMenu}></div>
			</div>
	    );
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopNav));
