'use strict';

import models from '../../models';
import Boom from 'boom';
import createUserToken from '../../utils/createUserToken';
import {hashPassword, getUserRoleFlags} from '../../utils/userFunctions';
import roleConfig from '../../../roleConfig';

// App users
let users = {
  'create': (request, reply) => {
    hashPassword(request.payload.password, (err, hash) => {
			let userConfig = {
        'email': request.payload.email,
        'firstName': request.payload.firstName,
        'lastName': request.payload.lastName,
        'username': request.payload.username,
        'password': hash
      };
			roleConfig.forEach((role) => {
				if (role.name !== 'public') {
					userConfig[role.name] = false;
				}
			});
			userConfig[request.payload.role] = true;
      models.User.create(userConfig)
        .then((user) => {
          reply({
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'firstName': user.firstName,
            'lastName': user.lastName,
            'roleFlags': getUserRoleFlags(user),
            'id_token': createUserToken(user)
          }).code(201);
        })
        .catch((response) => {
          throw Boom.badRequest(response);
        });
    });
  },
  'authenticate': (request, reply) => {
    reply({
      'id': request.pre.user.id,
      'email': request.pre.user.email,
      'firstName': request.pre.user.firstName,
      'lastName': request.pre.user.lastName,
      'username': request.pre.user.username,
      'roleFlags': getUserRoleFlags(request.pre.user),
      'id_token': createUserToken(request.pre.user)
    }).code(201);
  },
  'getAll': (request, reply) => {
    models.User.findAll({
        'attributes': ['username', 'email', 'createdAt'],
        'limit': 50,
        'order': '"updatedAt" DESC'
      })
      .then((users) => {
        reply(users).code(200);
      });
  }
}

module.exports = users;
