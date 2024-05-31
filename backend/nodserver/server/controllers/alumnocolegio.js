import model from '../models';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { AlumnoColegio, Alumno, Colegio, Anno } = model;

class AlumnoColegios {

    static list(req, res) {
        return AlumnoColegio
          .findAll({attributes: ['id'], 
          include: [
            
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Alumno, attributes:['id','nombre','apellido1','apellido2'], where: { } },
 
          ],
          order: [['id','ASC']]
        })  
          .then(AlumnoColegios => res.status(200).send(AlumnoColegios))
          .catch(error => res.status(400).send(error));
      }

  static getByFk(req, res) {
    const { annoId, colegioId, alumnoId } = req.params;
    let consulta = {};
    if (annoId != '0') {  consulta['annoId'] = annoId;  }
    if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
    if (alumnoId != '0') {  consulta['alumnoId'] = alumnoId;  }

    return AlumnoColegio 
      .findAll({ where : consulta,
        attributes: ['id'],  include: [
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Alumno, attributes:['id','nombre', 'apellido1','apellido2'], where: { } },          

        ],
        order: [['id','ASC']] })
      .then(asignaturaprofesor => res.status(200).send(asignaturaprofesor))
      .catch(error => res.status(400).send(error));
  }

  static create(req, res) {
    
    const { annoId, colegioId, alumnoId } = req.params;
    return AlumnoColegio
      .create({
        annoId,
        colegioId,
        alumnoId,
   
      })
      .then(AlumnoColegio => res.status(201).send({
        message: `AlumnoColegio creado exitosamente`,
        AlumnoColegio
      }))
      .catch(error => res.status(400).send(error));
    }
  
  static modify(req, res) {
    const { Anno, Colegio, Alumno} = req.body;
    return AlumnoColegio
      .findByPk(req.params.alumnocolegioId)
      .then((AlumnoColegio) => {
        AlumnoColegio.update({
          annoId: Anno || AlumnoColegio.annoId,
          colegioId: Colegio || AlumnoColegio.colegioId, 
          alumnoId: Alumno || AlumnoColegio.alumnoId,
    
      })
      .then((updateAlumnoColegio) => {
          res.status(200).send({
            message: 'AlumnoColegio actualizado exitosamente',
            data: {
              annoId: Anno || updateAlumnoColegio.annoId,
              colegioId: Colegio || updateAlumnoColegio.colegioId,
              alumnoId: Alumno || updateAlumnoColegio.alumnoId
            }
          });
      })
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }

} 

export default AlumnoColegios;