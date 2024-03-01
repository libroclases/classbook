import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fkValues } from '../../../interfaces/generic.interface';

@Injectable({
  providedIn: 'root',
})
export class SelectionIdsService implements OnDestroy {
  idsMap: Map<string, number>;
  textMap: Map<string, string>;

  msg: Subject<any>;

  // Map (suscriptor --> suscripcion) para poder eliminar suscripciones.
  subsMap: Map<string, Subscription> = new Map();

  constructor() {
    this.idsMap = new Map();
    this.textMap = new Map();

    this.msg = new Subject();
  }

  subscribe(subscriberId: string, func: any) {
    this.unsubscribe(subscriberId);
    const newSubscription = this.msg.subscribe(func);
    this.subsMap.set(subscriberId, newSubscription);
  }

  unsubscribe(subscriberId: string) {
    const subscription = this.subsMap.get(subscriberId);
    if (subscription) {
      subscription.unsubscribe();
      this.subsMap.delete(subscriberId);
    }
  }

  unsubscribeAll() {
    for (const key of this.subsMap.keys()) {
      this.unsubscribe(key);
    }
    this.idsMap.clear();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  notifyUpdated() {
    this.msg.next({ message: 'updated' });
  }

  setId(table: string, newId: number) {
    this.idsMap.set(table, newId);
  }

  getId(table: string) {
    const id = this.idsMap.get(table);
    return id == undefined ? 0 : id;
  }

  getIdsObject(tables: string[]) {
    let newIds: fkValues = {};
    tables.forEach((tb) => (newIds[tb] = this.getId(tb)));
    return newIds;
  }

  getIds(tables: string[], replaceKeys: any = null) {
    let newIds: number[] = [];
    if (replaceKeys == null) {
      tables.forEach((tb) => newIds.push(this.getId(tb)));
    } else {
      tables.forEach((tb) => {
        const fk = replaceKeys[tb];
        if (fk == undefined) {
          newIds.push(this.getId(tb));
        } else {
          newIds.push(fk);
        }
      });
    }
    return newIds;
  }

  setText(table: string, newText: string) {
    this.textMap.set(table, newText);
  }

  getText(table: string) {
    const txt = this.textMap.get(table);
    return txt == undefined ? '' : txt;
  }

  reset() {
    let message: fkValues = {};
    for (let table of this.idsMap.keys()) {
      message[table] = 0;
    }
    this.notifyUpdated();
  }
}
