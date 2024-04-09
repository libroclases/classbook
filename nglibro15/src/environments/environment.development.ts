// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Validators } from '@angular/forms';
import {
  numberString,
  stringString,
  stringStringPair,
} from '../app/interfaces/generic.interface';
import { emailValidator } from '../app/shared/directives/email-validator/email-validator.directive';
// import { horaValidator } from "src/app/shared/directives/hora-validator.directive";
import { rutValidator } from '../app/shared/directives/rut-validator/rut-validator.directive';

// --------------------------------------------------------------
// Auth0 permissions
const tablesArray = [
  'alumno',
  'anno',
  'anotacion',
  'apoderado',
  'asignatura',
  'asignaturaprofesor',
  'cursoprofesor',
  'asignaturacurso',
  'asistencia',
  'asistentecolegio',
  'colegio',
  'comuna',
  'controlasignatura',
  'curso',
  'dix',
  'estadoalumno',
  'evaluacion',
  'feriado',
  'horaasignada',
  'horario',
  'inscripcioncolegio',
  'matricula',
  'mes',
  'niveleducacional',
  'nota',
  'periodo',
  'profesor',
  'provincix',
  'region',
  'registroactividad',
  'resumennota',
  'sexo',
  'tabla',
  'tema',
  'tipoasistente',
  'tipocolegio',
  'tipoestado',
  'tipoevaluacion',
  'tipousuario',
  'usuario',
  'utp',
  'ventana',
  'vinculo',
];
const permissions = ['openid', 'profile', 'email'];
tablesArray.forEach((table) => {
  permissions.push(`read:${table}`);
  permissions.push(`create:${table}`);
  permissions.push(`update:${table}`);
});
permissions.push('delete:horario');
permissions.push('delete:asistencia');
permissions.push('delete:controlasignatura');
permissions.push('delete:matricula');
permissions.push('delete:feriado');
// --------------------------------------------------------------

export const environment = {
  production: false,
  apiUrl: 'http://localhost',
  apiKey: 'devKey',
  userinfo: {},
  opacity: '93%',

  auth0: {
    domain: 'dev-tupdibnrpuxah8p3.us.auth0.com',
    clientId: 'oW9EH9gLFZFovbTIEaafmVNwg55iCGim',
    callbackUrl: 'http://localhost/home',
    // redirectUri: window.location.origin,
    authorizationParams: {
      redirect_uri: window.location.origin,
      // Request this audience at user authentication time
      audience: 'https://libroclases.cl',
      scope: permissions.join(' '),
    },
  },

  api: {
    serverUrl: 'http://localhost:3000',
  },
  cabecera: {
    banner_height: 100, menu_height: 62, margen_superior_tabla: 150
  },
  colors: {
    azul: {
      color: 'blue',
      lineal: 'linear-gradient(to right, #4880EC, #019CAD)',
      menu: '#e3e4f3',
      colorMenuButton: '#059bb0',
      pagination: '#e2e2eb',
      bodybgcolor: 'rgb(242,242,248)', // rgb(238, 238, 248)}
      tablehead: 'rgb(44,161,213)',
      bgmodal: '#0D6EFD',
      modalbutton: 'rgb(69, 130, 233)',
    },

    verde: {
      color: 'green',
      lineal: 'linear-gradient(to right, #38B15C,#76FA91)',
      menu: '#dcf3dd',
      colorMenuButton: 'rgb(82, 205, 145)',
      pagination: '#dcebe4',
      bodybgcolor: 'rgb(242, 248, 242)', // rgb(232, 248, 240)
      tablehead: 'lightgreen',
      bgmodal: 'lightgreen',
      modalbutton: 'rgb(82, 205, 145)',
    },

    naranjo: {
      color: 'orange',
      lineal: 'linear-gradient(to right, #ffb505,#ffd966)',
      menu: '#FFE7C1',
      colorMenuButton: 'orange',
      pagination: '#f2e6d3',
      bodybgcolor: 'rgb(255, 242, 222)',
      tablehead:  'rgb(255,212,96)',
      bgmodal: 'orange',
      modalbutton: 'orange',
    },
  },
  photo: {
    azul: 'url(assets/images/fondo-azul2.png)',
    verde: 'url(assets/images/fondo_verde.jpeg)',
    naranjo: 'url(assets/images/fondo_naranjo.jpg)',
  },
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

export const fullDaysOfWeek = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sábado',
];
export const laboralDaysOfWeek = [
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  ['Sabado'],
];
export const fullMonths = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];
export const yearTable = 'anno';
export const monthTable = 'mes';
export const dayOfWeekTable = 'dix';
// --------------------------------------------------
//       ForeignKeysService

export const fKeysByTable: { [key: string]: string[] } = {
  region: [],
  provincix: ['region'],
  comuna: ['region', 'provincix'],
  dix: [],
  anno: [],
  periodo: [],
  asignatura: ['tipocolegio'],
  asignaturaprofesor: ['profesor', 'asignatura'],
  cursoprofesor: ['anno','colegio','curso','profesor'],
  asignaturacurso: ['anno','colegio','curso', 'asignatura'],
  colegio: ['region', 'provincix', 'comuna', 'tipocolegio'],
  curso: ['colegio', 'anno'],
  horaasignada: ['colegio'],
  profesor: ['usuario', 'sexo', 'region', 'provincix', 'comuna'],
  utp:  ['usuario', 'sexo', 'region', 'provincix', 'comuna'],
  inscripcioncolegio: ['profesor', 'colegio', 'anno'],
  registroactividad: [
    'colegio',
    'curso',
    'asignatura',
    'asignaturaprofesor',
    'profesor',
    'anno',
    'mes',
    'horario',
  ],
  horario: [
    'anno',
    'colegio',
    'curso',
    'profesor',
    'asignaturaprofesor',
    'dix',
  ],
  sexo: [],
  tipocolegio: [],
  vinculo: [],
  niveleducacional: [],
  tipousuario: [],
  tema:[],
  usuario: ['tipousuario','tema'],
  alumno: ['usuario', 'sexo', 'region', 'provincix', 'comuna'],
  tipoestado: [],
  estadoalumno: ['alumno', 'matricula', 'tipoestado'],
  anotacion: ['matricula', 'profesor', 'anno', 'colegio', 'curso'],
  tipoasistente: [],
  asistentecolegio: [
    'usuario',
    'tipoasistente',
    'sexo',
    'region',
    'provincix',
    'comuna',
  ],
  apoderado: [
    'usuario',
    'niveleducacional',
    'sexo',
    'region',
    'provincix',
    'comuna',
  ],
  asistencia: ['matricula', 'colegio', 'curso', 'alumno', 'anno', 'mes'],
  controlasignatura: [
    'colegio',
    'curso',
    'asignatura',
    'profesor',
    'horario',
    'anno',
    'mes',
  ],
  tipoevaluacion: [],
  evaluacion: [
    'colegio',
    'curso',
    'profesor',
    'asignaturaprofesor',
    'anno',
    'periodo',
    'tipoevaluacion',
  ],
  matricula: ['colegio', 'curso', 'apoderado', 'alumno', 'vinculo', 'anno'],
  ventana: ['colegio','tabla'],
  nota: [
    'anno',
    'periodo',
    'colegio',
    'curso',
    'profesor',
    'asignaturaprofesor',
    'matricula',
    'evaluacion',
  ],
  resumennota: [
    'anno',
    'periodo',
    'colegio',
    'curso',
    'asignaturacurso',
    'matricula'
  ],  
  mes: [],
  feriado: [],
  tabla: [],
  // endpoints especiales: usados en MultiSelect @Input('custom-endpoints')
  //  ejemplo: [custom-endpoints]="{matricula: 'lista_curso_nombres'}"
  lista_curso_nombres: ['colegio', 'curso', 'anno'],
  registro_actividad_by_mes: ['colegio', 'curso', 'asignatura', 'anno', 'mes'],
  asignatura_por_colegio: ['colegio'],
};


// --------------------------------------------------
//       Labels Service

export const lowerUpperTables: stringString = {
  alumno: 'Alumno',
  anno: 'Anno',
  anotacion: 'Anotacion',
  apoderado: 'Apoderado',
  asignatura: 'Asignatura',
  asignaturaprofesor: 'AsignaturaProfesor',
  cursoprofesor: 'CursoProfesor',
  asignaturacurso: 'AsignaturaCurso',
  asistencia: 'Asistencia',
  asistencix: 'Asistencix',
  colegio: 'Colegio',
  comuna: 'Comuna',
  controlasignatura: 'ControlAsignatura',
  curso: 'Curso',
  horaasignada: 'HoraAsignada',
  dix: 'Dix',
  evaluacion: 'Evaluacion',
  feriado: 'Feriado',
  horario: 'Horario',
  matricula: 'Matricula',
  ventana: 'Ventana',
  mes: 'Mes',
  niveleducacional: 'NivelEducacional',
  tipousuario: 'TipoUsuario',
  tema: 'Tema',
  usuario: 'Usuario',
  nota: 'Nota',
  resumennota: 'ResumenNota',
  periodo: 'Periodo',
  profesor: 'Profesor',
  utp: 'Utp',
  inscripcioncolegio: 'InscripcionColegio',
  registroactividad: 'RegistroActividad',
  provincix: 'Provincix',
  region: 'Region',
  sexo: 'Sexo',
  tabla: 'Tabla',
  tipocolegio: 'TipoColegio',
  tipoevaluacion: 'TipoEvaluacion',
  vinculo: 'Vinculo',
  tipoestado: 'TipoEstado',
  estadoalumno: 'EstadoAlumno',
  tipoasistente: 'TipoAsistente',
  asistentecolegio: 'AsistenteColegio',
};

export const tableLabels = {
  alumno: 'Alumno',
  anotacion: 'Observaciones',
  anno: 'Año',
  apoderado: 'Apoderado',
  asignatura: 'Asignatura',
  asignaturaprofesor: 'Asignatura Profesor',
  cursoprofesor: 'Curso Profesor',
  asignaturacurso: 'Asignatura Curso',
  asistencia: 'Asistencia',
  asistencix: 'Asistencia',
  colegio: 'Colegio',
  comuna: 'Comuna',
  curso: 'Curso',
  horaasignada: 'Hora Asignada',
  controlasignatura: 'Control de asignatura',
  dix: 'Día',
  evaluacion: 'Evaluación',
  feriado: 'Feriado',
  horario: 'Horario',
  matricula: 'Matrícula',
  Matricula: 'Matrícula',
  ventana: 'Ventana',
  mes: 'Mes',
  Mes: 'Mes',
  niveleducacional: 'Nivel educacional',
  tipousuario: 'Tipo Usuario',
  tema: 'Tema',
  usuario: 'Usuario',
  nota: 'Nota',
  resumennota: 'Resumen Nota',
  periodo: 'Período',
  Periodo: 'Período',
  profesor: 'Profesor',
  utp: 'UTP',
  inscripcioncolegio: 'Inscripcion Colegio',
  registroactividad: 'Registro de Actividad',
  provincix: 'Provincia',
  Provincix: 'Provincia',
  region: 'Región',
  Region: 'Región',
  sexo: 'Sexo',
  tabla: 'Tabla',
  Tabla: 'Tabla',
  tipoevaluacion: 'Tipo de evaluación',
  TipoEvaluacion: 'Tipo de evaluación',
  tipocolegio: 'Categoría',
  TipoColegio: 'Categoría',
  vinculo: 'Vínculo',
  Vinculo: 'Vínculo',
  tipoasistente: 'Profesión',
  tipoestado: 'Tipo de Estado',
  asistentecolegio: 'Profesional (no docente)',
  estadoalumno: 'Estado Alumno',
};

// personTables: todas las tablas que representan una persona
export const personTables = [
  'alumno',
  'apoderado',
  'profesor',
  'utp',
  'asistentecolegio',
  'usuario'
];

export const notCreateTables = [
  'alumno',
  'apoderado',
  'profesor',
  'utp',
  'asistentecolegio',
  'usuario',
  'matricula'
];

// DEBE COINCIDIR CON VALORES DE TABLA TIPO_USUARIO
export const usuarioTipo: numberString = {
  1:'profesor',
  2:'alumno',
  3:'apoderado',
  4:'asistente',
  5:'utp',
};


export const searchTables = [
  'alumno',
  'apoderado',
  'profesor',
  'utp',
  'asistentecolegio',
  'usuario',
  'curso',
];

export const groupTables = ['horario'];
export const groupSum: any = { horario: 'TotalHoras' };

// ....  LabelsService.attributesLabelsMap
//    aqui van todos los atributos del modelo de datos

export const attributesLabels = {

  alumno: {
    rut: 'Rut',
    nombre: 'Nombre(s)',
    apellido1: 'Apellido Paterno',
    apellido2: 'Apellido Materno',
    nacimiento: 'Fecha de nacimiento',
    direccion: 'Dirección',
    celular: 'Celular',
  },

  anotacion: {
    texto: 'Texto',
    fecha: 'Fecha',
    hora: 'Hora',
  },

  anno: {
    nombre: 'Nombre',
    numero: 'Número',
  },

  apoderado: {
    nombre: 'Nombre(s)',
    apellido1: 'Apellido Paterno',
    apellido2: 'Apellido Materno',
    nacimiento: 'Fecha de nacimiento',
    rut: 'Rut',
    direccion: 'Dirección',
    celular: 'Celular',
  },

  asignatura: {
    nombre: 'Nombre',
  },

  asignaturaprofesor: {
    nombre: 'Nombre',
  },

  cursoprofesor: {
    nombre: 'Nombre',
  },

  asignaturacurso: {
    nombre: 'Nombre',
  },

  asistencia: {
    fecha: 'Fecha',
    presente: 'Presente',
    dia: 'Día',
  },

  colegio: {
    nombre: 'Nombre',
    telefono: 'Teléfono',
    rut: 'Rut',
    direccion: 'Dirección',
    email: 'E-mail',
    www: 'Sitio web',
  },

  comuna: {
    nombre: 'Nombre',
  },

  controlasignatura: {
    inasistentesHombres: 'Inasistentes hombres',
    inasistentesMujeres: 'Inasistentes mujeres',
    atrasos: 'Atrasos',
    observaciones: 'Observaciones',
    fecha: 'Fecha',
    dia: 'Día',
    hora: 'Hora',
  },

  registroactividad: {
    descripcion: 'Descripción',
    fecha: 'Fecha',
    dia: 'Día',
    horaInicial: 'Hora de Inicio',
    numeroHoras: 'N° de horas',
  },

  inscripcioncolegio: {
    fechaInicio: 'Fecha de Inicio',
    fechaTermino: 'Fecha de Término',
    esPie: 'Es PIE',
  },

  curso: {
    nombre: 'Nombre',
    profesor_jefe: 'Profesor jefe',
  },

  horaasignada: {
    numero: 'Numero',
    horario: 'Horario',
  },

  dix: {
    nombre: 'Nombre',
  },

  evaluacion: {
    nombre: 'Nombre',
    fecha: 'Fecha',
    hora: 'Hora',
    ponderacion: 'Ponderación (%)',
  },

  feriado: {
    nombre: 'Nombre',
    fecha: 'Fecha',
    lugar: 'Lugar',
  },

  horario: {
    hora: 'Hora',
    TotalHoras: 'Horas',
  },

  matricula: {
    nombre: 'Número',
    procedencia: 'Procedencia',
    incorporacion: 'Incorporación',
    retiro: 'Retiro',
  },

  ventana: {
    dias: 'Dias',
  },


  mes: {
    numero: 'Número',
    nombre: 'Nombre',
    abreviatura: 'Abreviatura',
  },

  niveleducacional: {
    nombre: 'Nombre',
  },

  tabla: {
    nombre: 'Nombre',
  },

  tipousuario: {
    nombre: 'Nombre',
    descripcion: 'Descripcion',
  },

  tema: {
    nombre: 'Nombre',
  },

  usuario: {
    username: 'Username',
    email: 'E-mail',
  },

  nota: {
    nota: 'Nota',
  },

  resumennota: {
    promedio: 'Promedio',
  },

  periodo: {
    nombre: 'Nombre',
    anno: 'Año',
    numero: 'Número',
  },

  profesor: {
    nombre: 'Nombre(s)',
    apellido1: 'Apellido Paterno',
    apellido2: 'Apellido Materno',
    rut: 'RUT',
    direccion: 'Direccion',
    celular: 'Celular',
    nacimiento: 'Nacimiento',
  },

  utp: {
    nombre: 'Nombre(s)',
    apellido1: 'Apellido Paterno',
    apellido2: 'Apellido Materno',
    rut: 'RUT',
    direccion: 'Direccion',
    celular: 'Celular',
    nacimiento: 'Nacimiento',
  },

  provincix: {
    nombre: 'Nombre',
  },

  region: {
    nombre: 'Nombre',
    larga: 'Nombre',
  },

  sexo: {
    nombre: 'Nombre',
  },

  tipocolegio: {
    nombre: 'Nombre',
  },

  tipoevaluacion: {
    nombre: 'Nombre',
    descripcion: 'Descripción',
  },

  vinculo: {
    nombre: 'Nombre',
  },

  estadoalumno: {
    fecha: 'Fecha',
  },
  tipoestado: {
    nombre: 'Nombre',
  },
  tipoasistente: {
    nombre: 'Nombre',
  },
  asistentecolegio: {
    nombre: 'Nombre',
    apellido1: 'Apellido Paterno',
    apellido2: 'Apellido Materno',
    rut: 'Rut',
    direccion: 'Dirección',
    celular: 'Celular',
    nacimiento: 'Nacimiento',
  },
};

// --------------------------------------------------
//       Icons service

export const icons: stringStringPair = {
  '/home': ['bi bi-house-door-fill', 'Home'],
  '/colegio': ['bi bi-bank', 'Colegios'],
  '/curso': ['bi bi-people-fill', 'Cursos'],
  '/horaasignada': ['bi bi-clock', 'Hora Asignadas'],
  '/asistencia': ['bi bi-table', 'Asistencia'],
  '/anotacion': ['bi bi-card-list', 'Anotacion'],
  '/control_asignatura': ['bi bi-layout-text-window', 'Control de Asignatura'],
  '/asignatura': ['bi bi-book', 'Asignaturas'],
  '/asignaturaprofesor': ['bi bi-book', 'Asignatura Profesores'],
  '/cursoprofesor': ['bi bi-book', 'Asignatura Profesores'],
  '/asignaturacurso': ['bi bi-book', 'Asignatura Profesores'],
  '/profesor': ['bi bi-person-video3', 'Profesores'],
  '/utp': ['bi bi-person-video3', 'Utp'],
  '/inscripcioncolegio': ['bi bi-bank', 'Inscripcion Colegio'],
  '/registroactividad': ['bi bi-card-list', 'Registro de Actividades'],
  '/apoderado': ['bi-person-check-fill', 'Apoderados'],
  '/alumno': ['bi bi-mortarboard-fill', 'Alumnos'],
  '/fichaalumno': ['bi bi-folder', 'Ficha Alumno'],
  '/estadoalumno': ['&nbsp;', 'Estado Alumno'],
  '/asistentecolegio': ['&nbsp;', 'Asistente Colegio'],
  '/matricula': ['bi-file-earmark-plus', 'Matrícula'],
  '/ventana': ['bi-file-earmark-plus', 'Matrícula'],
  '/nota': ['bi bi-pencil-square', 'Notas'],
  '/resumennota': ['bi bi-pencil-square', 'Notas'],
  '/evaluacion': ['bi-bar-chart-steps', 'Evaluaciones'],
  '/horario': ['bi bi-clock', 'Horario'],
  '/feriado': ['bi bi-calendar-week', 'Feriados'],
  '/tipousuario': ['bi-person-check', 'Tipo Usuario'],
  '/Tema': ['bi bi-palette'],
  '/usuario': ['bi-person-check-fill', 'Usuario'],
  '/tabla': ['bi bi-table', 'Tabla'],
};

// -------------------------------------------------
//     Routers

export const redirectRoutes: any = {
  Colegio: ['/curso'], // ok 26-11-2023 uvr
  HoraAsignada: [],
  Curso: ['/horario'],
  Profesor: ['/horario'],
  Utp: ['/horario'],
  Asignatura: ['/profesor'],
  AsignaturaProfesor: ['/profesor'],
  CursoProfesor:['/profesor'],
  AsignaturaCurso: ['/profesor'],
  Apoderado: ['/matricula'],
  Matricula: ['/curso'],
  Ventana:['/curso'],
  Evaluacion: ['/nota'],
  Horario: ['/horario'],
  AsistenteColegio: ['/asistentecolegio'],
  Alumno: ['/fichaalumno'],
  EstadoAlumno: ['/estadoalumno'],
  TipoUsuario: ['/usuario'],
  Tema:['/tema'],
  Usuario: ['/usuario'],
  Anotacion: ['/anotacion'],
};

// -------------------------------------------------
//       Validators

export const validator: any = {
  Colegio: {
    modalText: {
      nombre: [Validators.required],
      telefono: [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      rut: [Validators.required, rutValidator()],
      direccion: [Validators.required],
      email: [Validators.required, Validators.email],
      www: null,
    },
    modalDate: {
    }
  },

  Profesor: {
    modalText: {
      nombre: [Validators.required],
      apellido1: [Validators.required],
      apellido2: [Validators.required],
      rut: [Validators.required, rutValidator()],
      direccion: [Validators.required],
      celular: [Validators.required, Validators.pattern(/^\+(56)[0-9 ]{9}$/)],
    },
    modalDate: {
       nacimiento: [ Validators.required]
    }
  },

  Utp: {
    modalText: {
      nombre: [Validators.required],
      apellido1: [Validators.required],
      apellido2: [Validators.required],
      rut: [Validators.required, rutValidator()],
      direccion: [Validators.required],
      celular: [Validators.required, Validators.pattern(/^\+(56)[0-9 ]{9}$/)],
    },
    modalDate: {
       nacimiento: [ Validators.required]
     }
  },

  Curso: {
    modalText: {
      nombre: [Validators.required],
      profesor_jefe: [Validators.required],
    },
    modalDate: {
    }

  },

  HoraAsignada: {
    modalText: {
      mumero: [Validators.required],
      horario: [Validators.required],
    },
    modalDate: {

    }

  },

  Asignatura: {
    modalText: {
      nombre: [Validators.required],
    },
    modalDate: {

    }
  },

  AsignaturaProfesor: {
    modalText: {
      nombre: [Validators.required],
    },
    modalDate: {
    }

  },

  CursoProfesor: {
    modalText: {
      nombre: [Validators.required],
    },
    modalDate: {
    }

  },


  AsignaturaCurso: {
    modalText: {
      nombre: [Validators.required],
    },
    modalDate: {
    }

  },

  Apoderado: {
    modalText: {
      nombre: [Validators.required],
      apellido1: [Validators.required],
      apellido2: [Validators.required],
      rut: [Validators.required, rutValidator()],
      direccion: [Validators.required],
      celular: [Validators.required, Validators.pattern(/^\+(56)[0-9 ]{9}$/)],
    },
    modalDate: {
       nacimiento: [ Validators.required]
    }
  },

  Alumno: {
    modalText: {
      nombre: [Validators.required],
      apellido1: [Validators.required],
      apellido2: [Validators.required],
      rut: [Validators.required, rutValidator()],
      direccion: [Validators.required],
      celular: [Validators.required, Validators.pattern(/^\+(56)[0-9 ]{9}$/)],
    },
    modalDate: {
       nacimiento: [ Validators.required]
    }
  },

  EstadoAlumno: {
    modalText: {
      
    },
    modalDate: {
      fecha: [Validators.required]
    }
  },
  Usuario: {
    modalText: {
      email: [Validators.required, emailValidator()],
      username: [Validators.required],
    },
    modalDate: {
   }
  },

  AsistenteColegio: {
    modalText: {
      nombre: [Validators.required],
      apellido1: [Validators.required],
      apellido2: [Validators.required],
      rut: [Validators.required, rutValidator()],
      direccion: [Validators.required],
      celular: [Validators.required, Validators.pattern(/^\+(56)[0-9 ]{9}$/)],
    },
    modalDate: {
       nacimiento: [ Validators.required],
    }
  },

  Matricula: {
    modalText: {
      nombre: [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      procedencia: [Validators.required],
    },
    modalDate: {
      incorporacion:  [ Validators.required],
      retiro: null
    }
  },

  Ventana: {
    modalText: {
      dias: [Validators.required],
    },
    modalDate: {
    }
  },

  Evaluacion: {
    modalText: {
      nombre: [Validators.required],
      hora: [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ponderacion: [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ],
    },
    modalDate: {
      fecha:  [Validators.required],
    }

  },

  TipoUsuario: {
    modalText: {
      nombre: [Validators.required],
      descripcion: [Validators.required],
    },
    modalDate: {
    }
  },

  Tema: {
    modalText: {
      nombre: [Validators.required],
    },
    modalDate: {
    }
  },

  Tabla: {
    modalText: {
      nombre: [Validators.required],
    },
    modalDate: {
    }
  },

  Feriado: {
    modalText: {
      nombre: [Validators.required],
      lugar: [Validators.required],
    },
    modalDate: {
      fecha: [Validators.required],
    }
  },

  Nota: {
    modalText: {
      nota: [
        Validators.pattern(/^[0-9]\d*$/),
        Validators.required,
        Validators.min(1),
        Validators.max(12)
    ],
    },
    modalDate: {
      // fecha:  [Validators.required],
    }

  },

  Anotacion: {
    modalText: {
      texto: [Validators.required, Validators.maxLength(500)],
      hora: [
        Validators.pattern(/^[0-9]\d*$/),
        Validators.required,
        Validators.min(1),
        Validators.max(12),
      ],
    },
    modalDate: {
    }
  },

  RegistroActividad: {
    modalText: {
      descripción: [Validators.required, Validators.maxLength(500)],
      horaInicial: [
        Validators.pattern(/^[0-9]\d*$/),
        Validators.required,
        Validators.min(1),
        Validators.max(12),
      ],
      numeroHoras: [
        Validators.pattern(/^[0-9]\d*$/),
        Validators.required,
        Validators.min(1),
        Validators.max(3),
      ],
    },
    modalDate: {
      fecha:  [Validators.required],
    }
  },

  Horario: {
    modalText: {
      hora: [
        Validators.pattern(/^[0-9]\d*$/),
        Validators.required,
        Validators.min(1),
        Validators.max(12),
      ],
    },
    modalDate: {
    }
  },
};

// --------------------------------------------------
//       Modal

export const modalDataObject: any = {
  Colegio: {
    mainTable: 'colegio',
    tables: ['region', 'provincix', 'comuna', 'tipocolegio'],
    textFields: ['nombre', 'telefono', 'rut', 'direccion', 'email', 'www'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Colegio',
    windowHeight: '650px',
    permission: ['utp']
  },

  Horario: {
    mainTable: 'horario',
    tables: ['profesor', 'asignaturaprofesor'],
    textFields: ['hora'],
    dateFields: [],
    ignoreFkRequirements: ['asignatura'],
    hidden: [],
    defaultValues: {},
    label: 'Horario',
    windowHeight: '400px',
    permission: ['utp']
  },

  Profesor: {
    mainTable: 'profesor',
    tables: ['sexo', 'region', 'provincix', 'comuna'],
    textFields: ['nombre', 'apellido1','apellido2', 'rut', 'direccion', 'celular'],
    dateFields: ['nacimiento'],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Profesor',
    windowHeight: '570px',
    permission: ['utp']
  },

  Utp: {
    mainTable: 'utp',
    tables: ['sexo', 'region', 'provincix', 'comuna'],
    textFields: ['nombre', 'apellido1','apellido2', 'rut', 'direccion', 'celular'],
    dateFields: ['nacimiento'],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'UTP',
    windowHeight: '570px',
    permission: ['utp']
  },

  Curso: {
    mainTable: 'curso',
    tables: ['colegio', 'anno'],
    textFields: ['nombre', 'profesor_jefe'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Curso',
    windowHeight: '400px',
    permission: ['utp']
  },

  HoraAsignada: {
    mainTable: 'horaasignada',
    tables: ['colegio'],
    textFields: ['numero', 'horario'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Hora Asignada',
    windowHeight: '400px',
    permission: ['utp']
  },

  Asignatura: {
    mainTable: 'asignatura',
    tables: ['tipocolegio'],
    textFields: ['nombre'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Asignatura',
    windowHeight: '320px',
    permission: ['utp']
  },

  AsignaturaProfesor: {
    mainTable: 'asignaturaprofesor',
    tables: ['profesor', 'asignatura'],
    textFields: ['nombre'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Asignatura Profesor',
    windowHeight: '320px',
    permission: ['utp']
  },

  CursoProfesor: {
    mainTable: 'cursoprofesor',
    tables: ['anno','colegio','curso','profesor'],
    textFields: ['nombre'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Curso Profesor',
    windowHeight: '320px',
    permission: ['utp']
  },

  AsignaturaCurso: {
    mainTable: 'asignaturacurso',
    tables: ['anno','colegio', 'curso', 'asignatura'],
    textFields: ['nombre'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Asignatura Curso',
    windowHeight: '320px',
    permission: ['utp']
  },

  Apoderado: {
    mainTable: 'apoderado',
    tables: ['niveleducacional', 'sexo', 'region', 'provincix', 'comuna'],
    textFields: ['nombre', 'apellido1','apellido2', 'rut', 'direccion', 'celular'],
    dateFields: ['nacimiento'],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Apoderado',
    windowHeight: '590px',
    permission: ['utp']
  },

  Alumno: {
    mainTable: 'alumno',
    tables: ['sexo', 'region', 'provincix', 'comuna'],
    textFields: ['nombre', 'apellido1','apellido2', 'rut', 'direccion', 'celular'],
    dateFields: ['nacimiento'],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Alumno',
    windowHeight: '680px',
    permission: ['utp']
  },

  Usuario: {
    mainTable: 'usuario',
    tables: ['tipousuario','tema'],
    textFields: ['email', 'username'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Usuario',
    windowHeight: '680px',
    permission: ['utp']
  },

  EstadoAlumno: {
    mainTable: 'estadoalumno',
    tables: ['alumno','matricula', 'tipoestado'],
    textFields: [],
    dateFields: ['fecha'],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Estado Alumno',
    windowHeight: '680px',
    permission: ['utp']
  },

  TipoUsuario: {
    mainTable: 'tipousuario',
    tables: [],
    textFields: ['nombre', 'descripcion'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Tipo Usuario',
    windowHeight: '680px',
    permission: ['utp']
  },
  Tema: {
    mainTable: 'tema',
    tables: [],
    textFields: ['nombre'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Tema',
    windowHeight: '680px',
    permission: ['utp']
  },
    Tabla: {
    mainTable: 'tabla',
    tables: [],
    textFields: ['nombre'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Tabla',
    windowHeight: '380px',
    permission: ['utp']
  },

  AsistenteColegio: {
    mainTable: 'asistentecolegio',
    tables: ['tipoasistente', 'sexo', 'region', 'provincix', 'comuna'],
    textFields: ['nombre', 'apellido1','apellido2', 'rut', 'direccion', 'celular'],
    dateFields: ['nacimiento'],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Profesinales (no docentes)',
    windowHeight: '680px',
    permission: ['utp']
  },

  Matricula: {
    mainTable: 'matricula',
    tables: [ 'anno', 'colegio',  'curso',  'vinculo'],
    textFields: ['nombre', 'procedencia'],
    dateFields: ['incorporacion', 'retiro'],
    ignoreFkRequirements: [],
    hidden: [], // se usan sólo para reemplazar las foreing key
    defaultValues: {},
    label: 'Matricula',
    windowHeight: '600px',
    permission: ['utp']
  },

  Ventana: {
    mainTable: 'ventana',
    tables: ['colegio', 'tabla'],
    textFields: ['dias'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Ventana',
    windowHeight: '300px',
    permission: ['utp']
  },

  Evaluacion: {
    mainTable: 'evaluacion',
    tables: [
      'colegio',
      'curso',
      'profesor',
      'asignaturaprofesor',
      'anno',
      'periodo',
      'tipoevaluacion',
    ],
    textFields: ['nombre', 'hora', 'ponderacion'],
    dateFields: ['fecha'],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Evaluación',
    windowHeight: '620px',
    permission: ['profesor','utp']
  },

  Feriado: {
    mainTable: 'feriado',
    tables: [],
    textFields: ['nombre', 'lugar'],
    dateFields: ['fecha'],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Feriado',
    windowHeight: '400px',
    permission: ['utp']
  },

  Nota: {
    mainTable: 'nota',
    tables: ['matricula', 'evaluacion'],
    textFields: ['nota'],
    dateFields: [],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: {},
    label: 'Nota',
    windowHeight: '500px',
    permission: ['profesor','utp']
  },

  Anotacion: {
    mainTable: 'anotacion',
    tables: [],
    textFields: ['texto', 'hora'],
    textAreaFields: ['texto'],
    dateFields: ['fecha'],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: { fecha: 'today' },
    label: 'Observación',
    windowHeight: 'auto',
    permission: ['profesor']
  },

  RegistroActividad: {
    mainTable: 'asignaturaprofesor',
    tables: [],
    textFields: ['descripcion', 'horaInicial', 'numeroHoras'],
    textAreaFields: ['descripcion'],
    dateFields: ['fecha'],
    ignoreFkRequirements: [],
    hidden: [],
    defaultValues: { fecha: 'today' },
    label: 'Registro de Actividades',
    windowHeight: 'auto',
    permission: ['profesor','utp']
  },
};


