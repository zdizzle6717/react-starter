'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _envVariables = require('../../envVariables');

var _envVariables2 = _interopRequireDefault(_envVariables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyResetToken = function verifyResetToken(token) {
  var decoded = void 0;
  try {
    decoded = _jsonwebtoken2.default.verify(token, _envVariables2.default.secret);
  } catch (error) {
    return false;
  }
  if (!decoded) {
    return false;
  } else {
    return decoded;
  }
};

module.exports = verifyResetToken;