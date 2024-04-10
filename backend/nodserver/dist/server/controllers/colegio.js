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
var Colegio = _models["default"].Colegio,
  Region = _models["default"].Region,
  Provincix = _models["default"].Provincix,
  Comuna = _models["default"].Comuna,
  TipoColegio = _models["default"].TipoColegio;
var Colegios = /*#__PURE__*/function () {
  function Colegios() {
    _classCallCheck(this, Colegios);
  }
  _createClass(Colegios, null, [{
    key: "list",
    value: function list(req, res) {
      /*
      let consulta = getBaseQuery(req);
      if ( consulta.hasOwnProperty('colegioId') ){
        consulta['id'] = consulta.colegioId;
        delete consulta.colegioId;
      }
      */
      return Colegio.findAll({
        // where: consulta,
        attributes: ['id', 'nombre', 'telefono', 'rut', 'direccion', 'email', 'www'],
        include: [{
          model: Region,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Provincix,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Comuna,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: TipoColegio,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (colegios) {
        return res.status(200).send(colegios);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByFk",
    value: function getByFk(req, res) {
      var _req$params = req.params,
        regionId = _req$params.regionId,
        provincixId = _req$params.provincixId,
        comunaId = _req$params.comunaId,
        tipocolegioId = _req$params.tipocolegioId;
      var consulta = {};
      /*
      let consulta = getBaseQuery(req);
      if ( consulta.hasOwnProperty('colegioId') ){
        consulta['id'] = consulta.colegioId;
        delete consulta.colegioId;
      }
      */
      if (regionId != '0') {
        consulta['regionId'] = regionId;
      }
      if (provincixId != '0') {
        consulta['provincixId'] = provincixId;
      }
      if (comunaId != '0') {
        consulta['comunaId'] = comunaId;
      }
      if (tipocolegioId != '0') {
        consulta['tipocolegioId'] = tipocolegioId;
      }
      return Colegio.findAll({
        where: consulta,
        attributes: ['id', 'nombre', 'telefono', 'rut', 'direccion', 'email', 'www'],
        include: [{
          model: Region,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Provincix,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: Comuna,
          attributes: ['id', 'nombre'],
          where: {}
        }, {
          model: TipoColegio,
          attributes: ['id', 'nombre'],
          where: {}
        }],
        order: [['nombre', 'ASC']]
      }).then(function (colegio) {
        return res.status(200).send(colegio);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "create",
    value: function create(req, res) {
      var _req$params2 = req.params,
        regionId = _req$params2.regionId,
        provincixId = _req$params2.provincixId,
        comunaId = _req$params2.comunaId,
        tipocolegioId = _req$params2.tipocolegioId;
      var _req$body = req.body,
        nombre = _req$body.nombre,
        telefono = _req$body.telefono,
        rut = _req$body.rut,
        direccion = _req$body.direccion,
        email = _req$body.email,
        www = _req$body.www;
      return Colegio.create({
        nombre: nombre,
        telefono: telefono,
        rut: rut,
        direccion: direccion,
        email: email,
        www: www,
        regionId: regionId,
        provincixId: provincixId,
        comunaId: comunaId,
        tipocolegioId: tipocolegioId
      }).then(function () {
        res.status(201).send({
          success: true,
          message: 'Colegio creado exitosamente'
        });
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getByPk",
    value: function getByPk(req, res) {
      return Colegio.findByPk(req.params.colegioId).then(function (colegios) {
        return res.status(200).send(colegios);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "modify",
    value: function modify(req, res) {
      var _req$body2 = req.body,
        nombre = _req$body2.nombre,
        telefono = _req$body2.telefono,
        rut = _req$body2.rut,
        direccion = _req$body2.direccion,
        email = _req$body2.email,
        www = _req$body2.www,
        Region = _req$body2.Region,
        Provincix = _req$body2.Provincix,
        Comuna = _req$body2.Comuna,
        TipoColegio = _req$body2.TipoColegio;
      return Colegio.findByPk(req.params.colegioId).then(function (colegio) {
        colegio.update({
          nombre: nombre || colegio.nombre,
          telefono: telefono || colegio.telefono,
          rut: rut || colegio.rut,
          direccion: direccion || colegio.direccion,
          email: email || colegio.email,
          www: www || colegio.www,
          regionId: Region || colegio.regionId,
          provincixId: Provincix || colegio.provincixId,
          comunaId: Comuna || colegio.comunaId,
          tipocolegioId: TipoColegio || colegio.tipocolegioId
        }).then(function (updatedColegio) {
          res.status(200).send({
            message: 'Colegio actualizado exitosamente',
            data: {
              nombre: nombre || updatedColegio.nombre,
              telefono: telefono || updatedColegio.telefono,
              rut: rut || updatedColegio.rut,
              direccion: direccion || updatedColegio.direccion,
              email: email || updatedColegio.email,
              www: www || updatedColegio.www,
              regionId: Region || updatedColegio.regionId,
              provincixId: Provincix || updatedColegio.provincixId,
              comunaId: Comuna || updatedColegio.comunaId,
              tipocolegioId: TipoColegio || updatedColegio.tipocolegioId
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
  return Colegios;
}();
var _default = exports["default"] = Colegios;