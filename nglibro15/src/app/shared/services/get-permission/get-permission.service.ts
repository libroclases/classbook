import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GetPermissionService {

  currentDate:Date = new Date();


  constructor() { }


  getPermission(Evaluacion:any, info: any): any  {

    let permission:any = {leer:true, editar :true, crear: true }

    const colegio = 1;  // REVISAR

    const year = this.currentDate.getFullYear();

    switch(info.personalInfo.usuario.TipoUsuario.nombre) {
      case 'profesor': {

      info.inscripcionColegio?.forEach((ins:any) => {
            var utp:any = (ins.esUtp) ? 'utp' : null;

            if (ins.Anno.nombre == year.toString() && ins.Colegio.id == colegio) {
            console.log('poronga3',Evaluacion)
            permission.leer =  (Evaluacion.leer == 'profesor') ? false : true;
            permission.editar = (Evaluacion.editar == 'utp') ? false : true; // (Permission[tableUpper].editar.includes(utp)) ? false : true
            permission.crear = (Evaluacion.crear == 'utp') ? false : true;  //  (Permission[tableUpper].crear.includes(utp)) ? false : true)
          }
          console.log('permission',permission)
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
