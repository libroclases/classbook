import { Component } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { UserInfoService } from '../../shared/services/user-info/user-info.service';
import { ColorService } from '../../shared/services/color-service/color.service';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

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

  constructor(
    public userInfo: UserInfoService,
    public cs: ColorService,
    public auth: AuthService) {

    this.auth.isAuthenticated$.subscribe(isAuth => { if(isAuth) {
      userInfo.personalInfo$.subscribe( info  => {
        if (info.usuario) {
          this.cs.nextColor(info.usuario.Tema.nombre);
          sessionStorage.setItem('Color', info.usuario.Tema.nombre);
          this.fullName = (info.datos_usuario) ? Object.values(info.datos_usuario).slice(1).toString(): '';
        } else {
          this.fullName = '';
          
        }

      }) ;

    } else {
       let color = sessionStorage.getItem('Color');
       if (color) { this.cs.nextColor(color) }
       else { this.cs.nextColor('azul'); }

    }

    })


    cs.color_msg.subscribe((color:any) =>  {
      if (color=='azul') {
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
    })

  }

}
