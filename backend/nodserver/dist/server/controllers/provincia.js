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
var Provincix = _models["default"].Provincix,
  Region = _models["default"].Region;
var Provincixs = /*#__PURE__*/function () {
  function Provincixs() {
    _classCallCheck(this, Provincixs);
  }
  _createClass(Provincixs, null, [{
    key: "list",
    value: function list(req, res) {
      return Provincix.findAll({
        attributes: ['id', 'nombre'],
        include: [{
          model: Region,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (provincias) {
        return res.status(200).send(provincias);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var regionId = req.params.regionId;
      var consulta = {};
      if (regionId != '0') {
        consulta['regionId'] = regionId;
      }
      return Provincix.findAll({
        where: consulta,
        attributes: ['id', 'nombre'],
        include: [{
          model: Region,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (provincia) {
        return res.status(200).send(provincia);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var regionId = req.params.regionId;
      var nombre = req.body.nombre;
      return Provincix.create({
        nombre: nombre,
        regionId: regionId
      }).then(function (data) {
        return res.status(201).send({
          success: true,
          message: 'Provincix successfully created',
          data: data
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
        Region = _req$body.Region;
      return Provincix.findByPk(req.params.provinciaId).then(function (provincia) {
        provincia.update({
          nombre: nombre || provincia.nombre,
          regionId: Region || provincia.regionId
        }).then(function (updatedProvincia) {
          res.status(200).send({
            message: 'Provincix updated successfully',
            data: {
              nombre: nombre || updatedProvincia.nombre,
              regionId: Region || updatedProvincia.regionId
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
  return Provincixs;
}();
var _default = exports["default"] = Provincixs;