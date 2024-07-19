import model from "../models";

const Op = require("../models").Sequelize.Op;

const {
  Horario,
  Colegio,
  Curso,
  Asignatura,
  Profesor,
  ControlAsignatura,
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

class ControlAsignaturas {
  static list(req, res) {
    return ControlAsignatura.findAll({
      // where: getBaseQuery(req),
      attributes: [
        "id",
        "inasistentesHombres",
        "inasistentesMujeres",
        "atrasos",
        "observaciones",
        "fecha",
        "dia",
        "hora",
      ],
      order: [["hora", "ASC"]],
      include: [
        { model: Colegio, attributes: ["id", "nombre"], where: {} },
        { model: Curso, attributes: ["id", "nombre"], where: {} },
        { model: Asignatura, attributes: ["id", "nombre"], where: {} },
        {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1", 'apellido2'],
          where: {},
        },
        {
          model: Profesor,
          as: "ProfesorPie",
          attributes: ["id", "nombre", "apellido1","apellido2"],
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
    // const { cursoId} = req.params;

    const {
      colegioId,
      cursoId,
      asignaturaId,
      profesorId,
      horarioId,
      annoId,
      mesId,
    } = req.params;
    // let consulta = getBaseQuery(req);
    let consulta = '';

    if (colegioId != "0") {
      consulta["colegioId"] = colegioId;
    }
    if (cursoId != "0") {
      consulta["cursoId"] = cursoId;
    }
    if (asignaturaId != "0") {
      consulta["asignaturaId"] = asignaturaId;
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

    return ControlAsignatura.findAll({
      where: consulta,
      attributes: [
        "id",
        "inasistentesHombres",
        "inasistentesMujeres",
        "atrasos",
        "observaciones",
        "fecha",
        "dia",
        "hora",
      ],
      order: [["hora", "ASC"]],
      include: [
        { model: Colegio, attributes: ["id", "nombre"], where: {} },
        { model: Curso, attributes: ["id", "nombre"], where: {} },
        { model: Asignatura, attributes: ["id", "nombre"], where: {} },
        {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1", "apellido2"],
          where: {},
        },
        {
          model: Profesor,
          as: "ProfesorPie",
          attributes: ["id", "nombre", "apellido1","apellido2"],
        },
        { model: Horario, attributes: ["id", "hora"], where: {} },
        { model: Anno, attributes: ["id", "nombre"], where: {} },
        { model: Mes, attributes: ["id", "nombre", "numero"], where: {} },
      ],
    })
      .then((controlesAsignatura) => res.status(200).send(controlesAsignatura))
      .catch((error) => res.status(400).send(error));
  }

  static getPorDia(req, res) {
    const {
      colegioId,
      cursoId,
      asignaturaId,
      profesorId,
      horarioId,
      annoId,
      mesId,
    } = req.params;
    const { dia } = req.query;
    // let consulta = getBaseQuery(req);
    let consulta = {}
    consulta["dia"] = dia;
    if (colegioId != "0") {
      consulta["colegioId"] = colegioId;
    }
    if (cursoId != "0") {
      consulta["cursoId"] = cursoId;
    }
    if (asignaturaId != "0") {
      consulta["asignaturaId"] = asignaturaId;
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

    return ControlAsignatura.findAll({
      where: consulta,
      attributes: [
        "id",
        "inasistentesHombres",
        "inasistentesMujeres",
        "atrasos",
        "observaciones",
        "fecha",
        "dia",
        "hora",
      ],
      order: [["hora", "ASC"]],
      include: [
        { model: Colegio, attributes: ["id", "nombre"], where: {} },
        { model: Curso, attributes: ["id", "nombre"], where: {} },
        { model: Asignatura, attributes: ["id", "nombre"], where: {} },
        {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1","apellido2"],
          where: {},
        },
        {
          model: Profesor,
          as: "ProfesorPie",
          attributes: ["id", "nombre", "apellido1","apellido2"],
        },
        { model: Horario, attributes: ["id", "hora"], where: {} },
        { model: Anno, attributes: ["id", "nombre"], where: {} },
        { model: Mes, attributes: ["id", "nombre", "numero"], where: {} },
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
      profesorId,
      profesorPieId,
      horarioId,
      annoId,
      mesId,
   
    } = req.params;
    const {
      inasistentesHombres,
      inasistentesMujeres,
      atrasos,
      observaciones,
      fecha,
      dia,
      hora,
    } = req.body;

    return ControlAsignatura.create({
      inasistentesHombres,
      inasistentesMujeres,
      atrasos,
      observaciones,
      fecha,
      dia,
      hora,
      colegioId,
      cursoId,
      asignaturaId,
      profesorId,
      profesorPieId,
      annoId,
      mesId,
      horarioId,
  
    })
      .then((controlAsignaturaData) =>
        res.status(201).send({
          success: true,
          data: controlAsignaturaData,
          message: "ControlAsignatura creado exitosamente",
        })
      )
      .catch((error) =>
        res.status(400).send({
          success: false,
          message: `ControlAsignatura NO fue creado`,
        })
      );
  }

  static populateDia(req, res) {
    const { colegioId, cursoId, annoId } = req.params;
    const { anno, mes, dia, diaSemana } = req.body;
    console.log('populateDia', colegioId, cursoId, annoId,anno, mes, dia, diaSemana )
    // :colegioId/:cursoId/:asignaturaId/:profesorId/:annoId/:dixId
    if (diaSemana > 5) {
      res.status(200).send({
        success: true,
        newData: false,
        message: `populateDia no fue ejecutado: diaSemana must be < 6`,
      });
      return;
    }
    var consulta = { fecha: { [Op.eq]: new Date(anno, mes - 1, dia) } };
    
    Feriado.findAll({
      attributes: ["id", "fecha", "nombre", "lugar"],
      where: consulta,
      order: [["fecha", "ASC"]],
    })
      .then((feriados) => {
        if (feriados.length == 0) {
          var consulta = {
            annoId,
            colegioId,
            cursoId,
            dixId: diaSemana,
          };
          console.log('consulta',consulta);
          Horario.findAll({
            where: consulta,
            attributes: ["id", "hora"],
            order: [["hora", "ASC"]],
            include: [
              {
                model: Asignatura,
                attributes: ["id","nombre"],
                where: {} 
              },
              {
                model: Profesor,
                attributes: ["id", "nombre", "apellido1","apellido2"],
                where: {},
              },
            ],
          })
            .then((horarios) => {
              if (horarios.length == 0) {
                res.status(200).send({
                  success: true,
                  newData: false,
                  message: `Entradas de ControlAsignatura NO fueron creadas`,
                });
                return;
              } else {
                let controlAsignaturaObjects = [];
                for (let horario of horarios) {
                  controlAsignaturaObjects.push({
                    inasistentesHombres: 0,
                    inasistentesMujeres: 0,
                    atrasos: 0,
                    observaciones: "",
                    fecha: dateString(anno, mes, dia),
                    dia,
                    hora: horario.hora,
                    colegioId: colegioId,
                    cursoId: cursoId,
                    asignaturaId: 1,  //  horario.Asignatura.id 
                    profesorId: 1, // horario.Profesor.id,
                    profesorPieId: null,
                    annoId: annoId,
                    mesId: mes,
                    horarioId: horario.id,
    
                  });
                }
                return ControlAsignatura.bulkCreate(controlAsignaturaObjects)
                  .then(() =>
                    res.status(201).send({
                      success: true,
                      newData: true,
                      message: `Entradas de ControlAsignatura creadas exitosamente`,
                    })
                  )
                  .catch((error) =>
                    res.status(400).send({
                      success: false,
                      newData: false,
                      message: `Entradas de ControlAsignatura NO fueron creadas`,
                    })
                  );
              }
            })
            .catch((error) => res.status(400).send(error));
        }
      })
      .catch((error) => res.status(400).send(error));
  }

  static modify(req, res) {
    const {
      inasistentesHombres,
      inasistentesMujeres,
      atrasos,
      observaciones,
      fecha,
      dia,
      hora,
      Colegio,
      Curso,
      Asignatura,
      Profesor,
      ProfesorPie,
      Horario,
      Anno,
      Mes,
    } = req.body;
    // let consulta = getBaseQuery(req);
    let consulta = {};
    consulta["id"] = req.params.controlasignaturaId;
    return ControlAsignatura.findOne({ where: consulta })
      .then((controlAsignatura) => {
        controlAsignatura
          .update({
            inasistentesHombres:
              inasistentesHombres || controlAsignatura.inasistentesHombres,
            inasistentesMujeres:
              inasistentesMujeres || controlAsignatura.inasistentesMujeres,
            atrasos: atrasos || controlAsignatura.atrasos,
            observaciones: observaciones || controlAsignatura.observaciones,
            fecha: fecha || controlAsignatura.fecha,
            dia: dia || controlAsignatura.dia,
            hora: hora || controlAsignatura.hora,
            colegioId: Colegio || controlAsignatura.colegioId,
            cursoId: Curso || controlAsignatura.cursoId,
            asignaturaId: Asignatura || controlAsignatura.asignaturaId,
            profesorId: Profesor || controlAsignatura.profesorId,
            profesorPieId: ProfesorPie,
            annoId: Anno || controlAsignatura.annoId,
            mesId: Mes || controlAsignatura.mesId,
            horarioId: Horario || controlAsignatura.horarioId,
   
          })
          .then((updatedControlAsignatura) => {
            res.status(200).send({
              success: true,
              message: "ControlAsignatura updated successfully",
              data: {
                inasistentesHombres:
                  updatedControlAsignatura.inasistentesHombres,
                inasistentesMujeres:
                  updatedControlAsignatura.inasistentesMujeres,
                atrasos: updatedControlAsignatura.atrasos,
                observaciones: updatedControlAsignatura.observaciones,
                fecha: updatedControlAsignatura.fecha,
                dia: updatedControlAsignatura.dia,
                hora: updatedControlAsignatura.hora,
                colegioId: updatedControlAsignatura.colegioId,
                cursoId: updatedControlAsignatura.cursoId,
                asignaturaId: updatedControlAsignatura.asignaturaId,
                profesorId: updatedControlAsignatura.profesorId,
                profesorPieId: updatedControlAsignatura.profesorPieId,
                horarioId: updatedControlAsignatura.horarioId,
                annoId: updatedControlAsignatura.annoId,
                mesId: updatedControlAsignatura.mesId,
              },
            });
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

  static delete(req, res) {
    // let consulta = getBaseQuery(req);
    let consulta = {};
    consulta["id"] = req.params.controlasignaturaId;
    return ControlAsignatura.findOne({ where: consulta })
      .then((controlAsignatura) => {
        if (!controlAsignatura) {
          return res.status(400).send({
            message: "ControlAsignatura Not Found",
          });
        }
        return controlAsignatura
          .destroy()
          .then(() =>
            res.status(200).send({
              message: "ControlAsignatura successfully deleted",
            })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
}

export default ControlAsignaturas;
