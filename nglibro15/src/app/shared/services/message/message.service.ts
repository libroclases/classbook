import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  msg: BehaviorSubject<any>;
  color_msg: BehaviorSubject<any>;
  userId: BehaviorSubject<any>;
  disable_msg: BehaviorSubject<any>;
  profesor_msg: BehaviorSubject<number>;


  constructor() {
      this.msg = new BehaviorSubject({msg:''});
      this.color_msg = new BehaviorSubject(null);
      this.userId = new BehaviorSubject(null);
      this.disable_msg = new BehaviorSubject(null);
      this.profesor_msg = new BehaviorSubject(0);
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
    this.disable_msg.next(msg);
  }

  nextProfesor(msg:any) {
    this.profesor_msg.next(msg);
  }
}  
