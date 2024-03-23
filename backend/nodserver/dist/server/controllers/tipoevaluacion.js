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
var TipoEvaluacion = _models["default"].TipoEvaluacion,
  Usuario = _models["default"].Usuario;
var TiposEvaluacion = /*#__PURE__*/function () {
  function TiposEvaluacion() {
    _classCallCheck(this, TiposEvaluacion);
  }
  _createClass(TiposEvaluacion, null, [{
    key: "list",
    value: function list(req, res) {
      return TipoEvaluacion.findAll({
        attributes: ['id', 'nombre', 'descripcion'],
        order: [['nombre', 'ASC']]
      }).then(function (dias) {
        return res.status(200).send(dias);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$body = req.body,
        nombre = _req$body.nombre,
        descripcion = _req$body.descripcion;
      return TipoEvaluacion.create({
        nombre: nombre,
        descripcion: descripcion
      }).then(function (tipoEvaluacion) {
        return res.status(201).send({
          message: "TipoEvaluacion con nombre ".concat(nombre, " creado exitosamente"),
          tipoEvaluacion: tipoEvaluacion
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
        descripcion = _req$body2.descripcion;
      return TipoEvaluacion.findByPk(req.params.tipoevaluacionId).then(function (tipoEvaluacion) {
        tipoEvaluacion.update({
          nombre: nombre || tipoEvaluacion.nombre,
          descripcion: descripcion || tipoEvaluacion.descripcion
        }).then(function (updatedTipoEvaluacion) {
          res.status(200).send({
            message: 'TipoEvaluacion actualizado exitosamente',
            data: {
              nombre: nombre || updatedTipoEvaluacion.nombre,
              descripcion: descripcion || updatedTipoEvaluacion.descripcion
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
  return TiposEvaluacion;
}();
var _default = exports["default"] = TiposEvaluacion;