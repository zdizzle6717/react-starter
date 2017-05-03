"use strict";

require("source-map-support").install(), function (e) {
  function t(i) {
    if (a[i]) return a[i].exports;var r = a[i] = { i: i, l: !1, exports: {} };return e[i].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
  }var a = {};t.m = e, t.c = a, t.i = function (e) {
    return e;
  }, t.d = function (e, a, i) {
    t.o(e, a) || Object.defineProperty(e, a, { configurable: !1, enumerable: !0, get: i });
  }, t.n = function (e) {
    var a = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return t.d(a, "a", a), a;
  }, t.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, t.p = "", t(t.s = 18);
}([function (e, t, a) {
  "use strict";
  (function (t) {
    function i(e) {
      return e && e.__esModule ? e : { default: e };
    }var r = a(30),
        n = i(r),
        o = a(31),
        d = i(o),
        s = a(32),
        u = i(s),
        l = a(1),
        c = i(l),
        f = c.default.dbConfig,
        p = d.default.basename(t),
        m = f.production,
        h = {};if (m.use_env_variable) var g = new u.default(process.env[m.use_env_variable]);else var g = new u.default(m.database, m.username, m.password, m);n.default.readdirSync(__dirname).filter(function (e) {
      return 0 !== e.indexOf(".") && e !== p && ".js" === e.slice(-3);
    }).forEach(function (e) {
      console.log(__dirname, e);var t = g.import(d.default.join(__dirname, e));h[t.name] = t;
    }), Object.keys(h).forEach(function (e) {
      h[e].associate && h[e].associate(h);
    }), h.sequelize = g, h.Sequelize = u.default, e.exports = h;
  }).call(t, "server/models/index.js");
}, function (e, t, a) {
  "use strict";
  e.exports = { version: "1.0.0", name: "development", baseApiRoute: "http://localhost:7070/api/", baseUrl: "http://localhost", clientPort: 7e3, apiPort: 7070, chatPort: 7071, cors: { origin: ["*"] }, swagger: { documentationPage: !0 }, googleAnalyticsKey: "UA-48987915-2", uploadPath: "/dist/uploads/", serverUID: 501, serverGID: 20, secret: "2133E5638432C77CE4F03CD9C0EB5FF6AB1336914E55CF5A0E4ED4307B306599", dbConfig: { development: { username: "zanselm", password: "Bass1324fresh12", database: "sandbox3", host: "127.0.0.1", dialect: "postgres", omitNull: !0, options: { quoteIdentifiers: !0 } }, production: { username: "zanselm", password: "Bass1324fresh12", database: "sandbox3", host: "127.0.0.1", dialect: "postgres", omitNull: !0, options: { quoteIdentifiers: !0 } } }, email: { user: "test@email.com", pass: "", XOAuth2: { user: "BattleCommVault@gmail.com", clientId: "318512140643-jliekra11he3mnkaql8ei5q2li9p6vv4.apps.googleusercontent.com", clientSecret: "LSm6mfy5aGUqrnTu517L8xtz", refreshToken: "1/vqRHMe7J3Bt_A-mh-nS_h1HP4wcoAMfiHJw6-IoSxcw" } } };
}, function (e, t, a) {
  "use strict";
  e.exports = { contacts: a(23), files: a(24), providers: a(25), users: a(26) };
}, function (e, t) {
  e.exports = require("boom");
}, function (e, t) {
  e.exports = require("joi");
}, function (e, t, a) {
  "use strict";
  e.exports = [{ name: "public", baseBit: 0, roleFlags: 0, homeState: "/" }, { name: "providerAdmin", baseBit: 1, roleFlags: 1, homeState: "/providers" }, { name: "contactAdmin", baseBit: 2, roleFlags: 2, homeState: "/contacts" }, { name: "siteAdmin", baseBit: 4, roleFlags: 7, homeState: "/providers" }];
}, function (e, t) {
  e.exports = require("fs-extra");
}, function (e, t, a) {
  "use strict";
  function i(e) {
    return e && e.__esModule ? e : { default: e };
  }Object.defineProperty(t, "__esModule", { value: !0 }), t.hashPassword = t.verifyUserExists = t.verifyCredentials = t.verifyUserToken = t.verifyUniqueUser = t.getUserRoleFlags = void 0;var r = a(3),
      n = i(r),
      o = a(29),
      d = i(o),
      s = a(8),
      u = i(s),
      l = a(1),
      c = i(l),
      f = a(0),
      p = i(f),
      m = a(5),
      h = i(m),
      g = function g(e, t) {
    p.default.User.find({ where: { $or: [{ email: e.payload.email }, { username: e.payload.username }] } }).then(function (a) {
      a && (a.username === e.payload.username && t(n.default.badRequest("Username taken")), a.email === e.payload.email && t(n.default.badRequest("Email taken"))), t(e.payload);
    }).catch(function (e) {
      console.log(e);
    });
  },
      y = function y(e, t) {
    var a = void 0,
        i = e.params.token;try {
      a = u.default.verify(i, c.default.secret);
    } catch (e) {
      t(n.default.badRequest("Token has expired."));
    }if (!a) return !1;p.default.User.find({ where: { $or: [{ email: a.username }, { username: a.username }] }, include: [{ model: p.default.UserPhoto }] }).then(function (e) {
      e ? (e = e.get({ plain: !0 }), d.default.compare(a.password, e.password, function (a, i) {
        t(i ? e.accountActivated ? e : n.default.badRequest("Account not activated.") : n.default.badRequest("Incorrect password!"));
      })) : t(n.default.badRequest("Incorrect username or email!"));
    }).catch(function (e) {
      console.log(e);
    });
  },
      v = function v(e, t) {
    var a = e.payload.password;p.default.User.find({ where: { $or: [{ email: e.payload.username }, { username: e.payload.username }] } }).then(function (e) {
      e ? (e = e.get({ plain: !0 }), d.default.compare(a, e.password, function (a, i) {
        t(i ? e : n.default.badRequest("Incorrect password!"));
      })) : t(n.default.badRequest("Incorrect username or email!"));
    }).catch(function (e) {
      console.log(e);
    });
  },
      b = function b(e, t) {
    p.default.User.find({ where: { email: e.payload.email } }).then(function (e) {
      t(e ? e : n.default.badRequest("User not found."));
    }).catch(function (e) {
      console.log(e);
    });
  },
      q = function q(e, t) {
    d.default.genSalt(10, function (a, i) {
      d.default.hash(e, i, function (e, i) {
        return t(a, i);
      });
    });
  },
      x = function x(e) {
    var t = 0;return h.default.forEach(function (a) {
      e[a.name] && (t += a.roleFlags);
    }), t;
  };t.getUserRoleFlags = x, t.verifyUniqueUser = g, t.verifyUserToken = y, t.verifyCredentials = v, t.verifyUserExists = b, t.hashPassword = q;
}, function (e, t) {
  e.exports = require("jsonwebtoken");
}, function (e, t, a) {
  e.exports = a(28);
}, function (e, t, a) {
  "use strict";
  a(2);e.exports = [].concat(a(19)).concat(a(20)).concat(a(21)).concat(a(22));
}, function (e, t) {
  e.exports = require("cluster");
}, function (e, t) {
  e.exports = require("hapi");
}, function (e, t) {
  e.exports = require("hapi-auth-jwt2");
}, function (e, t) {
  e.exports = require("hapi-swagger");
}, function (e, t) {
  e.exports = require("inert");
}, function (e, t) {
  e.exports = require("os");
}, function (e, t) {
  e.exports = require("vision");
}, function (e, t, a) {
  "use strict";
  function i(e) {
    return e && e.__esModule ? e : { default: e };
  }var r = a(12),
      n = i(r),
      o = a(11),
      d = (i(o), a(16)),
      s = (i(d), a(15)),
      u = i(s),
      l = a(17),
      c = i(l),
      f = a(14),
      p = i(f),
      m = a(13),
      h = i(m),
      g = a(0),
      y = i(g),
      v = a(1),
      b = i(v);a(9);var q = new n.default.Server();q.connection({ port: b.default.apiPort });var x = { info: { title: "Sandbox 3 API Documentation", version: b.default.version }, basePath: "/api/", pathPrefixSize: 2 },
      A = function A(e, t, a) {
    return a(void 0, !0, { id: e.id, username: e.username, scope: e.scope });
  };q.register([u.default, c.default, { register: p.default, options: x }], { routes: { prefix: "/api" } }, function (e) {
    e ? q.log(["error"], "hapi-swagger load error: " + e) : q.log(["start"], "hapi-swagger interface loaded");
  }), q.register(h.default, function (e) {
    if (e) return void console.log(e);q.auth.strategy("jsonWebToken", "jwt", { key: b.default.secret, verifyOptions: { algorithms: ["HS256"] }, validateFunc: A }), q.route(a(10));
  });y.default.sequelize.sync().then(function () {
    q.start(function (e) {
      if (e) throw e;console.log("Server running at:", q.info.uri, "with process id", process.pid);
    });
  });
}, function (e, t, a) {
  "use strict";
  function i(e) {
    return e && e.__esModule ? e : { default: e };
  }var r = a(2),
      n = i(r),
      o = a(4),
      d = i(o);e.exports = [{ method: "GET", path: "/api/contacts/{id}", handler: n.default.contacts.get, config: { tags: ["api"], description: "Get one contact by id", notes: "Get one contact by id", validate: { params: { id: d.default.number().required() } }, cors: { origin: ["*"] } } }, { method: "GET", path: "/api/contacts", handler: n.default.contacts.getAll, config: { tags: ["api"], description: "Get all contacts", notes: "Get all contacts", auth: { strategy: "jsonWebToken", scope: ["contactAdmin", "siteAdmin"] }, cors: { origin: ["*"] } } }, { method: "POST", path: "/api/contacts/search", handler: n.default.contacts.search, config: { tags: ["api"], description: "Search contacts and paginate response", notes: "Search contacts and paginate response", validate: { payload: { searchQuery: d.default.optional(), pageNumber: d.default.number().required(), pageSize: d.default.number().required() } }, cors: { origin: ["*"] } } }, { method: "POST", path: "/api/contacts/search/suggestions", handler: n.default.contacts.searchSuggestions, config: { tags: ["api"], description: "Search for contact suggestions based on criteria", notes: "Search for contact suggestions based on criteria", validate: { payload: { searchQuery: d.default.optional(), maxResults: d.default.number().required() } }, cors: { origin: ["*"] } } }, { method: "POST", path: "/api/contacts", handler: n.default.contacts.create, config: { tags: ["api"], description: "Add a new contact ", notes: "Add a new contact", validate: { payload: { ProviderId: d.default.optional(), firstName: d.default.string().required(), lastName: d.default.string().required(), middleName: d.default.string().required(), email: d.default.string().required(), gender: d.default.string().required(), mobilePhone: d.default.string().required(), fax: d.default.optional(), type: d.default.string().required(), status: d.default.boolean().required(), maritalStatus: d.default.string().required(), Files: d.default.array().items(d.default.object().keys({ name: d.default.string().required(), size: d.default.number().required(), type: d.default.string().required() })), searchSugTest: d.default.optional(), datePickerTest: d.default.optional() } }, auth: { strategy: "jsonWebToken", scope: ["contactAdmin", "siteAdmin"] }, cors: { origin: ["*"] } } }, { method: "PUT", path: "/api/contacts/{id}", handler: n.default.contacts.update, config: { tags: ["api"], description: "Update a contact by id", notes: "Update a contact by id", validate: { params: { id: d.default.number().required() }, payload: { id: d.default.optional(), createdAt: d.default.optional(), updatedAt: d.default.optional(), ProviderId: d.default.optional(), firstName: d.default.string().required(), lastName: d.default.string().required(), middleName: d.default.string().required(), email: d.default.string().required(), gender: d.default.string().required(), mobilePhone: d.default.string().required(), fax: d.default.optional(), type: d.default.string().required(), status: d.default.boolean().required(), maritalStatus: d.default.string().required(), Files: d.default.array().items(d.default.object().keys({ id: d.default.optional(), createdAt: d.default.optional(), updatedAt: d.default.optional(), ContactId: d.default.optional(), name: d.default.string().required(), size: d.default.number().required(), type: d.default.string().required() })), searchSugTest: d.default.optional(), datePickerTest: d.default.optional() } }, auth: { strategy: "jsonWebToken", scope: ["contactAdmin", "siteAdmin"] }, cors: { origin: ["*"] } } }, { method: "DELETE", path: "/api/contacts/{id}", handler: n.default.contacts.delete, config: { tags: ["api"], description: "Delete a contact by id", notes: "Delete a contact by id", validate: { params: { id: d.default.number().required() } }, auth: { strategy: "jsonWebToken", scope: ["contactAdmin", "siteAdmin"] }, cors: { origin: ["*"] } } }];
}, function (e, t, a) {
  "use strict";
  function i(e) {
    return e && e.__esModule ? e : { default: e };
  }var r = a(2),
      n = i(r),
      o = a(4);i(o);e.exports = [{ method: "POST", path: "/api/files", handler: n.default.files.create, config: { payload: { output: "stream", maxBytes: 209715200, parse: !0, allow: "multipart/form-data" }, tags: ["api"], description: "Upload a new file", notes: "Upload a new file", auth: { strategy: "jsonWebToken", scope: ["contactAdmin", "siteAdmin"] }, cors: { origin: ["*"] } } }];
}, function (e, t, a) {
  "use strict";
  function i(e) {
    return e && e.__esModule ? e : { default: e };
  }var r = a(2),
      n = i(r),
      o = a(4),
      d = i(o);e.exports = [{ method: "GET", path: "/api/providers/{id}", handler: n.default.providers.get, config: { tags: ["api"], description: "Get one provider by id", notes: "Get one provider by id", validate: { params: { id: d.default.number().required() } }, cors: { origin: ["*"] } } }, { method: "GET", path: "/api/providers", handler: n.default.providers.getAll, config: { tags: ["api"], description: "Get all providers", notes: "Get all providers", cors: { origin: ["*"] } } }, { method: "POST", path: "/api/providers", handler: n.default.providers.create, config: { tags: ["api"], description: "Add a new provider", notes: "Add a new provider", validate: { payload: { name: d.default.string().required(), dba: d.default.string().required(), email: d.default.string().required(), identifier: d.default.string().required(), identifierType: d.default.string().required(), legalName: d.default.string().required(), phone: d.default.string().required(), providerNumber: d.default.string().required(), state: d.default.string().required() } }, auth: { strategy: "jsonWebToken", scope: ["providerAdmin", "siteAdmin"] }, cors: { origin: ["*"] } } }, { method: "PUT", path: "/api/providers/{id}", handler: n.default.providers.update, config: { tags: ["api"], description: "Update a provider by id", notes: "Update a provider by id", validate: { params: { id: d.default.number().required() }, payload: { id: d.default.optional(), name: d.default.string().required(), dba: d.default.string().required(), email: d.default.string().required(), identifier: d.default.string().required(), identifierType: d.default.string().required(), legalName: d.default.string().required(), phone: d.default.string().required(), providerNumber: d.default.string().required(), state: d.default.string().required(), createdAt: d.default.optional(), updatedAt: d.default.optional(), Contacts: d.default.optional() } }, auth: { strategy: "jsonWebToken", scope: ["providerAdmin", "siteAdmin"] }, cors: { origin: ["*"] } } }, { method: "DELETE", path: "/api/providers/{id}", handler: n.default.providers.delete, config: { tags: ["api"], description: "Delete a provider by id", notes: "Delete a provider by id", validate: { params: { id: d.default.number().required() } }, auth: { strategy: "jsonWebToken", scope: ["providerAdmin", "siteAdmin"] }, cors: { origin: ["*"] } } }];
}, function (e, t, a) {
  "use strict";
  function i(e) {
    return e && e.__esModule ? e : { default: e };
  }var r = a(2),
      n = i(r),
      o = a(4),
      d = i(o),
      s = a(7);e.exports = [{ method: "POST", path: "/api/users", config: { pre: [{ method: s.verifyUniqueUser }], handler: n.default.users.create, tags: ["api"], description: "Register a new user", notes: "Register a new user", validate: { payload: { username: d.default.string().alphanum().min(2).max(300).required(), email: d.default.string().email().required(), firstName: d.default.optional(), lastName: d.default.optional(), password: d.default.string().required(), role: d.default.string().required() } }, cors: { origin: ["*"] } } }, { method: "POST", path: "/api/users/authenticate", config: { pre: [{ method: s.verifyCredentials, assign: "user" }], handler: n.default.users.authenticate, tags: ["api"], description: "Authenticate an existing user", notes: "Authenticate an existing user", validate: { payload: d.default.alternatives().try(d.default.object({ username: d.default.string().alphanum().min(2).max(30).required(), password: d.default.string().required() }), d.default.object({ username: d.default.string().email().required(), password: d.default.string().required() })) }, cors: { origin: ["*"] } } }, { method: "GET", path: "/api/users", handler: n.default.users.getAll, config: { tags: ["api"], description: "Get all users", notes: "Get all users", auth: { strategy: "jsonWebToken", scope: ["siteAdmin"] }, cors: { origin: ["*"] } } }];
}, function (e, t, a) {
  "use strict";
  function i(e) {
    return e && e.__esModule ? e : { default: e };
  }var r = a(0),
      n = i(r),
      o = a(6),
      d = (i(o), a(3)),
      s = (i(d), { get: function get(e, t) {
      n.default.Contact.find({ where: { id: e.params.id }, include: [{ model: n.default.File }] }).then(function (e) {
        e ? t(e).code(200) : t().code(404);
      });
    }, getAll: function getAll(e, t) {
      n.default.Contact.findAll({ limit: 50 }).then(function (e) {
        t(e).code(200);
      });
    }, search: function search(e, t) {
      var a = 0,
          i = 0,
          r = 0;n.default.Contact.findAndCountAll().then(function (o) {
        a = o.count;var d = 0 === a ? 0 : a / e.payload.pageSize;i = Math.ceil(d), r = (e.payload.pageNumber - 1) * e.payload.pageSize, n.default.Contact.findAll({ offset: r, limit: e.payload.pageSize }).then(function (r) {
          t({ pagination: { pageNumber: e.payload.pageNumber, pageSize: e.payload.pageSize, totalPages: i, totalResults: a }, results: r }).code(200);
        });
      });
    }, searchSuggestions: function searchSuggestions(e, t) {
      n.default.Contact.findAll({ where: { $or: [{ firstName: { $like: "%" + e.payload.searchQuery + "%" } }, { lastName: { $like: "%" + e.payload.searchQuery + "%" } }] }, attributes: ["id", "firstName", "lastName"], limit: e.payload.maxResults }).then(function (a) {
        t({ config: { maxResults: e.payload.maxResults }, results: a }).code(200);
      });
    }, create: function create(e, t) {
      n.default.Contact.create({ firstName: e.payload.firstName, lastName: e.payload.lastName, middleName: e.payload.middleName, email: e.payload.email, gender: e.payload.gender, mobilePhone: e.payload.mobilePhone, fax: e.payload.fax, type: e.payload.type, status: e.payload.status, maritalStatus: e.payload.maritalStatus }).then(function (a) {
        e.payload.Files ? n.default.File.create({ ContactId: a.id, name: e.payload.Files[0].name, size: e.payload.Files[0].size, type: e.payload.Files[0].type }).then(function (e) {
          n.default.Contact.find({ where: { id: a.id }, include: [{ model: n.default.File }] }).then(function (e) {
            t(e).code(200);
          });
        }) : t(a).code(200);
      }).catch(function () {
        t().code(406);
      });
    }, update: function update(e, t) {
      n.default.Contact.find({ where: { id: e.params.id } }).then(function (a) {
        a ? a.updateAttributes({ firstName: e.payload.firstName, lastName: e.payload.lastName, middleName: e.payload.middleName, email: e.payload.email, gender: e.payload.gender, mobilePhone: e.payload.mobilePhone, fax: e.payload.fax, type: e.payload.type, status: e.payload.status, maritalStatus: e.payload.maritalStatus }).then(function (a) {
          e.payload.Files ? n.default.File.find({ where: { ContactId: e.params.id } }).then(function (a) {
            a ? a.updateAttributes({ name: e.payload.Files[0].name, size: e.payload.Files[0].size, type: e.payload.Files[0].type }).then(function (a) {
              n.default.Contact.find({ where: { id: e.params.id }, include: [{ model: n.default.File }] }).then(function (e) {
                t(e).code(200);
              });
            }) : n.default.File.create({ ContactId: e.params.id, name: e.payload.Files[0].name, size: e.payload.Files[0].size, type: e.payload.Files[0].type }).then(function () {
              n.default.Contact.find({ where: { id: e.params.id }, include: [{ model: n.default.File }] }).then(function (e) {
                t(e).code(200);
              });
            });
          }) : n.default.Contact.find({ where: { id: e.params.id }, include: [{ model: n.default.File }] }).then(function (e) {
            t(e).code(200);
          });
        }) : t().code(404);
      });
    }, delete: function _delete(e, t) {
      n.default.Contact.destroy({ where: { id: e.params.id } }).then(function (e) {
        e ? t().code(200) : t().code(404);
      });
    } });e.exports = s;
}, function (e, t, a) {
  "use strict";
  function i(e) {
    return e && e.__esModule ? e : { default: e };
  }var r = a(0),
      n = (i(r), a(6)),
      o = i(n),
      d = a(1),
      s = i(d),
      u = a(3),
      l = i(u),
      c = { create: function create(e, t) {
      var a = e.payload;if (a.path && a.fileSize) {
        if (a.file) {
          var i = Date.now() + "-" + a.file.hapi.filename,
              r = __dirname + "/../../.." + s.default.uploadPath + a.path,
              n = r + i;o.default.ensureFile(n, function (e) {
            if (e) return void t(l.default.notAcceptable("ensureFile: " + e));var d = o.default.createWriteStream(n);d.on("error", function (e) {
              t(l.default.notAcceptable(e));
            }), a.file.pipe(d), a.file.on("end", function (e) {
              if (e) return void t(l.default.notAcceptable("error on file end: " + e));var n = { file: { name: i, size: a.fileSize, type: a.file.hapi.headers["content-type"] }, headers: a.file.hapi.headers, status: 200, statusText: "File uploaded successfully!" };o.default.chown(r, s.default.serverUID, s.default.serverGID, function (e) {
                if (e) return void t(l.default.notAcceptable("chown: " + e));o.default.chmod(r, "0775", function (e) {
                  if (e) return void t(l.default.notAcceptable("chown: " + e));t(JSON.stringify(n));
                });
              });
            });
          });
        } else {
          var d = { filename: a.file.hapi.filename, headers: a.file.hapi.headers, status: 400, statusText: "There was an error uploading your file. Max sure the dimensions are 800px by 530px." };t(JSON.stringify(d));
        }
      } else t(l.default.badRequest("A 'path' and 'fileSize' attribute must be appended to the FormData object"));
    } };e.exports = c;
}, function (e, t, a) {
  "use strict";
  function i(e) {
    return e && e.__esModule ? e : { default: e };
  }var r = a(0),
      n = i(r),
      o = a(6),
      d = (i(o), a(3)),
      s = (i(d), { create: function create(e, t) {
      n.default.Provider.create({ name: e.payload.name, dba: e.payload.dba, email: e.payload.email, identifier: e.payload.identifier, identifierType: e.payload.identifierType, legalName: e.payload.legalName, phone: e.payload.phone, providerNumber: e.payload.providerNumber, state: e.payload.state }).then(function (e) {
        t(e).code(200);
      });
    }, update: function update(e, t) {
      n.default.Provider.find({ where: { id: e.params.id } }).then(function (a) {
        a ? a.updateAttributes({ name: e.payload.name, dba: e.payload.dba, email: e.payload.email, identifier: e.payload.identifier, identifierType: e.payload.identifierType, legalName: e.payload.legalName, phone: e.payload.phone, providerNumber: e.payload.providerNumber, state: e.payload.state }).then(function (e) {
          t(e).code(200);
        }) : t().code(404);
      });
    }, get: function get(e, t) {
      n.default.Provider.find({ where: { id: e.params.id }, include: [n.default.Contact] }).then(function (e) {
        e ? t(e).code(200) : t().code(404);
      });
    }, getAll: function getAll(e, t) {
      n.default.Provider.findAll({ limit: 50, order: '"updatedAt" DESC' }).then(function (e) {
        t(e).code(200);
      });
    }, delete: function _delete(e, t) {
      n.default.Provider.destroy({ where: { id: e.params.id } }).then(function (e) {
        e ? t().code(200) : t().code(404);
      });
    } });e.exports = s;
}, function (e, t, a) {
  "use strict";
  function i(e) {
    return e && e.__esModule ? e : { default: e };
  }var r = a(0),
      n = i(r),
      o = a(3),
      d = i(o),
      s = a(27),
      u = i(s),
      l = a(7),
      c = a(5),
      f = i(c),
      p = { create: function create(e, t) {
      (0, l.hashPassword)(e.payload.password, function (a, i) {
        var r = { email: e.payload.email, firstName: e.payload.firstName, lastName: e.payload.lastName, username: e.payload.username, password: i };f.default.forEach(function (e) {
          "public" !== e.name && (r[e.name] = !1);
        }), r[e.payload.role] = !0, n.default.User.create(r).then(function (e) {
          t({ id: e.id, email: e.email, username: e.username, firstName: e.firstName, lastName: e.lastName, roleFlags: (0, l.getUserRoleFlags)(e), id_token: (0, u.default)(e) }).code(201);
        }).catch(function (e) {
          throw d.default.badRequest(e);
        });
      });
    }, authenticate: function authenticate(e, t) {
      t({ id: e.pre.user.id, email: e.pre.user.email, firstName: e.pre.user.firstName, lastName: e.pre.user.lastName, username: e.pre.user.username, roleFlags: (0, l.getUserRoleFlags)(e.pre.user), id_token: (0, u.default)(e.pre.user) }).code(201);
    }, getAll: function getAll(e, t) {
      n.default.User.findAll({ attributes: ["username", "email", "createdAt"], limit: 50, order: '"updatedAt" DESC' }).then(function (e) {
        t(e).code(200);
      });
    } };e.exports = p;
}, function (e, t, a) {
  "use strict";
  function i(e) {
    return e && e.__esModule ? e : { default: e };
  }Object.defineProperty(t, "__esModule", { value: !0 });var r = a(8),
      n = i(r),
      o = a(1),
      d = i(o),
      s = a(5),
      u = i(s),
      l = function l(e, t) {
    var a = [];return u.default.forEach(function (t) {
      e[t.name] && a.push(t.name);
    }), n.default.sign({ id: e.id, username: e.username, scope: a }, d.default.secret, { algorithm: "HS256", expiresIn: t ? "30d" : "4h" });
  };t.default = l;
}, function (e, t) {
  e.exports = require("babel-register");
}, function (e, t) {
  e.exports = require("bcrypt");
}, function (e, t) {
  e.exports = require("fs");
}, function (e, t) {
  e.exports = require("path");
}, function (e, t) {
  e.exports = require("sequelize");
}]);
//# sourceMappingURL=compiled.js.map