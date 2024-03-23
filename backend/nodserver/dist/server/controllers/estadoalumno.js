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
var EstadoAlumno = _models["default"].EstadoAlumno,
  Alumno = _models["default"].Alumno,
  Matricula = _models["default"].Matricula,
  TipoEstado = _models["default"].TipoEstado;
var EstadoAlumnos = /*#__PURE__*/function () {
  function EstadoAlumnos() {
    _classCallCheck(this, EstadoAlumnos);
  }
  _createClass(EstadoAlumnos, null, [{
    key: "list",
    value: function list(req, res) {
      return EstadoAlumno.findAll({
        attributes: ['id', 'fecha'],
        include: [{
          model: Matricula,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Alumno,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }, {
          model: TipoEstado,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['fecha', 'ASC']]
      }).then(function (estadoalumnos) {
        return res.status(200).send(estadoalumnos);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        alumnoId = _req$params.alumnoId,
        matriculaId = _req$params.matriculaId,
        tipoestadoId = _req$params.tipoestadoId;
      var consulta = {};
      if (matriculaId != '0') {
        consulta['matriculaId'] = matriculaId;
      }
      if (alumnoId != '0') {
        consulta['alumnoId'] = alumnoId;
      }
      if (tipoestadoId != '0') {
        consulta['tipoestadoId'] = tipoestadoId;
      }
      return EstadoAlumno.findAll({
        where: consulta,
        attributes: ['id', 'fecha'],
        include: [{
          model: Matricula,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Alumno,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }, {
          model: TipoEstado,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['fecha', 'ASC']]
      }).then(function (estado) {
        return res.status(200).send(estado);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params2 = req.params,
        alumnoId = _req$params2.alumnoId,
        matriculaId = _req$params2.matriculaId,
        tipoestadoId = _req$params2.tipoestadoId;
      var fecha = req.body.fecha;
      return EstadoAlumno.create({
        fecha: fecha,
        matriculaId: matriculaId,
        alumnoId: alumnoId,
        tipoestadoId: tipoestadoId
      }).then(function (estado) {
        return res.status(201).send({
          success: true,
          message: 'EstadoAlumno successfully created',
          estado: estado
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      return EstadoAlumno.findByPk(req.params.estadoalumnoId).then(function (estado) {
        return res.status(200).send(estado);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body = req.body,
        fecha = _req$body.fecha,
        Alumno = _req$body.Alumno,
        Matricula = _req$body.Matricula,
        TipoEstado = _req$body.TipoEstado;
      return EstadoAlumno.findByPk(req.params.estadoalumnoId).then(function (estado) {
        estado.update({
          fecha: fecha || estado.fecha,
          matriculaId: Matricula || estado.matriculaId,
          alumnoId: Alumno || estado.alumnoId,
          tipoestadoId: TipoEstado || estado.tipoestadoId
        }).then(function (updatedEstado) {
          res.status(200).send({
            message: 'EstadoAlumno updated successfully',
            data: {
              fecha: fecha || updatedEstado.fecha,
              matriculaId: Matricula || updatedEstado.apoderadoId,
              alumnoId: Alumno || updatedEstado.alumnoId,
              tipoestadoId: TipoEstado || updatedEstado.tipoestadoId
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
      return EstadoAlumno.findByPk(req.params.estadoalumnoId).then(function (estado) {
        if (!estado) {
          return res.status(400).send({
            message: 'EstadoAlumno Not Found'
          });
        }
        return estado.destroy().then(function () {
          return res.status(200).send({
            message: 'EstadoAlumno successfully deleted'
          });
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }]);
  return EstadoAlumnos;
}();
var _default = exports["default"] = EstadoAlumnos;