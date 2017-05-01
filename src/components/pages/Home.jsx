'use strict';

import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class Home extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	componentWillMount() {
		const { history, location, match } = this.props;
	}

	componentDidMount() {
		document.title = "Sandbox | Home";
	}

	render() {
		return (
			<div>
		      <h1>Home</h1>
		    </div>
		)
	}
}

export default withRouter(Home)
