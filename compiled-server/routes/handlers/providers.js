'use strict';

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Provider Route Configs
var providers = {
  'create': function create(request, reply) {
    _models2.default.Provider.create({
      'name': request.payload.name,
      'dba': request.payload.dba,
      'email': request.payload.email,
      'identifier': request.payload.identifier,
      'identifierType': request.payload.identifierType,
      'legalName': request.payload.legalName,
      'phone': request.payload.phone,
      'providerNumber': request.payload.providerNumber,
      'state': request.payload.state
    }).then(function (provider) {
      reply(provider).code(200);
    });
  },
  'update': function update(request, reply) {
    _models2.default.Provider.find({
      where: {
        id: request.params.id
      }
    }).then(function (provider) {
      if (provider) {
        provider.updateAttributes({
          'name': request.payload.name,
          'dba': request.payload.dba,
          'email': request.payload.email,
          'identifier': request.payload.identifier,
          'identifierType': request.payload.identifierType,
          'legalName': request.payload.legalName,
          'phone': request.payload.phone,
          'providerNumber': request.payload.providerNumber,
          'state': request.payload.state
        }).then(function (provider) {
          reply(provider).code(200);
        });
      } else {
        reply().code(404);
      }
    });
  },
  'get': function get(request, reply) {
    _models2.default.Provider.find({
      'where': {
        'id': request.params.id
      },
      'include': [_models2.default.Contact]
    }).then(function (provider) {
      if (provider) {
        reply(provider).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  'getAll': function getAll(request, reply) {
    _models2.default.Provider.findAll({
      'limit': 50,
      'order': '"updatedAt" DESC'
    }).then(function (providers) {
      reply(providers).code(200);
    });
  },
  'delete': function _delete(request, reply) {
    _models2.default.Provider.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (provider) {
      if (provider) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

module.exports = providers;