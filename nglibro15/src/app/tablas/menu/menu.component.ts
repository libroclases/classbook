import { Component, OnInit, inject } from '@angular/core';
import { IconsService } from '../../shared/services/icons/icons.service';
import { environment as env } from '../../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import {  Usuario } from '../../ngxs/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario.state';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{

    @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

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
          if (info[0].personalInfo) { getColor(info[0].personalInfo.usuario.Tema.nombre) }
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

    goPlaces(link:string) {
      this.router.navigate(['/', link]);
    }

  tipousuario:any=null;
  esUtp=false;

  constructor(
    private iconsService: IconsService,
    private router: Router,
    public auth: AuthService) {}

  getBiClass(route: string) {
    // para usar IconsService.getBiClass desde html
    return this.iconsService.getBiClass(route);
  }

  mensaje(color:any[]) { console.log(color)}

  getIconLabel(route: string) {
    // para usar IconsService.getIconLabel desde html
    return this.iconsService.getLabel(route);
  }
}
