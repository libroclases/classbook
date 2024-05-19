import model from "../models";

const { InscripcionColegio, Profesor, Colegio, Anno } = model;

class InscripcionesColegio {
  static list(req, res) {
    return InscripcionColegio.findAll({
      // where: getBaseQuery(req),
      attributes: ["id", "esPie", "esUtp"],
      include: [
        {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1","apellido2"],
          where: {},
        },
        { model: Colegio, attributes: ["id", "nombre"], where: {} },
        { model: Anno, attributes: ["id", "nombre"], where: {} },

      ],
      order: [[{ model: Profesor }, "apellido1", "ASC"]],
    })
      .then((inscripciones) => res.status(200).send(inscripciones))
      .catch((error) => res.status(400).send(error));
  }

  static getByFk(req, res) {
    const { profesorId, colegioId, annoId } = req.params;
    // let consulta = getBaseQuery(req);
    let consulta = {};

    if (profesorId != "0") {
      consulta["profesorId"] = profesorId;
    }
    if (colegioId != "0") {
      consulta["colegioId"] = colegioId;
    }
    if (annoId != "0") {
      consulta["annoId"] = annoId;
    }

    return InscripcionColegio.findAll({
      where: consulta,
      attributes: ["id", "esPie", "esUtp"],
      include: [
        {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1","apellido2"],
          where: {},
        },
        { model: Colegio, attributes: ["id", "nombre"], where: {} },
        { model: Anno, attributes: ["id", "nombre"], where: {} },
      ],
      order: [[{ model: Profesor }, "apellido1", "ASC"]],
    })
      .then((inscripcion) => res.status(200).send(inscripcion))
      .catch((error) => res.status(400).send(error));
  }

  static getProfesores(req, res) {
    const { colegioId, annoId } = req.params;
    // let consulta = getBaseQuery(req);
    let consulta = {};
    if (colegioId != "0") {
      consulta["colegioId"] = colegioId;
    }
    if (annoId != "0") {
      consulta["annoId"] = annoId;
    }

    return InscripcionColegio.findAll({
      where: consulta,
      attributes: ["esPie", "esUtp"],
      include: [
        {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1","apellido2"],
          where: {},
        },
      ],
      order: [[{ model: Profesor }, "apellido1", "ASC"]],
      raw: true,
    })
      .then((inscripciones) => {
        let profes = [];
        inscripciones.forEach((inscripcion) => {
          profes.push({
            id: inscripcion["Profesor.id"],
            nombre: inscripcion["Profesor.nombre"],
            apellido1: inscripcion["Profesor.apellido1"],
            apellido2: inscripcion["Profesor.apellido2"],
            esPie: inscripcion.esPie,
            esUtp: inscripcion.esUtp,
          });
        });
        res.status(200).send(profes);
      })
      .catch((error) => res.status(400).send(error));
  }

  static getProfesoresPie(req, res) {
    const { colegioId, annoId } = req.params;
    // let consulta = getBaseQuery(req);
    let consulta = {};
    consulta["esPie"] = true;
    if (colegioId != "0") {
      consulta["colegioId"] = colegioId;
    }
    if (annoId != "0") {
      consulta["annoId"] = annoId;
    }

    return InscripcionColegio.findAll({
      where: consulta,
      attributes: [],
      include: [
        {
          model: Profesor,
          attributes: ["id", "nombre", "apellido1","apellido2"],
          where: {},
        },
      ],
      order: [[{ model: Profesor }, "apellido1", "ASC"]],
      raw: true,
    })
      .then((inscripciones) => {
        let profes = [];
        inscripciones.forEach((inscripcion) => {
          profes.push({
            id: inscripcion["Profesor.id"],
            nombre: inscripcion["Profesor.nombre"],
            apellido1: inscripcion["Profesor.apellido1"],
            apellido2: inscripcion["Profesor.apellido2"]
          });
        });
        res.status(200).send(profes);
      })
      .catch((error) => res.status(400).send(error));
  }

  static create(req, res) {
    const { profesorId, colegioId, annoId } = req.params;
    const { esPie, esUtp } = req.body;
    return InscripcionColegio.create({
      esPie,
      esUtp,
      profesorId,
      colegioId,
      annoId,
  
    })
      .then((data) =>
        res.status(201).send({
          success: true,
          message: "InscripcionColegio successfully created",
          data,
        })
      )
      .catch((error) => res.status(400).send(error));
  }

  static getByPk(req, res) {
    // let consulta = getBaseQuery(req);
    let consulta = {};
    consulta["id"] = req.params.inscripcioncolegioId;
    return InscripcionColegio.findOne({ where: consulta })
      .then((inscripcionColegio) => res.status(200).send(inscripcionColegio))
      .catch((error) => res.status(400).send(error));
  }

  static modify(req, res) {
    // let consulta = getBaseQuery(req);
    let consulta = {};
    consulta["id"] = req.params.inscripcioncolegioId;
    const { esPie, esUtp, Profesor, Colegio, Anno } =
      req.body;

    return InscripcionColegio.findOne({ where: consulta })
      .then((inscripcionColegio) => {
        inscripcionColegio
          .update({
            esPie: esPie || inscripcionColegio.esPie,
            esUtp: esUtp || inscripcionColegio.esUtp,
            profesorId: Profesor || inscripcionColegio.profesorId,
            colegioId: Colegio || inscripcionColegio.colegioId,
            annoId: Anno || inscripcionColegio.annoId,
   
          })
          .then((updatedInscripcionColegio) => {
            res.status(200).send({
              message: "InscripcionColegio updated successfully",
              data: {
                esPie: esPie || updatedInscripcionColegio.esPie,
                esUtp: esUtp || updatedInscripcionColegio.esUtp,
                profesorId: Profesor || updatedInscripcionColegio.profesorId,
                colegioId: Colegio || updatedInscripcionColegio.colegioId,
                annoId: Anno || updatedInscripcionColegio.annoId,
              },
            });
          })
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }
}
export default InscripcionesColegio;
