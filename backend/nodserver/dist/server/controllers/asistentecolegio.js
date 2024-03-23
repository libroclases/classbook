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
var AsistenteColegio = _models["default"].AsistenteColegio,
  TipoAsistente = _models["default"].TipoAsistente,
  Usuario = _models["default"].Usuario,
  Sexo = _models["default"].Sexo,
  Region = _models["default"].Region,
  Provincix = _models["default"].Provincix,
  Comuna = _models["default"].Comuna;
var AsistenteColegios = /*#__PURE__*/function () {
  function AsistenteColegios() {
    _classCallCheck(this, AsistenteColegios);
  }
  _createClass(AsistenteColegios, null, [{
    key: "list",
    value: function list(req, res) {
      return AsistenteColegio.findAll({
        attributes: ['id', 'nombre', 'apellido1', 'apellido2', 'rut', 'celular', 'direccion', 'nacimiento'],
        include: [{
          model: TipoAsistente,
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
      }).then(function (_AsistenteColegios) {
        return res.status(200).send(_AsistenteColegios);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "bySearch",
    value: function bySearch(req, res) {
      var expr = req.params.expr;
      return AsistenteColegio.findAll({
        where: _defineProperty({}, Op.or, [{
          nombre: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }, {
          apellido1: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }, {
          apellido2: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }]),
        include: [{
          model: TipoAsistente,
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
      }).then(function (asistecolegio) {
        return res.status(200).send(asistecolegio);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      return AsistenteColegio.findByPk(req.params.asistentecolegioId).then(function (asistentesColegio) {
        return res.status(200).send(asistentesColegio);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        tipoasistenteId = _req$params.tipoasistenteId,
        usuarioId = _req$params.usuarioId,
        sexoId = _req$params.sexoId,
        regionId = _req$params.regionId,
        provincixId = _req$params.provincixId,
        comunaId = _req$params.comunaId;
      var consulta = {};
      if (tipoasistenteId != '0') {
        consulta['tipoasistenteId'] = tipoasistenteId;
      }
      if (usuarioId != '0') {
        consulta['usuarioId'] = usuarioId;
      }
      if (sexoId != '0') {
        consulta['sexoId'] = sexoId;
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
      return AsistenteColegio.findAll({
        where: consulta,
        attributes: ['id', 'nombre', 'apellido1', 'apellido2', 'rut', 'celular', 'direccion', 'nacimiento'],
        include: [{
          model: TipoAsistente,
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
      }).then(function (asistentecolegio) {
        res.status(200).send(asistentecolegio);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$body = req.body,
        nombre = _req$body.nombre,
        apellido1 = _req$body.apellido1,
        apellido2 = _req$body.apellido2,
        rut = _req$body.rut,
        celular = _req$body.celular,
        direccion = _req$body.direccion,
        nacimiento = _req$body.nacimiento;
      var _req$params2 = req.params,
        tipoasistenteId = _req$params2.tipoasistenteId,
        usuarioId = _req$params2.usuarioId,
        sexoId = _req$params2.sexoId,
        regionId = _req$params2.regionId,
        provincixId = _req$params2.provincixId,
        comunaId = _req$params2.comunaId;
      return AsistenteColegio.create({
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        rut: rut,
        celular: celular,
        direccion: direccion,
        nacimiento: nacimiento,
        tipoasistenteId: tipoasistenteId,
        usuarioId: usuarioId,
        sexoId: sexoId,
        regionId: regionId,
        provincixId: provincixId,
        comunaId: comunaId
      }).then(function (AsistenteColegio) {
        return res.status(201).send({
          message: "AsistenteColegio creado exitosamente",
          AsistenteColegio: AsistenteColegio
        });
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
        TipoAsistente = _req$body2.TipoAsistente,
        Sexo = _req$body2.Sexo,
        Region = _req$body2.Region,
        Provincix = _req$body2.Provincix,
        Comuna = _req$body2.Comuna;
      return AsistenteColegio.findByPk(req.params.asistentecolegioId).then(function (AsistenteColegio) {
        AsistenteColegio.update({
          nombre: nombre || AsistenteColegio.nombre,
          apellido1: apellido1 || AsistenteColegio.apellido1,
          apellido2: apellido2 || AsistenteColegio.apellido2,
          rut: rut || AsistenteColegio.rut,
          celular: celular || AsistenteColegio.celular,
          nacimiento: nacimiento || AsistenteColegio.nacimiento,
          direccion: direccion || AsistenteColegio.direccion,
          tipoasistenteId: TipoAsistente || AsistenteColegio.tipoasistenteId,
          sexoId: Sexo || AsistenteColegio.sexoId,
          regionId: Region || AsistenteColegio.regionId,
          provincixId: Provincix || AsistenteColegio.provincixId,
          comunaId: Comuna || AsistenteColegio.comunaId
        }).then(function (updatedAsistenteColegio) {
          res.status(200).send({
            message: 'AsistenteColegio actualizado exitosamente',
            data: {
              nombre: nombre || updatedAsistenteColegio.nombre,
              apellido1: apellido1 || updatedAsistenteColegio.apellido1,
              apellido2: apellido2 || updatedAsistenteColegio.apellido2,
              rut: rut || updatedAsistenteColegio.rut,
              celular: celular || updatedAsistenteColegio.celular,
              nacimiento: nacimiento || updatedAsistenteColegio.nacimiento,
              direccion: direccion || updatedAsistenteColegio.direccion,
              tipoasistenteId: TipoAsistente || updatedAsistenteColegio.tipoasistenteId,
              sexoId: Sexo || updatedAsistenteColegio.sexoId,
              regionId: Region || updatedAsistenteColegio.regionId,
              provincixId: Provincix || updatedAsistenteColegio.provincixId,
              comunaId: Comuna || updatedAsistenteColegio.comunaId
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
  return AsistenteColegios;
}();
var _default = exports["default"] = AsistenteColegios;