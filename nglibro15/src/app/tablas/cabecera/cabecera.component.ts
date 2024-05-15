import { Component, OnInit } from '@angular/core';
import { environment as env } from '../../../environments/environment';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';


@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit{

  deviceInfo!:any;

  color!:string;
  lineal!:string;
  fullName = '';
  objcolors = env.colors;

  isMobile=false;
  isTablet=false;
  isDesktopDevice=false;

  fotolibro!:any;
  fototexto!:any;

   @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;


  constructor() {
    const getColor = (color:string | null) => {
          if (color=='azul' || !color) { 
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
    this.usuario$.subscribe((info:any) => {
      if (info.personalInfo) {
        getColor(info.personalInfo.usuario.Tema.nombre);
        localStorage.setItem('Color',info.personalInfo.usuario.Tema.nombre);

      }
      else {
        getColor(localStorage.getItem('Color'));
      }
    })
  }

  ngOnInit(): void {
   
  }

}
