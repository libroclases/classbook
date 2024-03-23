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
var Comuna = _models["default"].Comuna,
  Provincix = _models["default"].Provincix;
var Comunas = /*#__PURE__*/function () {
  function Comunas() {
    _classCallCheck(this, Comunas);
  }
  _createClass(Comunas, null, [{
    key: "list",
    value: function list(req, res) {
      return Comuna.findAll({
        attributes: ['id', 'nombre'],
        include: [{
          model: Provincix,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (comunas) {
        return res.status(200).send(comunas);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        regionId = _req$params.regionId,
        provincixId = _req$params.provincixId;
      var consulta = {};
      if (regionId != '0') {
        consulta['regionId'] = regionId;
      }
      if (provincixId != '0') {
        consulta['provincixId'] = provincixId;
      }
      return Comuna.findAll({
        where: consulta,
        attributes: ['id', 'nombre'],
        include: [{
          model: Provincix,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (comuna) {
        return res.status(200).send(comuna);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params2 = req.params,
        regionId = _req$params2.regionId,
        provincixId = _req$params2.provincixId;
      var nombre = req.body.nombre;
      return Comuna.create({
        nombre: nombre,
        regionId: regionId,
        provincixId: provincixId
      }).then(function (comunaData) {
        return res.status(201).send({
          success: true,
          message: 'Comuna successfully created',
          comunaData: comunaData
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
        Region = _req$body.Region,
        Provincix = _req$body.Provincix;
      return Comuna.findByPk(req.params.comunaId).then(function (comuna) {
        comuna.update({
          nombre: nombre || comuna.nombre,
          regionId: Region || comuna.regionId,
          provincixId: Provincix || comuna.provincixId
        }).then(function (updatedComuna) {
          res.status(200).send({
            message: 'Comuna updated successfully',
            data: {
              nombre: nombre || updatedComuna.nombre,
              regionId: Region || updatedComuna.regionId,
              provincixId: Provincix || updatedComuna.provincixId
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
  return Comunas;
}();
var _default = exports["default"] = Comunas;