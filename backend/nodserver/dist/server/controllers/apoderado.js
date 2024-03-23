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
var Apoderado = _models["default"].Apoderado,
  NivelEducacional = _models["default"].NivelEducacional,
  Sexo = _models["default"].Sexo,
  Usuario = _models["default"].Usuario,
  Region = _models["default"].Region,
  Provincix = _models["default"].Provincix,
  Comuna = _models["default"].Comuna;
var Apoderados = /*#__PURE__*/function () {
  function Apoderados() {
    _classCallCheck(this, Apoderados);
  }
  _createClass(Apoderados, null, [{
    key: "list",
    value: function list(req, res) {
      return Apoderado.findAll({
        attributes: ['id', 'nombre', 'apellido1', 'apellido2', 'rut', 'direccion', 'celular', 'nacimiento'],
        include: [{
          model: NivelEducacional,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Usuario,
          attributes: ['id', 'username', 'email'],
          where: {}
        }, {
          model: Sexo,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Region,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Provincix,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Comuna,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['apellido1', 'ASC'], ['apellido2', 'ASC'], ['nombre', 'ASC']]
      }).then(function (apoderado) {
        return res.status(200).send(apoderado);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "byRutSearch",
    value: function byRutSearch(req, res) {
      return Apoderado.findOne({
        where: {
          rut: req.params.expr
        },
        include: [{
          model: NivelEducacional,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Sexo,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Usuario,
          attributes: ['id', 'username', 'email'],
          where: {}
        }, {
          model: Region,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Provincix,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Comuna,
          attributes: ['id', 'nombre'],
          where: {}
        }]
      }).then(function (alumnos) {
        return res.status(200).send(alumnos);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "bySearch",
    value: function bySearch(req, res) {
      var expr = req.params.expr;
      return Apoderado.findAll({
        where: _defineProperty({}, Op.or, [{
          nombre: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }, {
          apellido1: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }, {
          apellido2: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }]),
        include: [{
          model: NivelEducacional,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Sexo,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Region,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Provincix,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Comuna,
          attributes: ['id', 'nombre'],
          where: {}
        }]
      }).then(function (apoderados) {
        return res.status(200).send(apoderados);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        niveleducacionalId = _req$params.niveleducacionalId,
        usuarioId = _req$params.usuarioId,
        sexoId = _req$params.sexoId,
        regionId = _req$params.regionId,
        provincixId = _req$params.provincixId,
        comunaId = _req$params.comunaId;
      var consulta = {};
      if (sexoId != '0') {
        consulta['sexoId'] = sexoId;
      }
      if (niveleducacionalId != '0') {
        consulta['niveleducacionalId'] = niveleducacionalId;
      }
      if (usuarioId != '0') {
        consulta['usuarioId'] = usuarioId;
      }
      if (regionId != '0') {
        consulta['regionId'] = regionId;
      }
      if (provincixId != '0') {
        consulta['provincixId'] = provincixId;
      }
      if (comunaId != '0') {
        consulta['comunaId'] = comunaId;
      }
      return Apoderado.findAll({
        where: consulta,
        attributes: ['id', 'nombre', 'apellido1', 'apellido2', 'rut', 'direccion', 'celular', 'nacimiento'],
        include: [{
          model: NivelEducacional,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Usuario,
          attributes: ['id', 'username', 'email'],
          where: {}
        }, {
          model: Sexo,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Region,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Provincix,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Comuna,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['apellido1', 'ASC'], ['apellido2', 'ASC']]
      }).then(function (apoderado) {
        return res.status(200).send(apoderado);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params2 = req.params,
        niveleducacionalId = _req$params2.niveleducacionalId,
        usuarioId = _req$params2.usuarioId,
        sexoId = _req$params2.sexoId,
        regionId = _req$params2.regionId,
        provincixId = _req$params2.provincixId,
        comunaId = _req$params2.comunaId;
      var _req$body = req.body,
        nombre = _req$body.nombre,
        apellido1 = _req$body.apellido1,
        apellido2 = _req$body.apellido2,
        rut = _req$body.rut,
        direccion = _req$body.direccion,
        celular = _req$body.celular,
        nacimiento = _req$body.nacimiento;
      return Apoderado.create({
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        rut: rut,
        direccion: direccion,
        celular: celular,
        nacimiento: nacimiento,
        niveleducacionalId: niveleducacionalId,
        usuarioId: usuarioId,
        sexoId: sexoId,
        regionId: regionId,
        provincixId: provincixId,
        comunaId: comunaId
      }).then(function (data) {
        return res.status(201).send({
          success: true,
          message: 'Apoderado creado exitosamente',
          data: data
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      var consulta = {};
      consulta['id'] = req.params.apoderadoId;
      return Apoderado.findOne({
        where: consulta,
        include: [{
          model: NivelEducacional,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Usuario,
          attributes: ['id', 'username', 'email'],
          where: {}
        }, {
          model: Sexo,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Region,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Provincix,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Comuna,
          attributes: ['id', 'nombre'],
          where: {}
        }]
      }).then(function (apoderados) {
        return res.status(200).send(apoderados);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body2 = req.body,
        nombre = _req$body2.nombre,
        apellido1 = _req$body2.apellido1,
        apellido2 = _req$body2.apellido2,
        rut = _req$body2.rut,
        direccion = _req$body2.direccion,
        celular = _req$body2.celular,
        nacimiento = _req$body2.nacimiento,
        Sexo = _req$body2.Sexo,
        NivelEducacional = _req$body2.NivelEducacional,
        Region = _req$body2.Region,
        Provincix = _req$body2.Provincix,
        Comuna = _req$body2.Comuna;
      return Apoderado.findByPk(req.params.apoderadoId).then(function (apoderado) {
        apoderado.update({
          nombre: nombre || apoderado.nombre,
          apellido1: apellido1 || apoderado.apellido1,
          apellido2: apellido2 || apoderado.apellido2,
          rut: rut || apoderado.rut,
          direccion: direccion || apoderado.direccion,
          celular: celular || apoderado.celular,
          nacimiento: nacimiento || apoderado.nacimiento,
          sexoId: Sexo || apoderado.sexoId,
          regionId: Region || apoderado.regionId,
          provincixId: Provincix || apoderado.provincixId,
          comunaId: Comuna || apoderado.comunaId,
          niveleducacionalId: NivelEducacional || apoderado.niveleducacionalId
        }).then(function (updateApoderado) {
          res.status(200).send({
            message: 'Apoderado actualizado exitosamente',
            data: {
              nombre: nombre || updateApoderado.nombre,
              apellido1: apellido1 || updateApoderado.apellido1,
              apellido2: apellido2 || updateApoderado.apellido2,
              rut: rut || updateApoderado.rut,
              direccion: direccion || updateApoderado.direccion,
              celular: celular || updateApoderado.celular,
              nacimiento: nacimiento || updateApoderado.nacimiento,
              sexoId: Sexo || updateApoderado.sexoId,
              regionId: Region || updateApoderado.regionId,
              provincixId: Provincix || updateApoderado.provincixId,
              comunaId: Comuna || updateApoderado.comunaId,
              niveleducacionalId: NivelEducacional || updateApoderado.niveleducacionalId
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
  return Apoderados;
}();
var _default = exports["default"] = Apoderados;