import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {apiRoutes} from '../../constants/apiBaseRoutes';

export default class Menu extends React.Component {
	render() {
		let { menuClass, isAuthenticated, closeMenu, logout } = this.props;

		return (
			<div className={menuClass} onClick={closeMenu}>
				<ul className="main-menu">
					<li className="">
						<Link to="/providers" className="menu-link">Providers</Link>
					</li>
					<li className="">
						<Link to="/contacts" className="menu-link">Contacts</Link>
					</li>
					<li className="">
							<Link to="/tabs" className="menu-link">Tabs</Link>
						</li>
					<li className="">
						<a href={`${apiRoutes.dev}documentation`} className="menu-link" target="_blank">Api Guide</a>
					</li>
				</ul>
				<ul className="login-menu">
					{
						isAuthenticated ?
						<li className="login-link">
							<a className="menu-link" onClick={logout}>Logout</a>
						</li> :
						<li className="login-link">
							<Link to="/login" className="menu-link">Login/Register</Link>
						</li>
					}
				</ul>
			</div>
		)
	}
}

Menu.propTypes = {
	'menuClass': PropTypes.string,
	'isAuthenticated': PropTypes.bool,
	'closeMenu': PropTypes.func,
	'logout': PropTypes.func
}
