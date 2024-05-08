export const Permission:any =  {
    /* Asistencia */
    Asistencia: {leer : 'profesor', editar: 'profesor' , crear: 'profesor' },
    ResumenAsistencia: {leer : 'profesor', editar: 'profesor' , crear: 'profesor' },
    /* Colegio */
    Colegio: {leer : 'profesor', editar: 'admin' , crear: 'admin' },
    AsistenteColegio:  { leer: 'profesor', editar: 'utp', crear:'utp' },
    Curso: { leer: 'profesor', editar: 'utp', crear: 'utp' },
    Asignatura: { leer: 'profesor', editar: 'utp', crear: 'utp' },
    HoraAsignada: { leer: 'profesor', editar: 'utp', crear: 'utp' },
    /* Alumno */
    Alumno: { leer: 'profesor', editar: 'utp', crear: 'utp' },
    EstadoAlumno: { leer: 'profesor', editar: 'utp', crear: 'utp' },
    Apoderado: { leer: 'profesor', editar: 'utp', crear: 'utp' },
    Anotacion: { leer: 'profesor', editar: 'profesor', crear:'profesor' },
    FichaAlumno: { leer: 'profesor' , editar: 'profesor' , crear: 'profesor'  },
    Matricula: { leer: 'profesor' , editar : 'utp' , crear: 'utp'},
    /* Profesor */
    Profesor: { leer : 'profesor', editar: 'utp', crear: 'utp' },
    AsignaturaProfesor: { leer: 'profesor', editar: 'utp', crear:'utp' },
    AsignaturaCurso: { leer: 'profesor', editar: 'utp', crear:'utp' },
    Evaluacion:  { leer: 'profesor', editar: 'utp', crear: 'utp'},
    Nota: {leer: 'profesor' ,editar: 'profesor', crear: 'profesor'},
    ResumenNota: {leer: 'profesor' ,editar: 'profesor', crear: 'profesor'},
    Horario: { leer: 'profesor', editar: 'utp', crear: 'utp' },
    HorasInscritas: { leer: 'profesor', editar: [], crear: [] },
    ControlAsignatura: {leer: 'profesor' ,editar: 'profesor', crear: 'profesor'},
    RegistroActividad: { leer: 'profesor', editar: 'profesor', crear : 'profesor' },
    Ventana: { leer : 'profesor' , editar : 'utp', crear : 'utp' },
    /* Procesos */
    MatriculaAlumno: { leer : 'utp' , editar : 'utp', crear : 'utp' },
    registroUsuario: { leer : 'utp' , editar : 'utp', crear : 'utp' },
    /* Admin */
    TipoUsuario: {leer : 'admin' , editar : 'admin', crear : 'admin'},
    Usuario: {leer : 'admin' , editar : 'admin', crear : 'admin'},
    Tabla: {leer : 'admin' , editar : 'admin', crear : 'admin'},
  }