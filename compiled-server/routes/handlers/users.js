'use strict';

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _createUserToken = require('../../utils/createUserToken');

var _createUserToken2 = _interopRequireDefault(_createUserToken);

var _userFunctions = require('../../utils/userFunctions');

var _roleConfig = require('../../../roleConfig');

var _roleConfig2 = _interopRequireDefault(_roleConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// App users
var users = {
  'create': function create(request, reply) {
    (0, _userFunctions.hashPassword)(request.payload.password, function (err, hash) {
      var userConfig = {
        'email': request.payload.email,
        'firstName': request.payload.firstName,
        'lastName': request.payload.lastName,
        'username': request.payload.username,
        'password': hash
      };
      _roleConfig2.default.forEach(function (role) {
        if (role.name !== 'public') {
          userConfig[role.name] = false;
        }
      });
      userConfig[request.payload.role] = true;
      _models2.default.User.create(userConfig).then(function (user) {
        reply({
          'id': user.id,
          'email': user.email,
          'username': user.username,
          'firstName': user.firstName,
          'lastName': user.lastName,
          'roleFlags': (0, _userFunctions.getUserRoleFlags)(user),
          'id_token': (0, _createUserToken2.default)(user)
        }).code(201);
      }).catch(function (response) {
        throw _boom2.default.badRequest(response);
      });
    });
  },
  'authenticate': function authenticate(request, reply) {
    reply({
      'id': request.pre.user.id,
      'email': request.pre.user.email,
      'firstName': request.pre.user.firstName,
      'lastName': request.pre.user.lastName,
      'username': request.pre.user.username,
      'roleFlags': (0, _userFunctions.getUserRoleFlags)(request.pre.user),
      'id_token': (0, _createUserToken2.default)(request.pre.user)
    }).code(201);
  },
  'getAll': function getAll(request, reply) {
    _models2.default.User.findAll({
      'attributes': ['username', 'email', 'createdAt'],
      'limit': 50,
      'order': '"updatedAt" DESC'
    }).then(function (users) {
      reply(users).code(200);
    });
  }
};

module.exports = users;