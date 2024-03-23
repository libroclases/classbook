"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// import { getBaseQuery } from "./acceso";
var Op = require("../models").Sequelize.Op;
var Horario = _models["default"].Horario,
  Colegio = _models["default"].Colegio,
  Curso = _models["default"].Curso,
  Asignatura = _models["default"].Asignatura,
  AsignaturaProfesor = _models["default"].AsignaturaProfesor,
  Profesor = _models["default"].Profesor,
  ControlAsignatura = _models["default"].ControlAsignatura,
  Anno = _models["default"].Anno,
  Mes = _models["default"].Mes,
  Feriado = _models["default"].Feriado;
function doubleZeroPad(num) {
  if (num < 10) {
    return "0".concat(num);
  } else {
    return num;
  }
}
function dateString(year, month, day) {
  var dd = doubleZeroPad(day);
  var mm = doubleZeroPad(month);
  return "".concat(year, "-").concat(mm, "-").concat(dd);
}
var ControlAsignaturas = /*#__PURE__*/function () {
  function ControlAsignaturas() {
    _classCallCheck(this, ControlAsignaturas);
  }
  _createClass(ControlAsignaturas, null, [{
    key: "list",
    value: function list(req, res) {
      return ControlAsignatura.findAll({
        // where: getBaseQuery(req),
        attributes: ["id", "inasistentesHombres", "inasistentesMujeres", "atrasos", "observaciones", "fecha", "dia", "hora"],
        order: [["hora", "ASC"]],
        include: [{
          model: Colegio,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Curso,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Asignatura,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1", 'apellido2'],
          where: {}
        }, {
          model: Profesor,
          as: "ProfesorPie",
          attributes: ["id", "nombre", "apellido1", "apellido2"]
        }, {
          model: Horario,
          attributes: ["id", "hora"],
          where: {}
        }, {
          model: Anno,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Mes,
          attributes: ["id", "nombre", "numero"],
          where: {}
        }]
      }).then(function (controlesAsignatura) {
        return res.status(200).send(controlesAsignatura);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      // const { cursoId} = req.params;

      var _req$params = req.params,
        colegioId = _req$params.colegioId,
        cursoId = _req$params.cursoId,
        asignaturaId = _req$params.asignaturaId,
        profesorId = _req$params.profesorId,
        horarioId = _req$params.horarioId,
        annoId = _req$params.annoId,
        mesId = _req$params.mesId;
      // let consulta = getBaseQuery(req);
      var consulta = '';
      if (colegioId != "0") {
        consulta["colegioId"] = colegioId;
      }
      if (cursoId != "0") {
        consulta["cursoId"] = cursoId;
      }
      if (asignaturaId != "0") {
        consulta["asignaturaId"] = asignaturaId;
      }
      if (profesorId != "0") {
        consulta["profesorId"] = profesorId;
      }
      if (horarioId != "0") {
        consulta["horarioId"] = horarioId;
      }
      if (annoId != "0") {
        consulta["annoId"] = annoId;
      }
      if (mesId != "0") {
        consulta["mesId"] = mesId;
      }
      return ControlAsignatura.findAll({
        where: consulta,
        attributes: ["id", "inasistentesHombres", "inasistentesMujeres", "atrasos", "observaciones", "fecha", "dia", "hora"],
        order: [["hora", "ASC"]],
        include: [{
          model: Colegio,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Curso,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Asignatura,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1", "apellido2"],
          where: {}
        }, {
          model: Profesor,
          as: "ProfesorPie",
          attributes: ["id", "nombre", "apellido1", "apellido2"]
        }, {
          model: Horario,
          attributes: ["id", "hora"],
          where: {}
        }, {
          model: Anno,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Mes,
          attributes: ["id", "nombre", "numero"],
          where: {}
        }]
      }).then(function (controlesAsignatura) {
        return res.status(200).send(controlesAsignatura);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getPorDia",
    value: function getPorDia(req, res) {
      var _req$params2 = req.params,
        colegioId = _req$params2.colegioId,
        cursoId = _req$params2.cursoId,
        asignaturaId = _req$params2.asignaturaId,
        profesorId = _req$params2.profesorId,
        horarioId = _req$params2.horarioId,
        annoId = _req$params2.annoId,
        mesId = _req$params2.mesId;
      var dia = req.query.dia;
      // let consulta = getBaseQuery(req);
      var consulta = {};
      consulta["dia"] = dia;
      if (colegioId != "0") {
        consulta["colegioId"] = colegioId;
      }
      if (cursoId != "0") {
        consulta["cursoId"] = cursoId;
      }
      if (asignaturaId != "0") {
        consulta["asignaturaId"] = asignaturaId;
      }
      if (profesorId != "0") {
        consulta["profesorId"] = profesorId;
      }
      if (horarioId != "0") {
        consulta["horarioId"] = horarioId;
      }
      if (annoId != "0") {
        consulta["annoId"] = annoId;
      }
      if (mesId != "0") {
        consulta["mesId"] = mesId;
      }
      return ControlAsignatura.findAll({
        where: consulta,
        attributes: ["id", "inasistentesHombres", "inasistentesMujeres", "atrasos", "observaciones", "fecha", "dia", "hora"],
        order: [["hora", "ASC"]],
        include: [{
          model: Colegio,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Curso,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Asignatura,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1", "apellido2"],
          where: {}
        }, {
          model: Profesor,
          as: "ProfesorPie",
          attributes: ["id", "nombre", "apellido1", "apellido2"]
        }, {
          model: Horario,
          attributes: ["id", "hora"],
          where: {}
        }, {
          model: Anno,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Mes,
          attributes: ["id", "nombre", "numero"],
          where: {}
        }]
      }).then(function (controlesAsignatura) {
        return res.status(200).send(controlesAsignatura);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params3 = req.params,
        colegioId = _req$params3.colegioId,
        cursoId = _req$params3.cursoId,
        asignaturaId = _req$params3.asignaturaId,
        profesorId = _req$params3.profesorId,
        profesorPieId = _req$params3.profesorPieId,
        horarioId = _req$params3.horarioId,
        annoId = _req$params3.annoId,
        mesId = _req$params3.mesId;
      var _req$body = req.body,
        inasistentesHombres = _req$body.inasistentesHombres,
        inasistentesMujeres = _req$body.inasistentesMujeres,
        atrasos = _req$body.atrasos,
        observaciones = _req$body.observaciones,
        fecha = _req$body.fecha,
        dia = _req$body.dia,
        hora = _req$body.hora;
      return ControlAsignatura.create({
        inasistentesHombres: inasistentesHombres,
        inasistentesMujeres: inasistentesMujeres,
        atrasos: atrasos,
        observaciones: observaciones,
        fecha: fecha,
        dia: dia,
        hora: hora,
        colegioId: colegioId,
        cursoId: cursoId,
        asignaturaId: asignaturaId,
        profesorId: profesorId,
        profesorPieId: profesorPieId,
        annoId: annoId,
        mesId: mesId,
        horarioId: horarioId
      }).then(function (controlAsignaturaData) {
        return res.status(201).send({
          success: true,
          data: controlAsignaturaData,
          message: "ControlAsignatura creado exitosamente"
        });
      })["catch"](function (error) {
        return res.status(400).send({
          success: false,
          message: "ControlAsignatura NO fue creado"
        });
      });
    }
  }, {
    key: "populateDia",
    value: function populateDia(req, res) {
      var _req$params4 = req.params,
        colegioId = _req$params4.colegioId,
        cursoId = _req$params4.cursoId,
        annoId = _req$params4.annoId;
      var _req$body2 = req.body,
        anno = _req$body2.anno,
        mes = _req$body2.mes,
        dia = _req$body2.dia,
        diaSemana = _req$body2.diaSemana;
      // :colegioId/:cursoId/:asignaturaId/:profesorId/:annoId/:dixId
      if (diaSemana > 5) {
        res.status(200).send({
          success: true,
          newData: false,
          message: "populateDia no fue ejecutado: diaSemana must be < 6"
        });
        return;
      }
      var consulta = {
        fecha: _defineProperty({}, Op.eq, new Date(anno, mes - 1, dia))
      };
      Feriado.findAll({
        attributes: ["id", "fecha", "nombre", "lugar"],
        where: consulta,
        order: [["fecha", "ASC"]]
      }).then(function (feriados) {
        if (feriados.length == 0) {
          var consulta = {
            annoId: annoId,
            colegioId: colegioId,
            cursoId: cursoId,
            dixId: diaSemana
          };
          Horario.findAll({
            where: consulta,
            attributes: ["id", "hora"],
            order: [["hora", "ASC"]],
            include: [{
              model: AsignaturaProfesor,
              include: [{
                model: Asignatura,
                attributes: ["id"]
              }]
            }, {
              model: Profesor,
              attributes: ["id", "nombre", "apellido1", "apellido2"],
              where: {}
            }]
          }).then(function (horarios) {
            if (horarios.length == 0) {
              res.status(200).send({
                success: true,
                newData: false,
                message: "Entradas de ControlAsignatura NO fueron creadas"
              });
              return;
            } else {
              var controlAsignaturaObjects = [];
              var _iterator = _createForOfIteratorHelper(horarios),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var horario = _step.value;
                  controlAsignaturaObjects.push({
                    inasistentesHombres: 0,
                    inasistentesMujeres: 0,
                    atrasos: 0,
                    observaciones: "",
                    fecha: dateString(anno, mes, dia),
                    dia: dia,
                    hora: horario.hora,
                    colegioId: colegioId,
                    cursoId: cursoId,
                    asignaturaId: horario.AsignaturaProfesor.Asignatura.id,
                    profesorId: horario.Profesor.id,
                    profesorPieId: null,
                    annoId: annoId,
                    mesId: mes,
                    horarioId: horario.id
                  });
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              return ControlAsignatura.bulkCreate(controlAsignaturaObjects).then(function () {
                return res.status(201).send({
                  success: true,
                  newData: true,
                  message: "Entradas de ControlAsignatura creadas exitosamente"
                });
              })["catch"](function (error) {
                return res.status(400).send({
                  success: false,
                  newData: false,
                  message: "Entradas de ControlAsignatura NO fueron creadas"
                });
              });
            }
          })["catch"](function (error) {
            return res.status(400).send(error);
          });
        }
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body3 = req.body,
        inasistentesHombres = _req$body3.inasistentesHombres,
        inasistentesMujeres = _req$body3.inasistentesMujeres,
        atrasos = _req$body3.atrasos,
        observaciones = _req$body3.observaciones,
        fecha = _req$body3.fecha,
        dia = _req$body3.dia,
        hora = _req$body3.hora,
        Colegio = _req$body3.Colegio,
        Curso = _req$body3.Curso,
        Asignatura = _req$body3.Asignatura,
        Profesor = _req$body3.Profesor,
        ProfesorPie = _req$body3.ProfesorPie,
        Horario = _req$body3.Horario,
        Anno = _req$body3.Anno,
        Mes = _req$body3.Mes;
      // let consulta = getBaseQuery(req);
      var consulta = {};
      consulta["id"] = req.params.controlasignaturaId;
      return ControlAsignatura.findOne({
        where: consulta
      }).then(function (controlAsignatura) {
        controlAsignatura.update({
          inasistentesHombres: inasistentesHombres || controlAsignatura.inasistentesHombres,
          inasistentesMujeres: inasistentesMujeres || controlAsignatura.inasistentesMujeres,
          atrasos: atrasos || controlAsignatura.atrasos,
          observaciones: observaciones || controlAsignatura.observaciones,
          fecha: fecha || controlAsignatura.fecha,
          dia: dia || controlAsignatura.dia,
          hora: hora || controlAsignatura.hora,
          colegioId: Colegio || controlAsignatura.colegioId,
          cursoId: Curso || controlAsignatura.cursoId,
          asignaturaId: Asignatura || controlAsignatura.asignaturaId,
          profesorId: Profesor || controlAsignatura.profesorId,
          profesorPieId: ProfesorPie,
          annoId: Anno || controlAsignatura.annoId,
          mesId: Mes || controlAsignatura.mesId,
          horarioId: Horario || controlAsignatura.horarioId
        }).then(function (updatedControlAsignatura) {
          res.status(200).send({
            success: true,
            message: "ControlAsignatura updated successfully",
            data: {
              inasistentesHombres: updatedControlAsignatura.inasistentesHombres,
              inasistentesMujeres: updatedControlAsignatura.inasistentesMujeres,
              atrasos: updatedControlAsignatura.atrasos,
              observaciones: updatedControlAsignatura.observaciones,
              fecha: updatedControlAsignatura.fecha,
              dia: updatedControlAsignatura.dia,
              hora: updatedControlAsignatura.hora,
              colegioId: updatedControlAsignatura.colegioId,
              cursoId: updatedControlAsignatura.cursoId,
              asignaturaId: updatedControlAsignatura.asignaturaId,
              profesorId: updatedControlAsignatura.profesorId,
              profesorPieId: updatedControlAsignatura.profesorPieId,
              horarioId: updatedControlAsignatura.horarioId,
              annoId: updatedControlAsignatura.annoId,
              mesId: updatedControlAsignatura.mesId
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
      // let consulta = getBaseQuery(req);
      var consulta = {};
      consulta["id"] = req.params.controlasignaturaId;
      return ControlAsignatura.findOne({
        where: consulta
      }).then(function (controlAsignatura) {
        if (!controlAsignatura) {
          return res.status(400).send({
            message: "ControlAsignatura Not Found"
          });
        }
        return controlAsignatura.destroy().then(function () {
          return res.status(200).send({
            message: "ControlAsignatura successfully deleted"
          });
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }]);
  return ControlAsignaturas;
}();
var _default = exports["default"] = ControlAsignaturas;