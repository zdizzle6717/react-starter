# react-starter
A straight forward starter kit for latest versions of react and redux with custom library

## Installation
* `sudo npm install`

> create an envVariables.js file in the root directory (example below)

<pre>
'use strict';

module.exports = {
	'version': '1.0.0',

  // Environment Specifics
	'name': 'development',
	'baseApiRoute': 'http://localhost:3030/api/',
	'baseUrl': 'http://localhost',
	'clientPort': 3000,
	'apiPort': 3030,
	'chatPort': 3031,
	'cors': {
		'origin': ['*']
	},

	'swagger': {
			'documentationPage': true
	},
	'googleAnalyticsKey': 'YOUR_GA_KEY',
	'uploadPath': '/dist/uploads/',
	'serverUID': YOUR_SERVER_UID,
	'serverGID': YOUR_SERVER_GID,
	'secret': 'SECRETS_SECRETS_ARE_NO_FUN',
	'dbConfig': {
		'development': {
        'username': 'YOUR_DB_USERNAME',
        'password': 'YOUR_DB_PASSWORD',
        'database': 'YOUR_DB_DATABASE',
        'host': '127.0.0.1',
        'dialect': 'postgres',
        'omitNull': true,
        'options': {
            'quoteIdentifiers': true
        }
    },
		'production': {
        'username': 'YOUR_DB_USERNAME',
        'password': 'YOUR_DB_PASSWORD',
        'database': 'YOUR_DB_DATABASE',
        'host': '127.0.0.1',
        'dialect': 'postgres',
        'omitNull': true,
        'options': {
            'quoteIdentifiers': true
        }
    }
	},
	'email': {
		'user': 'YOUR_EMAIL@EMAIL.COM',
		'pass': '',
		'XOAuth2': {
			'user': 'YOUR_EMAIL@EMAIL.COM',
			'clientId': 'YOUR_GOOGLE_CLIENT_ID',
			'clientSecret': 'YOUR_GOOGLE_CLIENT_SECRET',
			'refreshToken': 'YOUR_GOOGLE_REFRESH_TOKEN'
		}
	}
}
</pre>

1. Optionally create a google analytics account and add key to /envVariables.js ... uncomment respective code in /src/components/Layout.jsx
2. To find you serverUID and serverGID, type `id YOUR_USERNAME` into the server/localhost command prompt
3. Create a 'secret' key with a random key generator (https://randomkeygen.com/)
4. Install postgres on your OS, create a database and add username, password, database, host to /envVariables.js
5. To utilize gmail autoresponse, configure nodemailer and add the respective config to /envVariables.js (https://nodemailer.com/usage/using-gmail/)

* `npm install` OR `yarn install`

* `npm install pm2 -g` OR `yarn global add pm2`

* `npm run build-prod`

* `npm run start-server`

* `npm run start-client`

> navigate to localhost:3000 or the clientPort defined in envVariables.js
