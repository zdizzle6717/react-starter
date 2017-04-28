'use strict';

var _handlers = require('../handlers');

var _handlers2 = _interopRequireDefault(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = [{
  'method': 'POST',
  'path': '/api/files',
  'handler': _handlers2.default.files.create,
  'config': {
    'payload': {
      'output': 'stream',
      'maxBytes': 209715200,
      'parse': true,
      'allow': 'multipart/form-data'
    },
    'tags': ['api'],
    'description': 'Upload a new file',
    'notes': 'Upload a new file',
    'auth': {
      'strategy': 'jsonWebToken',
      'scope': ['contactAdmin', 'siteAdmin']
    },
    'cors': {
      'origin': ['*']
    }
  }
}];