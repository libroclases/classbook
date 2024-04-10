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
var InscripcionColegio = _models["default"].InscripcionColegio,
  Profesor = _models["default"].Profesor,
  Colegio = _models["default"].Colegio,
  Anno = _models["default"].Anno;
var InscripcionesColegio = /*#__PURE__*/function () {
  function InscripcionesColegio() {
    _classCallCheck(this, InscripcionesColegio);
  }
  _createClass(InscripcionesColegio, null, [{
    key: "list",
    value: function list(req, res) {
      return InscripcionColegio.findAll({
        // where: getBaseQuery(req),
        attributes: ["id", "fechaInicio", "fechaTermino", "esPie"],
        include: [{
          model: Profesor,
          attributes: ["id", "nombre", "apellido1", "apellido2"],
          where: {}
        }, {
          model: Colegio,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Anno,
          attributes: ["id", "nombre"],
          where: {}
        }],
        order: [[{
          model: Profesor
        }, "apellido1", "ASC"]]
      }).then(function (inscripciones) {
        return res.status(200).send(inscripciones);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        profesorId = _req$params.profesorId,
        colegioId = _req$params.colegioId,
        annoId = _req$params.annoId;
      // let consulta = getBaseQuery(req);
      var consulta = {};
      if (profesorId != "0") {
        consulta["profesorId"] = profesorId;
      }
      if (colegioId != "0") {
        consulta["colegioId"] = colegioId;
      }
      if (annoId != "0") {
        consulta["annoId"] = annoId;
      }
      return InscripcionColegio.findAll({
        where: consulta,
        attributes: ["id", "fechaInicio", "fechaTermino", "EsPie"],
        include: [{
          model: Profesor,
          attributes: ["id", "nombre", "apellido1", "apellido2"],
          where: {}
        }, {
          model: Colegio,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Anno,
          attributes: ["id", "nombre"],
          where: {}
        }],
        order: [[{
          model: Profesor
        }, "apellido1", "ASC"]]
      }).then(function (inscripcion) {
        return res.status(200).send(inscripcion);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getProfesores",
    value: function getProfesores(req, res) {
      var _req$params2 = req.params,
        colegioId = _req$params2.colegioId,
        annoId = _req$params2.annoId;
      // let consulta = getBaseQuery(req);
      var consulta = {};
      if (colegioId != "0") {
        consulta["colegioId"] = colegioId;
      }
      if (annoId != "0") {
        consulta["annoId"] = annoId;
      }
      return InscripcionColegio.findAll({
        where: consulta,
        attributes: ["esPie"],
        include: [{
          model: Profesor,
          attributes: ["id", "nombre", "apellido1", "apellido2"],
          where: {}
        }],
        order: [[{
          model: Profesor
        }, "apellido1", "ASC"]],
        raw: true
      }).then(function (inscripciones) {
        var profes = [];
        inscripciones.forEach(function (inscripcion) {
          profes.push({
            id: inscripcion["Profesor.id"],
            nombre: inscripcion["Profesor.nombre"],
            apellido: inscripcion["Profesor.apellido1"],
            esPie: inscripcion.esPie
          });
        });
        res.status(200).send(profes);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getProfesoresPie",
    value: function getProfesoresPie(req, res) {
      var _req$params3 = req.params,
        colegioId = _req$params3.colegioId,
        annoId = _req$params3.annoId;
      // let consulta = getBaseQuery(req);
      var consulta = {};
      consulta["esPie"] = true;
      if (colegioId != "0") {
        consulta["colegioId"] = colegioId;
      }
      if (annoId != "0") {
        consulta["annoId"] = annoId;
      }
      return InscripcionColegio.findAll({
        where: consulta,
        attributes: [],
        include: [{
          model: Profesor,
          attributes: ["id", "nombre", "apellido1", "apellido2"],
          where: {}
        }],
        order: [[{
          model: Profesor
        }, "apellido1", "ASC"]],
        raw: true
      }).then(function (inscripciones) {
        var profes = [];
        inscripciones.forEach(function (inscripcion) {
          profes.push({
            id: inscripcion["Profesor.id"],
            nombre: inscripcion["Profesor.nombre"],
            apellido: inscripcion["Profesor.apellido1"]
          });
        });
        res.status(200).send(profes);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params4 = req.params,
        profesorId = _req$params4.profesorId,
        colegioId = _req$params4.colegioId,
        annoId = _req$params4.annoId;
      var _req$body = req.body,
        fechaInicio = _req$body.fechaInicio,
        fechaTermino = _req$body.fechaTermino,
        esPie = _req$body.esPie;
      return InscripcionColegio.create({
        fechaInicio: fechaInicio,
        fechaTermino: fechaTermino,
        esPie: esPie,
        profesorId: profesorId,
        colegioId: colegioId,
        annoId: annoId
      }).then(function (data) {
        return res.status(201).send({
          success: true,
          message: "InscripcionColegio successfully created",
          data: data
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      // let consulta = getBaseQuery(req);
      var consulta = {};
      consulta["id"] = req.params.inscripcioncolegioId;
      return InscripcionColegio.findOne({
        where: consulta
      }).then(function (inscripcionColegio) {
        return res.status(200).send(inscripcionColegio);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var consulta = getBaseQuery(req);
      consulta["id"] = req.params.inscripcioncolegioId;
      var _req$body2 = req.body,
        fechaInicio = _req$body2.fechaInicio,
        fechaTermino = _req$body2.fechaTermino,
        esPie = _req$body2.esPie,
        Profesor = _req$body2.Profesor,
        Colegio = _req$body2.Colegio,
        Anno = _req$body2.Anno;
      return InscripcionColegio.findOne({
        where: consulta
      }).then(function (inscripcionColegio) {
        inscripcionColegio.update({
          fechaInicio: fechaInicio || inscripcionColegio.fechaInicio,
          fechaTermino: fechaTermino || inscripcionColegio.fechaTermino,
          esPie: esPie || inscripcionColegio.esPie,
          profesorId: Profesor || inscripcionColegio.profesorId,
          colegioId: Colegio || inscripcionColegio.colegioId,
          annoId: Anno || inscripcionColegio.annoId
        }).then(function (updatedInscripcionColegio) {
          res.status(200).send({
            message: "InscripcionColegio updated successfully",
            data: {
              fechaInicio: fechaInicio || updatedInscripcionColegio.fechaInicio,
              fechaTermino: fechaTermino || updatedInscripcionColegio.fechaTermino,
              esPie: esPie || updatedInscripcionColegio.esPie,
              profesorId: Profesor || updatedInscripcionColegio.profesorId,
              colegioId: Colegio || updatedInscripcionColegio.colegioId,
              annoId: Anno || updatedInscripcionColegio.annoId
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
  return InscripcionesColegio;
}();
var _default = exports["default"] = InscripcionesColegio;