"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var Usuario = _models["default"].Usuario,
  TipoUsuario = _models["default"].TipoUsuario,
  Alumno = _models["default"].Alumno,
  Apoderado = _models["default"].Apoderado,
  AsistenteColegio = _models["default"].AsistenteColegio,
  Profesor = _models["default"].Profesor,
  Utp = _models["default"].Utp,
  Tema = _models["default"].Tema;
var Usuarios = /*#__PURE__*/function () {
  function Usuarios() {
    _classCallCheck(this, Usuarios);
  }
  _createClass(Usuarios, null, [{
    key: "list",
    value: function list(req, res) {
      return Usuario.findAll({
        attributes: ['id', 'username', 'email'],
        include: [{
          model: TipoUsuario,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Tema,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['username', 'ASC']]
      }).then(function (usuarios) {
        return res.status(200).send(usuarios);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
      ;
    }
  }, {
    key: "bySearch",
    value: function bySearch(req, res) {
      var expr = req.params.expr;
      return Usuario.findAll({
        where: _defineProperty({}, Op.or, [{
          username: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }, {
          email: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }]),
        include: [{
          model: TipoUsuario,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Tema,
          attributes: ['id', 'nombre'],
          where: {}
        }]
      }).then(function (usuario) {
        return res.status(200).send(usuario);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getPersonalInfo",
    value: function getPersonalInfo(req, res) {
      var email = req.query.email;
      Usuario.findOne({
        where: {
          email: email
        },
        attributes: ['id'],
        include: [{
          model: TipoUsuario,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Tema,
          attributes: ['id', 'nombre'],
          where: {}
        }]
      }).then(function (usuario) {
        var out;
        var tipousuarioId = usuario.dataValues.TipoUsuario.dataValues.id;
        var Tipo;
        if (tipousuarioId == 1) {
          Tipo = Profesor;
        } else if (tipousuarioId == 2) {
          Tipo = Alumno;
        } else if (tipousuarioId == 3) {
          Tipo = Apoderado;
        } else if (tipousuarioId == 4) {
          Tipo = AsistenteColegio;
        } else if (tipousuarioId == 5) {
          Tipo = Utp;
        }
        // else if ( tipousuarioId == 6 ) { Tipo = Sostenedor } 
        // else if ( tipousuarioId == 7 ) { Tipo = Admin } 

        Tipo.findOne({
          where: {
            usuarioId: usuario.dataValues.id
          },
          attributes: ['id', 'nombre', 'apellido1', 'apellido2']
        }).then(function (datos_usuario) {
          out = {
            'usuario': usuario,
            'datos_usuario': datos_usuario
          };
        }).then(function () {
          return res.status(200).send(out);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        tipousuarioId = _req$params.tipousuarioId,
        temaId = _req$params.temaId;
      var consulta = {};
      if (tipousuarioId != '0') {
        consulta['tipousuarioId'] = tipousuarioId;
      }
      if (temaId != '0') {
        consulta['temaId'] = temaId;
      }
      return Usuario.findAll({
        where: consulta,
        attributes: ['id', 'username', 'email'],
        include: [{
          model: TipoUsuario,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Tema,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['username', 'ASC']]
      }).then(function (usuario) {
        return res.status(200).send(usuario);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
      ;
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      return Usuario.findByPk(req.params.usuarioId).then(function (usuario) {
        return res.status(200).send(usuario);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "byEmailSearch",
    value: function byEmailSearch(req, res) {
      var expr = req.params.expr;
      console.log('expr:', expr);
      return Usuario.findOne({
        where: {
          email: expr
        },
        include: [{
          model: TipoUsuario,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Tema,
          attributes: ['id', 'nombre'],
          where: {}
        }]
      }).then(function (usuario) {
        return res.status(200).send(usuario);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getLastId",
    value: function getLastId(req, res) {
      return Usuario.findOne({
        attributes: [Sequelize.fn('max', Sequelize.col('id'))],
        raw: true
      }).then(function (usuario) {
        return res.status(200).send(usuario);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params2 = req.params,
        tipousuarioId = _req$params2.tipousuarioId,
        temaId = _req$params2.temaId;
      var _req$body = req.body,
        username = _req$body.username,
        email = _req$body.email;
      return Usuario.create({
        username: username,
        email: email,
        tipousuarioId: tipousuarioId,
        temaId: temaId
      }).then(function (usuario) {
        return res.status(201).send({
          success: true,
          message: 'Usuario creado exitosamente',
          usuario: usuario
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body2 = req.body,
        username = _req$body2.username,
        email = _req$body2.email,
        TipoUsuario = _req$body2.TipoUsuario,
        Tema = _req$body2.Tema;
      return Usuario.findByPk(req.params.usuarioId).then(function (usuario) {
        usuario.update({
          email: email || usuario.email,
          username: username || usuario.username,
          tipousuarioId: TipoUsuario || usuario.tipousuarioId,
          temaId: Tema || usuario.temaId
        }).then(function (updateUsuario) {
          res.status(200).send({
            message: 'Usuario actualizado exitosamente',
            data: {
              email: email || updateUsuario.email,
              username: username || updateUsuario.username,
              tipousuarioId: TipoUsuario || updateUsuario.tipousuarioId,
              temaId: Tema || updateTema.temaId
            }
          });
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }]);
  return Usuarios;
}();
var _default = exports["default"] = Usuarios;