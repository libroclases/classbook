import { Injectable } from '@angular/core';
import { Permission } from "src/environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class GetPermissionService {

  currentDate:Date = new Date();


  constructor() { }


  getPermission(info: any): any  {

    let permission:any = new Map<string,boolean>([['leer',true],['editar',true],['crear',true]])

    const colegio = 1;  // REVISAR

    const year = this.currentDate.getFullYear();

    switch(info.personalInfo.usuario.TipoUsuario.nombre) {
      case 'profesor': {

      info.inscripcionColegio.forEach((ins:any) => {
            if (ins.Anno.id == (year - 2020) && ins.Colegio.id == colegio) {

            permission.set('leer', !Permission.Colegio.leer.includes('profesor'));
            permission.set('editar',(Permission.Colegio.editar.includes('utp') && ins.esUtp) ? false : true);
            permission.set('crear' , (Permission.Colegio.crear.includes('utp') && ins.esUtp) ? false : true);
          }

       });

        return permission;
      }
      case 'admin': {
        permission.set('leer', false);
        permission.set('editar', false);
        permission.set('crear', false);
        return permission;

      }
      default: {
         null
         return permission;
        }

   }


  }

}
