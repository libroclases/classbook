import { Component, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../shared/services/message/message.service';
import { ActivatedRoute } from '@angular/router';
import { body, intro, titles, bottom } from './datatexto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
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


  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  constructor(private ms: MessageService,
    private activatedRoute: ActivatedRoute,
    ) {

    activatedRoute.data.subscribe(data => {
      
      this.showme = data['showme'];
    })

    ms.color_msg.subscribe(color =>  {
      if (color=='azul') { this.color="azul";  this.url = this.photo.azul; }
      else if (color=='verde') { this.color = "verde"; this.url = this.photo.verde; }
      else if (color=='naranjo') { this.color = "naranjo"; this.url = this.photo.naranjo; }
    })

  }

}