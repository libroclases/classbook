import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  msg: BehaviorSubject<any>;
  constructor() {
      this.msg = new BehaviorSubject({msg:''});
  }

  nextMsg(msg: any) {
    this.msg.next(msg);

  }

}
