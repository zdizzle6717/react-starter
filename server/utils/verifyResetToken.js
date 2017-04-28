'use strict';

import jwt from 'jsonwebtoken';
import env from '../../envVariables';

const verifyResetToken = (token) => {
  let decoded;
  try {
    decoded = jwt.verify(token, env.secret);
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
