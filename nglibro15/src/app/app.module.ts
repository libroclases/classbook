import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoComponent } from './tablas/alumno/alumno.component';
import { AnotacionesComponent } from './tablas/anotaciones/anotaciones.component';
import { ApoderadoComponent } from './tablas/apoderado/apoderado.component';
import { AsignaturaComponent } from './tablas/asignatura/asignatura.component';
import { AsignaturaProfesorComponent } from './tablas/asignatura-profesor/asignatura-profesor.component';
import { AsistenciaComponent } from './tablas/asistencia/asistencia.component';
import { AsistenteColegioComponent } from './tablas/asistente-colegio/asistente-colegio.component';
import { CabeceraComponent } from './tablas/cabecera/cabecera.component';
import { ColegioComponent } from './tablas/colegio/colegio.component';
import { ControlAsignaturaComponent } from './tablas/control-asignatura/control-asignatura.component';
import { CursoComponent } from './tablas/curso/curso.component';
import { EstadoAlumnoComponent } from './tablas/estado-alumno/estado-alumno.component';
import { EvaluacionComponent } from './tablas/evaluacion/evaluacion.component';
import { HomeComponent } from './tablas/home/home.component';
import { HoraAsignadaComponent } from './tablas/hora-asignada/hora-asignada.component';
import { HorarioComponent } from './tablas/horario/horario.component';
import { HorasInscritasComponent } from './tablas/horas-incritas/horas-incritas.component';
import { MatriculaComponent } from './tablas/matricula/matricula.component';
import { MatriculaAlumnoComponent } from './tablas/matricula-alumno/matricula-alumno.component';
import { MenuComponent } from './tablas/menu/menu.component';
import { NotaComponent } from './tablas/nota/nota.component';
import { ProfesorComponent } from './tablas/profesor/profesor.component';
import { RegistroActividadComponent } from './tablas/registro-actividad/registro-actividad.component';
import { ResumenAsistenciaComponent } from './tablas/resumen-asistencia/resumen-asistencia.component';
import { TipoUsuarioComponent } from './tablas/tipo-usuario/tipo-usuario.component';
import { UsuarioComponent } from './tablas/usuario/usuario.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectComponent } from './shared/componentes/multi-select/multi-select.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModalDialogComponent } from './shared/componentes/modal-dialog/modal-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { environment as env } from '../environments/environment';

import { AuthButtonComponent } from './shared/componentes/auth-button/auth-button.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { EmailValidatorDirective } from './shared/directives/email-validator/email-validator.directive';
import { RutValidatorDirective } from './shared/directives/rut-validator/rut-validator.directive';
import { SelectValidatorDirective } from './shared/directives/select-validator/select-validator.directive';
import { HoraValidatorDirective } from './shared/directives/hora-validator/hora-validator.directive';

import { MaintainerComponent } from './shared/componentes/maintainer/maintainer.component';
import { MaintainerTemplateComponent } from './shared/componentes/maintainer-template/maintainer-template.component';


import { CheckboxCalendarComponent } from './shared/componentes/checkbox-calendar/checkbox-calendar.component';
import { NumbersCalendarComponent } from './shared/componentes/numbers-calendar/numbers-calendar.component';
import { FichaAlumnoComponent } from './tablas/ficha-alumno/ficha-alumno.component';
import { TablaComponent } from './tablas/tabla/tabla.component';
import { VentanaComponent } from './tablas/ventana/ventana.component';
import { RegistroUsuarioComponent } from './tablas/registro-usuario/registro-usuario.component';
import { AdministradorComponent } from './tablas/administrador/administrador.component';
import { ProfeValidatorsDirective } from './shared/directives/profe-validator/profe-validator.directive';

import { ResumenNotaComponent } from './tablas/resumen-nota/resumen-nota.component';
import { AsignaturaCursoComponent } from './tablas/asignatura-curso/asignatura-curso.component';

// NGXS

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { ToastrModule } from 'ngx-toastr';
import { UsuarioState } from './ngxs/usuario.state';
import { PruebaComponent } from './tablas/prueba/prueba.component';



const allowedTables = [
  'access',
  'alumno',
  'anno',
  'anotacion',
  'apoderado',
  'asignatura',
  'asignaturaprofesor',
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
  'perfil',
  'perfiltabla',
  'periodo',
  'profesor',
  'administrador',
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
  'usuarioperfil',
  'ventana',
  'vinculo',
  ];

let allowedList: string[] = [];
allowedTables.forEach((tb) => {
  allowedList.push(`${env.api.serverUrl}/api/${tb}`);
  allowedList.push(`${env.api.serverUrl}/api/${tb}/*`);
});


@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    AnotacionesComponent,
    ApoderadoComponent,
    AsignaturaComponent,
    AsignaturaProfesorComponent,
    AsistenciaComponent,
    AsistenteColegioComponent,
    CabeceraComponent,
    ColegioComponent,
    ControlAsignaturaComponent,
    CursoComponent,
    EstadoAlumnoComponent,
    EvaluacionComponent,
    HomeComponent,
    HoraAsignadaComponent,
    HorarioComponent,
    HorasInscritasComponent,
    MatriculaComponent,
    MatriculaAlumnoComponent,
    MaintainerComponent ,
    MaintainerTemplateComponent,
    MenuComponent,
    NotaComponent,
    ProfesorComponent,
    RegistroActividadComponent,
    ResumenAsistenciaComponent,
    TipoUsuarioComponent,
    UsuarioComponent,
    EmailValidatorDirective,
    RutValidatorDirective,
    SelectValidatorDirective,
    HoraValidatorDirective,
    MultiSelectComponent,
    ModalDialogComponent,
    AuthButtonComponent,
    CheckboxCalendarComponent,
    NumbersCalendarComponent,
    FichaAlumnoComponent,
    TablaComponent,
    VentanaComponent,
    RegistroUsuarioComponent,
    AdministradorComponent,
    ProfeValidatorsDirective,
    ResumenNotaComponent,
    AsignaturaCursoComponent,
    PruebaComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,

    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,

    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

    // ngxs
    NgxsModule.forRoot([UsuarioState], { developmentMode: !env.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({disabled: env.production}),
    NgxsLoggerPluginModule.forRoot({disabled: env.production}),


    // Auth0
    AuthModule.forRoot({
      ...env.auth0,
      httpInterceptor: {
        allowedList: allowedList,
      },
    }),

  ],
  providers: [
    //MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
