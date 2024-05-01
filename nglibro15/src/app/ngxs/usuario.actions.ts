export class GetUsuario {
  static readonly type = '[Usuario] Get usuario';
  constructor(public email:string ) { }
}

export class SetUsuario {
  static readonly type = '[Usuario] Set usuario';
  constructor(public color: number, public usuario: number ) { }
}

