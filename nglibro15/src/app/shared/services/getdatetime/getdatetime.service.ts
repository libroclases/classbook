import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdatetimeService {


  calcularDiasHabiles(fechaInicio: Date, fechaFin: Date) {
    const unDiaEnMilisegundos = 24 * 60 * 60 * 1000;
    let contador = 0;

    for (let fechaActual = new Date(fechaInicio); fechaActual <= fechaFin; fechaActual.setDate(fechaActual.getDate() + 1)) {
        // Excluir los fines de semana (sábado y domingo)
        if (fechaActual.getDay() !== 0 && fechaActual.getDay() !== 6) {
            // Aquí puedes agregar lógica para excluir días festivos si es necesario
            // Por ejemplo, si tienes una lista de días festivos:
            // if (!esDiaFestivo(fechaActual)) {
            contador++;
            // }
        }
    }

    return contador;
}


  getDays(colegioId:number, tabla:string, fecha: Date): (Observable<any> | null) {

    const diff = (days : any): boolean => {
      const date = new Date();
      const evento: number = Date.parse(fecha + 'T00:00:00+00:00');
      const epoch: number = date.getTime();
      const diff =  (epoch/1000 - evento/1000)/86400;
      // console.log(diff, days[0]['dias'])
      return (diff <= days[0]['dias'] && diff > 0) ? true : false;
    }


    return this.crud.getData('ventana',[colegioId,0])?.pipe(
       map(days => days.filter((d:any) => d.Tabla.nombre == tabla)),
       map(days => diff(days))
    )!


  }

  constructor( private crud: CrudService) { }
}
