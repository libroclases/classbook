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
var Op = require('../models').Sequelize.Op;
var Feriado = _models["default"].Feriado;
var Feriados = /*#__PURE__*/function () {
  function Feriados() {
    _classCallCheck(this, Feriados);
  }
  _createClass(Feriados, null, [{
    key: "list",
    value: function list(req, res) {
      return Feriado.findAll({
        attributes: ['id', 'nombre', 'fecha', 'lugar'],
        order: [['fecha', 'ASC']]
      }).then(function (feriados) {
        return res.status(200).send(feriados);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getAtDate",
    value: function getAtDate(req, res) {
      var _req$body = req.body,
        anno = _req$body.anno,
        mes = _req$body.mes,
        dia = _req$body.dia;
      var consulta = {
        fecha: _defineProperty({}, Op.eq, new Date(anno, mes - 1, dia))
      };
      return Feriado.findAll({
        attributes: ['id', 'fecha', 'nombre', 'lugar'],
        where: consulta,
        order: [['fecha', 'ASC']]
      }).then(function (feriados) {
        return res.status(200).send(feriados);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getYearMonth",
    value: function getYearMonth(req, res) {
      var _req$query = req.query,
        anno = _req$query.anno,
        mes = _req$query.mes;
      var consulta = {
        fecha: _defineProperty({}, Op.between, [new Date(anno, mes - 1, 0), new Date(anno, mes, 0)])
      };
      return Feriado.findAll({
        attributes: ['id', 'fecha', 'nombre', 'lugar'],
        where: consulta,
        order: [['fecha', 'ASC']]
      }).then(function (feriados) {
        return res.status(200).send(feriados);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getInYear",
    value: function getInYear(req, res) {
      var anno = req.query.anno;
      var consulta = {
        fecha: _defineProperty({}, Op.between, [new Date(anno, 0, 0), new Date(anno, 12, 0)])
      };
      return Feriado.findAll({
        attributes: ['id', 'fecha', 'nombre', 'lugar'],
        where: consulta,
        order: [['fecha', 'ASC']]
      }).then(function (feriados) {
        return res.status(200).send(feriados);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$body2 = req.body,
        nombre = _req$body2.nombre,
        fecha = _req$body2.fecha,
        lugar = _req$body2.lugar;
      return Feriado.create({
        nombre: nombre,
        fecha: fecha,
        lugar: lugar
      }).then(function (feriadoData) {
        return res.status(201).send({
          message: "El Feriado con el nombre ".concat(nombre, " fue creado exitosamente "),
          feriadoData: feriadoData
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body3 = req.body,
        nombre = _req$body3.nombre,
        fecha = _req$body3.fecha,
        lugar = _req$body3.lugar;
      return Feriado.findByPk(req.params.feriadoId).then(function (feriado) {
        feriado.update({
          nombre: nombre || feriado.nombre,
          fecha: fecha || feriado.fecha,
          lugar: lugar || feriado.lugar
        }).then(function (updatedFeriado) {
          res.status(200).send({
            message: 'Feriado updated successfully',
            data: {
              nombre: updatedFeriado.nombre,
              fecha: updatedFeriado.fecha,
              lugar: updatedFeriado.lugar
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
      return Feriado.findByPk(req.params.feriadoId).then(function (feriado) {
        if (!feriado) {
          return res.status(400).send({
            message: 'Feriado Not Found'
          });
        }
        return feriado.destroy().then(function () {
          return res.status(200).send({
            message: 'Feriado successfully deleted'
          });
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }]);
  return Feriados;
}();
var _default = exports["default"] = Feriados;