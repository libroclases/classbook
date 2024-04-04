export class GetAlumno {
  static readonly type = '[Alumno] Get alumno';
  constructor(public payload: { nombre: string }) { }
}