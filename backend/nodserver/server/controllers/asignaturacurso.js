import model from '../models';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { AsignaturaCurso,Colegio, Anno,  Curso, Asignatura } = model;

class AsignaturaCursos {

    static list(req, res) {
        return AsignaturaCurso
          .findAll({attributes: ['id'], 
          include: [
            
            { model:Asignatura, attributes:['id','nombre'], where: { } },
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
 
          ]})  
          .then(AsignaturaCursos => res.status(200).send(AsignaturaCursos))
          .catch(error => res.status(400).send(error));
      }


  static getByPk(req, res) {
    return AsignaturaCurso
    .findByPk(req.params.asignaturacursoId)
    .then(asignaturacurso => res.status(200).send(asignaturacurso))
    .catch(error => res.status(400).send(error));
  }

  static getByFk(req, res) {
    const { annoId, colegioId, cursoId, asignaturaId } = req.params;
    let consulta = {};
    if (asignaturaId != '0') {  consulta['asignaturaId'] = asignaturaId;  }
    if (annoId != '0') {  consulta['annoId'] = annoId;  }
    if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
    if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }

    return AsignaturaCurso 
      .findAll({ where : consulta,
        attributes: ['id','nombre'],  include: [

            { model:Asignatura, attributes:['id','nombre'], where: { } },
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },          

        ] })
      .then(AsignaturaCurso => res.status(200).send(AsignaturaCurso))
      .catch(error => res.status(400).send(error));
  }

  static create(req, res) {
    const { nombre } = req.body;
    const { annoId, colegioId, cursoId, asignaturaId } = req.params;
    return AsignaturaCurso
      .create({
        nombre, 
        asignaturaId,
        annoId,
        colegioId,
        cursoId,
   
      })
      .then(AsignaturaCurso => res.status(201).send({
        message: `AsignaturaCurso creado exitosamente`,
        AsignaturaCurso
      }))
      .catch(error => res.status(400).send(error));
    }
  
  static modify(req, res) {
    const { nombre , Asignatura, Anno, Colegio, Curso} = req.body;
    return AsignaturaCurso
      .findByPk(req.params.asignaturacursoId)
      .then((AsignaturaCurso) => {
        AsignaturaCurso.update({
          nombre: nombre || AsignaturaCurso.nombre,
          asignaturaId: Asignatura || AsignaturaCurso.asignaturaId,
          annoId: Anno || AsignaturaCurso.annoId, 
          colegioId: Colegio || AsignaturaCurso.colegioId,
          cursoId: Curso || AsignaturaCurso.cursoId,
    
      })
      .then((updateAsignaturaCurso) => {
          res.status(200).send({
            message: 'AsignaturaCurso actualizado exitosamente',
            data: {
              nombre: nombre || updateAsignaturaCurso.nombre,
              asignaturaId: Asignatura || updateAsignaturaCurso.asignaturaId,
              annoId: Anno || updateAsignaturaCurso.annoId,
              colegioId: Colegio || updateAsignaturaCurso.colegioId,
              cursoId: Curso || updateAsignaturaCurso.cursoId
            }
          });
      })
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }

} 

export default AsignaturaCursos;