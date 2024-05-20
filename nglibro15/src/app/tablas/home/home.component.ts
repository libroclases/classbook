import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { body, intro, titles, bottom } from './datatexto';
import {Select} from '@ngxs/store';
import { Usuario } from '../../ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  url!:string;
  photo = environment.photo;
  position = "center";
  size = "cover";

  color!:string;
  opacity="70%";

  titles:any = titles;
  intro:any = intro;
  body:any = body;
  bottom:any = bottom;

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;


  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';

  showme = '';

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  constructor(
    activatedRoute: ActivatedRoute,

    ) {

    activatedRoute.data.subscribe(data => {
      this.showme = data['showme'];
    })


  }
  ngOnInit(): void {
    const getColor = (color:string | null) => {
      
      if (color=='azul' || !color) {
        this.color="azul";  this.url = this.photo.azul;      }
      if (color=='verde') {
        this.color = "verde"; this.url = this.photo.verde;       }
      if (color=='naranjo') {
        this.color = "naranjo"; this.url = this.photo.naranjo;      }

    }
    this.usuario$.subscribe((info:any) => {
      if (info.personalInfo) {getColor(info.personalInfo.usuario.Tema.nombre)}
      else { getColor(localStorage.getItem('Color')) }
    }
   )
  }

}
