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

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{

    @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

    fullName!:any;

    objcolors = env.colors;
    menu!:string;
    color!:string;
    production = env.production;
    userinfo = env.userinfo;

    docElement!: HTMLElement;
    isFullScreen: boolean = false;


    ngOnInit(): void {
    this.docElement = document.documentElement;

    const getColor = (color:string) => {
      console.log(color);
      if (color=='azul') {
        this.color="azul";  this.menu = this.objcolors.azul.menu;  }
      if (color=='verde') {
        this.color = "verde"; this.menu = this.objcolors.verde.menu;   }
      if (color=='naranjo') {
        this.color = "naranjo"; this.menu = this.objcolors.naranjo.menu;    }
    }

    this.usuario$.subscribe((info:any) => {
          if (info.personalInfo) {
            let re = /,/gi; 
            getColor(info.personalInfo.usuario.Tema.nombre) 
            //this.fullName = (info.personalInfo.datos_persona) ? Object.values(info.personalInfo.datos_persona).slice(1).toString().replace(re," "): ''; 
            this.fullName = (info.personalInfo.datos_persona) ? Object.values(info.personalInfo.datos_persona)[1]: ''
          }
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

  tipousuario:any=null;
  esUtp=false;

  constructor(
    private iconsService: IconsService,
    private router: Router,
    private store: Store,
    public auth: AuthService) {
      this.auth.user$.pipe(
        map((user:any) => user?.email),
        tap(user => { if (user) this.store.dispatch(new GetUsuario(user))})
      ).subscribe()
      ;
    }

  getBiClass(route: string) {
    // para usar IconsService.getBiClass desde html
    return this.iconsService.getBiClass(route);
  }

  mensaje(color:any) { 
    // console.log('poronga',email);
    this.store.dispatch(new GetUsuario('vcherrera_7@gmail.com'));
    console.log('spapshot', this.store.snapshot())
    // this.store.dispatch(new SetUsuario(color[1], 1));
  }

  getIconLabel(route: string) {
    // para usar IconsService.getIconLabel desde html
    return this.iconsService.getLabel(route);
  }
}
