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
  'asistencia',
  'asistentecolegio',
  'colegio',
  'comuna',
  'controlasignatura',
  'curso',
  'cursoprofesor',
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
  'administrador',
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
// permissions.push('delete:asistencia');
// permissions.push('delete:controlasignatura');
// permissions.push('delete:matricula');
// permissions.push('delete:feriado');
// --------------------------------------------------------------

export const environment = {
  production: false,
  apiUrl: 'http://localhost',
  apiKey: 'devKey',
  userinfo: {},
  opacity: '100%',

  auth0: {
    domain: 'dev-tupdibnrpuxah8p3.us.auth0.com',
    clientId: 'oW9EH9gLFZFovbTIEaafmVNwg55iCGim',
    callbackUrl: 'http://localhost',
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
    primary: {
      color: 'primary',
      lineal: 'linear-gradient(to right, #4880EC, #019CAD)',
      menu: '#e3e4f3',
      colorMenuButton: '#059bb0',
      pagination: '#e2e2eb',
      bodybgcolor: 'rgb(230,233,242)', //}
      tablehead: 'rgb(44,161,213)',
      bgmodal: '#0D6EFD',
      modalbutton: 'rgb(69, 130, 233)',
    },

    success: {
      color: 'success',
      lineal: 'linear-gradient(to right, #38B15C,#76FA91)',
      menu: '#dcf3dd',
      colorMenuButton: '#71f48d',
      pagination: '#dcebe4',
      bodybgcolor: 'rgb(214,242,214ext)', // rgb(232, 248, 240)
      tablehead: 'lightgreen',
      bgmodal: 'lightgreen',
      modalbutton: 'rgb(82, 205, 145)',
    },

    info: {
      color: 'info',
      lineal: 'linear-gradient(to right,#0BA5C4, #0dcaf0)',
      menu: "rgb(13, 202, 240)",
      colorMenuButton: 'rgb(13, 201, 239)',
      pagination: 'rgb(201, 252, 255)',
      bodybgcolor: 'rgb(227,240,242)',
      tablehead:  'rgb(13, 202, 240)',
      bgmodal: 'rgb(13, 202, 240)',
      modalbutton: 'rgb(13, 202, 240)',
    },
  },
  photo: {
    primary: 'url(assets/images/fondo_primary.jpg)',
    success: 'url(assets/images/fondo_success.jpeg)',
    info: 'url(assets/images/fondo_cyan.png)',
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
  alumno: ['usuario', 'sexo', 'region', 'provincix', 'comuna'],
  anno: [],
  asignatura: ['tipocolegio'],
  anotacion: ['matricula', 'profesor', 'anno', 'colegio', 'curso'],
  administrador:  ['usuario', 'sexo', 'region', 'provincix', 'comuna'],
  asistentecolegio: [
    'usuario',
    'region',
    'provincix',
    'comuna',
    'tipoasistente',
    'sexo'
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
  comuna: ['region', 'provincix'],
  cursoprofesor: ['anno','colegio','curso','asignatura','profesor'],
  colegio: ['region', 'provincix', 'comuna', 'tipocolegio'],
  curso: ['colegio', 'anno'],
  controlasignatura: [
    'colegio',
    'curso',
    'asignatura',
    'profesor',
    'horario',
    'anno',
    'mes',
  ],
  dix: [],
  estadoalumno: ['anno','colegio','curso','alumno', 'matricula', 'tipoestado'],
  evaluacion: [
    'anno',
    'periodo',
    'colegio',
    'curso',
    'cursoprofesor',
    'tipoevaluacion',
  ],
  feriado: [],
  horaasignada: ['colegio'],
  horario: [
    'anno',
    'colegio',
    'curso',
    'cursoprofesor',
    'dix',
  ],
  inscripcioncolegio: ['profesor', 'colegio', 'anno'],
  matricula: ['colegio', 'curso', 'apoderado', 'alumno', 'vinculo', 'anno'],
  mes: [],
  niveleducacional: [],
  nota: [
    'anno',
    'periodo',
    'colegio',
    'curso',
    'cursoprofesor',
    'matricula',
    'evaluacion',
  ],
  provincix: ['region'],
  periodo: [],
  profesor: ['usuario', 'sexo', 'region', 'provincix', 'comuna'],
  region: [],
  registroactividad: [
    'colegio',
    'curso',
    'asignatura',
    'profesor',
    'anno',
    'mes',
    'horario',
  ],
  resumennota: [
    'anno',
    'periodo',
    'colegio',
    'curso',
    'asignatura',
    'matricula'
  ],
  sexo: [],
  tabla: [],
  tipocolegio: [],
  vinculo: [],
  tipousuario: [],
  tema:[],
  tipoestado: [],
  tipoasistente: [],
  tipoevaluacion: [],
  usuario: ['tipousuario','tema'],
  ventana: ['colegio','tabla'],
  // endpoints especiales: usados en MultiSelect @Input('custom-endpoints')
  //  ejemplo: [custom-endpoints]="{matricula: 'lista_curso_nombres'}"
  asignatura_por_colegio: ['colegio'],
  lista_curso_nombres: ['colegio', 'curso', 'anno'],
  registro_actividad_by_mes: ['colegio', 'curso', 'asignatura', 'anno', 'mes'],

};


// --------------------------------------------------
//       Labels Service

export const lowerUpperTables: stringString = {
  alumno: 'Alumno',
  anno: 'Anno',
  anotacion: 'Anotacion',
  apoderado: 'Apoderado',
  asignatura: 'Asignatura',
  cursoprofesor: 'CursoProfesor',
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
  administrador: 'Administrador',
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
  cursoprofesor: 'Inscripción Curso',
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
  administrador: 'Administrador',
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
  tipoasistente: 'Tipo de Asistente',
  tipoestado: 'Tipo de Estado',
  asistentecolegio: 'Profesional (no docente)',
  estadoalumno: 'Estado Alumno',
};

// personTables: todas las tablas que representan una persona
export const personTables = [
  'alumno',
  'apoderado',
  'profesor',
  'administrador',
  'asistentecolegio',
  'usuario'
];

export const notCreateTables = [
  'alumno',
  'apoderado',
  'profesor',
  'administrador',
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
  5:'admin'
};


export const searchTables = [
  'alumno',
  'apoderado',
  'profesor',
  'administrador',
  'asistentecolegio',
  'usuario',

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

  cursoprofesor: {

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
    esPie: 'Es PIE',
    esUtp: 'Es Utp',
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

  administrador: {
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
  '/cursoprofesor': ['bi bi-book', 'Asignatura Profesores'],
  '/profesor': ['bi bi-person-video3', 'Profesores'],
  '/administrador': ['bi bi-person-video3', 'Administrador'],
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
  HoraAsignada: ['/horario'],
  Curso: ['/horario'],
  Profesor: ['/horario'],
  Administrador: ['/horario'],
  Asignatura: ['/profesor'],
  CursoProfesor:['/profesor'],
  Apoderado: ['/matricula'],
  Matricula: ['/curso'],
  Ventana:['/curso'],
  InscripcionColegio:['/curso'],
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

  Administrador: {
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


  CursoProfesor: {
    modalText: {

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

export const Permission:any =  {
  /* Asistencia */
  Asistencia: {leer : ['profesor'], editar: ['profesor'] , crear: ['profesor'] },
  ResumenAsistencia: {leer : 'profesor', editar: 'profesor' , crear: 'profesor' },
  /* Colegio */
  Colegio: {leer : ['profesor'], editar: ['admin'] , crear: ['admin'] },
  AsistenteColegio:  { leer: ['profesor'], editar: ['utp'], crear:['utp'] },
  Curso: { leer: ['profesor'], editar: ['utp'], crear: ['utp'] },
  Asignatura: { leer: ['profesor'], editar: ['utp'], crear: ['utp'] },
  HoraAsignada: { leer: ['profesor'], editar: ['utp'], crear: ['utp']} ,
  /* Alumno */
  Alumno: { leer: ['utp'], editar: ['utp'], crear: ['utp'] },
  EstadoAlumno: { leer: ['profesor'], editar: ['utp'], crear: ['utp'] },
  Apoderado: { leer: ['utp'], editar: ['utp'], crear: ['utp'] },
  Anotacion: { leer: ['profesor'], editar: ['profesor'], crear:['profesor'] },
  FichaAlumno: { leer: ['profesor'] , editar: ['profesor'] , crear: ['profesor']  },
  Matricula: { leer: 'profesor' , editar : 'utp' , crear: 'utp'},
  /* Profesor */
  Profesor: { leer : ['utp'], editar: ['utp'], crear: ['utp'] },
  InscripcionCurso: { leer: ['profesor'], editar: ['utp'], crear:['utp'] },
  Evaluacion:  { leer: ['profesor'], editar: ['utp'], crear: ['utp']},
  Nota: {leer: ['profesor'] ,editar: ['profesor'], crear: ['profesor']},
  ResumenNota: {leer: ['profesor'] ,editar: ['profesor'], crear: ['profesor']},
  Horario: { leer: ['profesor'], editar: ['utp'], crear: ['utp'] },
  HorasInscritas: { leer: ['profesor'], editar: ['utp'], crear: ['utp'] },
  ControlAsignatura: {leer: ['profesor'] ,editar: ['profesor'], crear: ['profesor']},
  InscripcionColegio : { leer : ['profesor'] , editar : ['utp'], crear : ['utp'] },
  RegistroActividad: { leer: ['profesor'], editar: ['profesor'], crear : ['profesor'] },
  Ventana: { leer : ['profesor'] , editar : ['utp'], crear : ['utp'] },
  /* Procesos */
  MatriculaAlumno: { leer : ['utp'] , editar : ['utp'], crear : ['utp'] },
  RegistroUsuario: { leer : ['utp'] , editar : ['profesor','utp'], crear : ['utp'] },
  /* Admin */
  TipoUsuario: {leer : ['admin'] , editar : ['admin'], crear : ['admin']},
  Usuario: {leer : ['utp'] , editar : ['utp'], crear : ['utp']},
  Tabla: {leer : ['admin'] , editar : ['admin'], crear : ['admin']},
}


// --------------------------------------------------
//       Modal

export const modalDataObject: any = {
  Colegio: {
    mainTable: 'colegio',
    tables: ['region', 'provincix', 'comuna', 'tipocolegio'],
    textFields: ['nombre', 'telefono', 'rut', 'direccion', 'email', 'www'],
    booleanFields:[],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Colegio',
    windowHeight: '650px',
  },

  Horario: {
    mainTable: 'horario',
    tables: ['cursoprofesor'],
    textFields: ['hora'],
    booleanFields:[],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Horario',
    windowHeight: '400px',

  },

  Profesor: {
    mainTable: 'profesor',
    tables: ['sexo', 'region', 'provincix', 'comuna'],
    textFields: ['nombre', 'apellido1','apellido2', 'rut', 'direccion', 'celular'],
    booleanFields:[],
    dateFields: ['nacimiento'],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Profesor',
    windowHeight: '570px',
    },

  Administrador: {
    mainTable: 'administrador',
    tables: ['sexo', 'region', 'provincix', 'comuna'],
    textFields: ['nombre', 'apellido1','apellido2', 'rut', 'direccion', 'celular'],
    booleanFields:[],
    dateFields: ['nacimiento'],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Administrador',
    windowHeight: '570px',
  },

  Curso: {
    mainTable: 'curso',
    tables: ['colegio', 'anno'],
    textFields: ['nombre', 'profesor_jefe'],
    booleanFields:[],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Curso',
    windowHeight: '400px',

  },

  HoraAsignada: {
    mainTable: 'horaasignada',
    tables: ['colegio'],
    textFields: ['numero', 'horario'],
    booleanFields:[],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Hora Asignada',
    windowHeight: '400px',

  },

  Asignatura: {
    mainTable: 'asignatura',
    tables: ['tipocolegio'],
    textFields: ['nombre'],
    booleanFields:[],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Asignatura',
    windowHeight: '320px',
  },


  CursoProfesor: {
    mainTable: 'cursoprofesor',
    tables: ['anno','colegio','curso','asignatura','profesor'],
    textFields: [],
    booleanFields:[],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Inscripción Curso',
    windowHeight: '320px',
  },

  InscripcionColegio: {
    mainTable: 'inscripcioncolegio',
    tables: ['profesor','colegio','anno'],
    textFields: [],
    booleanFields:['esPie','esUtp'],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Inscripcion Colegio',
    windowHeight: '320px',
  },


  Apoderado: {
    mainTable: 'apoderado',
    tables: ['niveleducacional', 'sexo', 'region', 'provincix', 'comuna'],
    textFields: ['nombre', 'apellido1','apellido2', 'rut', 'direccion', 'celular'],
    booleanFields:[],
    dateFields: ['nacimiento'],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Apoderado',
    windowHeight: '590px',

  },

  Alumno: {
    mainTable: 'alumno',
    tables: ['sexo','region', 'provincix', 'comuna' ],
    textFields: ['nombre', 'apellido1','apellido2', 'rut', 'direccion', 'celular'],
    booleanFields:[],
    dateFields: ['nacimiento'],
    ignoreFkRequirements: ['tipocolegio','provincix', 'comuna'],
    disable: [],
    defaultValues: {},
    label: 'Alumno',
    windowHeight: '680px',

  },

  Usuario: {
    mainTable: 'usuario',
    tables: ['tipousuario','tema'],
    textFields: ['email', 'username'],
    booleanFields:[],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Usuario',
    windowHeight: '680px',

  },

  EstadoAlumno: {
    mainTable: 'estadoalumno',
    tables: ['anno','colegio','curso','alumno','matricula', 'tipoestado'],
    textFields: [],
    booleanFields:[],
    dateFields: ['fecha'],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Estado Alumno',
    windowHeight: '680px',

  },

  TipoUsuario: {
    mainTable: 'tipousuario',
    tables: [],
    textFields: ['nombre', 'descripcion'],
    booleanFields:[],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Tipo Usuario',
    windowHeight: '680px',

  },
  Tema: {
    mainTable: 'tema',
    tables: [],
    textFields: ['nombre'],
    booleanFields:[],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Tema',
    windowHeight: '680px',

  },
    Tabla: {
    mainTable: 'tabla',
    tables: [],
    textFields: ['nombre'],
    booleanFields:[],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Tabla',
    windowHeight: '380px',

  },

  AsistenteColegio: {
    mainTable: 'asistentecolegio',
    tables: ['region', 'provincix', 'comuna','tipoasistente', 'sexo' ],
    textFields: ['nombre', 'apellido1','apellido2', 'rut', 'direccion', 'celular'],
    booleanFields:[],
    dateFields: ['nacimiento'],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Profesionales (no docentes)',
    windowHeight: '680px',
  },

  Matricula: {
    mainTable: 'matricula',
    tables: [ 'anno', 'colegio',  'curso',  'vinculo'],
    textFields: ['procedencia'],
    booleanFields:[],
    dateFields: ['incorporacion'],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Matricula',
    windowHeight: '600px',
  },

  Ventana: {
    mainTable: 'ventana',
    tables: ['colegio', 'tabla'],
    textFields: ['dias'],
    dateFields: [],
    booleanFields:[],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Ventana',
    windowHeight: '300px',

  },

  Evaluacion: {
    mainTable: 'evaluacion',
    tables: [
      'anno',
      'periodo',
      'colegio',
      'curso',
      'cursoprofesor',
      'tipoevaluacion',
    ],
    textFields: ['nombre', 'hora', 'ponderacion'],
    booleanFields:[],
    dateFields: ['fecha'],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Evaluación',
    windowHeight: '620px',

  },

  Feriado: {
    mainTable: 'feriado',
    tables: [],
    textFields: ['nombre', 'lugar'],
    booleanFields:[],
    dateFields: ['fecha'],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Feriado',
    windowHeight: '400px',

  },

  Nota: {
    mainTable: 'nota',
    tables: ['matricula', 'evaluacion'],
    textFields: ['nota'],
    booleanFields:[],
    dateFields: [],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: {},
    label: 'Nota',
    windowHeight: '500px',

  },

  Anotacion: {
    mainTable: 'anotacion',
    tables: [],
    textFields: ['texto', 'hora'],
    booleanFields:[],
    textAreaFields: ['texto'],
    dateFields: ['fecha'],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: { fecha: 'today' },
    label: 'Observación',
    windowHeight: 'auto',

  },

  RegistroActividad: {
    mainTable: 'registroactividad',
    tables: [],
    textFields: ['descripcion', 'horaInicial', 'numeroHoras'],
    booleanFields:[],
    textAreaFields: ['descripcion'],
    dateFields: ['fecha'],
    ignoreFkRequirements: [],
    disable: [],
    defaultValues: { fecha: 'today' },
    label: 'Registro de Actividades',
    windowHeight: 'auto',

  },
};

