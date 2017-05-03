switch (process.env.NODE_ENV) {
  case 'production':
    module.exports = require('./webpack.prod')({env: 'production'});
    break;
  case 'development':
	module.exports = require('./webpack.dev')({env: 'development'});
		break;
  case 'client':
	module.exports = require('./webpack.client')({env: 'production'});
		break;
  default:
    module.exports = require('./webpack.dev')({env: 'development'});
}
