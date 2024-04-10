"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireWildcard(require("../models"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Horario = _models["default"].Horario,
  Colegio = _models["default"].Colegio,
  Curso = _models["default"].Curso,
  Profesor = _models["default"].Profesor,
  AsignaturaProfesor = _models["default"].AsignaturaProfesor,
  Anno = _models["default"].Anno,
  Dix = _models["default"].Dix;
var Horarios = /*#__PURE__*/function () {
  function Horarios() {
    _classCallCheck(this, Horarios);
  }
  _createClass(Horarios, null, [{
    key: "list",
    value: function list(req, res) {
      return Horario.findAll({
        // where: getBaseQuery(req),
        attributes: ['id', 'hora'],
        order: [['hora', 'ASC']],
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
          model: Dix,
          attributes: ['id', 'nombre'],
          where: {}
        }]
      }).then(function (horarios) {
        return res.status(200).send(horarios);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "disponibilidadHora",
    value: function disponibilidadHora(req, res) {
      var _req$params = req.params,
        annoId = _req$params.annoId,
        colegioId = _req$params.colegioId,
        profesorId = _req$params.profesorId,
        dixId = _req$params.dixId;
      var consulta = {};
      // let consulta = getBaseQuery(req);

      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (profesorId != '0') {
        consulta['profesorId'] = profesorId;
      }
      if (dixId != '0') {
        consulta['dixId'] = dixId;
      }
      return Horario.findAll({
        where: consulta,
        attributes: ['hora']
      }).then(function (horarios) {
        return res.status(200).send(horarios);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "groupByFk",
    value: function groupByFk(req, res) {
      var _req$params2 = req.params,
        annoId = _req$params2.annoId,
        colegioId = _req$params2.colegioId,
        cursoId = _req$params2.cursoId,
        profesorId = _req$params2.profesorId,
        asignaturaprofesorId = _req$params2.asignaturaprofesorId;
      var consulta = {};
      // let consulta = getBaseQuery(req);
      console.log(" consulta ");
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
      return Horario.findAll({
        where: consulta,
        group: ['Profesor.id', 'AsignaturaProfesor.id', 'Colegio.id', 'Curso.id', 'Anno.id'],
        attributes: ['Profesor.id', 'AsignaturaProfesor.id', 'Colegio.id', 'Curso.id', 'Anno.id', [_models.sequelize.fn('COUNT', '*'), 'TotalHoras']],
        include: [{
          model: Profesor,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
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
          model: AsignaturaProfesor,
          attributes: ['id', 'nombre'],
          where: {}
        }]
      }).then(function (horarios) {
        return res.status(200).send(horarios);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params3 = req.params,
        annoId = _req$params3.annoId,
        colegioId = _req$params3.colegioId,
        cursoId = _req$params3.cursoId,
        profesorId = _req$params3.profesorId,
        asignaturaprofesorId = _req$params3.asignaturaprofesorId,
        dixId = _req$params3.dixId;
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
      if (dixId != '0') {
        consulta['dixId'] = dixId;
      }
      return Horario.findAll({
        where: consulta,
        attributes: ['id', 'hora'],
        order: [['hora', 'ASC']],
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
          model: Dix,
          attributes: ['id', 'nombre'],
          where: {}
        }]
      }).then(function (horarios) {
        return res.status(200).send(horarios);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params4 = req.params,
        annoId = _req$params4.annoId,
        colegioId = _req$params4.colegioId,
        cursoId = _req$params4.cursoId,
        profesorId = _req$params4.profesorId,
        asignaturaprofesorId = _req$params4.asignaturaprofesorId,
        dixId = _req$params4.dixId;
      var hora = req.body.hora;
      return Horario.create({
        hora: hora,
        colegioId: colegioId,
        cursoId: cursoId,
        asignaturaprofesorId: asignaturaprofesorId,
        profesorId: profesorId,
        annoId: annoId,
        dixId: dixId
      }).then(function (data) {
        return res.status(201).send({
          success: true,
          message: 'Horario creado exitosamente',
          data: data
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
      consulta['id'] = req.params.horarioId;
      var _req$body = req.body,
        hora = _req$body.hora,
        Colegio = _req$body.Colegio,
        Curso = _req$body.Curso,
        Profesor = _req$body.Profesor,
        AsignaturaProfesor = _req$body.AsignaturaProfesor,
        Anno = _req$body.Anno,
        Dix = _req$body.Dix;
      return Horario.findOne({
        where: consulta
      }).then(function (horario) {
        horario.update({
          hora: hora || horario.nombre,
          colegioId: Colegio || horario.colegioId,
          cursoId: Curso || horario.cursoId,
          asignaturaprofesorId: AsignaturaProfesor || horario.asignaturaprofesorId,
          profesorId: Profesor || horario.profesorId,
          annoId: Anno || horario.annoId,
          dixId: Dix || horario.dixId
        }).then(function (updatedHorario) {
          res.status(200).send({
            message: 'Horario actualizado exitosamente',
            data: {
              hora: hora || updatedHorario.hora,
              colegioId: Colegio || updatedHorario.colegioId,
              cursoId: Curso || updatedHorario.cursoId,
              asignaturaprofesorId: AsignaturaProfesor || updatedHorario.asignaturaprofesorId,
              profesorId: Profesor || updatedHorario.profesorId,
              annoId: Anno || updatedHorario.annoId,
              dixId: Dix || updatedHorario.dixId
            }
          });
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      var consulta = {};
      // let consulta = getBaseQuery(req);
      consulta['id'] = req.params.horarioId;
      return Horario.findOne({
        where: consulta
      }).then(function (horario) {
        if (!horario) {
          return res.status(400).send({
            message: 'Horario Not Found'
          });
        }
        return horario.destroy().then(function () {
          return res.status(200).send({
            message: 'Horario successfully deleted'
          });
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }]);
  return Horarios;
}();
var _default = exports["default"] = Horarios;