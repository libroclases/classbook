export class GetUsuario {
  
  static readonly type = '[Usuario] Get usuario';
  constructor(public email:string ) { }
}
