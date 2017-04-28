'use strict';

module.exports = [
	{
		'name': 'public',
		'baseBit': 0, // 0
		'roleFlags': 0,
		'homeState': '/',
	},
	{
		'name': 'providerAdmin',
		'baseBit': (1 << 0), // 1
		'roleFlags': 1,
		'homeState': '/providers',
	},
	{
		'name': 'contactAdmin',
		'baseBit': (1 << 1), // 2
		'roleFlags': 2,
		'homeState': '/contacts',
	},
	{
		'name': 'siteAdmin',
		'baseBit': (1 << 2), // 4
		'roleFlags': 7,
		'homeState': '/providers',
	}
];
