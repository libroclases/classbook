import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  color_msg: BehaviorSubject<any>;
  constructor() {
      this.color_msg = new BehaviorSubject(null);
  }

  nextColor(color: any) {
    this.color_msg.next(color);

  }

}
