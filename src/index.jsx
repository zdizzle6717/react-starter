import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import Layout from './components/Layout';
import {createBrowserHistory} from 'history';
import store from './store';

const history = createBrowserHistory();

window.onload = () => {
    render(
		<Provider store={store}>
			<BrowserRouter history={history}>
				<Layout />
			</BrowserRouter>
		</Provider>,
		document.getElementById('main')
	);
};
