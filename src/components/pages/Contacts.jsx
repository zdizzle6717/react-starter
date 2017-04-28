'use strict';

import React from 'react';
import {Link, withRouter} from 'react-router-dom';

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
	}

	render() {
		return (
			<div>
		      <h2>Contacts</h2>
		    </div>
		)
	}
}

export default withRouter(Contacts)
