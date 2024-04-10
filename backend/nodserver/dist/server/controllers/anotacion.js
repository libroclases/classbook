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
var Anotacion = _models["default"].Anotacion,
  Matricula = _models["default"].Matricula,
  Profesor = _models["default"].Profesor,
  Anno = _models["default"].Anno,
  Colegio = _models["default"].Colegio,
  Curso = _models["default"].Curso,
  Alumno = _models["default"].Alumno;
var Anotaciones = /*#__PURE__*/function () {
  function Anotaciones() {
    _classCallCheck(this, Anotaciones);
  }
  _createClass(Anotaciones, null, [{
    key: "list",
    value: function list(req, res) {
      return Anotacion.findAll({
        // where: getBaseQuery(req),
        attributes: ['id', 'texto', 'fecha', 'hora'],
        include: [{
          model: Matricula,
          attributes: ['id', 'nombre'],
          include: [{
            model: Alumno,
            attributes: ['id', 'nombre', 'apellido1', 'apellido2']
          }]
        }, {
          model: Profesor,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2']
        }, {
          model: Anno,
          attributes: ['id', 'nombre']
        }, {
          model: Colegio,
          attributes: ['id', 'nombre']
        }, {
          model: Curso,
          attributes: ['id', 'nombre']
        }],
        order: [['fecha', 'ASC']]
      }).then(function (_Anotaciones) {
        return res.status(200).send(_Anotaciones);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      // let consulta = getBaseQuery(req);
      consulta = {};
      consulta['id'] = req.params.anotacionId;
      return Anotacion.findOne({
        where: consulta
      }).then(function (_Anotaciones2) {
        return res.status(200).send(_Anotaciones2);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        matriculaId = _req$params.matriculaId,
        profesorId = _req$params.profesorId,
        annoId = _req$params.annoId,
        colegioId = _req$params.colegioId,
        cursoId = _req$params.cursoId;

      // let consulta = getBaseQuery(req);

      var consulta = {};
      if (matriculaId != '0') {
        consulta['matriculaId'] = matriculaId;
      }
      if (profesorId != '0') {
        consulta['profesorId'] = profesorId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (cursoId != '0') {
        consulta['cursoId'] = cursoId;
      }
      return Anotacion.findAll({
        where: consulta,
        include: [{
          model: Matricula,
          attributes: ['id', 'nombre'],
          include: [{
            model: Alumno,
            attributes: ['id', 'nombre', 'apellido1', 'apellido2']
          }]
        }, {
          model: Profesor,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2']
        }, {
          model: Anno,
          attributes: ['id', 'nombre']
        }, {
          model: Colegio,
          attributes: ['id', 'nombre']
        }, {
          model: Curso,
          attributes: ['id', 'nombre']
        }],
        order: [['fecha', 'ASC']]
      }).then(function (anotacion) {
        return res.status(200).send(anotacion);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params2 = req.params,
        matriculaId = _req$params2.matriculaId,
        profesorId = _req$params2.profesorId,
        annoId = _req$params2.annoId,
        colegioId = _req$params2.colegioId,
        cursoId = _req$params2.cursoId;
      var _req$body = req.body,
        texto = _req$body.texto,
        fecha = _req$body.fecha,
        hora = _req$body.hora;
      return Anotacion.create({
        texto: texto,
        fecha: fecha,
        hora: hora,
        matriculaId: matriculaId,
        profesorId: profesorId,
        annoId: annoId,
        colegioId: colegioId,
        cursoId: cursoId
      }).then(function (data) {
        return res.status(201).send({
          success: true,
          message: 'Anotacion successfully created',
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
        texto = _req$body2.texto,
        fecha = _req$body2.fecha,
        hora = _req$body2.hora,
        Matricula = _req$body2.Matricula,
        Profesor = _req$body2.Profesor,
        Anno = _req$body2.Anno,
        Colegio = _req$body2.Colegio,
        Curso = _req$body2.Curso;
      // let consulta = getBaseQuery(req);
      var consulta = {};
      consulta['id'] = req.params.anotacionId;
      return Anotacion.findOne({
        where: consulta
      }).then(function (anotacion) {
        anotacion.update({
          texto: texto || anotacion.texto,
          fecha: fecha || anotacion.fecha,
          hora: hora || anotacion.hora,
          matriculaId: Matricula || anotacion.matriculaId,
          profesorId: Profesor || anotacion.profesorId,
          annoId: Anno || anotacion.annoId,
          colegioId: Colegio || anotacion.colegioId,
          cursoId: Curso || anotacion.cursoId
        }).then(function (updatedAnotacion) {
          res.status(200).send({
            message: 'Anotacion updated successfully',
            data: {
              texto: texto || updatedAnotacion.texto,
              fecha: fecha || updatedAnotacion.fecha,
              hora: hora || updatedAnotacion.hora,
              matriculaId: Matricula || updatedAnotacion.matriculaId,
              profesorId: Profesor || updatedAnotacion.profesorId,
              annoId: Anno || updatedAnotacion.annoId,
              colegioId: Colegio || updatedAnotacion.colegioId,
              cursoId: Curso || updatedAnotacion.cursoId
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
  return Anotaciones;
}();
var _default = exports["default"] = Anotaciones;