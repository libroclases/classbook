import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  profesor_msg: BehaviorSubject<number>;


  constructor() {
      this.profesor_msg = new BehaviorSubject(0);
  }


  nextProfesor(msg:any) {
    this.profesor_msg.next(msg);
  }
}  