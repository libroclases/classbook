"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireWildcard(require("../models"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
// import { getBaseQuery } from './acceso';
var Op = require('../models').Sequelize.Op;
var Asistencia = _models["default"].Asistencia,
  Matricula = _models["default"].Matricula,
  Colegio = _models["default"].Colegio,
  Curso = _models["default"].Curso,
  Alumno = _models["default"].Alumno,
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
var Asistencias = /*#__PURE__*/function () {
  function Asistencias() {
    _classCallCheck(this, Asistencias);
  }
  _createClass(Asistencias, null, [{
    key: "list",
    value: function list(req, res) {
      return Asistencia.findAll({
        // where: getBaseQuery(req),
        include: [{
          model: Matricula,
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
          model: Alumno,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }, {
          model: Anno,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Mes,
          attributes: ['id', 'numero'],
          where: {}
        }],
        order: [['fecha', 'ASC']]
      }).then(function (asistencias) {
        return res.status(200).send(asistencias);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        matriculaId = _req$params.matriculaId,
        colegioId = _req$params.colegioId,
        cursoId = _req$params.cursoId,
        alumnoId = _req$params.alumnoId,
        annoId = _req$params.annoId,
        mesId = _req$params.mesId;
      // let consulta = getBaseQuery(req);

      var consulta = {};
      if (matriculaId != '0') {
        consulta['matriculaId'] = matriculaId;
      }
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (cursoId != '0') {
        consulta['cursoId'] = cursoId;
      }
      if (alumnoId != '0') {
        consulta['alumnoId'] = alumnoId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      if (mesId != '0') {
        consulta['mesId'] = mesId;
      }
      return Asistencia.findAll({
        where: consulta,
        include: [{
          model: Matricula,
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
          model: Alumno,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }, {
          model: Anno,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Mes,
          attributes: ['id', 'numero'],
          where: {}
        }],
        order: [['fecha', 'ASC']]
      }).then(function (asistencias) {
        return res.status(200).send(asistencias);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getPresente",
    value: function getPresente(req, res) {
      var _req$params2 = req.params,
        matriculaId = _req$params2.matriculaId,
        colegioId = _req$params2.colegioId,
        cursoId = _req$params2.cursoId,
        alumnoId = _req$params2.alumnoId,
        annoId = _req$params2.annoId,
        mesId = _req$params2.mesId;
      // let consulta = getBaseQuery(req);
      var consulta = {};
      if (matriculaId != '0') {
        consulta['matriculaId'] = matriculaId;
      }
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (cursoId != '0') {
        consulta['cursoId'] = cursoId;
      }
      if (alumnoId != '0') {
        consulta['alumnoId'] = alumnoId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      if (mesId != '0') {
        consulta['mesId'] = mesId;
      }
      return Asistencia.findAll({
        where: consulta,
        include: [{
          model: Alumno,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }],
        order: [['fecha', 'ASC']]
      }).then(function (asistencias) {
        return res.status(200).send(asistencias);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "asistenciaCursoDia",
    value: function asistenciaCursoDia(req, res) {
      // consulta la asistencia de un curso en un dia especifico
      var _req$params3 = req.params,
        colegioId = _req$params3.colegioId,
        cursoId = _req$params3.cursoId,
        annoId = _req$params3.annoId,
        mesId = _req$params3.mesId;
      var dia = req.body.dia;

      // let consulta = getBaseQuery(req);
      var consulta = {};
      consulta['dia'] = dia;
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (cursoId != '0') {
        consulta['cursoId'] = cursoId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      if (mesId != '0') {
        consulta['mesId'] = mesId;
      }
      return Asistencia.findAll({
        attributes: ['id', 'fecha', 'presente'],
        where: consulta,
        include: [{
          model: Matricula,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Alumno,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }],
        order: [['fecha', 'ASC']]
      }).then(function (asistencias) {
        return res.status(200).send(asistencias);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "totalesMesColegio",
    value: function totalesMesColegio(req, res) {
      // consulta de los totales de asistencia en un colegio por curso en un mes especifico
      var _req$params4 = req.params,
        colegioId = _req$params4.colegioId,
        annoId = _req$params4.annoId,
        mesId = _req$params4.mesId;
      // let consulta = getBaseQuery(req);
      var consulta = {};
      consulta['presente'] = _defineProperty({}, Op.eq, true); // solo interesa contar los presentes
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      if (mesId != '0') {
        consulta['mesId'] = mesId;
      }
      return Asistencia.findAll({
        attributes: ['dia'
        // [sequelize.fn('COUNT', sequelize.col('dia'), 'dia')]
        // sequelize.fn('COUNT', sequelize.col('presente'))
        ],
        raw: true,
        where: consulta,
        include: [{
          model: Curso,
          attributes: ['id']
        }]
      }).then(function (result) {
        // result = [{"dia": 1, "Curso.id": 19}, ...]
        var countObj = {};
        var cursoIds = [];
        var _iterator = _createForOfIteratorHelper(result),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var obj = _step.value;
            var cursoId = obj["Curso.id"];
            if (!cursoIds.includes(cursoId)) {
              cursoIds.push(cursoId);
            }
            var cursoDia = "".concat(cursoId, ":").concat(obj["dia"]);
            countObj[cursoDia] = countObj[cursoDia] ? countObj[cursoDia] + 1 : 1;
          }
          // countObj: {"<dia>:<cursoId>": <asistenciaDia>, ... }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        var queryPars = {
          id: cursoIds
        };
        Curso.findAll({
          attributes: ['nombre', 'id'],
          where: queryPars,
          raw: true
        }).then(function (queryCursos) {
          var countPorCurso = {};
          var idToName = new Map();
          var _iterator2 = _createForOfIteratorHelper(queryCursos),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var curso = _step2.value;
              countPorCurso[curso.nombre] = {};
              idToName.set(curso.id, curso.nombre);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          for (var auxString in countObj) {
            var index = auxString.indexOf(":");
            var cursoId = auxString.slice(0, index);
            var dia = auxString.slice(index + 1);
            var count = countObj[auxString];
            countPorCurso[idToName.get(+cursoId)][+dia] = count;
          }
          res.status(200).send(countPorCurso);
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "findOrCreate",
    value: function findOrCreate(req, res) {
      var _req$params5 = req.params,
        matriculaId = _req$params5.matriculaId,
        colegioId = _req$params5.colegioId,
        cursoId = _req$params5.cursoId,
        alumnoId = _req$params5.alumnoId,
        annoId = _req$params5.annoId,
        mesId = _req$params5.mesId;
      var _req$body = req.body,
        fecha = _req$body.fecha,
        presente = _req$body.presente,
        dia = _req$body.dia;
      return Asistencia.findOrCreate({
        where: {
          fecha: fecha,
          matriculaId: matriculaId
        },
        defaults: {
          fecha: fecha,
          presente: presente,
          dia: dia,
          matriculaId: matriculaId,
          colegioId: colegioId,
          cursoId: cursoId,
          alumnoId: alumnoId,
          annoId: annoId,
          mesId: mesId
        }
      }).then(function (asistencia) {
        return res.status(201).send({
          success: true,
          message: "Your Asistencia at fecha ".concat(fecha, " for Alumno ").concat(alumnoId, " has been found/created successfully")
        });
      })["catch"](function (error) {
        return res.status(400).send({
          success: false,
          message: "Asistencia at fecha ".concat(fecha, " for Alumno ").concat(alumnoId, " was NOT found/created")
        });
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params6 = req.params,
        matriculaId = _req$params6.matriculaId,
        colegioId = _req$params6.colegioId,
        cursoId = _req$params6.cursoId,
        alumnoId = _req$params6.alumnoId,
        annoId = _req$params6.annoId,
        mesId = _req$params6.mesId,
        userId = _req$params6.userId;
      var _req$body2 = req.body,
        fecha = _req$body2.fecha,
        presente = _req$body2.presente,
        dia = _req$body2.dia;
      return Asistencia.create({
        fecha: fecha,
        presente: presente,
        dia: dia,
        matriculaId: matriculaId,
        colegioId: colegioId,
        cursoId: cursoId,
        alumnoId: alumnoId,
        annoId: annoId,
        mesId: mesId
      }).then(function (asistencia) {
        return res.status(201).send({
          success: true,
          message: "Asistencia con fecha ".concat(fecha, " para Alumno ").concat(alumnoId, " creada exitosamente")
        });
      })["catch"](function (error) {
        return res.status(400).send({
          success: false,
          message: "Asistencia con fecha ".concat(fecha, " para Alumno ").concat(alumnoId, " NO fue creada")
        });
      });
    }
  }, {
    key: "populateMes",
    value: function populateMes(req, res) {
      var _req$params7 = req.params,
        colegioId = _req$params7.colegioId,
        cursoId = _req$params7.cursoId,
        annoId = _req$params7.annoId,
        mesId = _req$params7.mesId,
        userId = _req$params7.userId;
      var anno = req.body.anno;
      var mes = mesId;
      if (colegioId == '0' || cursoId == '0' || annoId == '0' || mesId == '0') {
        res.status(400).send({
          success: false,
          message: " populateMes:  not all FKs are != 0"
        });
        return;
      }
      // lista de curso
      var consulta = {};
      consulta['colegioId'] = colegioId;
      consulta['cursoId'] = cursoId;
      consulta['annoId'] = annoId;
      Matricula.findAll({
        where: consulta,
        attributes: ['id', 'nombre'],
        include: [{
          model: Alumno,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (matriculas) {
        if (matriculas.length > 0) {
          var consultaFeriado = {
            fecha: _defineProperty({}, Op.between, [new Date(anno, mes - 1, 0), new Date(anno, mes, 0)])
          };
          Feriado.findAll({
            attributes: ['id', 'fecha'],
            where: consultaFeriado,
            order: [['fecha', 'ASC']],
            raw: true
          }).then(function (feriados) {
            var dim = new Date(anno, mesId, 0).getDate();
            var dowFirstDay = (new Date(anno, mesId - 1, 1).getDay() + 6) % 7;
            var feriadosSet = new Set();
            var _iterator3 = _createForOfIteratorHelper(feriados),
              _step3;
            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var feriado = _step3.value;
                feriadosSet.add(parseInt(feriado.fecha.toString().split('-')[2]));
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }
            var asistenciaObjects = [];
            var _iterator4 = _createForOfIteratorHelper(matriculas),
              _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var obj = _step4.value;
                var alumnoId = obj.Alumno.id;
                var matriculaId = obj.id;
                for (var i = 0; i < dim; i++) {
                  var dow = (dowFirstDay + i) % 7;
                  var dia = i + 1;
                  if (dow < 5 && !feriadosSet.has(dia)) {
                    var fecha = dateString(anno, mesId, dia);
                    var asistencia = {
                      fecha: fecha,
                      presente: false,
                      dia: dia,
                      matriculaId: matriculaId.toString(),
                      colegioId: colegioId,
                      cursoId: cursoId,
                      alumnoId: alumnoId.toString(),
                      annoId: annoId,
                      mesId: mesId
                    };
                    asistenciaObjects.push(asistencia);
                  }
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
            Asistencia.bulkCreate(asistenciaObjects).then(function () {
              return res.status(201).send({
                success: true,
                message: "Entradas de Asistencia creadas exitosamente"
              });
            })["catch"](function (error) {
              return res.status(400).send({
                success: false,
                message: "Entradas de Asistencia NO fueron creadas con \xE9xito"
              });
            });
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
      // let consulta = getBaseQuery(req);
      var consulta = {};
      consulta['id'] = req.params.asistenciaId;
      var _req$body3 = req.body,
        fecha = _req$body3.fecha,
        presente = _req$body3.presente,
        Matricula = _req$body3.Matricula,
        Colegio = _req$body3.Colegio,
        Curso = _req$body3.Curso,
        Alumno = _req$body3.Alumno,
        Anno = _req$body3.Anno,
        Mes = _req$body3.Mes;
      return Asistencia.findOne({
        where: consulta
      }).then(function (asistencia) {
        var new_value = {
          fecha: fecha || asistencia.fecha,
          presente: presente == null ? asistencia.presente : presente,
          matriculaId: Matricula || asistencia.matriculaId,
          colegioId: Colegio || asistencia.colegioId,
          cursoId: Curso || asistencia.cursoId,
          alumnoId: Alumno || asistencia.alumnoId,
          annoId: Anno || asistencia.annoId,
          mesId: Mes || asistencia.mesId
        };
        asistencia.update(new_value).then(function () {
          res.status(200).send({
            success: true,
            message: 'Asistencia actualizado exitosamente'
          });
        })["catch"](function (error) {
          return res.status(400).send({
            success: false,
            message: 'asistencia was NOT updated'
          });
        });
      })["catch"](function (error) {
        return res.status(400).send({
          success: false,
          message: "Asistencia with pk=".concat(req.params.asistenciaId, " not found. Asistencia was NOT updated")
        });
      });
    }
  }, {
    key: "delete",
    value: function _delete(req, res) {
      // let consulta = getBaseQuery(req);
      var consulta = {};
      consulta['id'] = req.params.asistenciaId;
      return Asistencia.findOne({
        where: consulta
      }).then(function (asistencia) {
        if (!asistencia) {
          return res.status(400).send({
            message: 'Asistencia Not Found'
          });
        }
        return asistencia.destroy().then(function () {
          return res.status(200).send({
            message: 'Asistencia successfully deleted'
          });
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }]);
  return Asistencias;
}();
var _default = exports["default"] = Asistencias;