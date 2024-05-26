import { Component, OnInit } from '@angular/core';
import { environment as env } from '../../../environments/environment';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';

import { DeviceDetectorService } from 'ngx-device-detector';
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


  constructor(private deviceService: DeviceDetectorService) {
    const getColor = (color:string | null) => {
          if (color=='primary' || !color) { 
            this.color = this.objcolors.primary.color;
            this.lineal = this.objcolors.primary.lineal;
            }
          else if (color=='success') {
            this.color = this.objcolors.success.color;
            this.lineal = this.objcolors.success.lineal;

          }
          else if (color=='info') {
            this.color = this.objcolors.info.color;
            this.lineal = this.objcolors.info.lineal;
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
  epicFunction() {
    // console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    /*
    console.log(this.deviceInfo);
    console.log('ismobile',isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log('istablet',isTablet);  // returns if the device us a tablet (iPad etc)
    console.log('isdestop',isDesktopDevice); // returns if the app is running on a Desktop browser.
    */
    this.fotolibro = ( isMobile ) ? '60px' : '80px';
    this.fototexto = ( isDesktopDevice ) ? '400px' : '170px';
  }

  ngOnInit(): void {
     this.epicFunction()
  }

}