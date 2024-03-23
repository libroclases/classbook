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
  RegistroActividad = _models["default"].RegistroActividad,
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
var RegistroActividades = /*#__PURE__*/function () {
  function RegistroActividades() {
    _classCallCheck(this, RegistroActividades);
  }
  _createClass(RegistroActividades, null, [{
    key: "list",
    value: function list(req, res) {
      return RegistroActividad.findAll({
        // where: getBaseQuery(req),
        attributes: ["id", "descripcion", "fecha", "dia", "horaInicial", "numeroHoras"],
        order: [["horaInicial", "ASC"]],
        include: [{
          model: Colegio,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Curso,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: AsignaturaProfesor,
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
      var _req$params = req.params,
        colegioId = _req$params.colegioId,
        cursoId = _req$params.cursoId,
        asignaturaId = _req$params.asignaturaId,
        asignaturaprofesorId = _req$params.asignaturaprofesorId,
        profesorId = _req$params.profesorId,
        horarioId = _req$params.horarioId,
        annoId = _req$params.annoId,
        mesId = _req$params.mesId;
      var consulta = {};
      // let consulta = getBaseQuery(req);

      if (colegioId != "0") {
        consulta["colegioId"] = colegioId;
      }
      if (cursoId != "0") {
        consulta["cursoId"] = cursoId;
      }
      if (asignaturaId != "0") {
        consulta["asignaturaId"] = asignaturaId;
      }
      if (asignaturaprofesorId != "0") {
        consulta["asignaturaprofesorId"] = asignaturaprofesorId;
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
      return RegistroActividad.findAll({
        where: consulta,
        attributes: ["id", "descripcion", "fecha", "dia", "horaInicial", "numeroHoras"],
        order: [["horaInicial", "ASC"]],
        include: [{
          model: Colegio,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: Curso,
          attributes: ["id", "nombre"],
          where: {}
        }, {
          model: AsignaturaProfesor,
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
    key: "getByMes",
    value: function getByMes(req, res) {
      var _req$params2 = req.params,
        colegioId = _req$params2.colegioId,
        cursoId = _req$params2.cursoId,
        asignaturaId = _req$params2.asignaturaId,
        annoId = _req$params2.annoId,
        mesId = _req$params2.mesId;
      var consulta = {};
      // let consulta = getBaseQuery(req);

      if (colegioId != "0") {
        consulta["colegioId"] = colegioId;
      }
      if (cursoId != "0") {
        consulta["cursoId"] = cursoId;
      }
      if (asignaturaId != "0") {
        consulta["asignaturaId"] = asignaturaId;
      }
      if (annoId != "0") {
        consulta["annoId"] = annoId;
      }
      if (mesId != "0") {
        consulta["mesId"] = mesId;
      }
      return RegistroActividad.findAll({
        where: consulta,
        attributes: ["id", "descripcion", "fecha", "dia", "horaInicial", "numeroHoras"],
        order: [["fecha", "ASC"], ["horaInicial", "ASC"]],
        include: [{
          model: Profesor,
          attributes: ["id", "nombre", "apellido1", "apellido2"],
          where: {}
        }, {
          model: Horario,
          attributes: ["id", "hora", "dixId"],
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
        asignaturaprofesorId = _req$params3.asignaturaprofesorId,
        profesorId = _req$params3.profesorId,
        horarioId = _req$params3.horarioId,
        annoId = _req$params3.annoId,
        mesId = _req$params3.mesId;
      var _req$body = req.body,
        descripcion = _req$body.descripcion,
        fecha = _req$body.fecha,
        dia = _req$body.dia,
        horaInicial = _req$body.horaInicial,
        numeroHoras = _req$body.numeroHoras;
      return RegistroActividad.create({
        descripcion: descripcion,
        fecha: fecha,
        dia: dia,
        horaInicial: horaInicial,
        numeroHoras: numeroHoras,
        colegioId: colegioId,
        cursoId: cursoId,
        asignaturaId: asignaturaId,
        asignaturaprofesorId: asignaturaprofesorId,
        profesorId: profesorId,
        annoId: annoId,
        mesId: mesId,
        horarioId: horarioId
      }).then(function (data) {
        return res.status(201).send({
          success: true,
          data: data,
          message: "RegistroActividad creado exitosamente"
        });
      })["catch"](function (error) {
        return res.status(400).send({
          success: false,
          message: "RegistroActividad NO fue creado"
        });
      });
    }
  }, {
    key: "populateMes",
    value: function populateMes(req, res) {
      var _req$params4 = req.params,
        colegioId = _req$params4.colegioId,
        cursoId = _req$params4.cursoId,
        asignaturaId = _req$params4.asignaturaId,
        annoId = _req$params4.annoId,
        mesId = _req$params4.mesId;
      var anno = req.body.anno;
      var mes = mesId;
      var consultaFeriado = {
        fecha: _defineProperty({}, Op.between, [new Date(anno, mes - 1, 0), new Date(anno, mes, 0)])
      };
      Feriado.findAll({
        where: consultaFeriado,
        attributes: ['id', 'fecha'],
        order: [['fecha', 'ASC']],
        raw: true
      }).then(function (feriados) {
        var daysInMonth = new Date(anno, mes, 0).getDate();
        var dowFirstDay = (new Date(anno, mes - 1, 1).getDay() + 6) % 7;
        var feriadosSet = new Set();
        var _iterator = _createForOfIteratorHelper(feriados),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var feriado = _step.value;
            feriadosSet.add(parseInt(feriado.fecha.toString().split('-')[2]));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        Horario.findAll({
          where: {
            colegioId: colegioId,
            cursoId: cursoId,
            annoId: annoId
          },
          attributes: ["id", "hora", "asignaturaprofesorId", "dixId", "profesorId"],
          include: [{
            model: AsignaturaProfesor,
            attributes: ['asignaturaId']
          }],
          order: [['dixId', 'ASC'], ['hora', 'ASC']],
          raw: true
        }).then(function (horarios) {
          var registroActividadObjects = [];
          var dowToDays = new Map();
          for (var index = 0; index < daysInMonth; index++) {
            var dow = (dowFirstDay + index) % 7 + 1;
            if (dow < 6 && !feriadosSet.has(index + 1)) {
              if (dowToDays.get(dow) == undefined) {
                dowToDays.set(dow, []);
              }
              dowToDays.get(dow).push(index + 1);
            }
          }
          var dia = 0;
          var hora = 0;
          var numeroHoras = 0;
          var currProfesorId = 0;
          var horariosContiguos = [];
          var addNewObject = true;
          var _iterator2 = _createForOfIteratorHelper(horarios),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _horario = _step2.value;
              if (_horario['AsignaturaProfesor.asignaturaId'] != asignaturaId) {
                continue;
              }
              addNewObject = dia != _horario.dixId || _horario.hora != hora + 1 || _horario.profesorId != currProfesorId;
              if (addNewObject) {
                if (dia > 0) {
                  var _indexLast = horariosContiguos.length - 1;
                  horariosContiguos[_indexLast]["numeroHoras"] = numeroHoras;
                }
                horariosContiguos.push({
                  horarioId: _horario.id,
                  horaInicial: _horario.hora,
                  dixId: _horario.dixId,
                  asignaturaprofesorId: _horario.asignaturaprofesorId,
                  profesorId: _horario.profesorId
                });
                numeroHoras = 1;
                dia = _horario.dixId;
                currProfesorId = _horario.profesorId;
              } else {
                numeroHoras++;
              }
              hora = _horario.hora;
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          var indexLast = horariosContiguos.length - 1;
          horariosContiguos[indexLast]["numeroHoras"] = numeroHoras;
          for (var _i = 0, _horariosContiguos = horariosContiguos; _i < _horariosContiguos.length; _i++) {
            var horario = _horariosContiguos[_i];
            var days = dowToDays.get(horario.dixId);
            var baseObj = {
              descripcion: "",
              horaInicial: horario.horaInicial,
              numeroHoras: horario.numeroHoras,
              colegioId: colegioId,
              cursoId: cursoId,
              asignaturaId: asignaturaId,
              asignaturaprofesorId: horario.asignaturaprofesorId,
              profesorId: horario.profesorId,
              annoId: annoId,
              mesId: mesId,
              horarioId: horario.horarioId
            };
            var _iterator3 = _createForOfIteratorHelper(days),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _dia = _step3.value;
                var auxObj = {
                  fecha: dateString(anno, mes, _dia),
                  dia: _dia
                };
                var obj = _objectSpread(_objectSpread({}, auxObj), baseObj);
                registroActividadObjects.push(obj);
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
          }
          RegistroActividad.bulkCreate(registroActividadObjects).then(function () {
            return res.status(201).send({
              success: true,
              message: "Entradas de RegistroActividad creadas exitosamente"
            });
          })["catch"](function (error) {
            return res.status(400).send({
              success: false,
              message: "Entradas de RegistroActividad NO fueron creadas con \xE9xito"
            });
          });
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body2 = req.body,
        descripcion = _req$body2.descripcion,
        fecha = _req$body2.fecha,
        dia = _req$body2.dia,
        horaInicial = _req$body2.horaInicial,
        numeroHoras = _req$body2.numeroHoras,
        Colegio = _req$body2.Colegio,
        Curso = _req$body2.Curso,
        Asignatura = _req$body2.Asignatura,
        AsignaturaProfesor = _req$body2.AsignaturaProfesor,
        Profesor = _req$body2.Profesor,
        Horario = _req$body2.Horario,
        Anno = _req$body2.Anno,
        Mes = _req$body2.Mes;
      var consulta = {};
      // let consulta = getBaseQuery(req);
      consulta["id"] = req.params.registroactividadId;
      return RegistroActividad.findOne({
        where: consulta
      }).then(function (registroActividad) {
        registroActividad.update({
          descripcion: descripcion || registroActividad.descripcion,
          fecha: fecha || registroActividad.fecha,
          dia: dia || registroActividad.dia,
          horaInicial: horaInicial || registroActividad.horaInicial,
          numeroHoras: numeroHoras || registroActividad.numeroHoras,
          colegioId: Colegio || registroActividad.colegioId,
          cursoId: Curso || registroActividad.cursoId,
          asignaturaId: Asignatura || registroActividad.asignaturaId,
          asignaturaprofesorId: AsignaturaProfesor || registroActividad.asignaturaprofesorId,
          profesorId: Profesor || registroActividad.profesorId,
          annoId: Anno || registroActividad.annoId,
          mesId: Mes || registroActividad.mesId,
          horarioId: Horario || registroActividad.horarioId
        }).then(function (updatedRegistroActividad) {
          res.status(200).send({
            success: true,
            message: "RegistroActividad updated successfully",
            data: {
              descripcion: updatedRegistroActividad.descripcion,
              fecha: updatedRegistroActividad.fecha,
              dia: updatedRegistroActividad.dia,
              horaInicial: updatedRegistroActividad.horaInicial,
              numeroHoras: updatedRegistroActividad.numeroHoras,
              colegioId: updatedRegistroActividad.colegioId,
              cursoId: updatedRegistroActividad.cursoId,
              asignaturaId: updatedRegistroActividad.asignaturaId,
              asignaturaprofesorId: updatedRegistroActividad.asignaturaprofesorId,
              profesorId: updatedRegistroActividad.profesorId,
              horarioId: updatedRegistroActividad.horarioId,
              annoId: updatedRegistroActividad.annoId,
              mesId: updatedRegistroActividad.mesId
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
      consulta["id"] = req.params.registroactividadId;
      return RegistroActividad.findOne({
        where: consulta
      }).then(function (registroActividad) {
        if (!registroActividad) {
          return res.status(400).send({
            message: "RegistroActividad Not Found"
          });
        }
        return registroActividad.destroy().then(function () {
          return res.status(200).send({
            message: "RegistroActividad successfully deleted"
          });
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }]);
  return RegistroActividades;
}();
var _default = exports["default"] = RegistroActividades;