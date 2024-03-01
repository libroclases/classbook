
export interface Matricula {
    id: number;
    numero: string;
    procedencia: string;
    incorporacion: Date;
    retiro: Date;
    // FKs:
    Periodo: number;
    Curso: number;
    Alumno: number;
    Colegio: number;
    Apoderado: number;
    Vinculo: number;
    Sexo: number;
  }
