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
        attributes: ['id'],  include: [
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
            { model:Profesor, attributes:['id','nombre','apellido1','apellido2'], where: { } },
        ] })
      .then(cursoprofesor => res.status(200).send(cursoprofesor))
      .catch(error => res.status(400).send(error));
  }

  static getByProfesorCurso(req, res) {
    const { annoId, colegioId, cursoId } = req.params;
    let consulta = {};
    if (annoId != '0') {  consulta['annoId'] = annoId;  }
    if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
    if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }

    return CursoProfesor 
      .findAll({ where : consulta,
        attributes: [],  include: [
            { model:Profesor, attributes:['id','nombre','apellido1','apellido2'], where: { } },
        ] })
      .then(query => { 
      let values; 
      let profesor = [];
      query.forEach(element => {
        values = element.dataValues.Profesor.dataValues;
        profesor.push({ id:values.id,nombre: `${values.apellido1} ${values.apellido2} ${values.nombre}` });
      });
      res.status(200).send(profesor)
    })
      .catch(error => res.status(400).send(error));
  }


  static create(req, res) {
    const {} = req.body;
    const { annoId,colegioId, cursoId, profesorId } = req.params;
    return CursoProfesor
      .create({
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
    const { Anno, Colegio, Curso, Profesor} = req.body;
    return CursoProfesor
      .findByPk(req.params.cursoprofesorId)
      .then((CursoProfesor) => {
        CursoProfesor.update({
          annoId: Anno || CursoProfesor.annoId,
          colegioId: Colegio || CursoProfesor.colegioId,
          cursoId: Curso || CursoProfesor.cursoId, 
          profesorId: Profesor || CursoProfesor.profesorId,
    
      })
      .then((updateCursoprofesor) => {
          res.status(200).send({
            message: 'CursoProfesor actualizado exitosamente',
            data: {
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