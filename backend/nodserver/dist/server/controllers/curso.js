"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _models = _interopRequireDefault(require("../models"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Sequelize = require("sequelize");
var Op = Sequelize.Op;
var Curso = _models["default"].Curso,
  Colegio = _models["default"].Colegio,
  Anno = _models["default"].Anno;
var Cursos = /*#__PURE__*/function () {
  function Cursos() {
    _classCallCheck(this, Cursos);
  }
  _createClass(Cursos, null, [{
    key: "list",
    value: function list(req, res) {
      /*
      let consulta = getBaseQuery(req);
      if ( consulta.hasOwnProperty('cursoId') ){
          consulta['id'] = consulta.cursoId;
          delete consulta.cursoId;
      }
      */
      return Curso.findAll({
        //where: consulta,
        attributes: ['id', 'nombre', 'profesor_jefe'],
        include: [{
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Anno,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (cursos) {
        return res.status(200).send(cursos);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "bySearch",
    value: function bySearch(req, res) {
      var expr = req.params.expr;
      return Curso.findAll({
        where: _defineProperty({}, Op.or, [{
          nombre: _defineProperty({}, Op.iLike, "%".concat(expr, "%"))
        }]),
        include: [{
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Anno,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (cursos) {
        return res.status(200).send(cursos);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        colegioId = _req$params.colegioId,
        annoId = _req$params.annoId;
      var consulta = {};
      /*
      let consulta = getBaseQuery(req);
      if ( consulta.hasOwnProperty('cursoId') ){
          consulta['id'] = consulta.cursoId;
          delete consulta.cursoId;
      }
      */
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (annoId != '0') {
        consulta['annoId'] = annoId;
      }
      return Curso.findAll({
        where: consulta,
        attributes: ['id', 'nombre', 'profesor_jefe'],
        include: [{
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Anno,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (cursos) {
        return res.status(200).send(cursos);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      return Curso.findByPk(req.params.cursoId).then(function (cursos) {
        return res.status(200).send(cursos);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params2 = req.params,
        colegioId = _req$params2.colegioId,
        annoId = _req$params2.annoId;
      var _req$body = req.body,
        nombre = _req$body.nombre,
        profesor_jefe = _req$body.profesor_jefe;
      return Curso.create({
        nombre: nombre,
        profesor_jefe: profesor_jefe,
        colegioId: colegioId,
        annoId: annoId
      }).then(function (cursoData) {
        return res.status(201).send({
          success: true,
          message: 'Curso successfully created',
          cursoData: cursoData
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body2 = req.body,
        nombre = _req$body2.nombre,
        profesor_jefe = _req$body2.profesor_jefe,
        Colegio = _req$body2.Colegio,
        Anno = _req$body2.Anno;
      return Curso.findByPk(req.params.cursoId).then(function (curso) {
        curso.update({
          nombre: nombre || curso.nombre,
          profesor_jefe: profesor_jefe || curso.profesor_jefe,
          colegioId: Colegio || curso.colegioId
        }).then(function (updatedCurso) {
          res.status(200).send({
            message: 'Curso updated successfully',
            data: {
              nombre: nombre || updatedCurso.nombre,
              profesor_jefe: nombre || updatedCurso.profesor_jefe,
              colegioId: Colegio || updatedCurso.colegioId,
              annoId: Anno || updatedCurso.annoId
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
  return Cursos;
}();
var _default = exports["default"] = Cursos;