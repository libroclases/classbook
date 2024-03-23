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
// import { getBaseQuery } from './acceso';

var Colegio = _models["default"].Colegio,
  Periodo = _models["default"].Periodo,
  Curso = _models["default"].Curso,
  Anno = _models["default"].Anno,
  Profesor = _models["default"].Profesor,
  AsignaturaProfesor = _models["default"].AsignaturaProfesor,
  Matricula = _models["default"].Matricula,
  Evaluacion = _models["default"].Evaluacion,
  Nota = _models["default"].Nota;
var Notas = /*#__PURE__*/function () {
  function Notas() {
    _classCallCheck(this, Notas);
  }
  _createClass(Notas, null, [{
    key: "list",
    value: function list(req, res) {
      return Nota.findAll({
        // where: getBaseQuery(req),
        attributes: ['id', 'nota'],
        include: [{
          model: Matricula,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Evaluacion,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Curso,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Anno,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Periodo,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Profesor,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: AsignaturaProfesor,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['id', 'ASC']]
      }).then(function (notas) {
        return res.status(200).send(notas);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        annoId = _req$params.annoId,
        periodoId = _req$params.periodoId,
        colegioId = _req$params.colegioId,
        cursoId = _req$params.cursoId,
        profesorId = _req$params.profesorId,
        asignaturaprofesorId = _req$params.asignaturaprofesorId,
        matriculaId = _req$params.matriculaId,
        evaluacionId = _req$params.evaluacionId;
      var consulta = {};
      // let consulta = getBaseQuery(req);

      if (matriculaId != '0') {
        consulta['matriculaId'] = matriculaId;
      }
      if (evaluacionId != '0') {
        consulta['evaluacionId'] = evaluacionId;
      }
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (cursoId != '0') {
        consulta['cursoId'] = cursoId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      if (periodoId != '0') {
        consulta['periodoId'] = periodoId;
      }
      if (profesorId != '0') {
        consulta['profesorId'] = profesorId;
      }
      if (asignaturaprofesorId != '0') {
        consulta['asignaturaprofesorId'] = asignaturaprofesorId;
      }
      return Nota.findAll({
        where: consulta,
        attributes: ['id', 'nota'],
        include: [{
          model: Matricula,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Evaluacion,
          attributes: ['id', 'nombre', 'fecha'],
          where: {}
        }, {
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Curso,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Anno,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Periodo,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Profesor,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: AsignaturaProfesor,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['evaluacionId', 'ASC']]
      }).then(function (nota) {
        return res.status(200).send(nota);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params2 = req.params,
        annoId = _req$params2.annoId,
        periodoId = _req$params2.periodoId,
        colegioId = _req$params2.colegioId,
        cursoId = _req$params2.cursoId,
        profesorId = _req$params2.profesorId,
        asignaturaprofesorId = _req$params2.asignaturaprofesorId,
        matriculaId = _req$params2.matriculaId,
        evaluacionId = _req$params2.evaluacionId;
      var nota = req.body.nota;
      return Nota.create({
        nota: nota,
        matriculaId: matriculaId,
        evaluacionId: evaluacionId,
        periodoId: periodoId,
        colegioId: colegioId,
        cursoId: cursoId,
        annoId: annoId,
        profesorId: profesorId,
        asignaturaprofesorId: asignaturaprofesorId
      }).then(function (notaData) {
        return res.status(201).send({
          success: true,
          message: 'Nota successfully created',
          notaData: notaData
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var consulta = {};
      // let consulta = getBaseQuery(req);
      consulta['id'] = req.params.notaId;
      var nota = req.body.nota;
      return Nota.findOne({
        where: consulta
      }).then(function (notas) {
        notas.update({
          nota: nota || notas.nota
        }).then(function (updatedNota) {
          res.status(200).send({
            message: 'Nota updated successfully',
            data: {
              nota: nota || updatedNota.nota
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
  return Notas;
}();
var _default = exports["default"] = Notas;