import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  msg: BehaviorSubject<any>;
  color_msg: BehaviorSubject<any>;


  constructor() {
      this.msg = new BehaviorSubject({msg:''});
      this.color_msg = new BehaviorSubject(null);
  }

  nextMsg(msg: any) {
    this.msg.next(msg);
  }

  nextColor(color: any) {
    this.color_msg.next(color);
  }
}
