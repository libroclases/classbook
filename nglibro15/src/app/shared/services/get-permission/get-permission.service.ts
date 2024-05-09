import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class GetPermissionService {

  currentDate:Date = new Date();


  constructor() { }


  getPermission(Table:any, info: any): any  {

    let permission:any = {}
    console.log('Table',Table)
    console.log('TipoUsuario.nombre', info.personalInfo.usuario.TipoUsuario.nombre)
    const colegio = 1;  // REVISAR

    const year = this.currentDate.getFullYear();

    switch(info.personalInfo.usuario.TipoUsuario.nombre) {
      case 'profesor': {

      info.inscripcionColegio?.forEach((ins:any) => {
            var utp:any = (ins.esUtp) ? 'utp' : null;
            console.log('utp',utp);
            if (ins.Anno.nombre == year.toString() && ins.Colegio.id == colegio) {

            permission.leer =  (Table.leer == 'profesor') ? false : true;
            permission.editar = (Table.editar == 'utp' && utp) ? false : true;
            permission.crear = (Table.crear == 'utp' && utp) ? false : true;
          }

       }
      )
        return permission;
      }
      case 'admin': {
        permission.leer = false;
        permission.editar = false;
        permission.crear = false;
        return permission;

      }
      default: {
         null
         return permission;
        }

   }


  }

}
