import { Injectable } from '@angular/core';
import { Observable, concatMap, of, map, shareReplay, tap } from 'rxjs';
import { CrudService } from '../crud/crud.service';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {

  personalInfo$: Observable<Object | any>;
  email$: Observable<string | undefined>;
  usermsg: BehaviorSubject<any>;

  constructor(private crud: CrudService, private auth: AuthService) {

    this.usermsg = new BehaviorSubject(null);

    this.email$ = this.auth.user$.pipe(map((user) => user?.email))

    this.personalInfo$ = this.email$?.pipe(
      concatMap((email) => {
        if (email == undefined) {
          return of({});
        } else {
          return this.crud.getDataCustom('usuario', 'where', [], {
            email: email,
          });
        }
      }),
      tap(info => this.nextMsg(info.usuario))
    );

  }

  nextMsg(msg: any) {
    this.usermsg.next(msg);

  }


}
