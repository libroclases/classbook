import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioIdService {
  msgId: BehaviorSubject<any>;
  constructor() {
      this.msgId = new BehaviorSubject(null);
  }

  nextUser(userId: any) {
    this.msgId.next(userId);

  }
}