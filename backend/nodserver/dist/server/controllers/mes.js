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
var Mes = _models["default"].Mes;
var Meses = /*#__PURE__*/function () {
  function Meses() {
    _classCallCheck(this, Meses);
  }
  _createClass(Meses, null, [{
    key: "list",
    value: function list(req, res) {
      return Mes.findAll({
        attributes: ['id', 'numero', 'nombre', 'abreviatura'],
        include: [],
        order: [['numero', 'ASC']]
      }).then(function (meses) {
        return res.status(200).send(meses);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$body = req.body,
        numero = _req$body.numero,
        nombre = _req$body.nombre,
        abreviatura = _req$body.abreviatura;
      return Mes.create({
        numero: numero,
        nombre: nombre,
        abreviatura: abreviatura
      }).then(function (mesData) {
        return res.status(201).send({
          message: "El Mes con el nombre ".concat(nombre, " fue creado exitosamente "),
          mesData: mesData
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body2 = req.body,
        numero = _req$body2.numero,
        nombre = _req$body2.nombre,
        abreviatura = _req$body2.abreviatura;
      return Mes.findByPk(req.params.mesId).then(function (mes) {
        mes.update({
          numero: numero || mes.numero,
          nombre: nombre || mes.nombre,
          abreviatura: abreviatura || mes.abreviatura
        }).then(function (updatedMes) {
          res.status(200).send({
            message: 'Mes updated successfully',
            data: {
              numero: numero || updatedMes.numero,
              nombre: nombre || updatedMes.nombre,
              abreviatura: abreviatura || updatedMes.abreviatura
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
  return Meses;
}();
var _default = exports["default"] = Meses;