import { Component } from '@angular/core';
import { environment as env } from '../../../environments/environment';
// import { UserInfoService } from '../../shared/services/user-info/user-info.service';
// import { MessageService } from '../../shared/services/message/message.service';
import { AuthService } from '@auth0/auth0-angular';
import { Select, Store } from '@ngxs/store';
// import { GetUsuario } from 'src/app/ngxs/usuario.actions';
import { Observable, isEmpty } from 'rxjs';
import { UsuarioState } from 'src/app/ngxs/usuario.state';
import { Usuario } from 'src/app/ngxs/usuario.model';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {

  color!:string;
  lineal!:string;
  fullName = '';
  objcolors = env.colors;


   @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  constructor( private auth: AuthService) {

    this.auth.isAuthenticated$.subscribe(isAuth => { if(isAuth) {
      console.log('estoy autentificado');
      this.usuario$.subscribe( (info:any)  => {
        if (info[0].personalInfo) {

          console.log('poronga',info[0].personalInfo.usuario.Tema.nombre);
          getColor(info[0].personalInfo.usuario.Tema.nombre);
          this.fullName = (info[0].personalInfo.datos_persona) ? Object.values(info[0].personalInfo.datos_persona).slice(1).toString(): '';
        }

      }) ;
     } else {
        this.fullName="";
        getColor(sessionStorage.getItem('Color'))
      }
    })

    const getColor = (color:string | null) => {

      if (color=='azul' || !color) { console.log('color',color)
        this.color = this.objcolors.azul.color;
        this.lineal = this.objcolors.azul.lineal;
       }
      else if (color=='verde') {
        this.color = this.objcolors.verde.color;
        this.lineal = this.objcolors.verde.lineal;

      }
      else if (color=='naranjo') {
        this.color = this.objcolors.naranjo.color;
        this.lineal = this.objcolors.naranjo.lineal;
      }

    }

  }

}
