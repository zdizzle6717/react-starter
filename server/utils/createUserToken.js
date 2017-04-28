'use strict';

import jwt from 'jsonwebtoken';
import env from '../../envVariables';
import roleConfig from '../../roleConfig';

const createUserToken = (user, rememberMe) => {
	let scopes = [];
  roleConfig.forEach((role) => {
	  if (user[role.name]) {
		  scopes.push(role.name);
	  }
  });
  // Sign the JWT
  return jwt.sign({ 'id': user.id, 'username': user.username, 'scope': scopes }, env.secret, { 'algorithm': 'HS256', 'expiresIn': rememberMe ? '30d' : '4h' } );
};

export default createUserToken;
