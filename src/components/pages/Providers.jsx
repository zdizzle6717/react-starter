'use strict';

import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class Providers extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	componentWillMount() {
		const { history, location, match } = this.props;
	}

	componentDidMount() {
		document.title = "Sandbox | Providers";
	}

	render() {
		return (
			<div>
		      <h1>Providers</h1>
		    </div>
		)
	}
}

export default withRouter(Providers)
