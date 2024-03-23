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
var TipoEstado = _models["default"].TipoEstado;
var TipoEstados = /*#__PURE__*/function () {
  function TipoEstados() {
    _classCallCheck(this, TipoEstados);
  }
  _createClass(TipoEstados, null, [{
    key: "list",
    value: function list(req, res) {
      return TipoEstado.findAll({
        attributes: ['id', 'nombre'],
        order: [['nombre', 'ASC']]
      }).then(function (tipoestado) {
        return res.status(200).send(tipoestado);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var nombre = req.body.nombre;
      return TipoEstado.create({
        nombre: nombre
      }).then(function (TipoEstado) {
        return res.status(201).send({
          message: "TipoEstado con nombre ".concat(nombre, " creado exitosamente."),
          TipoEstado: TipoEstado
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var nombre = req.body.nombre;
      return TipoEstado.findByPk(req.params.tipoestadoId).then(function (TipoEstado) {
        TipoEstado.update({
          nombre: nombre || TipoEstado.nombre
        }).then(function (updatedTipoEstado) {
          res.status(200).send({
            message: 'TipoEstado actualizado exitosamente',
            data: {
              nombre: nombre || updatedTipoEstado.nombre
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
  return TipoEstados;
}();
var _default = exports["default"] = TipoEstados;