import { Injectable } from '@angular/core';
import { TableEntry } from '../../../interfaces/generic.interface';
import { fKeysByTable } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForeignKeysService {

  private foreignKeysByTableMap: Map<string, string[]> = new Map();

  private isRootTableMap: Map<string, boolean> = new Map();

  constructor() {

    Object.entries(fKeysByTable).forEach(
      ([key, value]) => this.foreignKeysByTableMap.set(key, value)
    );


    for (var [table, fKeys] of this.foreignKeysByTableMap.entries()) {
      this.isRootTableMap.set(table, fKeys.length === 0);
    }
  }

  getFKeys(table: string) {
    return this.foreignKeysByTableMap.get(table);
  }

  isRootTable(table: string) {
    return this.isRootTableMap.get(table);
  }

  getIds(table: string, entry: TableEntry) {
    const fks = this.getFKeys(table);
    let idsMap = new Map();
    fks?.forEach(fk => idsMap.set(fk, entry[fk+'Id']));
    return idsMap;
  }
}
