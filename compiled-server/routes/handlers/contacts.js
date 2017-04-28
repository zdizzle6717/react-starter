'use strict';

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Contact Route Configs
var contacts = {
  'get': function get(request, reply) {
    _models2.default.Contact.find({
      'where': {
        'id': request.params.id
      },
      'include': [{
        'model': _models2.default.File
      }]
    }).then(function (contact) {
      if (contact) {
        reply(contact).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  'getAll': function getAll(request, reply) {
    _models2.default.Contact.findAll({
      'limit': 50
    }).then(function (contacts) {
      reply(contacts).code(200);
    });
  },
  'search': function search(request, reply) {
    var totalResults = 0;
    var totalPages = 0;
    var offset = 0;
    _models2.default.Contact.findAndCountAll().then(function (allResults) {
      totalResults = allResults.count;
      var totalPagesDecimal = totalResults === 0 ? 0 : totalResults / request.payload.pageSize;
      totalPages = Math.ceil(totalPagesDecimal);
      offset = (request.payload.pageNumber - 1) * request.payload.pageSize;

      _models2.default.Contact.findAll({
        'offset': offset,
        'limit': request.payload.pageSize
      }).then(function (results) {
        reply({
          'pagination': {
            'pageNumber': request.payload.pageNumber,
            'pageSize': request.payload.pageSize,
            'totalPages': totalPages,
            'totalResults': totalResults
          },
          'results': results
        }).code(200);
      });
    });
  },
  'searchSuggestions': function searchSuggestions(request, reply) {
    _models2.default.Contact.findAll({
      'where': {
        '$or': [{
          'firstName': {
            '$like': '%' + request.payload.searchQuery + '%'
          }
        }, {
          'lastName': {
            '$like': '%' + request.payload.searchQuery + '%'
          }
        }]
      },
      'attributes': ['id', 'firstName', 'lastName'],
      'limit': request.payload.maxResults
    }).then(function (results) {
      reply({
        'config': {
          'maxResults': request.payload.maxResults
        },
        'results': results
      }).code(200);
    });
  },
  'create': function create(request, reply) {
    _models2.default.Contact.create({
      'firstName': request.payload.firstName,
      'lastName': request.payload.lastName,
      'middleName': request.payload.middleName,
      'email': request.payload.email,
      'gender': request.payload.gender,
      'mobilePhone': request.payload.mobilePhone,
      'fax': request.payload.fax,
      'type': request.payload.type,
      'status': request.payload.status,
      'maritalStatus': request.payload.maritalStatus
    }).then(function (contact) {
      if (request.payload.Files) {
        _models2.default.File.create({
          'ContactId': contact.id,
          'name': request.payload.Files[0].name,
          'size': request.payload.Files[0].size,
          'type': request.payload.Files[0].type
        }).then(function (file) {
          _models2.default.Contact.find({
            'where': {
              'id': contact.id
            },
            'include': [{
              'model': _models2.default.File
            }]
          }).then(function (contact) {
            reply(contact).code(200);
          });
        });
      } else {
        reply(contact).code(200);
      }
    }).catch(function () {
      reply().code(406);
    });
  },
  'update': function update(request, reply) {
    _models2.default.Contact.find({
      where: {
        id: request.params.id
      }
    }).then(function (contact) {
      if (contact) {
        contact.updateAttributes({
          'firstName': request.payload.firstName,
          'lastName': request.payload.lastName,
          'middleName': request.payload.middleName,
          'email': request.payload.email,
          'gender': request.payload.gender,
          'mobilePhone': request.payload.mobilePhone,
          'fax': request.payload.fax,
          'type': request.payload.type,
          'status': request.payload.status,
          'maritalStatus': request.payload.maritalStatus
        }).then(function (contact) {
          if (request.payload.Files) {
            _models2.default.File.find({
              'where': {
                'ContactId': request.params.id
              }
            }).then(function (file) {
              if (file) {
                file.updateAttributes({
                  'name': request.payload.Files[0].name,
                  'size': request.payload.Files[0].size,
                  'type': request.payload.Files[0].type
                }).then(function (file) {
                  _models2.default.Contact.find({
                    'where': {
                      'id': request.params.id
                    },
                    'include': [{
                      'model': _models2.default.File
                    }]
                  }).then(function (contact) {
                    reply(contact).code(200);
                  });
                });
              } else {
                _models2.default.File.create({
                  'ContactId': request.params.id,
                  'name': request.payload.Files[0].name,
                  'size': request.payload.Files[0].size,
                  'type': request.payload.Files[0].type
                }).then(function () {
                  _models2.default.Contact.find({
                    'where': {
                      'id': request.params.id
                    },
                    'include': [{
                      'model': _models2.default.File
                    }]
                  }).then(function (contact) {
                    reply(contact).code(200);
                  });
                });
              }
            });
          } else {
            _models2.default.Contact.find({
              'where': {
                'id': request.params.id
              },
              'include': [{
                'model': _models2.default.File
              }]
            }).then(function (contact) {
              reply(contact).code(200);
            });
          }
        });
      } else {
        reply().code(404);
      }
    });
  },
  'delete': function _delete(request, reply) {
    _models2.default.Contact.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (contact) {
      if (contact) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

module.exports = contacts;