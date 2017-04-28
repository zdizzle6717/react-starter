'use strict';

var _handlers = require('../handlers');

var _handlers2 = _interopRequireDefault(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = [
// Providers
{
  'method': 'GET',
  'path': '/api/providers/{id}',
  'handler': _handlers2.default.providers.get,
  'config': {
    'tags': ['api'],
    'description': 'Get one provider by id',
    'notes': 'Get one provider by id',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'GET',
  'path': '/api/providers',
  'handler': _handlers2.default.providers.getAll,
  'config': {
    'tags': ['api'],
    'description': 'Get all providers',
    'notes': 'Get all providers',
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/providers',
  'handler': _handlers2.default.providers.create,
  'config': {
    'tags': ['api'],
    'description': 'Add a new provider',
    'notes': 'Add a new provider',
    'validate': {
      'payload': {
        'name': _joi2.default.string().required(),
        'dba': _joi2.default.string().required(),
        'email': _joi2.default.string().required(),
        'identifier': _joi2.default.string().required(),
        'identifierType': _joi2.default.string().required(),
        'legalName': _joi2.default.string().required(),
        'phone': _joi2.default.string().required(),
        'providerNumber': _joi2.default.string().required(),
        'state': _joi2.default.string().required()
      }
    },
    'auth': {
      'strategy': 'jsonWebToken',
      'scope': ['providerAdmin', 'siteAdmin']
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/providers/{id}',
  'handler': _handlers2.default.providers.update,
  'config': {
    'tags': ['api'],
    'description': 'Update a provider by id',
    'notes': 'Update a provider by id',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'id': _joi2.default.optional(),
        'name': _joi2.default.string().required(),
        'dba': _joi2.default.string().required(),
        'email': _joi2.default.string().required(),
        'identifier': _joi2.default.string().required(),
        'identifierType': _joi2.default.string().required(),
        'legalName': _joi2.default.string().required(),
        'phone': _joi2.default.string().required(),
        'providerNumber': _joi2.default.string().required(),
        'state': _joi2.default.string().required(),
        'createdAt': _joi2.default.optional(),
        'updatedAt': _joi2.default.optional(),
        'Contacts': _joi2.default.optional()
      }
    },
    'auth': {
      'strategy': 'jsonWebToken',
      'scope': ['providerAdmin', 'siteAdmin']
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/providers/{id}',
  'handler': _handlers2.default.providers.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete a provider by id',
    'notes': 'Delete a provider by id',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      }
    },
    'auth': {
      'strategy': 'jsonWebToken',
      'scope': ['providerAdmin', 'siteAdmin']
    },
    'cors': {
      'origin': ['*']
    }
  }
}];