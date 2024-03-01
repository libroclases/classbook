import { Injectable } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetdatetimeService {

 

  getDays(colegioId:number, tabla:string, fecha: Date): (Observable<any> | null) {
    console.log(colegioId, tabla, fecha + 'T00:00:00+00:00')
    const diff = (days : any): boolean => { 
      const date = new Date();
      const evento: number = Date.parse(fecha + 'T00:00:00+00:00');
      const epoch: number = date.getTime();
      const diff =  (epoch/1000 - evento/1000)/86400;
      console.log(diff);
      return (+diff <= +days[0]['dias']) ? true : false;
    }
 

    return this.crud.getData('ventana',[colegioId,0])?.pipe(
       map(days => days.filter((d:any) => d.Tabla.nombre == tabla)),
       map(days => diff(days))
    )!
     
 
  }

  constructor( private crud: CrudService) { }
}
