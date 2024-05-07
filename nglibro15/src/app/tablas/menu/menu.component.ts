import { Component, OnInit, inject } from '@angular/core';
import { IconsService } from '../../shared/services/icons/icons.service';
import { environment as env } from '../../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import {  Usuario } from '../../ngxs/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario.state';
import { Observable, map, tap } from 'rxjs';
import { GetUsuario, SetUsuario } from 'src/app/ngxs/usuario.actions';
import { DeviceDetectorService } from 'ngx-device-detector';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{

    @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

    fullName!:any;
    tipousuario:any=null;
    esUtp=false;
    saludo!:string;

    deviceinfo!:any;
    mostra=false;

    objcolors = env.colors;
    menu!:string;
    color!:string;
    production = env.production;
    userinfo = env.userinfo;

    docElement!: HTMLElement;
    isFullScreen: boolean = false;

    usuarioId!:number;

    deviceInfo!:any;

    currentDate:Date = new Date();
    isUtp:any=null;

    ngOnInit(): void {

    const year = this.currentDate.getFullYear().toString();

    this.epicFunction();

    this.docElement = document.documentElement;

    const getColor = (color:string) => {

      if (color=='azul') {
        this.color="azul";  this.menu = this.objcolors.azul.menu;  }
      if (color=='verde') {
        this.color = "verde"; this.menu = this.objcolors.verde.menu;   }
      if (color=='naranjo') {
        this.color = "naranjo"; this.menu = this.objcolors.naranjo.menu;    }
    }

    this.usuario$.subscribe((info:any) => {
          if (info.personalInfo) {
            this.usuarioId = info.personalInfo.usuario.id;

            getColor(info.personalInfo.usuario.Tema.nombre)
            //this.fullName = (info.personalInfo.datos_persona) ? Object.values(info.personalInfo.datos_persona).slice(1).toString().replace(re," "): '';
            if  (info.personalInfo.datos_persona) {
              this.fullName = info.personalInfo.datos_persona.nombre + ' ' + info.personalInfo.datos_persona.apellido1;
              const sexo = info.personalInfo.datos_persona.Sexo.id;
              const tipousuario = info.personalInfo.usuario.TipoUsuario.nombre;
              const saludo = 'Bienvenido';
              this.tipousuario = (sexo == 1)? tipousuario: tipousuario + 'a';
              this.saludo = (sexo == 1)? saludo: saludo.replace(/.$/, 'a');
            }
            if (info.personalInfo.usuario.TipoUsuario.id == 5) { this.isUtp = '(dios)' }
          }

        if (info.inscripcionColegio) { info.inscripcionColegio?.forEach((ins:any) => {
          if (ins.Colegio.id == 1 && ins.Anno.nombre == year && ins.esUtp) { this.isUtp = '(utp)' }

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



  constructor(
    private iconsService: IconsService,
    private router: Router,
    private store: Store,
    private deviceService: DeviceDetectorService,
    public auth: AuthService) {
      this.auth.user$.pipe(
        map((user:any) => user?.email),
        tap(user => { if (user) this.store.dispatch(new GetUsuario(user))})
      ).subscribe()
      ;
    }

    epicFunction() {

      this.deviceInfo = this.deviceService.getDeviceInfo();
      const isDesktopDevice = this.deviceService.isDesktop();
      console.log(isDesktopDevice)
      this.mostra = ( isDesktopDevice==true ) ? true : false;
    }

  getBiClass(route: string) {
    // para usar IconsService.getBiClass desde html
    return this.iconsService.getBiClass(route);
  }

  mensaje(color:any) {
    localStorage.setItem('Color', color[1])
    this.store.dispatch(new SetUsuario(color[0], this.usuarioId)).pipe(
      tap(() => localStorage.setItem('Color', color[1]))
    )

  }

  getIconLabel(route: string) {
    // para usar IconsService.getIconLabel desde html
    return this.iconsService.getLabel(route);
  }
}
