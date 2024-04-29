import { Component } from '@angular/core';
import { environment as env } from '../../../environments/environment';
import { UserInfoService } from '../../shared/services/user-info/user-info.service';
import { MessageService } from '../../shared/services/message/message.service';
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
    private userInfo: UserInfoService,
    // private ms: MessageService,
    private auth: AuthService) {

    this.auth.isAuthenticated$.subscribe(isAuth => { if(isAuth) {

      console.log('estoy autentificado');

      userInfo.personalInfo$.subscribe( info  => {
        
        if (info.personalInfo) {
          // console.log('poronga',info.personalInfo.usuario.Tema.nombre);
          // this.ms.nextColor(info.personalInfo.usuario.Tema.nombre);
          sessionStorage.setItem('Color', info.personalInfo.usuario.Tema.nombre);
          this.fullName = (info.personalInfo.datos_persona) ? Object.values(info.personalInfo.datos_persona).slice(1).toString(): '';
        } else {
          this.fullName = '';
          
        }

      }) ;

    } else {
       let color = sessionStorage.getItem('Color');
       // if (color) { this.ms.nextColor(color) }
       // else { this.ms.nextColor('azul'); }

    }

    })

    const getColor = (color:string) => {

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
  
    }
  
      this.userInfo.personalInfo$.subscribe(info => info.inscripcionColegio.forEach((el:any) => {
        getColor(info.personalInfo.usuario.Tema.nombre);
      }))
      
  }

}
