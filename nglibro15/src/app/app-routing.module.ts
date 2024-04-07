import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@auth0/auth0-angular';

import { HomeComponent } from './tablas/home/home.component';
import { MatriculaAlumnoComponent } from './tablas/matricula-alumno/matricula-alumno.component';
import { AlumnoComponent } from './tablas/alumno/alumno.component';
import { EstadoAlumnoComponent } from './tablas/estado-alumno/estado-alumno.component';
import { ApoderadoComponent } from './tablas/apoderado/apoderado.component';
import { MatriculaComponent } from './tablas/matricula/matricula.component';
import { ColegioComponent } from './tablas/colegio/colegio.component';
import { AsistenteColegioComponent } from './tablas/asistente-colegio/asistente-colegio.component';
import { CursoComponent } from './tablas/curso/curso.component';
import { HoraAsignadaComponent } from './tablas/hora-asignada/hora-asignada.component';
import { HorarioComponent } from './tablas/horario/horario.component';
import { HorasInscritasComponent } from './tablas/horas-incritas/horas-incritas.component';
import { TipoUsuarioComponent } from './tablas/tipo-usuario/tipo-usuario.component';
import { UsuarioComponent } from './tablas/usuario/usuario.component';
import { AsignaturaComponent } from './tablas/asignatura/asignatura.component';
import { AnotacionesComponent } from './tablas/anotaciones/anotaciones.component';
import { NotaComponent } from './tablas/nota/nota.component';
import { RegistroActividadComponent } from './tablas/registro-actividad/registro-actividad.component';
import { ControlAsignaturaComponent } from './tablas/control-asignatura/control-asignatura.component'
import { AsistenciaComponent } from './tablas/asistencia/asistencia.component';
import { ProfesorComponent } from './tablas/profesor/profesor.component';
import { UtpComponent } from './tablas/utp/utp.component';
import { ResumenAsistenciaComponent } from './tablas/resumen-asistencia/resumen-asistencia.component';
import { AsignaturaProfesorComponent } from './tablas/asignatura-profesor/asignatura-profesor.component';
import { EvaluacionComponent } from './tablas/evaluacion/evaluacion.component';
import { FichaAlumnoComponent } from './tablas/ficha-alumno/ficha-alumno.component';
import { TablaComponent } from './tablas/tabla/tabla.component';
import { VentanaComponent } from './tablas/ventana/ventana.component';
import { RegistroUsuarioComponent } from './tablas/registro-usuario/registro-usuario.component';
import { ResumenNotaComponent } from './tablas/resumen-nota/resumen-nota.component';
import { AsignaturaCursoComponent } from './tablas/asignatura-curso/asignatura-curso.component';
import { CursoProfesorComponent } from './tablas/curso-profesor/curso-profesor.component';

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/acerca', component: HomeComponent, data :{ showme:"acerca"} },
  { path: 'home/contacto', component: HomeComponent, data :{ showme:"contacto"} },
  { path: 'home/tutoriales', component: HomeComponent, data :{ showme:"tutoriales"} },
  { path: 'home/preguntas', component: HomeComponent, data :{ showme:"preguntas"} },



  { path: 'alumno', component: AlumnoComponent, canActivate: [AuthGuard] },
  { path: 'alumno/:msg', component: AlumnoComponent, canActivate: [AuthGuard]},

  { path: 'estadoalumno', component: EstadoAlumnoComponent, canActivate: [AuthGuard] },
  { path: 'estadoalumno/:id', component: EstadoAlumnoComponent, canActivate: [AuthGuard]},

  { path: 'apoderado', component: ApoderadoComponent, canActivate: [AuthGuard] },
  { path: 'apoderado/:id/:padre', component: ApoderadoComponent, canActivate: [AuthGuard] },

  { path: 'matricula', component: MatriculaComponent, canActivate: [AuthGuard] },
  { path: 'matricula/:id/:padre', component: MatriculaComponent, canActivate: [AuthGuard] },

  { path: 'colegio', component: ColegioComponent, canActivate: [AuthGuard] },
  { path: 'colegio/:id:/padre', component: ColegioComponent, canActivate: [AuthGuard]},

  { path: 'profesor', component: ProfesorComponent, canActivate: [AuthGuard] },
  { path: 'profesor/:id:/padre', component: ProfesorComponent, canActivate: [AuthGuard]},

  { path: 'utp', component: UtpComponent, canActivate: [AuthGuard] },
  { path: 'utp/:id:/padre', component: UtpComponent, canActivate: [AuthGuard]},

  { path: 'asistentecolegio', component: AsistenteColegioComponent, canActivate: [AuthGuard] },
  { path: 'asistentecolegio/:id', component: AsistenteColegioComponent, canActivate: [AuthGuard] },


  { path: 'curso', component: CursoComponent, canActivate: [AuthGuard] },
  { path: 'curso/:id/:padre', component: CursoComponent, canActivate: [AuthGuard] },

  { path: 'asignatura', component: AsignaturaComponent, canActivate: [AuthGuard] },
  { path: 'asignatura/:id/:padre', component: AsignaturaComponent, canActivate: [AuthGuard] },

  { path: 'horaasignada', component: HoraAsignadaComponent, canActivate: [AuthGuard] },
  { path: 'horaasignada/:id/:padre', component: HoraAsignadaComponent, canActivate: [AuthGuard] },

  { path: 'horario', component: HorarioComponent, canActivate: [AuthGuard] },
  { path: 'horario/:anno/:colegio/:curso/:profesor/:asignaturaprofesor', component: HorarioComponent, canActivate: [AuthGuard] },

  { path: 'horasinscritas', component: HorasInscritasComponent, canActivate: [AuthGuard] },

  { path: 'tipousuario', component: TipoUsuarioComponent, canActivate: [AuthGuard] },

  { path: 'usuario', component: UsuarioComponent, canActivate: [AuthGuard] },
  { path: 'usuario/:id/:padre', component: UsuarioComponent, canActivate: [AuthGuard] },

  { path: 'anotaciones', component: AnotacionesComponent, canActivate: [AuthGuard] },
  { path: 'anotaciones/:id/:padre', component: AnotacionesComponent, canActivate: [AuthGuard] },

  { path: 'fichaalumno', component: FichaAlumnoComponent, canActivate: [AuthGuard] },
  { path: 'fichaalumno/:id/:padre', component: FichaAlumnoComponent, canActivate: [AuthGuard] },

  { path: 'nota', component: NotaComponent, canActivate: [AuthGuard]},
  { path: 'nota/:id/:padre', component: NotaComponent, canActivate: [AuthGuard]},

  { path: 'registro_actividad', component: RegistroActividadComponent, canActivate: [AuthGuard]},
  { path: 'registro_actividad/:id/:padre', component: RegistroActividadComponent, canActivate: [AuthGuard]},

  { path: 'control_asignatura', component: ControlAsignaturaComponent, canActivate: [AuthGuard]},
  { path: 'control_asignatura/:id/:padre', component: ControlAsignaturaComponent, canActivate: [AuthGuard]},

  { path: 'asistencia', component: AsistenciaComponent, canActivate: [AuthGuard]},
  { path: 'asistencia/:id/:padre', component: AsistenciaComponent, canActivate: [AuthGuard]},

  { path: 'resumen_asistencia', component: ResumenAsistenciaComponent, canActivate: [AuthGuard]},
  { path: 'resumen_asistencia/:id/:padre', component: ResumenAsistenciaComponent, canActivate: [AuthGuard]},

  { path: 'asignaturaprofesor', component: AsignaturaProfesorComponent, canActivate: [AuthGuard]},
  { path: 'asignaturaprofesor/:id/:padre', component: AsignaturaProfesorComponent, canActivate: [AuthGuard]},

  { path: 'matricula-alumno', component: MatriculaAlumnoComponent, canActivate: [AuthGuard] },

  { path: 'evaluacion', component: EvaluacionComponent, canActivate: [AuthGuard]},

  { path: 'tabla', component: TablaComponent, canActivate: [AuthGuard]},

  { path: 'ventana', component: VentanaComponent, canActivate: [AuthGuard]},

  { path: 'registro-usuario', component: RegistroUsuarioComponent, canActivate: [AuthGuard] },

  { path: 'resumennota', component: ResumenNotaComponent },

  { path: 'asignaturacurso', component: AsignaturaCursoComponent },

  { path: 'cursoprofesor', component: CursoProfesorComponent },


  { path: '**', redirectTo: 'home' ,pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
