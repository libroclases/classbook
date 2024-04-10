"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Evaluacion = _models["default"].Evaluacion,
  Colegio = _models["default"].Colegio,
  Curso = _models["default"].Curso,
  AsignaturaProfesor = _models["default"].AsignaturaProfesor,
  Profesor = _models["default"].Profesor,
  Anno = _models["default"].Anno,
  Periodo = _models["default"].Periodo,
  TipoEvaluacion = _models["default"].TipoEvaluacion,
  Matricula = _models["default"].Matricula,
  Nota = _models["default"].Nota;
var Evaluaciones = /*#__PURE__*/function () {
  function Evaluaciones() {
    _classCallCheck(this, Evaluaciones);
  }
  _createClass(Evaluaciones, null, [{
    key: "list",
    value: function list(req, res) {
      return Evaluacion.findAll({
        // where: getBaseQuery(req),
        attributes: ['id', 'nombre', 'fecha', 'hora', 'ponderacion'],
        include: [{
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Curso,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: AsignaturaProfesor,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Profesor,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
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
          model: TipoEvaluacion,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['fecha', 'ASC'], ['hora', 'ASC']]
      }).then(function (evaluaciones) {
        return res.status(200).send(evaluaciones);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        colegioId = _req$params.colegioId,
        cursoId = _req$params.cursoId,
        profesorId = _req$params.profesorId,
        asignaturaprofesorId = _req$params.asignaturaprofesorId,
        annoId = _req$params.annoId,
        periodoId = _req$params.periodoId,
        tipoevaluacionId = _req$params.tipoevaluacionId;
      var consulta = {};
      // let consulta = getBaseQuery(req);

      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (cursoId != '0') {
        consulta['cursoId'] = cursoId;
      }
      if (asignaturaprofesorId != '0') {
        consulta['asignaturaprofesorId'] = asignaturaprofesorId;
      }
      if (profesorId != '0') {
        consulta['profesorId'] = profesorId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      if (periodoId != '0') {
        consulta['periodoId'] = periodoId;
      }
      if (tipoevaluacionId != '0') {
        consulta['tipoevaluacionId'] = tipoevaluacionId;
      }
      return Evaluacion.findAll({
        where: consulta,
        attributes: ['id', 'nombre', 'fecha', 'hora', 'ponderacion'],
        include: [{
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Curso,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: AsignaturaProfesor,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Profesor,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
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
          model: TipoEvaluacion,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['fecha', 'ASC'], ['hora', 'ASC']]
      }).then(function (evaluaciones) {
        return res.status(200).send(evaluaciones);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$body = req.body,
        nombre = _req$body.nombre,
        fecha = _req$body.fecha,
        hora = _req$body.hora,
        ponderacion = _req$body.ponderacion;
      var _req$params2 = req.params,
        colegioId = _req$params2.colegioId,
        cursoId = _req$params2.cursoId,
        profesorId = _req$params2.profesorId,
        asignaturaprofesorId = _req$params2.asignaturaprofesorId,
        annoId = _req$params2.annoId,
        periodoId = _req$params2.periodoId,
        tipoevaluacionId = _req$params2.tipoevaluacionId;
      return Evaluacion.create({
        nombre: nombre,
        fecha: fecha,
        hora: hora,
        ponderacion: ponderacion,
        colegioId: colegioId,
        cursoId: cursoId,
        asignaturaprofesorId: asignaturaprofesorId,
        profesorId: profesorId,
        annoId: annoId,
        periodoId: periodoId,
        tipoevaluacionId: tipoevaluacionId
      }).then(function (evaluacion) {
        var e = evaluacion.dataValues;
        var p = {
          annoId: e.annoId,
          periodoId: e.periodoId,
          colegioId: e.colegioId,
          cursoId: e.cursoId,
          profesorId: e.profesorId,
          asignaturaprofesorId: e.asignaturaprofesorId,
          evaluacionId: e.id
        };
        var consulta = {};
        if (p.colegioId != 0) {
          consulta['colegioId'] = p.colegioId;
        }
        ;
        if (p.cursoId != 0) {
          consulta['cursoId'] = p.cursoId;
        }
        ;
        if (p.annoId != 0) {
          consulta['annoId'] = p.annoId;
        }
        ;
        Matricula.findAll({
          where: consulta,
          attributes: ['id'],
          order: [['id', 'ASC']]
        }).then(function (matricula) {
          var notasObject = [];
          matricula.forEach(function (m) {
            notasObject.push(_objectSpread(_objectSpread({}, p), {}, {
              matriculaId: m.dataValues.id
            }));
          });
          return Nota.bulkCreate(notasObject).then(function () {
            return res.status(201).send({
              success: true,
              newData: true,
              message: "Notas creadas exitosamente"
            });
          })["catch"](function (error) {
            return res.status(400).send({
              success: false,
              newData: false,
              message: "Entradas de Evaluacion NO fueron creadas : ".concat(error)
            });
          });
        });
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body2 = req.body,
        nombre = _req$body2.nombre,
        fecha = _req$body2.fecha,
        hora = _req$body2.hora,
        ponderacion = _req$body2.ponderacion,
        Colegio = _req$body2.Colegio,
        Curso = _req$body2.Curso,
        Profesor = _req$body2.Profesor,
        AsignaturaProfesor = _req$body2.AsignaturaProfesor,
        Anno = _req$body2.Anno,
        Periodo = _req$body2.Periodo,
        TipoEvaluacion = _req$body2.TipoEvaluacion;
      var consulta = {};
      // let consulta = getBaseQuery(req);
      consulta['id'] = req.params.evaluacionId;
      return Evaluacion.findOne({
        where: consulta
      }).then(function (evaluacion) {
        evaluacion.update({
          nombre: nombre || evaluacion.nombre,
          fecha: fecha || evaluacion.fecha,
          hora: hora || evaluacion.hora,
          ponderacion: ponderacion || evaluacion.ponderacion,
          colegioId: Colegio || evaluacion.colegioId,
          cursoId: Curso || evaluacion.cursoId,
          asignaturaprofesorId: AsignaturaProfesor || evaluacion.asignaturaprofesorId,
          profesorId: Profesor || evaluacion.profesorId,
          annoId: Anno || evaluacion.annoId,
          periodoId: Periodo || evaluacion.periodoId,
          tipoevaluacionId: TipoEvaluacion || evaluacion.tipoevaluacionId
        }).then(function (updatedEvaluacion) {
          res.status(200).send({
            message: 'Evaluacion actualizada exitosamente',
            data: {
              nombre: nombre || updatedEvaluacion.nombre,
              fecha: fecha || updatedEvaluacion.fecha,
              hora: hora || updatedEvaluacion.hora,
              ponderacion: ponderacion || updatedEvaluacion.ponderacion,
              colegioId: Colegio || updatedEvaluacion.colegioId,
              cursoId: Curso || updatedEvaluacion.cursoId,
              asignaturaprofesorId: AsignaturaProfesor || updatedEvaluacion.asignaturaprofesorId,
              profesorId: Profesor || updatedEvaluacion.profesorId,
              annoId: Anno || updatedEvaluacion.annoId,
              periodoId: Periodo || updatedEvaluacion.periodoId,
              tipoevaluacionId: TipoEvaluacion || updatedEvaluacion.tipoevaluacionId
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
  return Evaluaciones;
}();
var _default = exports["default"] = Evaluaciones;