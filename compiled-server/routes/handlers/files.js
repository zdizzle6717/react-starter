'use strict';

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _envVariables = require('../../../envVariables.js');

var _envVariables2 = _interopRequireDefault(_envVariables);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// File Upload Route Configs
var files = {
	'create': function create(request, reply) {
		var data = request.payload;
		if (!data.path || !data.fileSize) {
			reply(_boom2.default.badRequest('A \'path\' and \'fileSize\' attribute must be appended to the FormData object'));
		} else if (data.file) {
			var fileName = Date.now() + '-' + data.file.hapi.filename;
			var location = __dirname + '/../../..' + _envVariables2.default.uploadPath + data.path;
			var path = location + fileName;
			_fsExtra2.default.ensureFile(path, function (err) {
				if (err) {
					reply(_boom2.default.notAcceptable('ensureFile: ' + err));
					return;
				}

				var file = _fsExtra2.default.createWriteStream(path);
				file.on('error', function (err) {
					reply(_boom2.default.notAcceptable(err));
				});

				data.file.pipe(file);

				data.file.on('end', function (err) {
					if (err) {
						reply(_boom2.default.notAcceptable('error on file end: ' + err));
						return;
					}

					var response = {
						'file': {
							'name': fileName,
							'size': data.fileSize,
							'type': data.file.hapi.headers['content-type']
						},
						'headers': data.file.hapi.headers,
						'status': 200,
						'statusText': 'File uploaded successfully!'
					};
					_fsExtra2.default.chown(location, _envVariables2.default.serverUID, _envVariables2.default.serverGID, function (err) {
						if (err) {
							reply(_boom2.default.notAcceptable('chown: ' + err));
							return;
						}
						_fsExtra2.default.chmod(location, '0775', function (err) {
							if (err) {
								reply(_boom2.default.notAcceptable('chown: ' + err));
								return;
							}
							reply(JSON.stringify(response));
						});
					});
				});
			});
		} else {
			var response = {
				'filename': data.file.hapi.filename,
				'headers': data.file.hapi.headers,
				'status': 400,
				'statusText': 'There was an error uploading your file. Max sure the dimensions are 800px by 530px.'
			};
			reply(JSON.stringify(response));
		}
	}
};

module.exports = files;