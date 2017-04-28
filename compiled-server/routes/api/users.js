'use strict';

var _handlers = require('../handlers');

var _handlers2 = _interopRequireDefault(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _userFunctions = require('../../utils/userFunctions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = [
// Users
{
  'method': 'POST',
  'path': '/api/users',
  'config': {
    'pre': [{
      'method': _userFunctions.verifyUniqueUser
    }],
    'handler': _handlers2.default.users.create,
    'tags': ['api'],
    'description': 'Register a new user',
    'notes': 'Register a new user',
    'validate': {
      'payload': {
        'username': _joi2.default.string().alphanum().min(2).max(300).required(),
        'email': _joi2.default.string().email().required(),
        'firstName': _joi2.default.optional(),
        'lastName': _joi2.default.optional(),
        'password': _joi2.default.string().required(),
        'role': _joi2.default.string().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/users/authenticate',
  'config': {
    'pre': [{
      'method': _userFunctions.verifyCredentials,
      'assign': 'user'
    }],
    'handler': _handlers2.default.users.authenticate,
    'tags': ['api'],
    'description': 'Authenticate an existing user',
    'notes': 'Authenticate an existing user',
    'validate': {
      'payload': _joi2.default.alternatives().try(_joi2.default.object({
        'username': _joi2.default.string().alphanum().min(2).max(30).required(),
        'password': _joi2.default.string().required()
      }), _joi2.default.object({
        'username': _joi2.default.string().email().required(),
        'password': _joi2.default.string().required()
      }))
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'GET',
  'path': '/api/users',
  'handler': _handlers2.default.users.getAll,
  'config': {
    'tags': ['api'],
    'description': 'Get all users',
    'notes': 'Get all users',
    'auth': {
      'strategy': 'jsonWebToken',
      'scope': ['siteAdmin']
    },
    'cors': {
      'origin': ['*']
    }
  }
}];