const webpack = require('webpack');
const path = require('path');

module.exports = {
	'entry': path.join(__dirname, 'src', 'index.jsx'),
	'output': {
		'path': path.join(__dirname, 'dist', 'js'),
		'filename': 'app.js',
		'sourceMapFilename': 'app.map'
	},
	'devtool': '#source-map',
	'module': {
		'rules': [{
				'test': /\.jsx?$/,
				'exclude': /(node_modules)/,
				'loaders': ['babel-loader']
			},
			{
				'include': /\.json$/,
				'loaders': ['json-loader']
			}
		]
	},
	'resolve': {
		'extensions': ['.json', '.jsx', '.js']
	},
	'plugins': [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			'beautify': true,
			'dead_code': true,
			'compress': {
				'warnings': false,
				'keep_fnames': true
			},
			'mangle': {
				'keep_fnames': true
			},
			'sourceMap': true
		})
	]
};
