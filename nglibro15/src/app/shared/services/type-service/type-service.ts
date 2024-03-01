import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  typemsg: BehaviorSubject<any>;
  constructor() {
      this.typemsg = new BehaviorSubject(null);
  }

  nextType(msg: any) {
    // console.log('msg',msg);
    this.typemsg.next(msg);

  }

}
