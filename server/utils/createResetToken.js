'use strict';

import jwt from 'jsonwebtoken';
import env from '../../envVariables';

const createResetToken = (email) => {
  // Sign the JWT
  return jwt.sign({ 'email': email }, env.secret, { 'algorithm': 'HS256', 'expiresIn': '1d' } );
};

export default createResetToken;
