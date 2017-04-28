'use strict';

import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class Tabs extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	componentWillMount() {
		const { history, location, match } = this.props;
	}

	componentDidMount() {
		document.title = "Sandbox | Tabs";
	}

	render() {
		return (
			<div>
		      <h2>Tabs</h2>
			  {this.props.test}
		    </div>
		)
	}
}

Tabs.defaultProps = {
	'test': 'Hello, tabs.'
}

export default withRouter(Tabs)
