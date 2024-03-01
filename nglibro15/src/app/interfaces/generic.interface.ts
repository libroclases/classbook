import { Observable } from "rxjs";

export interface fkValues {
  [key: string]: number
}

export interface fkChanged {
  [key: string]: boolean
}

export interface TableEntry {
  [key: string]: any
}

export interface numberString {
  [key: number]: string
}

export interface tableQueries {
  [key: string]: Observable<any>
}

export interface tableQueryList {
  [key: string]: any[]
}

export interface stringString {
  [key: string]: string
}

export interface stringStringString {
  [key: string]: stringString
}

export interface stringStringPair {
  [key: string]: string[]
}

export interface Notification {
  message: string
  // values: Map<string, number>;
}

export interface Alert {
  id: string,
  type: string,
  message: string,
  show: boolean
}

export interface ModalData {
  mainTable: string,
  tables: string[],
  textFields: string[],
  dateFields: string[],
  ignoreFkRequirements: string[],
  hidden: string[],
  label: string,
  windowHeight: string
  textAreaFields: string[] | undefined;
  defaultValues: any | undefined;
}
