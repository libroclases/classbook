import { Component, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ColorService } from '../../shared/services/color-service/color.service';
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

  constructor(private cs: ColorService,
    activatedRoute: ActivatedRoute,
    ) {

    /*
    const ifParams = (params : any) :  any => {
      console.log('params',params);
      if (Object.keys(params).length == 0) { this.showme=''; }
      else { this.showme = params.msg }
    }


    activatedRoute.params.subscribe(params => ifParams(params))
    */

    activatedRoute.data.subscribe(data => {
      //this.showme = data
      this.showme = data['showme'];
    })

    cs.msg.subscribe(color =>  {
      if (color=='azul') { this.color="azul";  this.url = this.photo.azul; }
      else if (color=='verde') { this.color = "verde"; this.url = this.photo.verde; }
      else if (color=='naranjo') { this.color = "naranjo"; this.url = this.photo.naranjo; }
    })

  }

}