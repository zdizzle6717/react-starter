'use strict';

import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ProviderActions from '../../actions/ProviderActions';
import ProviderConstants from '../../constants/ProviderConstants';

const mapStateToProps = (state) => {
	return {
		'providers': state.providers
	}
};

// This allows for dispatching any action directly from this.props.dispatch
const mapDispatchToProps = (dispatch) => {
	return {
		'actions': bindActionCreators({
			'getProviders': ProviderActions.getAll
		}, dispatch),
		'dispatch': dispatch
	}
}

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
		this.props.actions.getProviders();
		// OR
		// this.props.dispatch({
		// 	'type': ProviderConstants.GET_PROVIDERS
		// });
	}

	render() {
		return (
			<div>
		      <h1>Providers</h1>
				  {
	  				this.props.providers.map((provider, i) =>
	  					<div key={i}>
	  						<p>Id: {provider.id}</p>
	  						<p>Name: {provider.name}</p>
	  						<p>E-mail: {provider.email}</p>
	  					</div>
	  				)
	  			}
		    </div>
		)
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Providers));
