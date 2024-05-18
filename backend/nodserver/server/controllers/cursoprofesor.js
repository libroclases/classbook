import model from '../models';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { CursoProfesor, Anno, Colegio, Curso, Profesor } = model;

class CursoProfesores {

    static list(req, res) {
        return CursoProfesor
          .findAll({attributes: ['id'], 
          include: [
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
            { model:Profesor, attributes:['id','nombre','apellido1','apellido2'], where: { } },
 
          ]})  
          .then(CursoProfesores => res.status(200).send(CursoProfesores))
          .catch(error => res.status(400).send(error));
      }


  static getByPk(req, res) {
    return CursoProfesor
    .findByPk(req.params.cursoprofesorId)
    .then(cursoprofesor => res.status(200).send(cursoprofesor))
    .catch(error => res.status(400).send(error));
  }

  static getByFk(req, res) {
    const { annoId, colegioId, cursoId, profesorId } = req.params;
    let consulta = {};
    if (annoId != '0') {  consulta['annoId'] = annoId;  }
    if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
    if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
    if (profesorId != '0') {  consulta['profesorId'] = profesorId;  }

    return CursoProfesor 
      .findAll({ where : consulta,
        attributes: ['id','nombre'],  include: [
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
            { model:Profesor, attributes:['id','nombre','apellido1','apellido2'], where: { } },
        ] })
      .then(cursoprofesor => res.status(200).send(cursoprofesor))
      .catch(error => res.status(400).send(error));
  }

  static create(req, res) {
    const { nombre } = req.body;
    const { annoId,colegioId, cursoId, profesorId } = req.params;
    return CursoProfesor
      .create({
        nombre,
        annoId,
        colegioId, 
        cursoId,
        profesorId,
      })
      .then(CursoAsignatura => res.status(201).send({
        message: `Curso Profesor creado exitosamente`,
        CursoAsignatura
      }))
      .catch(error => res.status(400).send(error));
    }
  
  static modify(req, res) {
    const { nombre , Anno, Colegio, Curso, Profesor} = req.body;
    return CursoProfesor
      .findByPk(req.params.cursoprofesorId)
      .then((CursoProfesor) => {
        CursoProfesor.update({
          nombre: nombre || CursoProfesor.nombre,
          annoId: Anno || CursoProfesor.annoId,
          colegioId: Colegio || CursoProfesor.colegioId,
          cursoId: Curso || CursoProfesor.cursoId, 
          profesorId: Profesor || CursoProfesor.profesorId,
    
      })
      .then((updateCursoprofesor) => {
          res.status(200).send({
            message: 'CursoProfesor actualizado exitosamente',
            data: {
              nombre: nombre || updateCursoprofesor.nombre,
              annoId: Anno || updateCursoprofesor.annoId,
              colegioId: Colegio || updateCursoprofesor.colegioId,
              cursoId: Curso || updateCursoprofesor.cursoId,
              profesorId: Profesor || updateCursoprofesor.profesorId
            }
          });
      })
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }

} 

export default CursoProfesores;