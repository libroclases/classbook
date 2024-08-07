import model, { sequelize } from '../models';

const { Horario, Colegio, Curso, CursoProfesor, Anno, Dix,
   Profesor, Asignatura 
  } = model;

  class Horarios {

    static list(req, res) {
      
      return Horario
        .findAll({
          // where: getBaseQuery(req),
          attributes: ['id','hora'],
          include: [
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
            { model:CursoProfesor, attributes:['id'], where: { } },
            { model:Dix, attributes:['id','nombre'], where: { } },
         ],
         order: [[{ model: Dix }, 'id','ASC'], ['hora','ASC']],

      })
        .then(horarios => res.status(200).send(horarios))
        .catch(error => res.status(400).send(error));
    }
 
    static disponibilidadHora (req, res) {
      const {annoId, colegioId, cursoprofesorId, dixId } = req.params;
      let consulta = {};
      // let consulta = getBaseQuery(req);

      if (annoId != '0') {  consulta['annoId'] = annoId;  }
      if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
      if (cursoprofesorId != '0') {  consulta['cursoprofesorId'] = cursoprofesorId;  }
      if (dixId != '0') {  consulta['dixId'] = dixId;  }


    return Horario
      .findAll({ where: consulta, attributes: ['hora']})
      .then(horarios => res.status(200).send(horarios))
      .catch(error => res.status(400).send(error));  

    }

    static groupByFk(req, res) {    

      const {annoId, colegioId, cursoId, cursoprofesorId } = req.params;  
      let consulta = {};
      
      if (annoId != '0') {  consulta['annoId'] = annoId;  }
      if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
      if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
      if (cursoprofesorId != '0') {  consulta['cursoprofesorId'] = cursoprofesorId;  }
 
      return Horario
      .findAll({ where: consulta , group: ['Anno.id','Colegio.id','Curso.id','CursoProfesor.id'], 
        attributes: ['Anno.id', 'Colegio.id','Curso.id','CursoProfesor.id', [sequelize.fn('COUNT','*'),'TotalHoras']], 
      include: [
        { model:Anno, attributes:['id','nombre'], where: { } },
        { model:Colegio, attributes:['id','nombre'], where: { } },
        { model:Curso, attributes:['id','nombre'], where: { } },
        { model:CursoProfesor, attributes:['id'], where: { } },         
        ] , order: [ [{ model: CursoProfesor }, 'id','ASC'] ]
      })
      .then(horarios => res.status(200).send(horarios))
      .catch(error => res.status(400).send(error));
  }

    static getByFk(req, res) {


      const { annoId, colegioId, cursoId, cursoprofesorId, dixId} = req.params;
      
      let consulta = {};
      
      if (annoId != '0') {  consulta['annoId'] = annoId;  }
      if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
      if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
      if (cursoprofesorId != '0') {  consulta['cursoprofesorId'] = cursoprofesorId;  }
      if (dixId != '0') {  consulta['dixId'] = dixId;  }

      return Horario
      .findAll({ where: consulta , attributes: ['id','hora'], order: [['hora','ASC']],
      include: [
       //  { model:Anno, attributes:['id','nombre'], where: { } },
       //  { model:Colegio, attributes:['id','nombre'], where: { } },
       //  { model:Curso, attributes:['id','nombre'], where: { } },    
         { model:CursoProfesor, attributes:['id',], where: { } },
        { model:Dix, attributes:['id','nombre'], where: { } }
        ], order: [[{ model: Dix }, 'id','ASC'], ['hora','ASC']], 
      })
      .then(horarios => res.status(200).send(horarios))
      .catch(error => res.status(400).send(error));
  }

    static create(req, res) {
      const { annoId, colegioId, cursoId, cursoprofesorId,  dixId } = req.params;
      const { hora } = req.body;

      return Horario
        .create({
            hora,
            annoId,
            colegioId,
            cursoId,
            cursoprofesorId,
            dixId,
   
      })
      .then(data => res.status(201).send({
          success: true,
          message: 'Horario creado exitosamente',
          data
        }))
        .catch(error => res.status(400).send(error));
      }

    static modify(req, res) {
      let consulta = {};
      // let consulta = getBaseQuery(req);
      consulta['id'] = req.params.horarioId;
      const { hora, Colegio, Curso, CursoProfesor, Anno, Dix } = req.body
      return Horario
        .findOne({ where: consulta })
        .then((horario) => {
          horario.update({
            hora: hora || horario.nombre,
            colegioId: Colegio || horario.colegioId,
            cursoId: Curso || horario.cursoId,
            cursoprofesorId: CursoProfesor || horario.cursoprofesorId,
            annoId: Anno || horario.annoId,
            dixId: Dix || horario.dixId,
    
        })
        .then((updatedHorario) => {
            res.status(200).send({
              message: 'Horario actualizado exitosamente',
              data: {
                hora: hora || updatedHorario.hora,
                colegioId: Colegio || updatedHorario.colegioId,
                cursoId: Curso || updatedHorario.cursoId,
                cursoprofesorId: CursoProfesor || updatedHorario.cursoprofesorId,
                annoId: Anno || updatedHorario.annoId,
                dixId: Dix || updatedHorario.dixId
              }
            })
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
  }

  static delete(req, res) {
    let consulta = {};

    consulta['id'] = req.params.horarioId;
    return Horario
      .findOne({ where: consulta })
      .then(horario => {
        if(!horario) {
          return res.status(400).send({
          message: 'Horario Not Found',
          });
        }
        return horario
          .destroy()
          .then(() => res.status(200).send({
            message: 'Horario successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  }
    
}

export default Horarios;