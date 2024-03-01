import { Alumno } from "./alumno.interface";
import { Colegio } from "./colegio.interface";
import { Curso } from "./curso.interface";
import { Matricula } from "./matricula.interface";
import { Mes } from "./mes.interface";
import { Periodo } from "./periodo.interface";

export interface Asistencia {
    id: number;
    fecha: Date;
    presente: boolean,
    dia: number,
    Matricula: number,
    Colegio: number,
    Curso: number,
    Alumno: number,
    Periodo: number,
    Mes: number,
  }

export interface AsistenciaDetalle {
  id: number;
  fecha: Date;
  presente: boolean,
  dia: number,
  Matricula: Matricula,
  Colegio: Colegio,
  Curso: Curso,
  Alumno: Alumno,
  Periodo: Periodo,
  Mes: Mes,
  matriculaId: number,
  colegioId: number,
  cursoId: number,
  alumnoId: number,
  periodoId: number,
  mesId: number
}

export interface QueryObjectResumen {
  [key: string] : { [key: string] : number}
}
