
export interface ControlAsignatura {
    id: number;
    inasistentesHombres: number;
    inasistentesMujeres: number;
    asistencia: number;
    atrasos: number;
    firma: string;
    observaciones: string;
    fecha: Date;
    dia: number;
    hora: number;
    // FKs:
    Colegio: number;
    Curso: number;
    Asignatura: {id: number, nombre: string};
    Horario: number;
    Periodo: number;
    Mes: number;
    Profesor: {id: number, nombre: string, apellido: string}
  }
