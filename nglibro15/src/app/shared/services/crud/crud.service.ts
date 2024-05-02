import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, share, take, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '@auth0/auth0-angular';


@Injectable({
  providedIn: 'root',
})
export class CrudService {
  // baseurl = `https://${environment.reserved_ip}:3000/api`;
  baseurl = `${environment.apiUrl}:3000/api`;
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  private log(message: string) {
    // this.messageService.add(`HeroService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to error instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) {}

  getByRut(table: string, rut: string): Observable<any> {

    const baseurl = `${this.baseurl}/${table}/${rut}/rut`;

    return this.http.get<any>(baseurl).pipe(take(1), share());
   }

   getByEmail(table: string, email: string): Observable<any> {

    const baseurl = `${this.baseurl}/${table}/${email}/email`;

    return this.http.get<any>(baseurl).pipe(take(1), share());
   }


  makeSearch(table: string, expr: string): Observable<any>  {
    let baseurl = `${this.baseurl}/${table}/${expr}/search`;
    return this.http.get<any>(baseurl).pipe(take(1), share());
  }

  getLasId(): Observable<any>  {

    let baseurl = `${this.baseurl}/usuario/lastid`;

    return this.http.get<any>(baseurl).pipe(take(1), share());

  }

  getIdforName(table:string, name: string): Observable<any> {

    let url = `${this.baseurl}/${table}/${name}/id`;
    return this.http.get<any>(url).pipe(take(1), share());
  }

  getData(
    table: string,
    fk: any = null,
    restriction = false
  ): Observable<any> | null {
    let k = '';
    let baseurl = '';
    // const extraString = this.getExtraString(table);
    if (fk) {
      fk.forEach((el: string) => {
        k += `/${el}`;
      });

      baseurl = `${this.baseurl}/${table}${k}/fk`;
    } else {
      baseurl = `${this.baseurl}/${table}`;
    }

    return this.http.get<any>(baseurl).pipe(take(1), share());
  }

  getInData(table: string, values: string): Observable<any> {
    // const extraString = this.getExtraString(table);
    let baseurl = `${this.baseurl}/${table}/${values}/in`;
    return this.http.get<any>(baseurl, this.httpOptions).pipe(take(1), share());
  }



  getDataPk(table: string, pk: any): Observable<any> {
    // const extraString = this.getExtraString(table);
    const baseurl = `${this.baseurl}/${table}/${pk}/pk`;
    return this.http.get<any>(baseurl, this.httpOptions).pipe(take(1), share());
  }


  getDataCustom(
    table: string,
    suffix: string,
    fk: any = null,
    fields: any = null,
  ): Observable<any> {
    // const extraString = this.getExtraString(table);

    let k = '';
    let baseurl = '';
    if (fk) {
      fk.forEach((el: string) => {
        k += `/${el}`;
      });

      baseurl = `${this.baseurl}/${table}${k}/${suffix}`;
    } else {
      baseurl = `${this.baseurl}/${table}/${suffix}`;
    }

    if (fields) {
      let eq_units = [];
      for (const [fieldName, value] of Object.entries(fields)) {
        eq_units.push(`${fieldName}=${value}`);
      }
      var eq_string = eq_units.join('&');
      var url = `${baseurl}?${eq_string}`;
    } else {
      var url = baseurl;
    }
    // console.log(url)
    return this.http.get<any>(url).pipe(take(1), share());
  }

  /** PUT: update the hero on the server */

  putData(obj: any, table: string): Observable<any> {
    // const extraString = this.getExtraString(table);
    let baseurl = `${this.baseurl}/${table}/${obj.id}`;
    
    return this.http.put(baseurl, obj, this.httpOptions).pipe(
      tap(_ => this.log(`updated ${table} id=${obj.id}`)),
      catchError(this.handleError<any>())
    );
  }

  deleteData(id: number, table: string): Observable<any> {
    // const extraString = this.getExtraString(table);
    let baseurl = `${this.baseurl}/${table}/${id}`;
    return this.http.delete<any>(baseurl, this.httpOptions).pipe(
      // tap((msg: any) => this.log(`delete ${table} w/ id=${msg.id}`)),
      catchError(this.handleError<any>(`delete ${table}`))
    );
  }


  /** POST: add a new hero to the server */
  postData(
    obj: any,
    table: string,
    fk: any = null,
    Ids: any = null
  ): Observable<any> {
    // const extraString = this.getExtraString(table);
    let k = '';

    if (fk) {
      fk.forEach((el: string) => {
        k += `/${el}`;
      });
    }

    let baseurl = `${this.baseurl}/${table}${k}`;
    return this.http.post<any>(baseurl, obj, this.httpOptions).pipe(
      // tap((msg: any) => console.log(`added ${table} w/ id=${this.generaRegistrosTabla(table, msg, Ids )}`)),
      catchError(this.handleError<any>(`new ${table}`))
    );
  }

  /** POST: add a new hero to the server */
  findOrCreate(obj: any, table: string, fk: any = null): Observable<any> {
    // const extraString = this.getExtraString(table);
    let k = '';
    if (fk) {
      fk.forEach((el: string) => {
        k += `/${el}`;
      });
    }

    let baseurl = `${this.baseurl}/${table}${k}/findOrCreate`;

    return this.http.post<any>(baseurl, obj, this.httpOptions).pipe(
      // tap((msg: any) => this.log(`added ${table} w/ id=${msg.id}`)),
      catchError(this.handleError<any>(`new ${table}`))
    );
  }

  createDataCustom(
    obj: any,
    table: string,
    suffix: string,
    fk: any = null
  ): Observable<any> {
    // const extraString = this.getExtraString(table);
    let k = '';
    let baseurl = '';

    if (fk) {
      fk.forEach((el: string) => {
        k += `/${el}`;
      });
      baseurl = `${this.baseurl}/${table}${k}/${suffix}`;
    } else {
      baseurl = `${this.baseurl}/${table}/${suffix}`;
    }

    return this.http.post<any>(baseurl, obj, this.httpOptions).pipe(
      // tap((msg: any) => {this.log(`added ${table} w/ id=${msg.id}`)}),
      catchError(this.handleError<any>(`new ${table}`))
    );
  }
}
