"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireWildcard(require("../models"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// import { getBaseQuery } from './acceso';
var Matricula = _models["default"].Matricula,
  Colegio = _models["default"].Colegio,
  Curso = _models["default"].Curso,
  Apoderado = _models["default"].Apoderado,
  Alumno = _models["default"].Alumno,
  Vinculo = _models["default"].Vinculo,
  Anno = _models["default"].Anno,
  Periodo = _models["default"].Periodo,
  Profesor = _models["default"].Profesor,
  AsignaturaProfesor = _models["default"].AsignaturaProfesor,
  Evaluacion = _models["default"].Evaluacion,
  Nota = _models["default"].Nota;
var Matriculas = /*#__PURE__*/function () {
  function Matriculas() {
    _classCallCheck(this, Matriculas);
  }
  _createClass(Matriculas, null, [{
    key: "list",
    value: function list(req, res) {
      // const consulta = getBaseQuery(req);
      var consulta = {};
      return Matricula.findAll({
        where: consulta,
        attributes: ['id', 'nombre', 'incorporacion', 'retiro', 'procedencia'],
        include: [{
          model: Apoderado,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }, {
          model: Alumno,
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
          model: Vinculo,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (colegios) {
        return res.status(200).send(colegios);
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
        apoderadoId = _req$params.apoderadoId,
        alumnoId = _req$params.alumnoId,
        vinculoId = _req$params.vinculoId,
        annoId = _req$params.annoId;
      var consulta = {};
      // const consulta = getBaseQuery(req);

      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (cursoId != '0') {
        consulta['cursoId'] = cursoId;
      }
      if (apoderadoId != '0') {
        consulta['apoderadoId'] = apoderadoId;
      }
      if (alumnoId != '0') {
        consulta['alumnoId'] = alumnoId;
      }
      if (vinculoId != '0') {
        consulta['vinculoId'] = vinculoId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      return Matricula.findAll({
        where: consulta,
        attributes: ['id', 'nombre', 'procedencia', 'incorporacion', 'retiro'],
        include: [{
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Curso,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Apoderado,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }, {
          model: Alumno,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }, {
          model: Vinculo,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Anno,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (matricula) {
        return res.status(200).send(matricula);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "listaDeCurso",
    value: function listaDeCurso(req, res) {
      var _req$params2 = req.params,
        colegioId = _req$params2.colegioId,
        cursoId = _req$params2.cursoId,
        annoId = _req$params2.annoId;
      // let consulta = getBaseQuery(req);
      var consulta = {};
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (cursoId != '0') {
        consulta['cursoId'] = cursoId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      return Matricula.findAll({
        where: consulta,
        attributes: ['id', 'nombre'],
        include: [{
          model: Alumno,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (matricula) {
        return res.status(200).send(matricula);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "listaDeCursoNombres",
    value: function listaDeCursoNombres(req, res) {
      var _req$params3 = req.params,
        colegioId = _req$params3.colegioId,
        cursoId = _req$params3.cursoId,
        annoId = _req$params3.annoId;
      var consulta = {};
      // let consulta = getBaseQuery(req);
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (cursoId != '0') {
        consulta['cursoId'] = cursoId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      return Matricula.findAll({
        where: consulta,
        attributes: ['id'],
        include: [{
          model: Alumno,
          attributes: ['nombre', 'apellido1', 'apellido2'],
          where: {}
        }],
        raw: true,
        order: [[Alumno, 'apellido1', 'ASC']]
      }).then(function (query) {
        var matriculasNombres = [];
        query.forEach(function (entry) {
          return matriculasNombres.push({
            "id": entry.id,
            "nombre": "".concat(entry["Alumno.apellido1"], " ").concat(entry["Alumno.apellido2"], " ").concat(entry["Alumno.nombre"])
          });
        });
        res.status(200).send(matriculasNombres);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "nombreCompleto",
    value: function nombreCompleto(req, res) {
      var consulta = {};
      // let consulta = getBaseQuery(req);
      consulta['id'] = req.params.matriculaId;
      return Matricula.findAll({
        where: consulta,
        include: [{
          model: Alumno,
          attributes: ['nombre', 'apellido1', 'apellido2'],
          where: {}
        }],
        raw: true
      }).then(function (query) {
        var nombreCompleto = "".concat(query[0]["Alumno.apellido1"], ",").concat(query[0]["Alumno.apellido2"], ", ").concat(query[0]["Alumno.nombre"]);
        res.status(200).send({
          nombreCompleto: nombreCompleto
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "count",
    value: function count(req, res) {
      var _req$params4 = req.params,
        colegioId = _req$params4.colegioId,
        cursoId = _req$params4.cursoId,
        apoderadoId = _req$params4.apoderadoId,
        alumnoId = _req$params4.alumnoId,
        vinculoId = _req$params4.vinculoId,
        annoId = _req$params4.annoId;
      var consulta = {};
      // let consulta = getBaseQuery(req);
      if (apoderadoId != '0') {
        consulta['apoderadoId'] = apoderadoId;
      }
      if (alumnoId != '0') {
        consulta['alumnoId'] = alumnoId;
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
      if (vinculoId != '0') {
        consulta['vinculoId'] = vinculoId;
      }
      return Matricula.findAll({
        where: consulta,
        attributes: [_models.sequelize.fn('COUNT', _models.sequelize.col('id'))],
        // group : ['SaleItem.itemId'],
        raw: true
      }).then(function (n_matriculas) {
        return res.status(200).send(n_matriculas);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "countCursos",
    value: function countCursos(req, res) {
      var _req$params5 = req.params,
        colegioId = _req$params5.colegioId,
        annoId = _req$params5.annoId;
      if (colegioId == '0' || annoId == '0') {
        res.status(200).send({
          message: "Todos los foreign keys deben ser validos: 'colegio', 'anno"
        });
        return;
      }
      // let consulta = getBaseQuery(req);
      var consulta = {};
      consulta['colegioId'] = colegioId;
      consulta['annoId'] = annoId;
      return Matricula.findAll({
        where: consulta,
        attributes: [],
        include: [{
          model: Curso,
          attributes: ['nombre']
        }],
        raw: true
      }).then(function (query) {
        var counterObject = {};
        var _iterator = _createForOfIteratorHelper(query),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var obj = _step.value;
            var nombreCurso = obj["Curso.nombre"];
            counterObject[nombreCurso] = counterObject[nombreCurso] ? counterObject[nombreCurso] + 1 : 1;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        res.status(200).send(counterObject);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "countHombresMujeres",
    value: function countHombresMujeres(req, res) {
      var _req$params6 = req.params,
        colegioId = _req$params6.colegioId,
        cursoId = _req$params6.cursoId,
        annoId = _req$params6.annoId;
      var consulta = {};
      // let consulta = getBaseQuery(req);
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (cursoId != '0') {
        consulta['cursoId'] = cursoId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      return Matricula.findAll({
        where: consulta,
        attributes: [],
        include: [{
          model: Alumno,
          attributes: ['sexoId'],
          where: {}
        }],
        raw: true
      }).then(function (matriculas) {
        var n_hombres = 0;
        var n_mujeres = 0;
        var _iterator2 = _createForOfIteratorHelper(matriculas),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var matricula = _step2.value;
            if (matricula["Alumno.sexoId"] == 1) {
              n_hombres += 1;
            } else {
              n_mujeres += 1;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        res.status(200).send({
          n_hombres: n_hombres,
          n_mujeres: n_mujeres
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params7 = req.params,
        colegioId = _req$params7.colegioId,
        cursoId = _req$params7.cursoId,
        apoderadoId = _req$params7.apoderadoId,
        alumnoId = _req$params7.alumnoId,
        vinculoId = _req$params7.vinculoId,
        annoId = _req$params7.annoId;
      var _req$body = req.body,
        nombre = _req$body.nombre,
        procedencia = _req$body.procedencia,
        incorporacion = _req$body.incorporacion,
        retiro = _req$body.retiro;
      return Matricula.create({
        nombre: nombre,
        procedencia: procedencia,
        incorporacion: incorporacion,
        retiro: retiro,
        apoderadoId: apoderadoId,
        alumnoId: alumnoId,
        colegioId: colegioId,
        cursoId: cursoId,
        annoId: annoId,
        vinculoId: vinculoId
      }).then(function (matricula) {
        var m = matricula.dataValues;
        var consulta_evaluacion = {
          annoId: m.annoId,
          colegioId: m.colegioId,
          cursoId: m.cursoId
        };
        Evaluacion.findAll({
          where: consulta_evaluacion,
          attributes: ['id'],
          include: [{
            model: Periodo,
            attributes: ['id']
          }, {
            model: Profesor,
            attributes: ['id']
          }, {
            model: AsignaturaProfesor,
            attributes: ['id']
          }],
          raw: true
        }).then(function (evaluacion) {
          var notasObject = [];
          evaluacion.forEach(function (e) {
            return notasObject.push(_objectSpread(_objectSpread({}, consulta_evaluacion), {}, {
              evaluacionId: e.id,
              profesorId: e['Profesor.id'],
              asignaturaprofesorId: e['AsignaturaProfesor.id'],
              periodoId: e['Periodo.id'],
              matriculaId: m.id
            }));
          });
          return Nota.bulkCreate(notasObject).then(function () {
            return res.status(201).send({
              success: true,
              newData: true,
              message: "Matricula creada exitosamente"
            });
          });
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      var consulta = {};
      // let consulta = getBaseQuery(req);
      consulta['id'] = req.params.matriculaId;
      return Matricula.findOne({
        where: consulta,
        include: [{
          model: Colegio,
          attributes: ['id', 'nombre']
        }, {
          model: Curso,
          attributes: ['id', 'nombre']
        }, {
          model: Apoderado,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2']
        }, {
          model: Alumno,
          attributes: ['id', 'nombre', 'apellido1', 'apellido2']
        }, {
          model: Vinculo,
          attributes: ['id', 'nombre']
        }, {
          model: Anno,
          attributes: ['id', 'nombre']
        }]
      }).then(function (matriculas) {
        return res.status(200).send(matriculas);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var consulta = {};
      // let consulta = getBaseQuery(req);
      consulta['id'] = req.params.matriculaId;
      var _req$body2 = req.body,
        nombre = _req$body2.nombre,
        procedencia = _req$body2.procedencia,
        incorporacion = _req$body2.incorporacion,
        retiro = _req$body2.retiro,
        Apoderado = _req$body2.Apoderado,
        Alumno = _req$body2.Alumno,
        Colegio = _req$body2.Colegio,
        Curso = _req$body2.Curso,
        Anno = _req$body2.Anno,
        Vinculo = _req$body2.Vinculo;
      return Matricula.findOne({
        where: consulta
      }).then(function (matricula) {
        matricula.update({
          nombre: nombre || matricula.nombre,
          procedencia: procedencia || matricula.procedencia,
          incorporacion: incorporacion || matricula.incorporacion,
          retiro: retiro || matricula.retiro,
          apoderadoId: Apoderado || matricula.apoderadoId,
          alumnoId: Alumno || matricula.alumnoId,
          colegioId: Colegio || matricula.colegioId,
          cursoId: Curso || matricula.cursoId,
          annoId: Anno || matricula.annoId,
          vinculoId: Vinculo || matricula.vinculoId
        }).then(function (updatedMatricula) {
          res.status(200).send({
            message: 'Matricula actualizada exitosamente',
            data: {
              nombre: nombre || updatedMatricula.nombre,
              procedencia: procedencia || updatedMatricula.procedencia,
              incorporacion: incorporacion || updatedMatricula.incorporacion,
              retiro: retiro || updatedMatricula.retiro,
              apoderadoId: Apoderado || updatedMatricula.apoderadoId,
              alumnoId: Alumno || updatedMatricula.alumnoId,
              colegioId: Colegio || updatedMatricula.colegioId,
              cursoId: Curso || updatedMatricula.cursoId,
              annoId: Anno || updatedMatricula.annoId,
              vinculoId: Vinculo || updatedMatricula.vinculoId
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
      consulta['id'] = req.params.matriculaId;
      return Matricula.findOne({
        where: consulta
      }).then(function (matricula) {
        if (!matricula) {
          return res.status(400).send({
            message: 'Matricula Not Found'
          });
        }
        return matricula.destroy().then(function () {
          return res.status(200).send({
            message: 'Matricula borrada exitosamente'
          });
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }]);
  return Matriculas;
}();
var _default = exports["default"] = Matriculas;