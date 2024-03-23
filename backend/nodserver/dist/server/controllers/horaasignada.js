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
// import { getBaseQuery } from './acceso';
var HoraAsignada = _models["default"].HoraAsignada,
  Colegio = _models["default"].Colegio,
  Usuario = _models["default"].Usuario;
var HorasAsignadas = /*#__PURE__*/function () {
  function HorasAsignadas() {
    _classCallCheck(this, HorasAsignadas);
  }
  _createClass(HorasAsignadas, null, [{
    key: "list",
    value: function list(req, res) {
      return HoraAsignada.findAll({
        // where: getBaseQuery(req),
        attributes: ['id', 'numero', 'horario'],
        include: [{
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['numero', 'ASC']]
      }).then(function (hasignada) {
        return res.status(200).send(hasignada);
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

      // let consulta = getBaseQuery(req);
      if (colegioId != '0') {
        consulta['colegioId'] = colegioId;
      }
      return HoraAsignada.findAll({
        where: consulta,
        attributes: ['id', 'numero', 'horario'],
        include: [{
          model: Colegio,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['numero', 'ASC']]
      }).then(function (hasignada) {
        return res.status(200).send(hasignada);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      var consulta = getBaseQuery(req);
      consulta["id"] = req.params.horaasignadaId;
      return HoraAsignada.findOne({
        where: consulta
      }).then(function (hasignada) {
        return res.status(200).send(hasignada);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var colegioId = req.params.colegioId;
      var _req$body = req.body,
        numero = _req$body.numero,
        horario = _req$body.horario;
      return HoraAsignada.create({
        numero: numero,
        horario: horario,
        colegioId: colegioId
      }).then(function (horarioData) {
        return res.status(201).send({
          success: true,
          message: 'Horario Asignado successfully created',
          horarioData: horarioData
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var consulta = {};
      consulta["id"] = req.params.horaasignadaId;
      var _req$body2 = req.body,
        numero = _req$body2.numero,
        horario = _req$body2.horario,
        Colegio = _req$body2.Colegio;
      return HoraAsignada.findOne({
        where: consulta
      }).then(function (horadata) {
        horadata.update({
          numero: numero || horadata.numero,
          horario: horario || horadata.horario,
          colegioId: Colegio || horadata.colegioId
        }).then(function (updatedHorario) {
          res.status(200).send({
            message: 'Horario Asignado updated successfully',
            data: {
              numero: numero || updatedHorario.numero,
              horario: horario || updatedHorario.horario,
              colegioId: Colegio || updatedHorario.colegioId
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
  return HorasAsignadas;
}();
var _default = exports["default"] = HorasAsignadas;