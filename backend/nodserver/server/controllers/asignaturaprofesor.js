import model from '../models';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { AsignaturaProfesor, Profesor, Asignatura } = model;

class AsignaturaProfesores {

    static list(req, res) {
        return AsignaturaProfesor
          .findAll({attributes: ['id'], 
          include: [
            
            { model:Asignatura, attributes:['id','nombre'], where: { } },
            { model:Profesor, attributes:['id','nombre','apellido1','apellido2'], where: { } },
 
          ],
          order: [['id','ASC']]
        })  
          .then(AsignaturaProfesores => res.status(200).send(AsignaturaProfesores))
          .catch(error => res.status(400).send(error));
      }


  static getByPk(req, res) {
    return AsignaturaProfesor
    .findByPk(req.params.asignaturaprofesorId)
    .then(asignaturaprofesor => res.status(200).send(asignaturaprofesor))
    .catch(error => res.status(400).send(error));
  }

  static getByFk(req, res) {
    const { profesorId, asignaturaId } = req.params;
    let consulta = {};
    if (asignaturaId != '0') {  consulta['asignaturaId'] = asignaturaId;  }
    if (profesorId != '0') {  consulta['profesorId'] = profesorId;  }

    return AsignaturaProfesor 
      .findAll({ where : consulta,
        attributes: ['id'],  include: [

            { model:Asignatura, attributes:['id','nombre'], where: { } },
            { model:Profesor, attributes:['id','nombre', 'apellido1','apellido2'], where: { } },          

        ],
        order: [['id','ASC']] })
      .then(asignaturaprofesor => res.status(200).send(asignaturaprofesor))
      .catch(error => res.status(400).send(error));
  }

  static create(req, res) {
    
    const { profesorId, asignaturaId } = req.params;
    return AsignaturaProfesor
      .create({
        asignaturaId,
        profesorId,
   
      })
      .then(AsignaturaProfesor => res.status(201).send({
        message: `AsignaturaProfesor creado exitosamente`,
        AsignaturaProfesor
      }))
      .catch(error => res.status(400).send(error));
    }
  
  static modify(req, res) {
    const { Asignatura, Profesor} = req.body;
    return AsignaturaProfesor
      .findByPk(req.params.asignaturaprofesorId)
      .then((AsignaturaProfesor) => {
        AsignaturaProfesor.update({
          asignaturaId: Asignatura || AsignaturaProfesor.asignaturaId, 
          profesorId: Profesor || AsignaturaProfesor.profesorId,
    
      })
      .then((updateAsignaturaProfesor) => {
          res.status(200).send({
            message: 'AsignaturaProfesor actualizado exitosamente',
            data: {
              asignaturaId: Asignatura || updateAsignaturaProfesor.asignaturaId,
              profesorId: Profesor || updateAsignaturaProfesor.profesorId
            }
          });
      })
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }

} 

export default AsignaturaProfesores;