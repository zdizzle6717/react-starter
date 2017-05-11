'use strict';

import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import ContactService from '../../services/ContactService';

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
		ContactService.getAll();
	}

	render() {
		return (
			<div>
		      <h1>Contacts</h1>
		    </div>
		)
	}
}

export default withRouter(Contacts)
