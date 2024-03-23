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
var Anno = _models["default"].Anno;
var Annos = /*#__PURE__*/function () {
  function Annos() {
    _classCallCheck(this, Annos);
  }
  _createClass(Annos, null, [{
    key: "list",
    value: function list(req, res) {
      return Anno.findAll({
        attributes: ['id', 'nombre', 'numero'],
        include: [],
        order: [['nombre', 'ASC']]
      }).then(function (annos) {
        return res.status(200).send(annos);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$body = req.body,
        nombre = _req$body.nombre,
        numero = _req$body.numero;
      return Anno.create({
        nombre: nombre,
        numero: numero
      }).then(function (anno) {
        return res.status(201).send({
          message: "Anno ".concat(nombre, " creado exitosamente "),
          anno: anno
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
        numero = _req$body2.numero;
      return Anno.findByPk(req.params.annoId).then(function (anno) {
        anno.update({
          nombre: nombre || anno.nombre,
          numero: numero || anno.numero
        }).then(function (updateAnno) {
          res.status(200).send({
            message: 'Anno actualizado exitosamente',
            data: {
              nombre: nombre || updateAnno.nombre,
              numero: numero || updateAnno.numero
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
  return Annos;
}();
var _default = exports["default"] = Annos;