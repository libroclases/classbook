"use strict";

var _https = _interopRequireDefault(require("https"));
var _http = _interopRequireDefault(require("http"));
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _routes = _interopRequireDefault(require("./server/routes"));
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var cors = require('cors');
var hostname = '0.0.0.0';
var environment = process.env.NODE_ENV || 'development';
var port = 3000;
var app = (0, _express["default"])(); // setup express application

app.use(cors({
  origin: '*'
}));
app.use((0, _morgan["default"])('dev')); // log requests to the console

// Parse incoming requests data
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
(0, _routes["default"])(app);
if (environment === 'development') {
  var server = _http["default"].createServer(app);
  server.listen(port, hostname, function () {
    console.log("Server running at http://".concat(hostname, ":").concat(port, "/"));
  });
  app.get('*', function (req, res) {
    return res.status(200).send({
      message: 'Welcome to the default API route'
    });
  });
} else if (environment === 'production') {
  _https["default"].createServer({
    cert: _fs["default"].readFileSync('/app/dist/etc/letsencrypt/cert.pem'),
    key: _fs["default"].readFileSync('/app/dist/etc/letsencrypt/privkey.pem')
  }, app).listen(port, function () {
    console.log("Servidor https corriendo en el puerto ".concat(port));
  });
}