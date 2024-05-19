import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class GetPermissionService {

  currentDate:Date = new Date();


  constructor() { }


  getPermission(Table:any, info: any): any  {

    let permission:any = {}

    const colegio = 1;  // REVISAR

    const year = this.currentDate.getFullYear();

    switch(info.personalInfo.usuario.TipoUsuario.nombre) {
      case 'profesor': {

      info.inscripcionColegio?.forEach((ins:any) => {
            var utp:any = (ins.esUtp) ? 'utp' : null;
            
            if (ins.Anno.nombre == year.toString() && ins.Colegio.id == colegio) {

                  if (utp) {
                      permission.leer =   false; console.log(Table);
                      permission.editar = (Table.editar.includes('utp')) ? false : true; 
                      permission.crear = (Table.crear.includes('utp')) ? false : true;
                  }
                  else {
                      permission.leer =  (Table.leer.includes('profesor')) ? false : true;
                      permission.editar = (Table.editar.includes('profesor')) ? false : true;
                      permission.crear = (Table.crear.includes('profesor')) ? false : true;
                  }
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
