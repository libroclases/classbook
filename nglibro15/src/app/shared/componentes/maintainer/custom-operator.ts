/*


import { OperatorFunction, debounceTime, distinctUntilChanged, Observable, filter } from 'rxjs';
const DEFAULT_TIME = 500;


export function customOperator<T>(
  filterFn: (value: T) => boolean,
  debounceTimeFn: number,
  distinctFn: (value: T, otherValue: T) => boolean): OperatorFunction<T, T>{
  return (source: Observable<T>) =>
    source.pipe(
      filter(filterFn),
      debounceTime(debounceTimeFn || DEFAULT_TIME),
      distinctUntilChanged(distinctFn)
    );
}
*/
/*
import { Permission } from "src/environments/environment.development";

const currentDate:Date = new Date();
let permiso:any = { leer: true, editar:true, crear:true }

export function getPermission(info: any): any  {

  const colegio = 1;  // REVISAR

  const year = currentDate.getFullYear();

  switch(info.personalInfo.usuario.TipoUsuario.nombre) {
    case 'profesor': {

    info.inscripcionColegio.forEach((ins:any) => {
          if (ins.Anno.id == (year - 2020) && ins.Colegio.id == colegio) {

          permiso.leer = !Permission.Colegio.leer.includes('profesor')
          permiso.editar = (Permission.Colegio.editar.includes('utp') && ins.esUtp) ? false : true;
          permiso.crear = (Permission.Colegio.crear.includes('utp') && ins.esUtp) ? false : true;
        }

     });

      return permiso;
    }
    case 'admin': {
      permiso.leer = false;
      permiso.editar = false;
      permiso.crear = false;
      return permiso;

    }
    default: {
       null
       return permiso;
      }

 }


}
*/
