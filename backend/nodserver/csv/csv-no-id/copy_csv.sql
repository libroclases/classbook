COPY "TipoUsuario"("nombre","descripcion","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/tipousuario.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Tema"("nombre","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/tema.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Usuario"("username","email","tipousuarioId","temaId","operativo","uid","secret","authIsSet","lastLogin","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/usuario_profesor.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Usuario"("username","email","tipousuarioId","temaId","operativo","uid","secret","authIsSet","lastLogin","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/usuario_alumno.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Usuario"("username","email","tipousuarioId","temaId","operativo","uid","secret","authIsSet","lastLogin","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/usuario_apoderado.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Usuario"("username","email","tipousuarioId","temaId","operativo","uid","secret","authIsSet","lastLogin","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/usuario_asistentecolegio.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Usuario"("username","email","tipousuarioId","temaId","operativo","uid","secret","authIsSet","lastLogin","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/usuario_admin.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Tabla"("nombre","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/tabla.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "TipoColegio"("nombre","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/tipocolegio.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Region"("nombre","larga","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/region.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Provincix"("nombre","regionId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/provincia.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Comuna"("nombre","regionId","provincixId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/comuna.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Anno"("nombre","numero","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/anno.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Mes"("numero","nombre","abreviatura","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/mes.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Dix"("nombre","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/dia.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Periodo"("nombre","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/periodo.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Asignatura"("nombre","tipocolegioId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/asignatura.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Sexo"("nombre","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/sexo.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Colegio"("nombre","telefono","rut","direccion","email","www","regionId","provincixId","comunaId","tipocolegioId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/colegio.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Curso"("nombre","profesor_jefe","colegioId","annoId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/curso.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "NivelEducacional"("nombre","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/niveleducacional.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Ventana"("dias","colegioId","tablaId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/ventana.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "TipoAsistente"("nombre","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/tipoasistente.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Profesor"("nombre","apellido1","apellido2","rut","direccion","celular","nacimiento","sexoId","usuarioId","regionId","provincixId","comunaId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/profesor.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "CursoProfesor"("annoId","colegioId","cursoId","asignaturaId","profesorId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/cursoprofesor.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "InscripcionColegio"("esPie","esUtp","profesorId","colegioId","annoId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/inscripcioncolegio.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "HoraAsignada"("numero","horario","colegioId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/horaasignada.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Alumno"("nombre","apellido1","apellido2","rut","direccion","celular","nacimiento","sexoId","usuarioId","regionId","provincixId","comunaId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/alumno.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Apoderado"("nombre","apellido1","apellido2","rut","direccion","celular","nacimiento","niveleducacionalId","usuarioId","sexoId","regionId","provincixId","comunaId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/apoderado.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "AsistenteColegio"("nombre","apellido1","apellido2","rut","celular","direccion","nacimiento","tipoasistenteId","usuarioId","sexoId","regionId","provincixId","comunaId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/asistentecolegio.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Admin"("nombre","apellido1","apellido2","rut","celular","direccion","nacimiento","usuarioId","sexoId","regionId","provincixId","comunaId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/administrador.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Horario"("hora","annoId","colegioId","cursoId","cursoprofesorId","dixId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/horario.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Vinculo"("nombre","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/vinculo.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Matricula"("nombre","procedencia","incorporacion","apoderadoId","alumnoId","colegioId","cursoId","annoId","vinculoId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/matricula.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Feriado"("nombre","fecha","lugar","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/feriado.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "ControlAsignatura"("inasistentesHombres","inasistentesMujeres","atrasos","observaciones","fecha","dia","hora","colegioId","cursoId","asignaturaId","profesorId","profesorPieId","horarioId","annoId","mesId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/controlasignatura.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "RegistroActividad"("descripcion","fecha","dia","horaInicial","numeroHoras","colegioId","cursoId","asignaturaId","profesorId","horarioId","annoId","mesId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/registroactividad.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "TipoEvaluacion"("nombre","descripcion","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/tipoevaluacion.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Evaluacion"("nombre","fecha","hora","ponderacion","annoId","periodoId","colegioId","cursoId","cursoprofesorId","tipoevaluacionId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/evaluacion.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Asistencia"("fecha","presente","dia","matriculaId","colegioId","cursoId","alumnoId","annoId","mesId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/asistencia.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "TipoEstado"("nombre","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/tipoestado.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "Nota"("nota","matriculaId","evaluacionId","annoId","periodoId","colegioId","cursoId","cursoprofesorId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/nota.csv' DELIMITER '|' csv HEADER NULL AS 'null';
COPY "EstadoAlumno"("fecha","matriculaId","tipoestadoId","colegioId","cursoId","annoId","alumnoId","createdAt","updatedAt") FROM '/var/lib/postgresql/csv/estadoalumno.csv' DELIMITER '|' csv HEADER NULL AS 'null';