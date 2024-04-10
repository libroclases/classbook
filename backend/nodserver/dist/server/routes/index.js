"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _region = _interopRequireDefault(require("../controllers/region"));
var _provincia = _interopRequireDefault(require("../controllers/provincia"));
var _comuna = _interopRequireDefault(require("../controllers/comuna"));
var _dia = _interopRequireDefault(require("../controllers/dia"));
var _asignatura = _interopRequireDefault(require("../controllers/asignatura"));
var _asignaturaprofesor = _interopRequireDefault(require("../controllers/asignaturaprofesor"));
var _colegio = _interopRequireDefault(require("../controllers/colegio"));
var _curso = _interopRequireDefault(require("../controllers/curso"));
var _horario = _interopRequireDefault(require("../controllers/horario"));
var _alumno = _interopRequireDefault(require("../controllers/alumno"));
var _sexo = _interopRequireDefault(require("../controllers/sexo"));
var _vinculo = _interopRequireDefault(require("../controllers/vinculo"));
var _nivel = _interopRequireDefault(require("../controllers/nivel"));
var _profesor = _interopRequireDefault(require("../controllers/profesor"));
var _utp = _interopRequireDefault(require("../controllers/utp"));
var _horaasignada = _interopRequireDefault(require("../controllers/horaasignada"));
var _usuario = _interopRequireDefault(require("../controllers/usuario"));
var _tema = _interopRequireDefault(require("../controllers/tema"));
var _resumennota = _interopRequireDefault(require("../controllers/resumennota"));
var _tabla = _interopRequireDefault(require("../controllers/tabla"));
var _inscripcionColegio = _interopRequireDefault(require("../controllers/inscripcion-colegio"));
var _anno = _interopRequireDefault(require("../controllers/anno"));
var _periodo = _interopRequireDefault(require("../controllers/periodo"));
var _apoderado = _interopRequireDefault(require("../controllers/apoderado"));
var _asistencia = _interopRequireDefault(require("../controllers/asistencia"));
var _mes = _interopRequireDefault(require("../controllers/mes"));
var _asistentecolegio = _interopRequireDefault(require("../controllers/asistentecolegio"));
var _controlasignatura = _interopRequireDefault(require("../controllers/controlasignatura"));
var _registroActividad = _interopRequireDefault(require("../controllers/registro-actividad"));
var _tipoevaluacion = _interopRequireDefault(require("../controllers/tipoevaluacion"));
var _evaluacion = _interopRequireDefault(require("../controllers/evaluacion"));
var _nota = _interopRequireDefault(require("../controllers/nota"));
var _tipoestado = _interopRequireDefault(require("../controllers/tipoestado"));
var _tipoasistente = _interopRequireDefault(require("../controllers/tipoasistente"));
var _estadoalumno = _interopRequireDefault(require("../controllers/estadoalumno"));
var _anotacion = _interopRequireDefault(require("../controllers/anotacion"));
var _tipo = _interopRequireDefault(require("../controllers/tipo"));
var _tipousuario = _interopRequireDefault(require("../controllers/tipousuario"));
var _matricula = _interopRequireDefault(require("../controllers/matricula"));
var _feriado = _interopRequireDefault(require("../controllers/feriado"));
var _ventana = _interopRequireDefault(require("../controllers/ventana"));
var _asignaturacurso = _interopRequireDefault(require("../controllers/asignaturacurso"));
var _cursoprofesor = _interopRequireDefault(require("../controllers/cursoprofesor"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _require = require('express-oauth2-jwt-bearer'),
  auth = _require.auth,
  requiredScopes = _require.requiredScopes;
var checkjwd = auth({
  audience: 'https://libroclases.cl',
  issuerBaseURL: "https://dev-tupdibnrpuxah8p3.us.auth0.com/"
});
var appMapping = null;
var environment = process.env.NODE_ENV || 'development';
console.log('environment', environment);
appMapping = function appMapping(app) {
  app.get('/api', function (req, res) {
    return res.status(200).send({
      message: 'Welcome to the libroClases API!'
    });
  });
  app.get('/api/region', checkjwd, requiredScopes('read:region'), _region["default"].list);
  app.post('/api/region', checkjwd, requiredScopes('create:region'), _region["default"].create);
  app.put('/api/region/:regionId', checkjwd, requiredScopes('update:region'), _region["default"].modify);
  app.get('/api/provincix', checkjwd, requiredScopes('read:provincix'), _provincia["default"].list);
  app.get('/api/provincix/:regionId/fk', checkjwd, requiredScopes('read:provincix'), _provincia["default"].getByFk);
  app.post('/api/provincix/:regionId', checkjwd, requiredScopes('create:provincix'), _provincia["default"].create);
  app.put('/api/provincix/:provincixId', checkjwd, requiredScopes('update:provincix'), _provincia["default"].modify);
  app.get('/api/comuna', checkjwd, requiredScopes('read:comuna'), _comuna["default"].list);
  app.get('/api/comuna/:regionId/:provincixId/fk', checkjwd, requiredScopes('read:comuna'), _comuna["default"].getByFk);
  app.post('/api/comuna/:regionId/:provincixId', checkjwd, requiredScopes('create:comuna'), _comuna["default"].create);
  app.put('/api/comuna/:comunaId', checkjwd, requiredScopes('update:comuna'), _comuna["default"].modify);
  app.get('/api/dix', checkjwd, requiredScopes('read:dix'), _dia["default"].list);
  app.post('/api/dix', checkjwd, requiredScopes('create:dix'), _dia["default"].create);
  app.put('/api/dix/:dixId', checkjwd, requiredScopes('update:dix'), _dia["default"].modify);
  app.get('/api/tipoestado', checkjwd, requiredScopes('read:tipoestado'), _tipoestado["default"].list);
  app.post('/api/tipoestado', checkjwd, requiredScopes('create:tipoestado'), _tipoestado["default"].create);
  app.put('/api/tipoestado/:tipoestadoId', checkjwd, requiredScopes('update:tipoestado'), _tipoestado["default"].modify);
  app.get('/api/tipoasistente', checkjwd, requiredScopes('read:tipoasistente'), _tipoasistente["default"].list);
  app.post('/api/tipoasistente', checkjwd, requiredScopes('create:tipoasistente'), _tipoasistente["default"].create);
  app.put('/api/tipoasistente/:tipoasistenteId', checkjwd, requiredScopes('update:tipoasistente'), _tipoasistente["default"].modify);
  app.get('/api/anno', checkjwd, requiredScopes('read:anno'), _anno["default"].list);
  app.post('/api/anno', checkjwd, requiredScopes('create:anno'), _anno["default"].create);
  app.put('/api/anno/:annoId', checkjwd, requiredScopes('update:anno'), _anno["default"].modify);
  app.get('/api/periodo', checkjwd, requiredScopes('read:periodo'), _periodo["default"].list);
  app.post('/api/periodo', checkjwd, requiredScopes('create:periodo'), _periodo["default"].create);
  app.put('/api/periodo/:periodoId', checkjwd, requiredScopes('update:periodo'), _periodo["default"].modify);
  app.get('/api/asignatura', checkjwd, requiredScopes('read:asignatura'), _asignatura["default"].list);
  app.get('/api/asignatura/:tipocolegioId/fk', checkjwd, requiredScopes('read:asignatura'), _asignatura["default"].getByFk);
  app.get('/api/asignatura/:colegioId/asignatura_por_colegio', checkjwd, requiredScopes(['read:asignatura', 'read:colegio']), _asignatura["default"].getByColegio);
  app.post('/api/asignatura/:tipocolegioId', checkjwd, requiredScopes('create:asignatura'), _asignatura["default"].create);
  app.put('/api/asignatura/:asignaturaId', checkjwd, requiredScopes('update:asignatura'), _asignatura["default"].modify);
  app.get('/api/asistentecolegio', checkjwd, requiredScopes('read:asistentecolegio'), _asistentecolegio["default"].list);
  app.get('/api/asistentecolegio/:expr/search', checkjwd, requiredScopes('read:asistentecolegio'), _asistentecolegio["default"].bySearch);
  app.get('/api/asistentecolegio/:tipoasistenteId/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId/fk', checkjwd, requiredScopes('read:asistentecolegio'), _asistentecolegio["default"].getByFk);
  app.get('/api/asistentecolegio/:asistentecolegioId/pk', checkjwd, requiredScopes('read:asistentecolegio'), _asistentecolegio["default"].getByPk);
  app.post('/api/asistentecolegio/:tipoasistenteId/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId', checkjwd, requiredScopes('create:asistentecolegio'), _asistentecolegio["default"].create);
  app.put('/api/asistentecolegio/:asistentecolegioId', checkjwd, requiredScopes('update:asistentecolegio'), _asistentecolegio["default"].modify);
  app.get('/api/horaasignada', checkjwd, requiredScopes('read:horaasignada'), _horaasignada["default"].list);
  app.get('/api/horaasignada/:colegioId/fk', checkjwd, requiredScopes('read:horaasignada'), _horaasignada["default"].getByFk);
  app.post('/api/horaasignada/:colegioId', checkjwd, requiredScopes('create:horaasignada'), _horaasignada["default"].create);
  app.put('/api/horaasignada/:horaasignadaId', checkjwd, requiredScopes('update:horaasignada'), _horaasignada["default"].modify);
  app.get('/api/estadoalumno', checkjwd, requiredScopes('read:estadoalumno'), _estadoalumno["default"].list);
  app.get('/api/estadoalumno/:alumnoId/:matriculaId/:tipoestadoId/fk', checkjwd, requiredScopes('read:estadoalumno'), _estadoalumno["default"].getByFk);
  app.post('/api/estadoalumno/:alumnoId/:matriculaId/:tipoestadoId', checkjwd, requiredScopes('create:estadoalumno'), _estadoalumno["default"].create);
  app.put('/api/estadoalumno/:estadoalumnoId', checkjwd, requiredScopes('update:estadoalumno'), _estadoalumno["default"].modify);
  app.get('/api/anotacion', checkjwd, requiredScopes('read:anotacion'), _anotacion["default"].list);
  app.get('/api/anotacion/:matriculaId/:profesorId/:annoId/:colegioId/:cursoId/fk', checkjwd, requiredScopes('read:anotacion'), _anotacion["default"].getByFk);
  app.get('/api/anotacion/:anotacionId/pk', checkjwd, requiredScopes('read:anotacion'), _anotacion["default"].getByPk);
  app.post('/api/anotacion/:matriculaId/:profesorId/:annoId/:colegioId/:cursoId', checkjwd, requiredScopes('create:anotacion'), _anotacion["default"].create);
  app.put('/api/anotacion/:anotacionId', checkjwd, requiredScopes('update:anotacion'), _anotacion["default"].modify);
  app.get('/api/colegio', checkjwd, requiredScopes('read:colegio'), _colegio["default"].list);
  app.get('/api/colegio/:regionId/:provincixId/:comunaId/:tipocolegioId/fk', checkjwd, requiredScopes('read:colegio'), _colegio["default"].getByFk);
  app.get('/api/colegio/:colegioId/pk', checkjwd, requiredScopes('read:colegio'), _colegio["default"].getByPk);
  app.post('/api/colegio/:regionId/:provincixId/:comunaId/:tipocolegioId', checkjwd, requiredScopes('create:colegio'), _colegio["default"].create);
  app.put('/api/colegio/:colegioId', checkjwd, requiredScopes('update:colegio'), _colegio["default"].modify);
  app.get('/api/tipocolegio', checkjwd, requiredScopes('read:tipocolegio'), _tipo["default"].list);
  app.post('/api/tipocolegio', checkjwd, requiredScopes('create:tipocolegio'), _tipo["default"].create);
  app.put('/api/tipocolegio/:tipocolegioId', checkjwd, requiredScopes('update:tipocolegio'), _tipo["default"].modify);
  app.get('/api/curso', checkjwd, requiredScopes('read:curso'), _curso["default"].list);
  app.get('/api/curso/:expr/search', checkjwd, requiredScopes('read:curso'), _curso["default"].bySearch);
  app.get('/api/curso/:colegioId/:annoId/fk', checkjwd, requiredScopes('read:curso'), _curso["default"].getByFk);
  app.get('/api/curso/:cursoId/pk', checkjwd, requiredScopes('read:curso'), _curso["default"].getByPk);
  app.post('/api/curso/:colegioId/:annoId', checkjwd, requiredScopes('create:curso'), _curso["default"].create);
  app.put('/api/curso/:cursoId', checkjwd, requiredScopes('update:curso'), _curso["default"].modify);
  app.get('/api/profesor', checkjwd, requiredScopes('read:profesor'), _profesor["default"].list);
  app.get('/api/profesor/:expr/search', checkjwd, requiredScopes('read:profesor'), _profesor["default"].bySearch);
  app.get('/api/profesor/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId/fk', checkjwd, requiredScopes('read:profesor'), _profesor["default"].getByFk);
  app.get('/api/profesor/:profesorId/pk', checkjwd, requiredScopes('read:profesor'), _profesor["default"].getByPk);
  app.post('/api/profesor/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId', checkjwd, requiredScopes('create:profesor'), _profesor["default"].create);
  app.put('/api/profesor/:profesorId', checkjwd, requiredScopes('update:profesor'), _profesor["default"].modify);
  app.get('/api/utp', checkjwd, requiredScopes('read:utp'), _utp["default"].list);
  app.get('/api/utp/:expr/search', checkjwd, requiredScopes('read:utp'), _utp["default"].bySearch);
  app.get('/api/utp/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId/fk', checkjwd, requiredScopes('read:utp'), _utp["default"].getByFk);
  app.get('/api/utp/:profesorId/pk', checkjwd, requiredScopes('read:utp'), _utp["default"].getByPk);
  app.post('/api/utp/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId', checkjwd, requiredScopes('create:utp'), _utp["default"].create);
  app.put('/api/utp/:utpId', checkjwd, requiredScopes('update:utp'), _utp["default"].modify);
  app.get('/api/asignaturaprofesor', checkjwd, requiredScopes('read:asignaturaprofesor'), _asignaturaprofesor["default"].list);
  app.get('/api/asignaturaprofesor/:profesorId/:asignaturaId/fk', checkjwd, requiredScopes('read:asignaturaprofesor'), _asignaturaprofesor["default"].getByFk);
  app.post('/api/asignaturaprofesor/:profesorId/:asignaturaId', checkjwd, requiredScopes('create:asignaturaprofesor'), _asignaturaprofesor["default"].create);
  app.put('/api/asignaturaprofesor/:asignaturaprofesorId', checkjwd, requiredScopes('update:asignaturaprofesor'), _asignaturaprofesor["default"].modify);
  app.get('/api/usuario', checkjwd, requiredScopes('read:usuario'), _usuario["default"].list);
  app.get('/api/usuario/:expr/search', checkjwd, requiredScopes('read:usuario'), _usuario["default"].bySearch);
  app.get('/api/usuario/:expr/email', checkjwd, requiredScopes('read:usuario'), _usuario["default"].byEmailSearch);
  app.get('/api/usuario/lastid', checkjwd, requiredScopes('read:usuario'), _usuario["default"].getLastId);
  app.get('/api/usuario/where', checkjwd, requiredScopes('read:usuario'), _usuario["default"].getPersonalInfo);
  app.get('/api/usuario/:tipousuarioId/fk', checkjwd, requiredScopes('read:usuario'), _usuario["default"].getByFk);
  app.get('/api/usuario/:tipousuarioId/:temaId/fk', checkjwd, requiredScopes('read:usuario'), _usuario["default"].getByFk);
  app.get('/api/usuario/:usuarioId/pk', checkjwd, requiredScopes('read:usuario'), _usuario["default"].getByPk);
  app.post('/api/usuario/:tipousuarioId/:temaId', checkjwd, requiredScopes('create:usuario'), _usuario["default"].create);
  app.put('/api/usuario/:usuarioId', checkjwd, requiredScopes('update:usuario'), _usuario["default"].modify);
  app.get('/api/tabla', checkjwd, requiredScopes('read:tabla'), _tabla["default"].list);
  app.post('/api/tabla', checkjwd, requiredScopes(['create:tabla']), _tabla["default"].create);
  app.put('/api/tabla/:tablaId', checkjwd, requiredScopes(['update:tabla']), _tabla["default"].modify);
  app.get('/api/inscripcioncolegio', checkjwd, requiredScopes('read:inscripcioncolegio'), _inscripcionColegio["default"].list);
  app.get('/api/inscripcioncolegio/:profesorId/:colegioId/:annoId/fk', checkjwd, requiredScopes('read:inscripcioncolegio'), _inscripcionColegio["default"].getByFk);
  app.get('/api/inscripcioncolegio/:colegioId/:annoId/profes', checkjwd, requiredScopes('read:inscripcioncolegio'), _inscripcionColegio["default"].getProfesores);
  app.get('/api/inscripcioncolegio/:colegioId/:annoId/profesPie', checkjwd, requiredScopes('read:inscripcioncolegio'), _inscripcionColegio["default"].getProfesoresPie);
  app.get('/api/inscripcioncolegio/:inscripcioncolegioId/pk', checkjwd, requiredScopes('read:inscripcioncolegio'), _inscripcionColegio["default"].getByPk);
  app.post('/api/inscripcioncolegio/:profesorId/:colegioId/:annoId', checkjwd, requiredScopes('create:inscripcioncolegio'), _inscripcionColegio["default"].create);
  app.put('/api/inscripcioncolegio/:inscripcioncolegioId', checkjwd, requiredScopes('update:inscripcioncolegio'), _inscripcionColegio["default"].modify);
  app.get('/api/horario', checkjwd, requiredScopes('read:horario'), _horario["default"].list);
  app.get('/api/horario/:annoId/:colegioId/:profesorId/:dixId/disponibilidad_hora', checkjwd, requiredScopes('read:horario'), _horario["default"].disponibilidadHora);
  app.get('/api/horario/:annoId/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:dixId/group', checkjwd, requiredScopes('read:horario'), _horario["default"].groupByFk);
  app.get('/api/horario/:annoId/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:dixId/fk', checkjwd, requiredScopes('read:horario'), _horario["default"].getByFk);
  app.post('/api/horario/:annoId/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:dixId', checkjwd, requiredScopes('create:horario'), _horario["default"].create);
  app.put('/api/horario/:horarioId', checkjwd, requiredScopes('update:horario'), _horario["default"].modify);
  app["delete"]('/api/horario/:horarioId', checkjwd, requiredScopes('delete:horario'), _horario["default"]["delete"]);
  app.get('/api/sexo', checkjwd, requiredScopes('read:sexo'), _sexo["default"].list);
  app.post('/api/sexo', checkjwd, requiredScopes('create:sexo'), _sexo["default"].create);
  app.put('/api/sexo/:sexoId', checkjwd, requiredScopes('update:sexo'), _sexo["default"].modify);
  app.get('/api/tema', checkjwd, requiredScopes('read:tema'), _tema["default"].list);
  app.post('/api/tema', checkjwd, requiredScopes('create:tema'), _tema["default"].create);
  app.put('/api/tema/:temaId', checkjwd, requiredScopes('update:tema'), _tema["default"].modify);
  app.get('/api/tipousuario', checkjwd, requiredScopes('read:tipousuario'), _tipousuario["default"].list);
  app.get('/api/tipousuario/:name/id', checkjwd, requiredScopes('read:tipousuario'), _tipousuario["default"].getId);
  app.post('/api/tipousuario', checkjwd, requiredScopes('create:tipousuario'), _tipousuario["default"].create);
  app.put('/api/tipousuario/:tipousuarioId', checkjwd, requiredScopes('update:tipousuario'), _tipousuario["default"].modify);
  app.get('/api/vinculo', checkjwd, requiredScopes('read:vinculo'), _vinculo["default"].list);
  app.post('/api/vinculo', checkjwd, requiredScopes('create:vinculo'), _vinculo["default"].create);
  app.put('/api/vinculo/:vinculoId', checkjwd, requiredScopes('update:vinculo'), _vinculo["default"].modify);
  app.get('/api/niveleducacional', checkjwd, requiredScopes('read:niveleducacional'), _nivel["default"].list);
  app.post('/api/niveleducacional', checkjwd, requiredScopes('create:niveleducacional'), _nivel["default"].create);
  app.put('/api/niveleducacional/:niveleducacionalId', checkjwd, requiredScopes('update:niveleducacional'), _nivel["default"].modify);
  app.get('/api/alumno', checkjwd, requiredScopes('read:alumno'), _alumno["default"].list);
  app.get('/api/alumno/:expr/search', checkjwd, requiredScopes('read:alumno'), _alumno["default"].bySearch);
  app.get('/api/alumno/:expr/rut', checkjwd, requiredScopes('read:alumno'), _alumno["default"].byRutSearch);
  app.get('/api/alumno/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId/fk', checkjwd, requiredScopes('read:alumno'), _alumno["default"].getByFk);
  app.get('/api/alumno/:alumnoId/pk', checkjwd, requiredScopes('read:alumno'), _alumno["default"].getByPk);
  app.post('/api/alumno/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId', checkjwd, requiredScopes('create:alumno'), _alumno["default"].create);
  app.put('/api/alumno/:alumnoId', checkjwd, requiredScopes('update:alumno'), _alumno["default"].modify);
  app.get('/api/apoderado', checkjwd, requiredScopes('read:apoderado'), _apoderado["default"].list);
  app.get('/api/apoderado/:expr/search', checkjwd, requiredScopes('read:apoderado'), _apoderado["default"].bySearch);
  app.get('/api/apoderado/:expr/rut', checkjwd, requiredScopes('read:apoderado'), _apoderado["default"].byRutSearch);
  app.get('/api/apoderado/:usuarioId/:niveleducacionalId/:sexoId/:regionId/:provincixId/:comunaId/fk', checkjwd, requiredScopes('read:apoderado'), _apoderado["default"].getByFk);
  app.get('/api/apoderado/:apoderadoId/pk', checkjwd, requiredScopes('read:apoderado'), _apoderado["default"].getByPk);
  app.post('/api/apoderado/:usuarioId/:niveleducacionalId/:sexoId/:regionId/:provincixId/:comunaId', checkjwd, requiredScopes('create:apoderado'), _apoderado["default"].create);
  app.put('/api/apoderado/:apoderadoId', checkjwd, requiredScopes('update:apoderado'), _apoderado["default"].modify);
  app.get('/api/asistencia', checkjwd, requiredScopes('read:asistencia'), _asistencia["default"].list);
  app.get('/api/asistencia/:matriculaId/:colegioId/:cursoId/:alumnoId/:annoId/:mesId/fk', checkjwd, requiredScopes('read:asistencia'), _asistencia["default"].getByFk);
  app.get('/api/asistencia/:colegioId/:cursoId/:annoId/:mesId/curso_dia', checkjwd, requiredScopes('read:asistencia'), _asistencia["default"].asistenciaCursoDia);
  app.get('/api/asistencia/:matriculaId/:colegioId/:cursoId/:alumnoId/:annoId/:mesId/presente', checkjwd, requiredScopes('read:asistencia'), _asistencia["default"].getPresente);
  app.get('/api/asistencia/:colegioId/:annoId/:mesId/totalesMesColegio', checkjwd, requiredScopes('read:asistencia'), _asistencia["default"].totalesMesColegio);
  app.post('/api/asistencia/:matriculaId/:colegioId/:cursoId/:alumnoId/:annoId/:mesId', checkjwd, requiredScopes('create:asistencia'), _asistencia["default"].create);
  app.post('/api/asistencia/:colegioId/:cursoId/:annoId/:mesId/populateMes', checkjwd, requiredScopes('create:asistencia'), _asistencia["default"].populateMes);
  app.post('/api/asistencia/:matriculaId/:colegioId/:cursoId/:alumnoId/:annoId/:mesId/findOrCreate', checkjwd, requiredScopes(['read:asistencia', 'create:asistencia']), _asistencia["default"].findOrCreate);
  app.put('/api/asistencia/:asistenciaId', checkjwd, requiredScopes('update:asistencia'), _asistencia["default"].modify);
  app["delete"]('/api/asistencia/:asistenciaId', checkjwd, requiredScopes('delete:asistencia'), _asistencia["default"]["delete"]);
  app.get('/api/controlasignatura', checkjwd, requiredScopes('read:controlasignatura'), _controlasignatura["default"].list);
  app.get('/api/controlasignatura/:colegioId/:cursoId/:asignaturaId/:profesorId/:horarioId/:annoId/:mesId/fk', checkjwd, requiredScopes('read:controlasignatura'), _controlasignatura["default"].getByFk);
  app.get('/api/controlasignatura/:colegioId/:cursoId/:asignaturaId/:profesorId/:horarioId/:annoId/:mesId/porDia', checkjwd, requiredScopes('read:controlasignatura'), _controlasignatura["default"].getPorDia);
  app.post('/api/controlasignatura/:colegioId/:cursoId/:asignaturaId/:profesorId/:profesorPieId/:horarioId/:annoId/:mesId', checkjwd, requiredScopes('create:controlasignatura'), _controlasignatura["default"].create);
  app.post('/api/controlasignatura/:colegioId/:cursoId/:annoId/populateDia', checkjwd, requiredScopes(['create:controlasignatura', 'read:feriado', 'read:horario']), _controlasignatura["default"].populateDia);
  app.put('/api/controlasignatura/:controlasignaturaId', checkjwd, requiredScopes('update:controlasignatura'), _controlasignatura["default"].modify);
  app["delete"]('/api/controlasignatura/:controlasignaturaId', checkjwd, requiredScopes('delete:controlasignatura'), _controlasignatura["default"]["delete"]);
  app.get('/api/registroactividad', checkjwd, requiredScopes('read:registroactividad'), _registroActividad["default"].list);
  app.get('/api/registroactividad/:colegioId/:cursoId/:asignaturaId/:asignaturaprofesorId/:profesorId/:horarioId/:annoId/:mesId/fk', checkjwd, requiredScopes('read:registroactividad'), _registroActividad["default"].getByFk);
  app.get('/api/registroactividad/:colegioId/:cursoId/:asignaturaId/:annoId/:mesId/registro_actividad_by_mes', checkjwd, requiredScopes('read:registroactividad'), _registroActividad["default"].getByMes);
  app.post('/api/registroactividad/:colegioId/:cursoId/:asignaturaId/:asignaturaprofesorId/:profesorId/:horarioId/:annoId/:mesId', checkjwd, requiredScopes('create:registroactividad'), _registroActividad["default"].create);
  app.post('/api/registroactividad/:colegioId/:cursoId/:asignaturaId/:annoId/:mesId/populate_mes', checkjwd, requiredScopes('create:registroactividad'), _registroActividad["default"].populateMes);
  app.put('/api/registroactividad/:registroactividadId', checkjwd, requiredScopes('update:registroactividad'), _registroActividad["default"].modify);
  app["delete"]('/api/registroactividad/:registroactividadId', checkjwd, requiredScopes('delete:registroactividad'), _registroActividad["default"]["delete"]);
  app.get('/api/tipoevaluacion', checkjwd, requiredScopes('read:tipoevaluacion'), _tipoevaluacion["default"].list);
  app.post('/api/tipoevaluacion', checkjwd, requiredScopes('create:tipoevaluacion'), _tipoevaluacion["default"].create);
  app.put('/api/tipoevaluacion/:tipoevaluacionId', checkjwd, requiredScopes('update:tipoevaluacion'), _tipoevaluacion["default"].modify);
  app.get('/api/ventana', checkjwd, requiredScopes('read:ventana'), _ventana["default"].list);
  app.get('/api/ventana/:colegioId/:tablaId/fk', checkjwd, requiredScopes('read:ventana'), _ventana["default"].getByFk);
  app.post('/api/ventana/:colegioId/:tablaId', checkjwd, requiredScopes('create:ventana'), _ventana["default"].create);
  app.put('/api/ventana/:ventanaId', checkjwd, requiredScopes('update:ventana'), _ventana["default"].modify);
  app.get('/api/matricula', checkjwd, requiredScopes('read:matricula'), _matricula["default"].list);
  app.get('/api/matricula/:colegioId/:cursoId/:apoderadoId/:alumnoId/:vinculoId/:annoId/fk', checkjwd, requiredScopes('read:matricula'), _matricula["default"].getByFk);
  app.get('/api/matricula/:matriculaId/pk', checkjwd, requiredScopes('read:matricula'), _matricula["default"].getByPk);
  app.get('/api/matricula/:colegioId/:cursoId/:annoId/lista_curso', checkjwd, requiredScopes('read:matricula'), _matricula["default"].listaDeCurso);
  app.get('/api/matricula/:colegioId/:cursoId/:annoId/lista_curso_nombres', checkjwd, requiredScopes('read:matricula'), _matricula["default"].listaDeCursoNombres);
  app.get('/api/matricula/:matriculaId/nombreCompleto', checkjwd, requiredScopes('read:matricula'), _matricula["default"].nombreCompleto);
  app.get('/api/matricula/:colegioId/:cursoId/:apoderadoId/:alumnoId/:vinculoId/:annoId/count', checkjwd, requiredScopes('read:matricula'), _matricula["default"].count);
  app.get('/api/matricula/:colegioId/:annoId/countCursos', checkjwd, requiredScopes('read:matricula'), _matricula["default"].countCursos);
  app.get('/api/matricula/:colegioId/:cursoId/:annoId/countHombresMujeres', checkjwd, requiredScopes('read:matricula'), _matricula["default"].countHombresMujeres);
  app.post('/api/matricula/:colegioId/:cursoId/:apoderadoId/:alumnoId/:vinculoId/:annoId', checkjwd, requiredScopes('create:matricula'), _matricula["default"].create);
  app.put('/api/matricula/:matriculaId', checkjwd, requiredScopes('update:matricula'), _matricula["default"].modify);
  app["delete"]('/api/matricula/:matriculaId', checkjwd, requiredScopes('delete:matricula'), _matricula["default"]["delete"]);
  app.get('/api/evaluacion', checkjwd, requiredScopes('read:evaluacion'), _evaluacion["default"].list);
  app.get('/api/evaluacion/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:annoId/:periodoId/:tipoevaluacionId/fk', checkjwd, requiredScopes('read:evaluacion'), _evaluacion["default"].getByFk);
  app.post('/api/evaluacion/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:annoId/:periodoId/:tipoevaluacionId', checkjwd, requiredScopes('create:evaluacion'), _evaluacion["default"].create);
  app.put('/api/evaluacion/:evaluacionId', checkjwd, requiredScopes('update:evaluacion'), _evaluacion["default"].modify);
  app.get('/api/nota', checkjwd, requiredScopes('read:nota'), _nota["default"].list);
  app.get('/api/nota/:annoId/:periodoId/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:matriculaId/:evaluacionId/fk', checkjwd, requiredScopes('read:nota'), _nota["default"].getByFk);
  app.post('/api/nota/:annoId/:periodoId/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:matriculaId/:evaluacionId', checkjwd, requiredScopes('create:nota'), _nota["default"].create);
  app.put('/api/nota/:notaId', checkjwd, requiredScopes('update:nota'), _nota["default"].modify);
  app.get('/api/mes', checkjwd, requiredScopes('read:mes'), _mes["default"].list);
  app.post('/api/mes', checkjwd, requiredScopes('create:mes'), _mes["default"].create);
  app.put('/api/mes/:mesId', checkjwd, requiredScopes('update:mes'), _mes["default"].modify);
  app.get('/api/feriado', checkjwd, requiredScopes('read:feriado'), _feriado["default"].list);
  app.get('/api/feriado/getAtDate', checkjwd, requiredScopes('read:feriado'), _feriado["default"].getAtDate);
  app.get('/api/feriado/getYearMonth', checkjwd, requiredScopes('read:feriado'), _feriado["default"].getYearMonth);
  app.get('/api/feriado/getInYear', checkjwd, requiredScopes('read:feriado'), _feriado["default"].getInYear);
  app.post('/api/feriado', checkjwd, requiredScopes('create:feriado'), _feriado["default"].create);
  app.put('/api/feriado/:feriadoId', checkjwd, requiredScopes('update:feriado'), _feriado["default"].modify);
  app["delete"]('/api/feriado/:feriadoId', checkjwd, requiredScopes('delete:feriado'), _feriado["default"]["delete"]);
  app.get('/api/resumennota',
  // checkjwd, requiredScopes('read:nota'),
  _resumennota["default"].list);
  app.get('/api/resumennota/:annoId/:periodoId/:colegioId/:cursoId/:asignaturacursoId/:matriculaId/fk',
  // checkjwd, requiredScopes('read:nota'),
  _resumennota["default"].getByFk);
  app.post('/api/resumennota/:annoId/:periodoId/:colegioId/:cursoId/:asignaturacursoId/:matriculaId',
  // checkjwd, requiredScopes('create:nota'),
  _resumennota["default"].create);
  app.put('/api/resumennota/:resumennotaId',
  // checkjwd, requiredScopes('update:nota'),
  _resumennota["default"].modify);
  app.get('/api/asignaturacurso',
  // checkjwd, requiredScopes('read:asignaturaprofesor'),
  _asignaturacurso["default"].list);
  app.get('/api/asignaturacurso/:annoId/:colegioId/:cursoId/:asignaturaId/fk',
  // checkjwd, requiredScopes('read:asignaturaprofesor'),
  _asignaturacurso["default"].getByFk);
  app.post('/api/asignaturacurso/:annoId/:colegioId/:cursoId/:asignaturaId',
  // checkjwd, requiredScopes('create:asignaturaprofesor'),
  _asignaturacurso["default"].create);
  app.put('/api/asignaturacurso/:asignaturacursoId',
  // checkjwd, requiredScopes('update:asignaturaprofesor'),
  _asignaturacurso["default"].modify);
  app.get('/api/cursoprofesor',
  // checkjwd, requiredScopes('read:asignaturaprofesor'),
  _cursoprofesor["default"].list);
  app.get('/api/cursoprofesor/:annoId/:colegioId/:cursoId/:profesorId/fk',
  // checkjwd, requiredScopes('read:asignaturaprofesor'),
  _cursoprofesor["default"].getByFk);
  app.post('/api/cursoprofesor/:annoId/:colegioId/:cursoId/:profesorId',
  // checkjwd, requiredScopes('create:asignaturaprofesor'),
  _cursoprofesor["default"].create);
  app.put('/api/cursoprofesor/:cursoprofesorId',
  // checkjwd, requiredScopes('update:asignaturaprofesor'),
  _cursoprofesor["default"].modify);
};
var _default = exports["default"] = appMapping;