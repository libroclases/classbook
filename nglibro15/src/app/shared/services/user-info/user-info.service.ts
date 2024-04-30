import { Injectable } from '@angular/core';
import { Observable, concatMap, of, map, shareReplay, tap, Subject, take, share } from 'rxjs';
import { CrudService } from '../crud/crud.service';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetUsuario } from 'src/app/ngxs/usuario.actions';

@Injectable({
  providedIn: 'root',
})



export class UserInfoService {

  personalInfo$: Observable<Object | any>;
  email$: Observable<string | undefined>;


  constructor(private crud: CrudService,
    private auth: AuthService,
    private store: Store,
  ) {


    this.email$ = this.auth.user$.pipe(map((user) => user?.email))

    this.personalInfo$ = this.email$?.pipe(
      concatMap((email) => {

        if (email == undefined) {
          return of({personalInfo: null, inscripcionColegio: null});
        } else {
          // console.log('poronga',email);
          this.store.dispatch(new GetUsuario(email));
          return this.crud.getDataCustom('usuario', 'where', [], {
            email: email,
          });
        }
      }),
      tap(info => {
        // console.log(info);
        // this.nextMsg(info);

      }),
      share()
    );

  }


}
