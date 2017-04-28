'use strict';

import Boom from 'boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../../envVariables';
import models from '../models';
import roleConfig from '../../roleconfig';

const verifyUniqueUser = (request, reply) => {
  models.User.find({
    'where': {
      '$or': [{
        'email': request.payload.email
      }, {
        'username': request.payload.username
      }]
    }
  }).then((user) => {
    if (user) {
      if (user.username === request.payload.username) {
        reply(Boom.badRequest('Username taken'));
      }
      if (user.email === request.payload.email) {
        reply(Boom.badRequest('Email taken'));
      }
    }
    reply(request.payload);
  }).catch((response) => {
    console.log(response);
  });
};

const verifyUserToken = (request, reply) => {
  let decoded;
	let token = request.params.token;
  try {
    decoded = jwt.verify(token, env.secret);
  } catch (error) {
    // TODO: Check this response for correct message
		reply(Boom.badRequest('Token has expired.'));
  }
  if (!decoded) {
    return false;
  } else {
		// TODO: This needs to be tested for the 'remember me' login option
    models.User.find({
			'where': {
				'$or': [{
	        'email': decoded.username
	      }, {
	        'username': decoded.username
	      }]
			},
			'include': [{
				'model': models.UserPhoto
			}]
		}).then((user) => {
			if (user) {
				user = user.get({'plain': true});
	      bcrypt.compare(decoded.password, user.password, (err, isValid) => {
	        if (isValid) {
						if (user.accountActivated) {
							reply(user);
						} else {
							reply(Boom.badRequest('Account not activated.'));
						}
	        } else {
	          reply(Boom.badRequest('Incorrect password!'));
	        }
	      });
	    } else {
	      reply(Boom.badRequest('Incorrect username or email!'));
	    }
		}).catch((response) => {
	    console.log(response);
	  });
  }
};

const verifyCredentials = (request, reply) => {
  const password = request.payload.password;

  models.User.find({
    'where': {
      '$or': [{
        'email': request.payload.username
      }, {
        'username': request.payload.username
      }]
    }
  }).then((user) => {
    if (user) {
			user = user.get({'plain': true});
      bcrypt.compare(password, user.password, (err, isValid) => {
        if (isValid) {
					reply(user);
        } else {
          reply(Boom.badRequest('Incorrect password!'));
        }
      });
    } else {
      reply(Boom.badRequest('Incorrect username or email!'));
    }
  }).catch((response) => {
    console.log(response);
  });
};

const verifyUserExists = (request, reply) => {
  models.User.find({
    'where': {
      'email': request.payload.email
    }
  }).then((user) => {
    if (user) {
      reply(user);
    } else {
      reply(Boom.badRequest('User not found.'));
    }
  }).catch((response) => {
    console.log(response);
  });
};

const hashPassword = (password, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (error, hash) => {
      return cb(err, hash);
    });
  });
};

const getUserRoleFlags = (user) => {
  let userRoleFlags = 0;
  roleConfig.forEach((role) => {
    if (user[role.name]) {
      userRoleFlags += role.roleFlags;
    }
  });

  return userRoleFlags;
};

export {
	getUserRoleFlags,
  verifyUniqueUser,
  verifyUserToken,
  verifyCredentials,
  verifyUserExists,
  hashPassword
};
