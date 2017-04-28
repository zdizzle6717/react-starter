'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _envVariables = require('../../envVariables');

var _envVariables2 = _interopRequireDefault(_envVariables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createResetToken = function createResetToken(email) {
  // Sign the JWT
  return _jsonwebtoken2.default.sign({ 'email': email }, _envVariables2.default.secret, { 'algorithm': 'HS256', 'expiresIn': '1d' });
};

exports.default = createResetToken;