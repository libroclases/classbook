import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthModule, AuthService } from '@auth0/auth0-angular';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CheckboxCalendarComponent } from './shared/componentes/checkbox-calendar/checkbox-calendar.component';
import { MaintainerComponent } from './shared/componentes/maintainer/maintainer.component';
import { ApoderadoComponent } from './tablas/apoderado/apoderado.component';
import { CursoComponent } from './tablas/curso/curso.component';
import { AlumnoComponent } from './tablas/alumno/alumno.component';
import { ColegioComponent } from './tablas/colegio/colegio.component';
import { ProfesorComponent } from './tablas/profesor/profesor.component';
import { ModalDialogComponent } from './shared/componentes/modal-dialog/modal-dialog.component';
import { EstadoAlumnoComponent } from './tablas/estado-alumno/estado-alumno.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AnotacionesComponent } from './tablas/anotaciones/anotaciones.component';
import { AsignaturaComponent } from './tablas/asignatura/asignatura.component';
import { AsignaturaProfesorComponent } from './tablas/asignatura-profesor/asignatura-profesor.component';
import { AsistenciaComponent } from './tablas/asistencia/asistencia.component';
import { AsistenteColegioComponent } from './tablas/asistente-colegio/asistente-colegio.component';
import { CabeceraComponent } from './tablas/cabecera/cabecera.component';
import { ControlAsignaturaComponent } from './tablas/control-asignatura/control-asignatura.component';
import { EvaluacionComponent } from './tablas/evaluacion/evaluacion.component';
import { HomeComponent } from './tablas/home/home.component';
import { HoraAsignadaComponent } from './tablas/hora-asignada/hora-asignada.component';
import { HorarioComponent } from './tablas/horario/horario.component';
import { HorasInscritasComponent } from './tablas/horas-incritas/horas-incritas.component';
import { MatriculaComponent } from './tablas/matricula/matricula.component';
import { MatriculaAlumnoComponent } from './tablas/matricula-alumno/matricula-alumno.component';
import { MaintainerTemplateComponent } from './shared/componentes/maintainer-template/maintainer-template.component';
import { MenuComponent } from './tablas/menu/menu.component';
import { NotaComponent } from './tablas/nota/nota.component';
import { RegistroActividadComponent } from './tablas/registro-actividad/registro-actividad.component';
import { ResumenAsistenciaComponent } from './tablas/resumen-asistencia/resumen-asistencia.component';
import { TipoUsuarioComponent } from './tablas/tipo-usuario/tipo-usuario.component';
import { UsuarioComponent } from './tablas/usuario/usuario.component';
import { EmailValidatorDirective } from './shared/directives/email-validator/email-validator.directive';
import { RutValidatorDirective } from './shared/directives/rut-validator/rut-validator.directive';
import { SelectValidatorDirective } from './shared/directives/select-validator/select-validator.directive';
import { HoraValidatorDirective } from './shared/directives/hora-validator/hora-validator.directive';
import { MultiSelectComponent } from './shared/componentes/multi-select/multi-select.component';
import { AuthButtonComponent } from './shared/componentes/auth-button/auth-button.component';
import { NumbersCalendarComponent } from './shared/componentes/numbers-calendar/numbers-calendar.component';
import { FichaAlumnoComponent } from './tablas/ficha-alumno/ficha-alumno.component';
import { TablaComponent } from './tablas/tabla/tabla.component';
import { VentanaComponent } from './tablas/ventana/ventana.component';
import { RegistroUsuarioComponent } from './tablas/registro-usuario/registro-usuario.component';
import { UtpComponent } from './tablas/utp/utp.component';
import { ProfeValidatorsDirective } from './shared/directives/profe-validator/profe-validator.directive';
import { CrudService } from './shared/services/crud/crud.service';
import { ForeignKeysService } from './shared/services/foreign-keys/foreign-keys.service';
import { IconsService } from './shared/services/icons/icons.service';
import { LabelsService } from './shared/services/labels/labels.service';
import { OriginTableIdService } from './shared/services/origin-table-id/origin-table-id.service';
import { SelectionIdsService } from './shared/services/selection-ids/selection-ids.service';
import { SubscriptionsManagerService } from './shared/services/subscriptions-manager/subscriptions-manager.service';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgbModule,
        AuthModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
    
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatIconModule,
       
      ],
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
        UtpComponent,
        ProfeValidatorsDirective,
        
      ],
      providers: [AuthService, CrudService, ForeignKeysService, MaintainerComponent,
        IconsService,LabelsService ,OriginTableIdService,SelectionIdsService, SubscriptionsManagerService
       ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
  /*
  it(`should have as title 'nglibro15'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('nglibro15');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('nglibro15 app is running!');
  });
  */
});
