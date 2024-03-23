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
var Ventana = _models["default"].Ventana,
  Colegio = _models["default"].Colegio,
  Tabla = _models["default"].Tabla;
var Ventanas = /*#__PURE__*/function () {
  function Ventanas() {
    _classCallCheck(this, Ventanas);
  }
  _createClass(Ventanas, null, [{
    key: "list",
    value: function list(req, res) {
      return Ventana.findAll({
        attributes: ['id', 'dias'],
        include: [{
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Tabla,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['id', 'ASC']]
      }).then(function (ventanas) {
        return res.status(200).send(ventanas);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        colegioId = _req$params.colegioId,
        tablaId = _req$params.tablaId;
      console.log('AAA', colegioId, tablaId);
      var consulta = {};
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      if (tablaId != '0') {
        consulta['tablaId'] = tablaId;
      }
      console.log('BBB', consulta);
      return Ventana.findAll({
        where: consulta,
        attributes: ['id', 'dias'],
        include: [{
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Tabla,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['id', 'ASC']]
      }).then(function (ventana) {
        return res.status(200).send(ventana);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var dias = req.body.dias;
      var _req$params2 = req.params,
        colegioId = _req$params2.colegioId,
        tablaId = _req$params2.tablaId;
      return Ventana.create({
        dias: dias,
        colegioId: colegioId,
        tablaId: tablaId
      }).then(function (tabla) {
        return res.status(201).send({
          message: "Ventana ".concat(dias, " creada exitosamente "),
          tabla: tabla
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body = req.body,
        dias = _req$body.dias,
        Colegio = _req$body.Colegio,
        Tabla = _req$body.Tabla;
      return Ventana.findByPk(req.params.ventanaId).then(function (ventana) {
        ventana.update({
          dias: dias || ventana.dias,
          colegioId: Colegio || ventana.colegioId,
          tablaId: Tabla || ventana.tablaId
        }).then(function (updatedVentana) {
          res.status(200).send({
            message: 'Ventana actualizada exitosamente',
            data: {
              dias: dias || updatedVentana.dias,
              colegioId: Colegio || updatedVentana.colegioId,
              tablaId: Tabla || updatedVentana.tablaId
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
  return Ventanas;
}();
var _default = exports["default"] = Ventanas;