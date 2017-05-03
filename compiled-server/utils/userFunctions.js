'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = exports.verifyUserExists = exports.verifyCredentials = exports.verifyUserToken = exports.verifyUniqueUser = exports.getUserRoleFlags = undefined;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _envVariables = require('../../envVariables');

var _envVariables2 = _interopRequireDefault(_envVariables);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _roleConfig = require('../../roleConfig');

var _roleConfig2 = _interopRequireDefault(_roleConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyUniqueUser = function verifyUniqueUser(request, reply) {
  _models2.default.User.find({
    'where': {
      '$or': [{
        'email': request.payload.email
      }, {
        'username': request.payload.username
      }]
    }
  }).then(function (user) {
    if (user) {
      if (user.username === request.payload.username) {
        reply(_boom2.default.badRequest('Username taken'));
      }
      if (user.email === request.payload.email) {
        reply(_boom2.default.badRequest('Email taken'));
      }
    }
    reply(request.payload);
  }).catch(function (response) {
    console.log(response);
  });
};

var verifyUserToken = function verifyUserToken(request, reply) {
  var decoded = void 0;
  var token = request.params.token;
  try {
    decoded = _jsonwebtoken2.default.verify(token, _envVariables2.default.secret);
  } catch (error) {
    // TODO: Check this response for correct message
    reply(_boom2.default.badRequest('Token has expired.'));
  }
  if (!decoded) {
    return false;
  } else {
    // TODO: This needs to be tested for the 'remember me' login option
    _models2.default.User.find({
      'where': {
        '$or': [{
          'email': decoded.username
        }, {
          'username': decoded.username
        }]
      },
      'include': [{
        'model': _models2.default.UserPhoto
      }]
    }).then(function (user) {
      if (user) {
        user = user.get({ 'plain': true });
        _bcrypt2.default.compare(decoded.password, user.password, function (err, isValid) {
          if (isValid) {
            if (user.accountActivated) {
              reply(user);
            } else {
              reply(_boom2.default.badRequest('Account not activated.'));
            }
          } else {
            reply(_boom2.default.badRequest('Incorrect password!'));
          }
        });
      } else {
        reply(_boom2.default.badRequest('Incorrect username or email!'));
      }
    }).catch(function (response) {
      console.log(response);
    });
  }
};

var verifyCredentials = function verifyCredentials(request, reply) {
  var password = request.payload.password;

  _models2.default.User.find({
    'where': {
      '$or': [{
        'email': request.payload.username
      }, {
        'username': request.payload.username
      }]
    }
  }).then(function (user) {
    if (user) {
      user = user.get({ 'plain': true });
      _bcrypt2.default.compare(password, user.password, function (err, isValid) {
        if (isValid) {
          reply(user);
        } else {
          reply(_boom2.default.badRequest('Incorrect password!'));
        }
      });
    } else {
      reply(_boom2.default.badRequest('Incorrect username or email!'));
    }
  }).catch(function (response) {
    console.log(response);
  });
};

var verifyUserExists = function verifyUserExists(request, reply) {
  _models2.default.User.find({
    'where': {
      'email': request.payload.email
    }
  }).then(function (user) {
    if (user) {
      reply(user);
    } else {
      reply(_boom2.default.badRequest('User not found.'));
    }
  }).catch(function (response) {
    console.log(response);
  });
};

var hashPassword = function hashPassword(password, cb) {
  _bcrypt2.default.genSalt(10, function (err, salt) {
    _bcrypt2.default.hash(password, salt, function (error, hash) {
      return cb(err, hash);
    });
  });
};

var getUserRoleFlags = function getUserRoleFlags(user) {
  var userRoleFlags = 0;
  _roleConfig2.default.forEach(function (role) {
    if (user[role.name]) {
      userRoleFlags += role.roleFlags;
    }
  });

  return userRoleFlags;
};

exports.getUserRoleFlags = getUserRoleFlags;
exports.verifyUniqueUser = verifyUniqueUser;
exports.verifyUserToken = verifyUserToken;
exports.verifyCredentials = verifyCredentials;
exports.verifyUserExists = verifyUserExists;
exports.hashPassword = hashPassword;