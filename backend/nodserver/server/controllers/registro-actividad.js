import model from "../models";
// import { getBaseQuery } from "./acceso";
const Op = require("../models").Sequelize.Op;

const {
  Horario,
  Colegio,
  Curso,
  Asignatura,
  AsignaturaProfesor,
  Profesor,
  RegistroActividad,
  Anno,
  Mes,
  Feriado,
} = model;

function doubleZeroPad(num) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}

function dateString(year, month, day) {
  const dd = doubleZeroPad(day);
  const mm = doubleZeroPad(month);
  return `${year}-${mm}-${dd}`;
}

class RegistroActividades {
  static list(req, res) {
    return RegistroActividad.findAll({
      // where: getBaseQuery(req),
      attributes: ["id", "descripcion", "fecha", "dia", "horaInicial", "numeroHoras"],
      order: [["horaInicial", "ASC"]],
      include: [
        { model: Colegio, attributes: ["id", "nombre"], where: {} },
        { model: Curso, attributes: ["id", "nombre"], where: {} },
        { model: AsignaturaProfesor, attributes: ["id", "nombre"], where: {} },
        { model: Asignatura, attributes: ["id", "nombre"], where: {} },
        {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1","apellido2"],
          where: {},
        },
        { model: Horario, attributes: ["id", "hora"], where: {} },
        { model: Anno, attributes: ["id", "nombre"], where: {} },
        { model: Mes, attributes: ["id", "nombre", "numero"], where: {} },
    
      ],
    })
      .then((controlesAsignatura) => res.status(200).send(controlesAsignatura))
      .catch((error) => res.status(400).send(error));
  }

  static getByFk(req, res) {

    const {
      colegioId,
      cursoId,
      asignaturaId,
      asignaturaprofesorId,
      profesorId,
      horarioId,
      annoId,
      mesId,
    } = req.params;

    let consulta = {};
    // let consulta = getBaseQuery(req);

    if (colegioId != "0") {
      consulta["colegioId"] = colegioId;
    }
    if (cursoId != "0") {
      consulta["cursoId"] = cursoId;
    }
    if (asignaturaId != "0") {
      consulta["asignaturaId"] = asignaturaId;
    }
    if (asignaturaprofesorId != "0") {
      consulta["asignaturaprofesorId"] = asignaturaprofesorId;
    }
    if (profesorId != "0") {
      consulta["profesorId"] = profesorId;
    }
    if (horarioId != "0") {
      consulta["horarioId"] = horarioId;
    }
    if (annoId != "0") {
      consulta["annoId"] = annoId;
    }
    if (mesId != "0") {
      consulta["mesId"] = mesId;
    }

    return RegistroActividad.findAll({
      where: consulta,
      attributes: ["id", "descripcion", "fecha", "dia", "horaInicial", "numeroHoras"],
      order: [["horaInicial", "ASC"]],
      include: [
        { model: Colegio, attributes: ["id", "nombre"], where: {} },
        { model: Curso, attributes: ["id", "nombre"], where: {} },
        { model: AsignaturaProfesor, attributes: ["id", "nombre"], where: {} },
        { model: Asignatura, attributes: ["id", "nombre"], where: {} },
        {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1","apellido2"],
          where: {},
        },
        { model: Horario, attributes: ["id", "hora"], where: {} },
        { model: Anno, attributes: ["id", "nombre"], where: {} },
        { model: Mes, attributes: ["id", "nombre", "numero"], where: {} },
      ],
    })
      .then((controlesAsignatura) => res.status(200).send(controlesAsignatura))
      .catch((error) => res.status(400).send(error));
  }

  static getByMes(req, res) {

    const {
      colegioId,
      cursoId,
      asignaturaId,
      annoId,
      mesId,
    } = req.params;

    let consulta = {};
    // let consulta = getBaseQuery(req);

    if (colegioId != "0") {
      consulta["colegioId"] = colegioId;
    }
    if (cursoId != "0") {
      consulta["cursoId"] = cursoId;
    }
    if (asignaturaId != "0") {
      consulta["asignaturaId"] = asignaturaId;
    }
    if (annoId != "0") {
      consulta["annoId"] = annoId;
    }
    if (mesId != "0") {
      consulta["mesId"] = mesId;
    }

    return RegistroActividad.findAll({
      where: consulta,
      attributes: ["id", "descripcion", "fecha", "dia", "horaInicial", "numeroHoras"],
      order: [["fecha", "ASC"], ["horaInicial", "ASC"]],
      include: [
        {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1", "apellido2"],
          where: {},
        },
        { model: Horario, attributes: ["id", "hora", "dixId"], where: {} },
      ],
    })
      .then((controlesAsignatura) => res.status(200).send(controlesAsignatura))
      .catch((error) => res.status(400).send(error));
  }

  static create(req, res) {
    const {
      colegioId,
      cursoId,
      asignaturaId,
      asignaturaprofesorId,
      profesorId,
      horarioId,
      annoId,
      mesId,
   
    } = req.params;
    const { descripcion, fecha, dia, horaInicial, numeroHoras } = req.body;

    return RegistroActividad.create({
      descripcion,
      fecha,
      dia,
      horaInicial,
      numeroHoras,
      colegioId,
      cursoId,
      asignaturaId,
      asignaturaprofesorId,
      profesorId,
      annoId,
      mesId,
      horarioId,
  
    })
      .then((data) =>
        res.status(201).send({
          success: true,
          data,
          message: "RegistroActividad creado exitosamente",
        })
      )
      .catch((error) =>
        res.status(400).send({
          success: false,
          message: `RegistroActividad NO fue creado`,
        })
      );
  }

  static populateMes(req, res) {
    const { colegioId, cursoId, asignaturaId, annoId, mesId } = req.params;
    const { anno } = req.body;
    const mes = mesId;
    
    var consultaFeriado = {
      fecha: {[Op.between]: [new Date(anno, mes-1, 0), new Date(anno, mes, 0)]}};
    Feriado
    .findAll({
      where: consultaFeriado,
      attributes: ['id', 'fecha'],
      order: [['fecha', 'ASC']],
      raw: true
    })
    .then(feriados => {
      const daysInMonth = new Date(anno, mes, 0).getDate();
      const dowFirstDay = (new Date(anno, mes-1, 1).getDay() + 6) % 7;
      let feriadosSet = new Set();
      for ( let feriado of feriados ) {
        feriadosSet.add(parseInt(feriado.fecha.toString().split('-')[2]));
      }
      Horario.
      findAll({
        where: {
          colegioId,
          cursoId,
          annoId,
        },
        attributes: ["id", "hora", "asignaturaprofesorId", "dixId", "profesorId"],
        include: [
          {
            model: AsignaturaProfesor,
            attributes:[ 'asignaturaId' ],
          }
        ],
        order: [['dixId', 'ASC'], ['hora', 'ASC']],
        raw: true})
      .then(horarios => {
        let registroActividadObjects = [];
        let dowToDays = new Map();
        for (let index = 0; index < daysInMonth; index++) {
          const dow = ((dowFirstDay + index) % 7) + 1;
          if ( (dow < 6) && !feriadosSet.has(index+1) ) {
            if ( dowToDays.get(dow) == undefined ) {
              dowToDays.set(dow, []);
            }
            dowToDays.get(dow).push(index+1);
          }
        }

        let dia = 0;
        let hora = 0;
        let numeroHoras = 0;
        let currProfesorId = 0;
        let horariosContiguos = [];
        let addNewObject = true;
        for ( let horario of horarios ) {
          if ( horario['AsignaturaProfesor.asignaturaId'] != asignaturaId ) {
            continue;
          }
          addNewObject = (
            (dia != horario.dixId) ||
            (horario.hora != (hora+1)) ||
            (horario.profesorId != currProfesorId));
          if ( addNewObject ) {
            if ( dia > 0 ) {
              const indexLast = horariosContiguos.length - 1;
              horariosContiguos[indexLast]["numeroHoras"] = numeroHoras;
            }
            horariosContiguos.push({
              horarioId: horario.id,
              horaInicial: horario.hora,
              dixId: horario.dixId,
              asignaturaprofesorId: horario.asignaturaprofesorId,
              profesorId: horario.profesorId,
            });
            numeroHoras = 1;
            dia = horario.dixId;
            currProfesorId = horario.profesorId;
          } else {
            numeroHoras++;
          }
          hora = horario.hora;
        }
        const indexLast = horariosContiguos.length - 1;
        horariosContiguos[indexLast]["numeroHoras"] = numeroHoras;
        
        for ( let horario of horariosContiguos ) {
          const days = dowToDays.get(horario.dixId);
          const baseObj = {
            descripcion: "",
            horaInicial: horario.horaInicial,
            numeroHoras: horario.numeroHoras,
            colegioId,
            cursoId,
            asignaturaId,
            asignaturaprofesorId: horario.asignaturaprofesorId,
            profesorId: horario.profesorId,
            annoId,
            mesId,
            horarioId: horario.horarioId,
        
          };
          for ( let dia of days ) {
            const auxObj = { fecha: dateString(anno, mes, dia), dia: dia};
            let obj = { ...auxObj, ...baseObj};
            registroActividadObjects.push(obj);
          }
        }
        RegistroActividad
        .bulkCreate(registroActividadObjects)
        .then(() => res.status(201).send({
          success: true,
          message: `Entradas de RegistroActividad creadas exitosamente`
        }))
        .catch(error => res.status(400).send({
          success: false,
          message: `Entradas de RegistroActividad NO fueron creadas con éxito`,
        }));
      })
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }

  static modify(req, res) {
    const {
      descripcion,
      fecha,
      dia,
      horaInicial,
      numeroHoras,
      Colegio,
      Curso,
      Asignatura,
      AsignaturaProfesor,
      Profesor,
      Horario,
      Anno,
      Mes,
    } = req.body;
    let consulta = {};
    // let consulta = getBaseQuery(req);
    consulta["id"] = req.params.registroactividadId;
    return RegistroActividad.findOne({ where: consulta })
      .then((registroActividad) => {
        registroActividad
          .update({
            descripcion: descripcion || registroActividad.descripcion,
            fecha: fecha || registroActividad.fecha,
            dia: dia || registroActividad.dia,
            horaInicial: horaInicial || registroActividad.horaInicial,
            numeroHoras: numeroHoras || registroActividad.numeroHoras,
            colegioId: Colegio || registroActividad.colegioId,
            cursoId: Curso || registroActividad.cursoId,
            asignaturaId: Asignatura || registroActividad.asignaturaId,
            asignaturaprofesorId: AsignaturaProfesor || registroActividad.asignaturaprofesorId,
            profesorId: Profesor || registroActividad.profesorId,
            annoId: Anno || registroActividad.annoId,
            mesId: Mes || registroActividad.mesId,
            horarioId: Horario || registroActividad.horarioId,
    
          })
          .then((updatedRegistroActividad) => {
            res.status(200).send({
              success: true,
              message: "RegistroActividad updated successfully",
              data: {
                descripcion: updatedRegistroActividad.descripcion,
                fecha: updatedRegistroActividad.fecha,
                dia: updatedRegistroActividad.dia,
                horaInicial: updatedRegistroActividad.horaInicial,
                numeroHoras: updatedRegistroActividad.numeroHoras,
                colegioId: updatedRegistroActividad.colegioId,
                cursoId: updatedRegistroActividad.cursoId,
                asignaturaId: updatedRegistroActividad.asignaturaId,
                asignaturaprofesorId: updatedRegistroActividad.asignaturaprofesorId,
                profesorId: updatedRegistroActividad.profesorId,
                horarioId: updatedRegistroActividad.horarioId,
                annoId: updatedRegistroActividad.annoId,
                mesId: updatedRegistroActividad.mesId,
              },
            });
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  static delete(req, res) {
    let consulta = {};
    // let consulta = getBaseQuery(req);
    consulta["id"] = req.params.registroactividadId;
    return RegistroActividad.findOne({ where: consulta })
      .then((registroActividad) => {
        if (!registroActividad) {
          return res.status(400).send({
            message: "RegistroActividad Not Found",
          });
        }
        return registroActividad
          .destroy()
          .then(() =>
            res.status(200).send({
              message: "RegistroActividad successfully deleted",
            })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
}

export default RegistroActividades;
