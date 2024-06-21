import { Injectable, OnDestroy } from '@angular/core';
import { CrudService } from '../crud/crud.service';
import { Subject, Subscription } from 'rxjs';
import { fKeysByTable } from '../../../../environments/environment';
import { fkValues } from '../../../interfaces/generic.interface';


function auxGenerateForeignKeysTree(
  partialLevelsTree: Map<string, number>,
  remainingTables: Set<string>,
  currLevel: number): void {
    let currLevelTables = new Set<string>();
    remainingTables.forEach(tb => {
      const fks = fKeysByTable[tb];
      let isCurrentLevel = true;
      for ( let t of fks ) {
        if ( !partialLevelsTree.has(t) ) {
          isCurrentLevel = false;
          break;
        }
      }
      if ( isCurrentLevel ) {
        currLevelTables.add(tb);
      }
    });
    currLevelTables.forEach(tb => {
      remainingTables.delete(tb);
      partialLevelsTree.set(tb, currLevel);
    });
    if ( remainingTables.size > 0 ) {
      return auxGenerateForeignKeysTree(
        partialLevelsTree, remainingTables, currLevel+1);
    }
}

function generateLevelsTree() {
  let tables = new Set(Object.keys(fKeysByTable));
  let tableLevelsTree = new Map();
  tables.forEach(tb => {
    if ( fKeysByTable[tb].length === 0 ) { tableLevelsTree.set(tb, 0); }
  });
  tableLevelsTree.forEach((value, tb) => tables.delete(tb));
  auxGenerateForeignKeysTree(tableLevelsTree, tables, 1);
  return tableLevelsTree;
}


@Injectable({
  providedIn: 'root'
})
export class OriginTableIdService implements OnDestroy{

  data!: Object;
  msg: Subject<fkValues>;

  tableLevelsTree: Map<string, number>;

  // Map (suscriptor --> suscripcion) para poder eliminar suscripciones.
  subsMap: Map<string, Subscription> = new Map();

  constructor(private crud: CrudService) {
    this.tableLevelsTree = generateLevelsTree();
    this.msg = new Subject();
    // console.log('tableLevelsTree', this.tableLevelsTree);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }

  subscribe(subscriberId: string, func: any) {
    this.unsubscribe(subscriberId);
    const newSubscription = this.msg.subscribe(func);
    this.subsMap.set(subscriberId, newSubscription);
  }

  unsubscribe(subscriberId: string) {
    const subscription = this.subsMap.get(subscriberId);
    if ( subscription ) {
      subscription.unsubscribe();
      this.subsMap.delete(subscriberId);
    }
  }

  unsubscribeAll() {
    for ( const key of this.subsMap.keys() ) {
      this.unsubscribe(key);
    }
  }

  nextMsg(mensaje: fkValues) {
    this.msg.next(mensaje);
  }

}
