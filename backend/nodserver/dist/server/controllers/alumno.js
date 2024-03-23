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
var Alumno = _models["default"].Alumno,
  Usuario = _models["default"].Usuario,
  Sexo = _models["default"].Sexo,
  Region = _models["default"].Region,
  Provincix = _models["default"].Provincix,
  Comuna = _models["default"].Comuna;
var Alumnos = /*#__PURE__*/function () {
  function Alumnos() {
    _classCallCheck(this, Alumnos);
  }
  _createClass(Alumnos, null, [{
    key: "list",
    value: function list(req, res) {
      return Alumno.findAll({
        attributes: ['id', 'nombre', 'apellido1', 'apellido2', 'nacimiento', 'rut', 'direccion', 'celular'],
        include: [{
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
        }],
        order: [['apellido1', 'ASC'], ['apellido2', 'ASC'], ['nombre', 'ASC']]
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
      return Alumno.findAll({
        where: _defineProperty({}, Op.or, [{
          nombre: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }, {
          apellido1: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }, {
          apellido2: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }]),
        include: [{
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
        order: [['apellido1', 'ASC']]
      }).then(function (alumnos) {
        return res.status(200).send(alumnos);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      var consulta = {};
      consulta['id'] = req.params.alumnoId;
      return Alumno.findOne({
        where: consulta,
        include: [{
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
      }).then(function (alumnos) {
        return res.status(200).send(alumnos);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "byRutSearch",
    value: function byRutSearch(req, res) {
      var expr = req.params.expr;
      console.log('expr:', expr);
      return Alumno.findOne({
        where: {
          rut: expr
        },
        include: [{
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
      }).then(function (alumno) {
        return res.status(200).send(alumno);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        usuarioId = _req$params.usuarioId,
        sexoId = _req$params.sexoId,
        regionId = _req$params.regionId,
        provincixId = _req$params.provincixId,
        comunaId = _req$params.comunaId;
      var consulta = {};
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
      return Alumno.findAll({
        where: consulta,
        include: [{
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
      }).then(function (alumno) {
        return res.status(200).send(alumno);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params2 = req.params,
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
      return Alumno.create({
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        rut: rut,
        direccion: direccion,
        celular: celular,
        nacimiento: nacimiento,
        usuarioId: usuarioId,
        sexoId: sexoId,
        regionId: regionId,
        provincixId: provincixId,
        comunaId: comunaId
      }).then(function (data) {
        return res.status(201).send({
          success: true,
          message: 'Alumno creado exitosamente',
          data: data
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
        Sexo = _req$body2.Sexo,
        Region = _req$body2.Region,
        Provincix = _req$body2.Provincix,
        Comuna = _req$body2.Comuna,
        nacimiento = _req$body2.nacimiento;
      return Alumno.findByPk(req.params.alumnoId).then(function (alumno) {
        alumno.update(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
          nombre: nombre || alumno.nombre,
          apellido1: apellido1 || alumno.apellido1,
          apellido2: apellido2 || alumno.apellido2,
          nacimiento: nacimiento || alumno.nacimiento,
          rut: rut || alumno.rut,
          direccion: direccion || alumno.direccion,
          celular: celular || alumno.celular
        }, "nacimiento", nacimiento || alumno.nacimiento), "sexoId", Sexo || alumno.sexoId), "regionId", Region || alumno.regionId), "provincixId", Provincix || alumno.provincixId), "comunaId", Comuna || alumno.provincixId)).then(function (updateAlumno) {
          res.status(200).send({
            message: 'Alumno modificado exitosamente',
            data: {
              // num_orden: num_orden || updateAlumno.num_orden, 
              // num_matricula: num_matricula || updateAlumno.num_matricula, 
              nombre: nombre || updateAlumno.nombre,
              apellido1: apellido1 || updateAlumno.apellido1,
              apellido2: apellido2 || updateAlumno.apellido2,
              nacimiento: nacimiento || updateAlumno.nacimiento,
              rut: rut || updateAlumno.rut,
              direccion: direccion || updateAlumno.direccion,
              celular: celular || updateAlumno.celular,
              sexoId: Sexo || updateAlumno.sexoId,
              regionId: Region || updateAlumno.regionId,
              provincixId: Provincix || updateAlumno.provincixId,
              comunaId: Comuna || updateAlumno.comunaId
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
  return Alumnos;
}();
var _default = exports["default"] = Alumnos;