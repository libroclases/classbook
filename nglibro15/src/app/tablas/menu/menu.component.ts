import { Component, OnInit, inject } from '@angular/core';

import { IconsService } from '../../shared/services/icons/icons.service';
import { environment as env, lowerUpperTables } from '../../../environments/environment';
import { ColorService } from '../../shared/services/color-service/color.service';
import { TypeService } from 'src/app/shared/services/type-service/type-service';
import { AuthService } from '@auth0/auth0-angular';
import { CrudService } from '../../shared/services/crud/crud.service';
import { UserInfoService } from '../../shared/services/user-info/user-info.service';
import { AuthButtonComponent } from '../../shared/componentes/auth-button/auth-button.component';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{

    objcolors = env.colors;
    menu!:string;
    email = 'contacto@libroclases.cl';
    color!:string;

    userinfo = env.userinfo;

    docElement!: HTMLElement;
    isFullScreen: boolean = false;

    ngOnInit(): void {
    this.docElement = document.documentElement;
    // console.log(this.auth.user$.subscribe(info => console.log(info)))
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

  constructor(

    private iconsService: IconsService,
    public userInfo: UserInfoService,
    private router: Router,
    public cs: ColorService,
    public ts: TypeService,
    private crud: CrudService,
    public auth: AuthService) {

    this.userInfo.usermsg.subscribe(info => { if (info) {
      this.tipousuario = info.TipoUsuario.nombre;
    }})



      cs.msg.subscribe(color =>  {
        this.color = color;
        if (color=='azul') {
          this.menu = this.objcolors.azul.menu;
        }
        else if (color=='verde') {
          this.menu = this.objcolors.verde.menu;
        }
        else if (color=='naranjo') {
          this.menu = this.objcolors.naranjo.menu;
        }

      })


  }

  getBiClass(route: string) {
    // para usar IconsService.getBiClass desde html
    return this.iconsService.getBiClass(route);
  }

  sendtype(tabla: string, tipo:string) { this.ts.nextType({tabla,tipo}) }

  mensaje(color: any) {

    if (color) {
      this.userInfo.usermsg.subscribe(info => {

        if(info) {

          this.crud.putData({id: info.id, Tema: color[0]},'usuario')
          .subscribe(() => {
            this.cs.nextColor(color[1]);
            sessionStorage.setItem('Color',color[1]);
          })
   
        }

       })
    }
  }


  getIconLabel(route: string) {
    // para usar IconsService.getIconLabel desde html
    return this.iconsService.getLabel(route);
  }
}

