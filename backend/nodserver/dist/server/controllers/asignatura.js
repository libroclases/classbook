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
var Asignatura = _models["default"].Asignatura,
  TipoColegio = _models["default"].TipoColegio,
  Colegio = _models["default"].Colegio;
var Asignaturas = /*#__PURE__*/function () {
  function Asignaturas() {
    _classCallCheck(this, Asignaturas);
  }
  _createClass(Asignaturas, null, [{
    key: "list",
    value: function list(req, res) {
      return Asignatura.findAll({
        attributes: ['id', 'nombre'],
        include: [{
          model: TipoColegio,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (asignaturas) {
        return res.status(200).send(asignaturas);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var tipocolegioId = req.params.tipocolegioId;
      var consulta = {};
      if (tipocolegioId != '0') {
        consulta['tipocolegioId'] = tipocolegioId;
      }
      return Asignatura.findAll({
        where: consulta,
        attributes: ['id', 'nombre'],
        include: [{
          model: TipoColegio,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (tipocolegio) {
        return res.status(200).send(tipocolegio);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByColegio",
    value: function getByColegio(req, res) {
      Colegio.findOne({
        where: {
          id: req.params.colegioId
        },
        attributes: [],
        include: [{
          model: TipoColegio,
          attributes: ['id'],
          where: {}
        }],
        raw: true
      }).then(function (query) {
        return Asignatura.findAll({
          where: {
            tipocolegioId: query["TipoColegio.id"]
          },
          attributes: ['id', 'nombre'],
          include: [],
          order: [['nombre', 'ASC']]
        }).then(function (tipocolegio) {
          return res.status(200).send(tipocolegio);
        })["catch"](function (error) {
          return res.status(400).send(error);
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var nombre = req.body.nombre;
      var tipocolegioId = req.params.tipocolegioId;
      return Asignatura.create({
        nombre: nombre,
        tipocolegioId: tipocolegioId
      }).then(function (asignatura) {
        return res.status(201).send({
          message: "Asignatura con ".concat(nombre, " creada exitosamente "),
          asignatura: asignatura
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body = req.body,
        nombre = _req$body.nombre,
        TipoColegio = _req$body.TipoColegio;
      return Asignatura.findByPk(req.params.asignaturaId).then(function (asignatura) {
        asignatura.update({
          nombre: nombre || asignatura.nombre,
          tipocolegioId: TipoColegio || asignatura.tipocolegioId
        }).then(function (updatedAsignatura) {
          res.status(200).send({
            message: 'Asignatura actualizada exitosamente',
            data: {
              nombre: nombre || updatedAsignatura.nombre,
              tipocolegioId: TipoColegio || updatedAsignatura.tipocolegioId
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
  return Asignaturas;
}();
var _default = exports["default"] = Asignaturas;