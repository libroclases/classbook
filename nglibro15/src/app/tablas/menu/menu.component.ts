import { Component, OnInit, inject } from '@angular/core';
import { IconsService } from '../../shared/services/icons/icons.service';
import { environment as env } from '../../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import {  Usuario } from '../../ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Observable, map, takeLast, tap } from 'rxjs';
import { GetUsuario, SetUsuario } from 'src/app/ngxs/usuario/usuario.actions';
// import { DeviceDetectorService } from 'ngx-device-detector';

import { Permission } from 'src/environments/environment.development';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{

    @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

    permission:any = Permission
    poronga = false;
    fullName!:any;
    tipousuario:any=null;
    esUtp=false;
    saludo!:string;



    deviceinfo!:any;
    mostra_usuario=false;

    objcolors = env.colors;
    menu!:string;
    color!:string;
    canvas!:string;
    production = env.production;
    userinfo = env.userinfo;
    tipousuarioNombre!:string;
    docElement!: HTMLElement;
    isFullScreen: boolean = false;

    usuarioId!:number;
    type!:string;
    deviceInfo!:any;

    currentDate:Date = new Date();
    isUtp:any=null;

    email!:string;

    menuTableMap = new Map<string, any>();
    menuIcons:any = ['bi bi-house-door', 'bi bi-table', 'bi bi-bank', 'bi bi-mortarboard-fill', 'bi bi-person-video3', 'bi bi-person-fill-lock','bi bi-question-square']; 
    menuTitles:any = ['Asistencia', 'Colegio', 'Alumno', 'Profesor', 'Administración', 'Procesos','Ayuda'];

    menuTables:any = [
      [
        {'submenu':'asistencia', 'nombre': 'Ingreso',  'disable':false},
        {'submenu':'resumen_asistencia', 'nombre' : 'Resumen Asistencia', 'disable':false},
        {'submenu':'control_asignatura', 'nombre' : 'Control Asignatura', 'disable':false},
        {'submenu':'registro_actividad', 'nombre' : 'Registro Actividad', 'disable':false}
      ],
      [
        {'submenu': 'colegio', 'nombre': 'Colegio', 'disable':false },
        {'submenu': 'curso', 'nombre': 'Curso', 'disable':false },
        {'submenu': 'asistentecolegio', 'nombre': 'Asistente Colegio', 'disable':false },
        {'submenu': 'asignatura', 'nombre': 'Asignatura', 'disable':false },
        {'submenu': 'horaasignada', 'nombre': 'Hora Asignada', 'disable':false },
      ],
      [
        {'submenu': 'alumno', 'nombre': 'Alumno', 'disable':false },
        {'submenu': 'estadoalumno', 'nombre': 'Estado Alumno', 'disable':false },
        {'submenu': 'apoderado', 'nombre': 'Apoderado', 'disable':false },
        {'submenu': 'anotaciones', 'nombre': 'Anotaciones', 'disable':false },
        {'submenu': 'fichaalumno', 'nombre': 'Ficha Alumno', 'disable':false },
        {'submenu': 'matricula', 'nombre': 'Matricula', 'disable':false },
      ],
      [
        {'submenu': 'profesor', 'nombre': 'Profesor', 'disable':false },
        {'submenu': 'inscripcioncolegio', 'nombre': 'Inscripción Colegio', 'disable':false },
        {'submenu': 'cursoprofesor', 'nombre': 'Curso Profesor', 'disable':false },
        {'submenu': 'evaluacion', 'nombre': 'Evaluación', 'disable':false },
        {'submenu': 'nota', 'nombre': 'Nota', 'disable':false },
        {'submenu': 'resumennota', 'nombre': 'Resumen Nota', 'disable':false },
        {'submenu': 'horario', 'nombre': 'Horario', 'disable':false },
        {'submenu': 'horasinscritas', 'nombre': 'Horas Inscritas', 'disable':false },
      ],
      [
        {'submenu': 'usuario', 'nombre': 'Usuario', 'disable':false },
        {'submenu': 'tipousuario', 'nombre': 'Tipo Usuario', 'disable':false },
      ],
      [
        {'submenu': 'registro_usuario', 'nombre': 'Registro Usuario', 'disable':false },
        {'submenu': 'matricula_alumno', 'nombre': 'Matricula Alumno', 'disable':false },
      ],
      [
        {'submenu': 'home/tutoriales', 'nombre': 'Tutoriales', 'disable':false },
        {'submenu': 'home/preguntas', 'nombre': 'Preguntas', 'disable':false },
        {'submenu': 'home/acerca', 'nombre': 'Acerca', 'disable':false },
      ]
    ]


    setType(valor:any): any {
      return valor;
    }

    getColor = (color:string) => {

      if (color=='primary') {
        this.color="primary";
        this.menu = this.objcolors.primary.menu;
        this.canvas = 'bg-primary';
      }
      if (color=='success') {
        this.color = "success";
        this.menu = this.objcolors.success.menu;
        this.canvas = 'bg-success';
 
      }
      if (color=='info') {
        this.color = "info";
        this.menu = this.objcolors.info.menu;
        this.canvas = 'bg-info';
      }
    }

    ngOnInit(): void {

    const year = this.currentDate.getFullYear().toString();

    this.epicFunction();


    this.docElement = document.documentElement;



    // this.permiso$.subscribe(per => console.log('PER:',per))

    this.usuario$.subscribe((info:any) => {
          if (info.personalInfo) {
            this.usuarioId = info.personalInfo.usuario.id;

            this.getColor(info.personalInfo.usuario.Tema.nombre)

            if  (info.personalInfo.datos_persona) {
              this.fullName = info.personalInfo.datos_persona.nombre + ' ' + info.personalInfo.datos_persona.apellido1;
              const sexo = info.personalInfo.datos_persona.Sexo.id;
              const tipousuario = info.personalInfo.usuario.TipoUsuario.nombre;
              this.tipousuarioNombre = info.personalInfo.usuario.TipoUsuario.nombre;
              const saludo = 'Bienvenido';
              this.tipousuario = (sexo == 1)? tipousuario: tipousuario + 'a';
              this.saludo = (sexo == 1)? saludo: saludo.replace(/.$/, 'a');
            }
            if (info.personalInfo.usuario.TipoUsuario.id == 5) { this.type = '(admin)' }
          }

        if (info.inscripcionColegio) { info.inscripcionColegio?.forEach((ins:any) => {
          if (ins.Colegio.id == 1 && ins.Anno.nombre == year && ins.esUtp) { this.type = '(utp)' ; this.isUtp = true}

        }) }
      })
    }


    toggleFullScreen() {
       if (!this.isFullScreen) {
          this.docElement.requestFullscreen();
       }
       else {
          document.exitFullscreen();
       }
       this.isFullScreen = !this.isFullScreen;
    }

    mostra_menu(table:string): boolean {
       return (Permission[table].leer.includes('utp') && this.isUtp || this.tipousuarioNombre=='admin')
    }


  constructor(
    private iconsService: IconsService,
    private router: Router,
    private store: Store,
    private deviceService: DeviceDetectorService,
    public auth: AuthService) {
      this.auth.user$.pipe(
        map((user:any) => user?.email),
        tap(user => { if (user) {
          this.store.dispatch(new GetUsuario(user));
          this.email = user;
        } }),
        takeLast(1)

      ).subscribe();
    }


    epicFunction() {

      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isDesktopDevice = this.deviceService.isDesktop();
      this.mostra_usuario = ( isDesktopDevice ) ? true : false;
    }


    mostrar_color() { this.getColor(localStorage.getItem('Color')!)}

  /* store functions */

  setTable(table:string) {
      localStorage.setItem('Menu',table);
  }

  mensaje(color:any) {
    localStorage.setItem('Color', color[1]);
    this.store.dispatch(new SetUsuario(color[0], this.usuarioId)).pipe(
      tap(() => this.store.dispatch(new GetUsuario(this.email)))
    ).subscribe()

  }

  getBiClass(route: string) {
    // para usar IconsService.getBiClass desde html
    return this.iconsService.getBiClass(route);
  }

  getIconLabel(route: string) {
    // para usar IconsService.getIconLabel desde html
    return this.iconsService.getLabel(route);
  }
}
