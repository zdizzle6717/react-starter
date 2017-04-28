'use strict';

var _handlers = require('../handlers');

var _handlers2 = _interopRequireDefault(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = [
// Contacts
{
  'method': 'GET',
  'path': '/api/contacts/{id}',
  'handler': _handlers2.default.contacts.get,
  'config': {
    'tags': ['api'],
    'description': 'Get one contact by id',
    'notes': 'Get one contact by id',
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
  'path': '/api/contacts',
  'handler': _handlers2.default.contacts.getAll,
  'config': {
    'tags': ['api'],
    'description': 'Get all contacts',
    'notes': 'Get all contacts',
    'auth': {
      'strategy': 'jsonWebToken',
      'scope': ['contactAdmin', 'siteAdmin']
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/contacts/search',
  'handler': _handlers2.default.contacts.search,
  'config': {
    'tags': ['api'],
    'description': 'Search contacts and paginate response',
    'notes': 'Search contacts and paginate response',
    'validate': {
      'payload': {
        'searchQuery': _joi2.default.optional(),
        'pageNumber': _joi2.default.number().required(),
        'pageSize': _joi2.default.number().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/contacts/search/suggestions',
  'handler': _handlers2.default.contacts.searchSuggestions,
  'config': {
    'tags': ['api'],
    'description': 'Search for contact suggestions based on criteria',
    'notes': 'Search for contact suggestions based on criteria',
    'validate': {
      'payload': {
        'searchQuery': _joi2.default.optional(),
        'maxResults': _joi2.default.number().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/contacts',
  'handler': _handlers2.default.contacts.create,
  'config': {
    'tags': ['api'],
    'description': 'Add a new contact ',
    'notes': 'Add a new contact',
    'validate': {
      'payload': {
        'ProviderId': _joi2.default.optional(),
        'firstName': _joi2.default.string().required(),
        'lastName': _joi2.default.string().required(),
        'middleName': _joi2.default.string().required(),
        'email': _joi2.default.string().required(),
        'gender': _joi2.default.string().required(),
        'mobilePhone': _joi2.default.string().required(),
        'fax': _joi2.default.optional(),
        'type': _joi2.default.string().required(),
        'status': _joi2.default.boolean().required(),
        'maritalStatus': _joi2.default.string().required(),
        'Files': _joi2.default.array().items(_joi2.default.object().keys({
          'name': _joi2.default.string().required(),
          'size': _joi2.default.number().required(),
          'type': _joi2.default.string().required()
        })),
        'searchSugTest': _joi2.default.optional(),
        'datePickerTest': _joi2.default.optional()
      }
    },
    'auth': {
      'strategy': 'jsonWebToken',
      'scope': ['contactAdmin', 'siteAdmin']
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/contacts/{id}',
  'handler': _handlers2.default.contacts.update,
  'config': {
    'tags': ['api'],
    'description': 'Update a contact by id',
    'notes': 'Update a contact by id',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'id': _joi2.default.optional(),
        'createdAt': _joi2.default.optional(),
        'updatedAt': _joi2.default.optional(),
        'ProviderId': _joi2.default.optional(),
        'firstName': _joi2.default.string().required(),
        'lastName': _joi2.default.string().required(),
        'middleName': _joi2.default.string().required(),
        'email': _joi2.default.string().required(),
        'gender': _joi2.default.string().required(),
        'mobilePhone': _joi2.default.string().required(),
        'fax': _joi2.default.optional(),
        'type': _joi2.default.string().required(),
        'status': _joi2.default.boolean().required(),
        'maritalStatus': _joi2.default.string().required(),
        'Files': _joi2.default.array().items(_joi2.default.object().keys({
          'id': _joi2.default.optional(),
          'createdAt': _joi2.default.optional(),
          'updatedAt': _joi2.default.optional(),
          'ContactId': _joi2.default.optional(),
          'name': _joi2.default.string().required(),
          'size': _joi2.default.number().required(),
          'type': _joi2.default.string().required()
        })),
        'searchSugTest': _joi2.default.optional(),
        'datePickerTest': _joi2.default.optional()
      }
    },
    'auth': {
      'strategy': 'jsonWebToken',
      'scope': ['contactAdmin', 'siteAdmin']
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/contacts/{id}',
  'handler': _handlers2.default.contacts.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete a contact by id',
    'notes': 'Delete a contact by id',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      }
    },
    'auth': {
      'strategy': 'jsonWebToken',
      'scope': ['contactAdmin', 'siteAdmin']
    },
    'cors': {
      'origin': ['*']
    }
  }
}];