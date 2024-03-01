import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  msg: BehaviorSubject<any>;
  constructor() {
      this.msg = new BehaviorSubject(null);
  }

  nextColor(color: any) {
    this.msg.next(color);

  }

}
