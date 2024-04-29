import { Component, OnInit, inject } from '@angular/core';

import { IconsService } from '../../shared/services/icons/icons.service';
import { environment as env, lowerUpperTables } from '../../../environments/environment';
import { MessageService } from '../../shared/services/message/message.service';
import { AuthService } from '@auth0/auth0-angular';
import { CrudService } from '../../shared/services/crud/crud.service';
import { UserInfoService } from '../../shared/services/user-info/user-info.service';
import { Router } from '@angular/router';

import {Select, Store} from '@ngxs/store';
import {  Person, UsersStateModel } from '../../ngxs/usuario.model';
import { GetUsuario } from '../../ngxs/usuario.actions'
import { UsuarioState } from 'src/app/ngxs/usuario.state';
import { Observable } from 'rxjs';
import { TipoUsuario } from '../../interfaces/tipousuario.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit{

    // @Select(UsuarioState.usuario) usuario$!: Observable<Person[]>;

    objcolors = env.colors;
    menu!:string;
    email = 'contacto@libroclases.cl';
    color!:string;
    production = env.production;
    userinfo = env.userinfo;

    docElement!: HTMLElement;
    isFullScreen: boolean = false;

    ngOnInit(): void {
    this.docElement = document.documentElement;
    // this.store.dispatch(new GetUsuario(1));

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
    public userInfo: UserInfoService,
    private router: Router,
    private store: Store,
    private crud: CrudService,
    public auth: AuthService) {

    this.userInfo.personalInfo$.subscribe(info => { if (info) {
      if (info.personalInfo) {
        this.tipousuario = info.personalInfo.usuario.TipoUsuario.nombre;
        this.esUtp = info.inscripcionColegio
        // console.log(this.esUtp);  
      }
    }})

    const getColor = (color:string) => {
      console.log(color);
      if (color=='azul') {
        this.color="azul";  this.menu = this.objcolors.azul.menu;  }
      if (color=='verde') {
        this.color = "verde"; this.menu = this.objcolors.verde.menu;   }
      if (color=='naranjo') {
        this.color = "naranjo"; this.menu = this.objcolors.naranjo.menu;    }
  
    }

    this.userInfo.personalInfo$.subscribe(info => info.inscripcionColegio.forEach((el:any) => {
      getColor(info.personalInfo.usuario.Tema.nombre);
    }))


  }

  getBiClass(route: string) {
    // para usar IconsService.getBiClass desde html
    return this.iconsService.getBiClass(route);
  }

  // sendtype(tabla: string, tipo:string) { this.ms.nextType({tabla,tipo}) }

  mensaje(color: any) {
    
    if (color) {
      /*
      this.userInfo.usermsg.subscribe(info => {

        if(info) {

          this.crud.putData({id: info.id, Tema: color[0]},'usuario')
          .subscribe(() => {
            this.ms.nextColor(color[1]);
            sessionStorage.setItem('Color',color[1]);
          })

        }

       })
       */
    }
  }


  getIconLabel(route: string) {
    // para usar IconsService.getIconLabel desde html
    return this.iconsService.getLabel(route);
  }
}

