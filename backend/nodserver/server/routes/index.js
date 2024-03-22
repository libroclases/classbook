const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

import Regiones from '../controllers/region';
import Provincixs from '../controllers/provincia';
import Comunas from '../controllers/comuna';
import Dixs from '../controllers/dia';
import Asignaturas from '../controllers/asignatura';
import AsignaturaProfesores from '../controllers/asignaturaprofesor';
import Colegios from '../controllers/colegio';
import Cursos from '../controllers/curso';
import Horarios from '../controllers/horario';
import Alumnos from '../controllers/alumno';
import Sexos from '../controllers/sexo';
import Vinculos from '../controllers/vinculo';
import Niveles from '../controllers/nivel';
import Profesores from '../controllers/profesor';
import Utps from '../controllers/utp';
import HorasAsignadas from '../controllers/horaasignada';
import Usuarios from '../controllers/usuario';
import Temas from '../controllers/tema';

import Tablas from '../controllers/tabla';

import InscripcionesColegio from '../controllers/inscripcion-colegio';
import Annos from '../controllers/anno';
import Periodos from '../controllers/periodo';
import Apoderados from '../controllers/apoderado';
import Asistencias from '../controllers/asistencia';
import Meses from '../controllers/mes';
import AsistenteColegios from '../controllers/asistentecolegio';
import ControlAsignaturas from '../controllers/controlasignatura';
import RegistroActividades from '../controllers/registro-actividad';
import TiposEvaluacion from '../controllers/tipoevaluacion';
import Evaluaciones from '../controllers/evaluacion';
import Notas from '../controllers/nota';
import TipoEstados from '../controllers/tipoestado';
import TipoAsistentes from '../controllers/tipoasistente';
import EstadoAlumnos from '../controllers/estadoalumno';
import Anotaciones from '../controllers/anotacion';
import TipoColegios from '../controllers/tipo';
import TipoUsuarios from '../controllers/tipousuario';
import Matriculas from '../controllers/matricula';
import Feriados from '../controllers/feriado';
import Ventanas from '../controllers/ventana';


  const checkjwd = auth({
    audience: 'https://libroclases.cl',
    issuerBaseURL: `https://dev-tupdibnrpuxah8p3.us.auth0.com/`,
  });


  let appMapping = null;
  
  const environment = process.env.NODE_ENV || 'development';

  console.log('environment',environment)

  appMapping = (app) => {
  
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the libroClases API!',
    }));

    app.get('/api/region',
      checkjwd, requiredScopes('read:region'),
      Regiones.list);
    app.post('/api/region',
      checkjwd, requiredScopes('create:region'),
      Regiones.create);
    app.put('/api/region/:regionId',
      checkjwd, requiredScopes('update:region'),
      Regiones.modify);
    app.get('/api/provincix',
      checkjwd, requiredScopes('read:provincix'),
      Provincixs.list);
    app.get('/api/provincix/:regionId/fk',
     checkjwd, requiredScopes('read:provincix'),
      Provincixs.getByFk);
    app.post('/api/provincix/:regionId',
      checkjwd, requiredScopes('create:provincix'),
      Provincixs.create);
    app.put('/api/provincix/:provincixId',
      checkjwd, requiredScopes('update:provincix'),
      Provincixs.modify);
    app.get('/api/comuna',
      checkjwd, requiredScopes('read:comuna'),
      Comunas.list);
    app.get('/api/comuna/:regionId/:provincixId/fk',
      checkjwd, requiredScopes('read:comuna'),
      Comunas.getByFk);
    app.post('/api/comuna/:regionId/:provincixId',
      checkjwd, requiredScopes('create:comuna'),
      Comunas.create);
    app.put('/api/comuna/:comunaId',
      checkjwd, requiredScopes('update:comuna'),
      Comunas.modify);
    app.get('/api/dix',
      checkjwd, requiredScopes('read:dix'),
      Dixs.list);
    app.post('/api/dix',
      checkjwd, requiredScopes('create:dix'),
      Dixs.create);
    app.put('/api/dix/:dixId',
      checkjwd, requiredScopes('update:dix'),
      Dixs.modify);
    app.get('/api/tipoestado',
      checkjwd, requiredScopes('read:tipoestado'),
      TipoEstados.list);
    app.post('/api/tipoestado',
      checkjwd, requiredScopes('create:tipoestado'),
      TipoEstados.create);
    app.put('/api/tipoestado/:tipoestadoId',
      checkjwd, requiredScopes('update:tipoestado'),
      TipoEstados.modify);  
    app.get('/api/tipoasistente',
      checkjwd, requiredScopes('read:tipoasistente'),
      TipoAsistentes.list);
    app.post('/api/tipoasistente',
      checkjwd, requiredScopes('create:tipoasistente'),
      TipoAsistentes.create);
    app.put('/api/tipoasistente/:tipoasistenteId',
      checkjwd, requiredScopes('update:tipoasistente'),
      TipoAsistentes.modify);
    app.get('/api/anno',
      checkjwd, requiredScopes('read:anno'),
      Annos.list);
    app.post('/api/anno',
      checkjwd, requiredScopes('create:anno'),
      Annos.create);
    app.put('/api/anno/:annoId',
      checkjwd, requiredScopes('update:anno'),
      Annos.modify);
    app.get('/api/periodo',
      checkjwd, requiredScopes('read:periodo'),
      Periodos.list);
    app.post('/api/periodo',
      checkjwd, requiredScopes('create:periodo'),
      Periodos.create);
    app.put('/api/periodo/:periodoId',
      checkjwd, requiredScopes('update:periodo'),
      Periodos.modify);
    app.get('/api/asignatura',
      checkjwd, requiredScopes('read:asignatura'),
      Asignaturas.list);
    app.get('/api/asignatura/:tipocolegioId/fk',
      checkjwd, requiredScopes('read:asignatura'),
      Asignaturas.getByFk)
    app.get('/api/asignatura/:colegioId/asignatura_por_colegio',
      checkjwd, requiredScopes(['read:asignatura', 'read:colegio']),
      Asignaturas.getByColegio)
    app.post('/api/asignatura/:tipocolegioId',
      checkjwd, requiredScopes('create:asignatura'),
      Asignaturas.create);
    app.put('/api/asignatura/:asignaturaId',
      checkjwd, requiredScopes('update:asignatura'),
      Asignaturas.modify);
      app.get('/api/asistentecolegio',
      checkjwd, requiredScopes('read:asistentecolegio'),
      AsistenteColegios.list);
    app.get('/api/asistentecolegio/:expr/search',
      checkjwd, requiredScopes('read:asistentecolegio'),
      AsistenteColegios.bySearch);
    app.get('/api/asistentecolegio/:tipoasistenteId/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId/fk',
      checkjwd, requiredScopes('read:asistentecolegio'),
      AsistenteColegios.getByFk)
    app.get('/api/asistentecolegio/:asistentecolegioId/pk',
      checkjwd, requiredScopes('read:asistentecolegio'),
      AsistenteColegios.getByPk);
    app.post('/api/asistentecolegio/:tipoasistenteId/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId',
      checkjwd, requiredScopes('create:asistentecolegio'),
      AsistenteColegios.create);
    app.put('/api/asistentecolegio/:asistentecolegioId',
      checkjwd, requiredScopes('update:asistentecolegio'),
      AsistenteColegios.modify);  
   app.get('/api/horaasignada',
      checkjwd, requiredScopes('read:horaasignada'), 
      HorasAsignadas.list);
    app.get('/api/horaasignada/:colegioId/fk',
      checkjwd, requiredScopes('read:horaasignada'),
      HorasAsignadas.getByFk);
    app.post('/api/horaasignada/:colegioId',
      checkjwd, requiredScopes('create:horaasignada'),
      HorasAsignadas.create);
     app.put('/api/horaasignada/:horaasignadaId',
      checkjwd, requiredScopes('update:horaasignada'),
      HorasAsignadas.modify);
    app.get('/api/estadoalumno',
      checkjwd, requiredScopes('read:estadoalumno'),
      EstadoAlumnos.list);
    app.get('/api/estadoalumno/:alumnoId/:matriculaId/:tipoestadoId/fk',
      checkjwd, requiredScopes('read:estadoalumno'),
      EstadoAlumnos.getByFk);
    app.post('/api/estadoalumno/:alumnoId/:matriculaId/:tipoestadoId',
      checkjwd, requiredScopes('create:estadoalumno'),
      EstadoAlumnos.create);
    app.put('/api/estadoalumno/:estadoalumnoId',
      checkjwd, requiredScopes('update:estadoalumno'),
      EstadoAlumnos.modify);
    app.get('/api/anotacion',
      checkjwd, requiredScopes('read:anotacion'),
      Anotaciones.list);
    app.get('/api/anotacion/:matriculaId/:profesorId/:annoId/:colegioId/:cursoId/fk',
      checkjwd, requiredScopes('read:anotacion'), 
      Anotaciones.getByFk);
    app.get('/api/anotacion/:anotacionId/pk',
      checkjwd, requiredScopes('read:anotacion'),
      Anotaciones.getByPk);
    app.post('/api/anotacion/:matriculaId/:profesorId/:annoId/:colegioId/:cursoId',
      checkjwd, requiredScopes('create:anotacion'),
      Anotaciones.create);
    app.put('/api/anotacion/:anotacionId',
      checkjwd, requiredScopes('update:anotacion'),
      Anotaciones.modify);
    app.get('/api/colegio',
      checkjwd, requiredScopes('read:colegio'),
      Colegios.list);
    app.get('/api/colegio/:regionId/:provincixId/:comunaId/:tipocolegioId/fk',
      checkjwd, requiredScopes('read:colegio'),
      Colegios.getByFk);
    app.get('/api/colegio/:colegioId/pk',
      checkjwd, requiredScopes('read:colegio'),
      Colegios.getByPk);
    app.post('/api/colegio/:regionId/:provincixId/:comunaId/:tipocolegioId',
      checkjwd, requiredScopes('create:colegio'),
      Colegios.create);
    app.put('/api/colegio/:colegioId',
      checkjwd, requiredScopes('update:colegio'),
      Colegios.modify);
    app.get('/api/tipocolegio',
      checkjwd, requiredScopes('read:tipocolegio'),
      TipoColegios.list);
    app.post('/api/tipocolegio',
      checkjwd, requiredScopes('create:tipocolegio'),
      TipoColegios.create);
    app.put('/api/tipocolegio/:tipocolegioId',
      checkjwd, requiredScopes('update:tipocolegio'),
      TipoColegios.modify);    
    app.get('/api/curso',
      checkjwd, requiredScopes('read:curso'),
      Cursos.list);
    app.get('/api/curso/:expr/search',
      checkjwd, requiredScopes('read:curso'),
      Cursos.bySearch);  
    app.get('/api/curso/:colegioId/:annoId/fk',
      checkjwd, requiredScopes('read:curso'),
      Cursos.getByFk);
    app.get('/api/curso/:cursoId/pk',
      checkjwd, requiredScopes('read:curso'),
      Cursos.getByPk);
    app.post('/api/curso/:colegioId/:annoId',
      checkjwd, requiredScopes('create:curso'),
      Cursos.create);
    app.put('/api/curso/:cursoId',
      checkjwd, requiredScopes('update:curso'),
      Cursos.modify);
    app.get('/api/profesor',
      checkjwd, requiredScopes('read:profesor'),
      Profesores.list);
    app.get('/api/profesor/:expr/search',
      checkjwd, requiredScopes('read:profesor'),
      Profesores.bySearch);
    app.get('/api/profesor/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId/fk',
      checkjwd, requiredScopes('read:profesor'),
      Profesores.getByFk);
    app.get('/api/profesor/:profesorId/pk',
      checkjwd, requiredScopes('read:profesor'),
      Profesores.getByPk);    
    app.post('/api/profesor/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId',
      checkjwd, requiredScopes('create:profesor'),
      Profesores.create);
    app.put('/api/profesor/:profesorId',
      checkjwd, requiredScopes('update:profesor'),
      Profesores.modify);
    app.get('/api/utp',
      checkjwd, requiredScopes('read:utp'),
      Utps.list);
    app.get('/api/utp/:expr/search',
      checkjwd, requiredScopes('read:utp'),
      Utps.bySearch);
    app.get('/api/utp/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId/fk',
      checkjwd, requiredScopes('read:utp'),
      Utps.getByFk);
    app.get('/api/utp/:profesorId/pk',
      checkjwd, requiredScopes('read:utp'),
      Utps.getByPk);    
    app.post('/api/utp/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId',
      checkjwd, requiredScopes('create:utp'),
      Utps.create);
    app.put('/api/utp/:utpId',
      checkjwd, requiredScopes('update:utp'),
      Utps.modify);
    app.get('/api/asignaturaprofesor',
      checkjwd, requiredScopes('read:asignaturaprofesor'),
      AsignaturaProfesores.list);
    app.get('/api/asignaturaprofesor/:profesorId/:asignaturaId/fk',
      checkjwd, requiredScopes('read:asignaturaprofesor'),
      AsignaturaProfesores.getByFk);
    app.post('/api/asignaturaprofesor/:profesorId/:asignaturaId',
      checkjwd, requiredScopes('create:asignaturaprofesor'),
      AsignaturaProfesores.create);
    app.put('/api/asignaturaprofesor/:asignaturaprofesorId',
      checkjwd, requiredScopes('update:asignaturaprofesor'),
      AsignaturaProfesores.modify);
    app.get('/api/usuario',
      checkjwd, requiredScopes('read:usuario'),
      Usuarios.list);
    app.get('/api/usuario/:expr/search',
      checkjwd, requiredScopes('read:usuario'),
      Usuarios.bySearch);
    app.get('/api/usuario/:expr/email',
      checkjwd, requiredScopes('read:usuario'),
      Usuarios.byEmailSearch);
    app.get('/api/usuario/lastid',
      checkjwd, requiredScopes('read:usuario'),
      Usuarios.getLastId); 
    app.get('/api/usuario/where',
      checkjwd, requiredScopes('read:usuario'),
      Usuarios.getPersonalInfo);   
    app.get('/api/usuario/:tipousuarioId/fk',
      checkjwd, requiredScopes('read:usuario'),
      Usuarios.getByFk);
    app.get('/api/usuario/:tipousuarioId/:temaId/fk',
      checkjwd, requiredScopes('read:usuario'),
      Usuarios.getByFk);  
    app.get('/api/usuario/:usuarioId/pk',
      checkjwd, requiredScopes('read:usuario'),
      Usuarios.getByPk);
    app.post('/api/usuario/:tipousuarioId/:temaId',
      checkjwd, requiredScopes('create:usuario'),
      Usuarios.create);
    app.put('/api/usuario/:usuarioId',
      checkjwd, requiredScopes('update:usuario'),
      Usuarios.modify)
    app.get('/api/tabla',
      checkjwd, requiredScopes('read:tabla'),
      Tablas.list);
    app.post('/api/tabla',
      checkjwd, requiredScopes(['create:tabla']),
      Tablas.create);
    app.put('/api/tabla/:tablaId',
      checkjwd, requiredScopes(['update:tabla']),
      Tablas.modify);
    app.get('/api/inscripcioncolegio',
      checkjwd, requiredScopes('read:inscripcioncolegio'),
      InscripcionesColegio.list);
    app.get('/api/inscripcioncolegio/:profesorId/:colegioId/:annoId/fk',
      checkjwd, requiredScopes('read:inscripcioncolegio'),
      InscripcionesColegio.getByFk);
    app.get('/api/inscripcioncolegio/:colegioId/:annoId/profes',
      checkjwd, requiredScopes('read:inscripcioncolegio'),
      InscripcionesColegio.getProfesores);
    app.get('/api/inscripcioncolegio/:colegioId/:annoId/profesPie',
      checkjwd, requiredScopes('read:inscripcioncolegio'),
      InscripcionesColegio.getProfesoresPie);
    app.get('/api/inscripcioncolegio/:inscripcioncolegioId/pk',
      checkjwd, requiredScopes('read:inscripcioncolegio'),
      InscripcionesColegio.getByPk);
    app.post('/api/inscripcioncolegio/:profesorId/:colegioId/:annoId',
      checkjwd, requiredScopes('create:inscripcioncolegio'),
      InscripcionesColegio.create);
    app.put('/api/inscripcioncolegio/:inscripcioncolegioId',
      checkjwd, requiredScopes('update:inscripcioncolegio'),
      InscripcionesColegio.modify);
    app.get('/api/horario',
      checkjwd, requiredScopes('read:horario'),
      Horarios.list);
    app.get('/api/horario/:annoId/:colegioId/:profesorId/:dixId/disponibilidad_hora',
      checkjwd, requiredScopes('read:horario'),
      Horarios.disponibilidadHora);
    app.get('/api/horario/:annoId/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:dixId/group',
      checkjwd, requiredScopes('read:horario'),
      Horarios.groupByFk);
    app.get('/api/horario/:annoId/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:dixId/fk',
      checkjwd, requiredScopes('read:horario'),
      Horarios.getByFk);
    app.post('/api/horario/:annoId/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:dixId',
      checkjwd, requiredScopes('create:horario'),
      Horarios.create);
    app.put('/api/horario/:horarioId',
      checkjwd, requiredScopes('update:horario'),
      Horarios.modify);
    app.delete('/api/horario/:horarioId',
      checkjwd, requiredScopes('delete:horario'),
      Horarios.delete);
    app.get('/api/sexo',
      checkjwd, requiredScopes('read:sexo'),
      Sexos.list);
    app.post('/api/sexo',
      checkjwd, requiredScopes('create:sexo'),
      Sexos.create);
    app.put('/api/sexo/:sexoId',
      checkjwd, requiredScopes('update:sexo'),
      Sexos.modify);
    app.get('/api/tema',
      checkjwd, requiredScopes('read:tema'),
      Temas.list);
    app.post('/api/tema',
    checkjwd, requiredScopes('create:tema'),
      Temas.create);
    app.put('/api/tema/:temaId',
      checkjwd, requiredScopes('update:tema'),
      Temas.modify);
    app.get('/api/tipousuario',
      checkjwd, requiredScopes('read:tipousuario'),
      TipoUsuarios.list);
    app.get('/api/tipousuario/:name/id',
      checkjwd, requiredScopes('read:tipousuario'),
      TipoUsuarios.getId);
    app.post('/api/tipousuario',
      checkjwd, requiredScopes('create:tipousuario'),
      TipoUsuarios.create);
    app.put('/api/tipousuario/:tipousuarioId',
      checkjwd, requiredScopes('update:tipousuario'),
      TipoUsuarios.modify);
    app.get('/api/vinculo',
      checkjwd, requiredScopes('read:vinculo'),
      Vinculos.list);
    app.post('/api/vinculo',
      checkjwd, requiredScopes('create:vinculo'),
      Vinculos.create);
    app.put('/api/vinculo/:vinculoId',
      checkjwd, requiredScopes('update:vinculo'),
      Vinculos.modify);
    app.get('/api/niveleducacional',
      checkjwd, requiredScopes('read:niveleducacional'),
      Niveles.list);
    app.post('/api/niveleducacional',
      checkjwd, requiredScopes('create:niveleducacional'),
      Niveles.create);
    app.put('/api/niveleducacional/:niveleducacionalId',
      checkjwd, requiredScopes('update:niveleducacional'),
      Niveles.modify);
    app.get('/api/alumno',
      checkjwd, requiredScopes('read:alumno'),
      Alumnos.list);
    app.get('/api/alumno/:expr/search',
      checkjwd, requiredScopes('read:alumno'),
      Alumnos.bySearch);
    app.get('/api/alumno/:expr/rut',
      checkjwd, requiredScopes('read:alumno'),
      Alumnos.byRutSearch);
    app.get('/api/alumno/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId/fk',
      checkjwd, requiredScopes('read:alumno'),
      Alumnos.getByFk);
    app.get('/api/alumno/:alumnoId/pk',
      checkjwd, requiredScopes('read:alumno'),
      Alumnos.getByPk);
    app.post('/api/alumno/:usuarioId/:sexoId/:regionId/:provincixId/:comunaId',
      checkjwd, requiredScopes('create:alumno'),
      Alumnos.create);
    app.put('/api/alumno/:alumnoId',
      checkjwd, requiredScopes('update:alumno'),
      Alumnos.modify);  
    app.get('/api/apoderado',
      checkjwd, requiredScopes('read:apoderado'),
      Apoderados.list);
    app.get('/api/apoderado/:expr/search',
      checkjwd, requiredScopes('read:apoderado'),
      Apoderados.bySearch);
    app.get('/api/apoderado/:expr/rut',
      checkjwd, requiredScopes('read:apoderado'),
      Apoderados.byRutSearch);
    app.get('/api/apoderado/:usuarioId/:niveleducacionalId/:sexoId/:regionId/:provincixId/:comunaId/fk',
      checkjwd, requiredScopes('read:apoderado'),
      Apoderados.getByFk);
    app.get('/api/apoderado/:apoderadoId/pk',
      checkjwd, requiredScopes('read:apoderado'),
      Apoderados.getByPk);
    app.post('/api/apoderado/:usuario/:niveleducacionalId/:sexoId/:regionId/:provincixId/:comunaId',
      checkjwd, requiredScopes('create:apoderado'),
      Apoderados.create);
    app.put('/api/apoderado/:apoderadoId',
      checkjwd, requiredScopes('update:apoderado'),
      Apoderados.modify);
    app.get('/api/asistencia',
      checkjwd, requiredScopes('read:asistencia'),
      Asistencias.list);
    app.get('/api/asistencia/:matriculaId/:colegioId/:cursoId/:alumnoId/:annoId/:mesId/fk',
      checkjwd, requiredScopes('read:asistencia'),
      Asistencias.getByFk);
    app.get('/api/asistencia/:colegioId/:cursoId/:annoId/:mesId/curso_dia',
      checkjwd, requiredScopes('read:asistencia'),
      Asistencias.asistenciaCursoDia);
    app.get('/api/asistencia/:matriculaId/:colegioId/:cursoId/:alumnoId/:annoId/:mesId/presente',
      checkjwd, requiredScopes('read:asistencia'),
      Asistencias.getPresente);
    app.get('/api/asistencia/:colegioId/:annoId/:mesId/totalesMesColegio',
      checkjwd, requiredScopes('read:asistencia'),
      Asistencias.totalesMesColegio);
    app.post('/api/asistencia/:matriculaId/:colegioId/:cursoId/:alumnoId/:annoId/:mesId',
      checkjwd, requiredScopes('create:asistencia'),
      Asistencias.create);
    app.post('/api/asistencia/:colegioId/:cursoId/:annoId/:mesId/populateMes',
      checkjwd, requiredScopes('create:asistencia'),
      Asistencias.populateMes);
    app.post('/api/asistencia/:matriculaId/:colegioId/:cursoId/:alumnoId/:annoId/:mesId/findOrCreate',
      checkjwd, requiredScopes(['read:asistencia', 'create:asistencia']),   
      Asistencias.findOrCreate);
    app.put('/api/asistencia/:asistenciaId',
      checkjwd, requiredScopes('update:asistencia'),
      Asistencias.modify);
    app.delete('/api/asistencia/:asistenciaId',
      checkjwd, requiredScopes('delete:asistencia'),
      Asistencias.delete);
    app.get('/api/controlasignatura',
      checkjwd, requiredScopes('read:controlasignatura'),
      ControlAsignaturas.list);
    app.get('/api/controlasignatura/:colegioId/:cursoId/:asignaturaId/:profesorId/:horarioId/:annoId/:mesId/fk',
      checkjwd, requiredScopes('read:controlasignatura'),
      ControlAsignaturas.getByFk);
    app.get('/api/controlasignatura/:colegioId/:cursoId/:asignaturaId/:profesorId/:horarioId/:annoId/:mesId/porDia',
      checkjwd, requiredScopes('read:controlasignatura'),
      ControlAsignaturas.getPorDia);
    app.post('/api/controlasignatura/:colegioId/:cursoId/:asignaturaId/:profesorId/:profesorPieId/:horarioId/:annoId/:mesId',
      checkjwd, requiredScopes('create:controlasignatura'),
      ControlAsignaturas.create);
    app.post('/api/controlasignatura/:colegioId/:cursoId/:annoId/populateDia',
      checkjwd,requiredScopes(['create:controlasignatura', 'read:feriado', 'read:horario']),
      ControlAsignaturas.populateDia);
    app.put('/api/controlasignatura/:controlasignaturaId',
      checkjwd, requiredScopes('update:controlasignatura'),
      ControlAsignaturas.modify);
    app.delete('/api/controlasignatura/:controlasignaturaId',
      checkjwd, requiredScopes('delete:controlasignatura'),
      ControlAsignaturas.delete);
    app.get('/api/registroactividad',
      checkjwd, requiredScopes('read:registroactividad'),
      RegistroActividades.list);
    app.get('/api/registroactividad/:colegioId/:cursoId/:asignaturaId/:asignaturaprofesorId/:profesorId/:horarioId/:annoId/:mesId/fk',
      checkjwd, requiredScopes('read:registroactividad'),
      RegistroActividades.getByFk);
    app.get('/api/registroactividad/:colegioId/:cursoId/:asignaturaId/:annoId/:mesId/registro_actividad_by_mes',
      checkjwd, requiredScopes('read:registroactividad'),
      RegistroActividades.getByMes);
    app.post('/api/registroactividad/:colegioId/:cursoId/:asignaturaId/:asignaturaprofesorId/:profesorId/:horarioId/:annoId/:mesId',
      checkjwd, requiredScopes('create:registroactividad'),
      RegistroActividades.create);
    app.post('/api/registroactividad/:colegioId/:cursoId/:asignaturaId/:annoId/:mesId/populate_mes',
      checkjwd, requiredScopes('create:registroactividad'),
      RegistroActividades.populateMes);
    app.put('/api/registroactividad/:registroactividadId',
      checkjwd, requiredScopes('update:registroactividad'),
      RegistroActividades.modify);
    app.delete('/api/registroactividad/:registroactividadId',
      checkjwd, requiredScopes('delete:registroactividad'),
      RegistroActividades.delete);
    app.get('/api/tipoevaluacion',
      checkjwd, requiredScopes('read:tipoevaluacion'),
      TiposEvaluacion.list);
    app.post('/api/tipoevaluacion',
      checkjwd, requiredScopes('create:tipoevaluacion'),
      TiposEvaluacion.create);
    app.put('/api/tipoevaluacion/:tipoevaluacionId',
      checkjwd, requiredScopes('update:tipoevaluacion'),
      TiposEvaluacion.modify);
    app.get('/api/ventana',
      checkjwd, requiredScopes('read:ventana'),
      Ventanas.list);
    app.get('/api/ventana/:colegioId/:tablaId/fk',
      checkjwd, requiredScopes('read:ventana'),
      Ventanas.getByFk);
    app.post('/api/ventana/:colegioId/:tablaId',
      checkjwd, requiredScopes('create:ventana'),
      Ventanas.create);
    app.put('/api/ventana/:ventanaId',
      checkjwd, requiredScopes('update:ventana'),
      Ventanas.modify); 
    app.get('/api/matricula',
      checkjwd, requiredScopes('read:matricula'),
      Matriculas.list);
    app.get('/api/matricula/:colegioId/:cursoId/:apoderadoId/:alumnoId/:vinculoId/:annoId/fk',
      checkjwd, requiredScopes('read:matricula'),
      Matriculas.getByFk);
    app.get('/api/matricula/:matriculaId/pk',
      checkjwd, requiredScopes('read:matricula'),
      Matriculas.getByPk);
    app.get('/api/matricula/:colegioId/:cursoId/:annoId/lista_curso',
      checkjwd, requiredScopes('read:matricula'),
      Matriculas.listaDeCurso);
    app.get('/api/matricula/:colegioId/:cursoId/:annoId/lista_curso_nombres',
      checkjwd, requiredScopes('read:matricula'),
      Matriculas.listaDeCursoNombres);
    app.get('/api/matricula/:matriculaId/nombreCompleto',
      checkjwd, requiredScopes('read:matricula'),
      Matriculas.nombreCompleto);
    app.get('/api/matricula/:colegioId/:cursoId/:apoderadoId/:alumnoId/:vinculoId/:annoId/count',
      checkjwd, requiredScopes('read:matricula'),
      Matriculas.count);
    app.get('/api/matricula/:colegioId/:annoId/countCursos',
      checkjwd, requiredScopes('read:matricula'),
      Matriculas.countCursos);
    app.get('/api/matricula/:colegioId/:cursoId/:annoId/countHombresMujeres',
      checkjwd, requiredScopes('read:matricula'),
      Matriculas.countHombresMujeres);
    app.post('/api/matricula/:colegioId/:cursoId/:apoderadoId/:alumnoId/:vinculoId/:annoId',
      checkjwd, requiredScopes('create:matricula'),
      Matriculas.create);
    app.put('/api/matricula/:matriculaId',
      checkjwd, requiredScopes('update:matricula'),
      Matriculas.modify);
    app.delete('/api/matricula/:matriculaId',
      checkjwd, requiredScopes('delete:matricula'),
      Matriculas.delete);
    app.get('/api/evaluacion',
      checkjwd, requiredScopes('read:evaluacion'),
      Evaluaciones.list);
    app.get('/api/evaluacion/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:annoId/:periodoId/:tipoevaluacionId/fk',
      checkjwd, requiredScopes('read:evaluacion'),
      Evaluaciones.getByFk);
    app.post('/api/evaluacion/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:annoId/:periodoId/:tipoevaluacionId',
      checkjwd, requiredScopes('create:evaluacion'),
      Evaluaciones.create);
    app.put('/api/evaluacion/:evaluacionId',
      checkjwd, requiredScopes('update:evaluacion'),
      Evaluaciones.modify);
    app.get('/api/nota',
      checkjwd, requiredScopes('read:nota'),
      Notas.list);
    app.get('/api/nota/:annoId/:periodoId/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:matriculaId/:evaluacionId/fk',
      checkjwd, requiredScopes('read:nota'),
      Notas.getByFk);
    app.post('/api/nota/:annoId/:periodoId/:colegioId/:cursoId/:profesorId/:asignaturaprofesorId/:matriculaId/:evaluacionId',
      checkjwd, requiredScopes('create:nota'),
      Notas.create);
    app.put('/api/nota/:notaId',
      checkjwd, requiredScopes('update:nota'),
      Notas.modify);
    app.get('/api/mes',
      checkjwd, requiredScopes('read:mes'),
      Meses.list);
    app.post('/api/mes',
      checkjwd, requiredScopes('create:mes'),
      Meses.create);
    app.put('/api/mes/:mesId',
      checkjwd, requiredScopes('update:mes'),
      Meses.modify);
      app.get('/api/feriado',
      checkjwd, requiredScopes('read:feriado'),
      Feriados.list);
    app.get('/api/feriado/getAtDate',
      checkjwd, requiredScopes('read:feriado'),
      Feriados.getAtDate);
    app.get('/api/feriado/getYearMonth',
      checkjwd, requiredScopes('read:feriado'),
      Feriados.getYearMonth);
    app.get('/api/feriado/getInYear',
      checkjwd, requiredScopes('read:feriado'),
      Feriados.getInYear);
    app.post('/api/feriado',
      checkjwd, requiredScopes('create:feriado'),
      Feriados.create);
    app.put('/api/feriado/:feriadoId',
      checkjwd, requiredScopes('update:feriado'),
      Feriados.modify);
    app.delete('/api/feriado/:feriadoId',
      checkjwd, requiredScopes('delete:feriado'),
      Feriados.delete);
  
  };


  
export default appMapping;
