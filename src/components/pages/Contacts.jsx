'use strict';

import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ContactActions from '../../actions/ContactActions';
import ContactConstants from '../../constants/ContactConstants';

const mapStateToProps = (state) => {
	return {
		'contacts': state.contacts
	}
};

// This allows for dispatching any action directly from this.props.dispatch
const mapDispatchToProps = (dispatch) => {
	return {
		'actions': bindActionCreators({
			'getContacts': ContactActions.getAll
		}, dispatch),
		'dispatch': dispatch
	}
}

class Contacts extends React.Component {
	constructor() {
		super();

		this.state = {};

	}

	componentWillMount() {
		const { history, location, match } = this.props;
	}

	componentDidMount() {
		document.title = "Sandbox | Contacts";
		this.props.actions.getContacts();
		// OR
		// this.props.dispatch({
		// 	'type': ContactConstants.GET_CONTACTS
		// });
	}

	render() {
		return (
			<div>
			<h1>Contacts</h1>
			{
				this.props.contacts.map((contact, i) =>
					<div key={i}>
						<p>Id: {contact.id}</p>
						<p>First Name: {contact.firstName}</p>
						<p>Last Name: {contact.lastName}</p>
					</div>
				)
			}
		    </div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Contacts));
