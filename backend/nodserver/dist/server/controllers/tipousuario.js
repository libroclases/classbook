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
var TipoUsuario = _models["default"].TipoUsuario;
var TipoUsuarios = /*#__PURE__*/function () {
  function TipoUsuarios() {
    _classCallCheck(this, TipoUsuarios);
  }
  _createClass(TipoUsuarios, null, [{
    key: "list",
    value: function list(req, res) {
      return TipoUsuario.findAll({
        attributes: ['id', 'nombre', 'descripcion'],
        order: [['nombre', 'ASC']]
      }).then(function (tipos) {
        return res.status(200).send(tipos);
      })["catch"](function (error) {
        return res.status(400).send(error);
      });
    }
  }, {
    key: "getId",
    value: function getId(req, res) {
      var name = req.params.name;
      return TipoUsuario.findOne({
        where: {
          nombre: name
        },
        attributes: ['id']
      }).then(function (tipos) {
        return res.status(200).send(tipos);
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
      return TipoUsuario.create({
        nombre: nombre,
        descripcion: descripcion
      }).then(function (tipousuario) {
        return res.status(201).send({
          message: "TipoUsuario con nombre ".concat(nombre, " creado exitosamente"),
          sexo: tipousuario
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
      return TipoUsuario.findByPk(req.params.tipousuarioId).then(function (tipo) {
        tipo.update({
          nombre: nombre || tipo.nombre,
          descripcion: descripcion || tipo.descripcion
        }).then(function (updateTipo) {
          res.status(200).send({
            message: 'TipoUsuario actualizado exitosamente',
            data: {
              nombre: nombre || updateTipo.nombre,
              descripcion: descripcion || updateTipo.descripcion
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
  return TipoUsuarios;
}();
var _default = exports["default"] = TipoUsuarios;