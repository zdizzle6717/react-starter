'use strict';

// Routes
import About from './components/pages/About';
import Home from './components/pages/Home';
import Contacts from './components/pages/Contacts';
import Login from './components/pages/Login';
import NotFound from './components/pages/NotFound';
import Providers from './components/pages/Providers';
import Register from './components/pages/Register';
import Tabs from './components/pages/Tabs';
import Topics from './components/pages/Topics';

import {UserActions} from './library/authentication'

let routes = [
	{
		'path': '/',
		'component': Home,
		'exact': true
	},
	{
		'path': '/about',
		'component': About,
		'exact': true
	},
	{
		'path': '/contacts',
		'component': Contacts,
		'exact': true,
		'strict': true
	},
	{
		'path': '/login',
		'component': Login,
		'exact': true
	},
	{
		'path': '/providers',
		'component': Providers,
		'exact': true
	},
	{
		'path': '/register',
		'component': Register,
		'exact': true
	},
	{
		'path': '/tabs',
		'component': Tabs,
		'access': ['siteAdmin'],
		'exact': true
	},
	{
		'path': '/topics',
		'component': Topics
	},

	// If no route matches, return NotFound component
	{
		'component': NotFound
	}
];

export default routes;
