import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  msg: BehaviorSubject<any>;
  color_msg: BehaviorSubject<any>;
  userId: BehaviorSubject<any>;
  typemsg: BehaviorSubject<any>;


  constructor() {
      this.msg = new BehaviorSubject({msg:''});
      this.color_msg = new BehaviorSubject(null);
      this.userId = new BehaviorSubject(null);
      this.typemsg = new BehaviorSubject(null);
  }

  nextMsg(msg: any) {
    this.msg.next(msg);
  }

  nextColor(color: any) {
    this.color_msg.next(color);
  }

  nextUser(userId: any) {
    this.userId.next(userId);
  }

  nextType(msg: any) {
    // console.log('msg',msg);
    this.typemsg.next(msg);

  }
}  
