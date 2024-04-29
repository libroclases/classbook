import { Component, HostListener, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../shared/services/message/message.service';
import { ActivatedRoute } from '@angular/router';
import { body, intro, titles, bottom } from './datatexto';
// import { UserInfoService } from 'src/app/shared/services/user-info/user-info.service';

import {Select, Store} from '@ngxs/store';
import { Usuario, UsersStateModel } from '../../ngxs/usuario.model';
import { GetUsuario } from '../../ngxs/usuario.actions'
import { UsuarioState } from 'src/app/ngxs/usuario.state';
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

  color = "";

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
    private activatedRoute: ActivatedRoute,
    private store: Store,
    // private userInfo: UserInfoService
    ) {

    this.store.dispatch(new GetUsuario('vcherrera_7@gmail.com'));
    activatedRoute.data.subscribe(data => {
      
      this.showme = data['showme'];
    })


  }
  ngOnInit(): void {
    const getColor = (color:string) => {
      console.log(color);
      if (color=='azul') {
        this.color="azul";  this.url = this.photo.azul;      }
      if (color=='verde') {
        this.color = "verde"; this.url = this.photo.verde;       }
      if (color=='naranjo') {
        this.color = "naranjo"; this.url = this.photo.naranjo;      }
  
    }
    this.usuario$.subscribe((inf:any) => getColor(inf[0].personalInfo.usuario.Tema.nombre))
  }

}