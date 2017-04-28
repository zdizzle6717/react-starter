'use strict';

import React from 'react';
import render from 'react-dom';
import Status from '../pieces/Status';

export default class NotFound extends React.Component {
	constructor() {
		super();
	}

	componentWillMount() {
		const { history, location, match } = this.props;
	}

	componentDidMount() {
		document.title = "Sandbox | Page Not Found";
	}

	render() {
		return (
			<Status code={404}>
				<div>
			  		<h1>404 | Page not found</h1>
			    </div>
			</Status>
		)
	}
}
