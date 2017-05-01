'use strict';

import React from 'react';
import {Link} from 'react-router-dom';

export default class About extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	componentWillMount() {
		const { history, location, match } = this.props;
	}

	componentDidMount() {
		document.title = "Sandbox | About";
	}

	render() {
		return (
			<div>
		      <h1>About</h1>
		    </div>
		)
	}
}
