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

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{

    @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

    permission:any = Permission

    fullName!:any;
    tipousuario:any=null;
    esUtp=false;
    saludo!:string;



    deviceinfo!:any;
    // mostra=false;
    
    objcolors = env.colors;
    menu!:string;
    color!:string;
    canvas!:string;
    tabletype!:string;
    letters!: string;
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

    getColor = (color:string) => {

      if (color=='azul') {
        this.color="azul";
        this.menu = this.objcolors.azul.menu;
        this.canvas = 'bg-primary';
        this.tabletype = 'table-primary';
        this.letters = 'blue';
      }
      if (color=='verde') {
        this.color = "verde";
        this.menu = this.objcolors.verde.menu;
        this.canvas = 'bg-success';
        this.tabletype = 'table-success';
        this.letters = 'green';
      }
      if (color=='info') {
        this.color = "info";
        this.menu = this.objcolors.info.menu;
        this.canvas = 'bg-info';
        this.tabletype = 'table-info';
        this.letters = 'info';
      }
    }

    ngOnInit(): void {

    const year = this.currentDate.getFullYear().toString();

    // this.epicFunction();

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
    // private deviceService: DeviceDetectorService,
    public auth: AuthService) {
      this.auth.user$.pipe(
        map((user:any) => user?.email),
        tap(user => { if (user) this.store.dispatch(new GetUsuario(user))}),
        takeLast(1)
 
      ).subscribe();
    }

    /*
    epicFunction() {
     
      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isDesktopDevice = this.deviceService.isDesktop();
      this.mostra = ( isDesktopDevice==true ) ? true : false;
    }
    */

    mostrar_color() { this.getColor(localStorage.getItem('Color')!)}

  /* store functions */

  setTable(table:string) {
      // this.store.dispatch(new GetPermiso(this.permission[table]));
      localStorage.setItem('Menu',table);
  }

  mensaje(color:any) {
    localStorage.setItem('Color', color[1])
    this.store.dispatch(new SetUsuario(color[0], this.usuarioId)).pipe(
      //tap(() => localStorage.setItem('Color', color[1])),
      //tap(() => this.getColor(color[1]))
    )

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
