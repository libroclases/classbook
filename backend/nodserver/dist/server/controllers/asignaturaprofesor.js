"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var AsignaturaProfesor = _models["default"].AsignaturaProfesor,
  Profesor = _models["default"].Profesor,
  Asignatura = _models["default"].Asignatura;
var AsignaturaProfesores = /*#__PURE__*/function () {
  function AsignaturaProfesores() {
    _classCallCheck(this, AsignaturaProfesores);
  }
  _createClass(AsignaturaProfesores, null, [{
    key: "list",
    value: function list(req, res) {
      return AsignaturaProfesor.findAll({
        attributes: ['id'],
        include: [{
          model: Asignatura,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Profesor,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }],
        order: [['id', 'ASC']]
      }).then(function (_AsignaturaProfesores) {
        return res.status(200).send(_AsignaturaProfesores);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      return AsignaturaProfesor.findByPk(req.params.asignaturaprofesorId).then(function (asistentesColegio) {
        return res.status(200).send(asistentesColegio);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        profesorId = _req$params.profesorId,
        asignaturaId = _req$params.asignaturaId;
      var consulta = {};
      if (asignaturaId != '0') {
        consulta['asignaturaId'] = asignaturaId;
      }
      if (profesorId != '0') {
        consulta['profesorId'] = profesorId;
      }
      return AsignaturaProfesor.findAll({
        where: consulta,
        attributes: ['id', 'nombre'],
        include: [{
          model: Asignatura,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Profesor,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }],
        order: [['id', 'ASC']]
      }).then(function (asignaturaprofesor) {
        return res.status(200).send(asignaturaprofesor);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var nombre = req.body.nombre;
      var _req$params2 = req.params,
        profesorId = _req$params2.profesorId,
        asignaturaId = _req$params2.asignaturaId;
      return AsignaturaProfesor.create({
        nombre: nombre,
        asignaturaId: asignaturaId,
        profesorId: profesorId
      }).then(function (AsignaturaProfesor) {
        return res.status(201).send({
          message: "AsignaturaProfesor creado exitosamente",
          AsignaturaProfesor: AsignaturaProfesor
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body = req.body,
        nombre = _req$body.nombre,
        Asignatura = _req$body.Asignatura,
        Profesor = _req$body.Profesor;
      return AsignaturaProfesor.findByPk(req.params.asignaturaprofesorId).then(function (AsignaturaProfesor) {
        AsignaturaProfesor.update({
          nombre: nombre || AsignaturaProfesor.nombre,
          asignaturaId: Asignatura || AsignaturaProfesor.asignaturaId,
          profesorId: Profesor || AsignaturaProfesor.profesorId
        }).then(function (updateAsignaturaProfesor) {
          res.status(200).send({
            message: 'AsignaturaProfesor actualizado exitosamente',
            data: {
              nombre: nombre || updateAsignaturaProfesor.nombre,
              asignaturaId: Asignatura || updateAsignaturaProfesor.asignaturaId,
              profesorId: Profesor || updateAsignaturaProfesor.profesorId
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
  return AsignaturaProfesores;
}();
var _default = exports["default"] = AsignaturaProfesores;