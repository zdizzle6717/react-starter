'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import routeConfig from './routeConfig';
import rootReducer from '../src/reducers';
import envVariables from '../envVariables';
import Layout from '../src/components/Layout';

// Initialize the server and configure support for handlebars templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname + '/../dist/')));

// Universal routing and rendering for SEO
for (let i in routeConfig) {
    let routePath = routeConfig[i].route;
    let routeView = routeConfig[i].view;

    app.get(routePath, (req, res) => {
		const context = {};
		const initialState = {};

		const store = createStore(
			rootReducer,
			initialState,
			applyMiddleware(
				thunkMiddleware, // let's us dispatch functions
			)
		);

		const markup = ReactDOMServer.renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
			      <Layout/>
			    </StaticRouter>
			</Provider>
		)

		// TODO: Create a solution to get intial state
		const state = JSON.stringify({});

		if (context.url) {
		  // Somewhere a `<Redirect>` was rendered
		  res.writeHead(context.status, {
			  'Location': context.url
		  });
		  res.end();
		} else {
			return res.render(routeView, {markup, state});
		}

	});
}

// Start the server
const port = envVariables.clientPort;
server.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on ${envVariables.baseUrl}:${port}`);
});
