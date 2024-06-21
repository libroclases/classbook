import { Injectable } from '@angular/core';
import { Person } from '../../../interfaces/person.interface';
import { Usuario } from '../../../interfaces/usuario.interface';
import { lowerUpperTables, tableLabels, attributesLabels, personTables } from 'src/environments/environment';
import { stringString, stringStringString } from '../../../interfaces/generic.interface';

@Injectable({
  providedIn: 'root'
})
export class LabelsService {

  private labelGettersMap: Map<string, Function> = new Map();

  private tableLabelsMap: Map<string, string> = new Map();

  private attributesLabels: stringStringString = attributesLabels;
  private lowerToUpper: stringString;
  private upperToLower: Map<string, string> = new Map();

  constructor() {

    this.lowerToUpper = lowerUpperTables;
    Object.entries(lowerUpperTables).forEach(([lower, upper]) => {
      this.upperToLower.set(upper, lower);
    });

    personTables.forEach(table => {
      this.labelGettersMap.set(table, this.apellidoNombreLabel);
      this.labelGettersMap.set(
        this.lowerToUpper[table]!, this.apellidoNombreLabel);
    });

    this.labelGettersMap.set('usuario', this.usuarioLabel);
    this.labelGettersMap.set('Usuario', this.usuarioLabel);

    Object.entries(tableLabels).forEach(
      ([table, label]) => {
        this.tableLabelsMap.set(table, label);
        this.tableLabelsMap.set(this.lowerToUpper[table], label);
      });

  }

  private apellidoNombreLabel(person: Person) {
    return person.apellido1 + " " + person.apellido2 + " " + person.nombre;
    // return `${person.apellido}, ${person.nombre}`;
  }

  private usuarioLabel(usuario: Usuario) {
    return usuario.username;
  }

  getObjectLabel(table: string, object: any) {
    const getter = this.labelGettersMap.get(table); console.log('getter',getter);
    if ( getter ) {
      return getter(object);
    }
    return object.nombre;
  }

  getTableLabel(table: string) {
    return this.tableLabelsMap.get(table);
  }

  getAttributeLabel(table: string, attribute: string) {
    return this.attributesLabels[table]![attribute];
  }

  lowerToUpperTable(lowerTable: string) {
    return this.lowerToUpper[lowerTable];
  }

  upperToLowerTable(upperTable: string) {
    return this.upperToLower.get(upperTable);
  }

}

