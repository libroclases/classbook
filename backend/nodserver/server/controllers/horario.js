import model, { sequelize } from '../models';

const { Horario, Colegio, Curso, Profesor, Asignatura, Anno, Dix } = model;

  class Horarios {

    static list(req, res) {
      
      return Horario
        .findAll({
          // where: getBaseQuery(req),
          attributes: ['id','hora'],
          order: [['hora','ASC']],
          include: [
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
            { model:Asignatura, attributes:['id','nombre'], where: { } },
            { model:Profesor, attributes:['id','nombre', 'apellido1','apellido2'], where: { } },
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Dix, attributes:['id','nombre'], where: { } },
 
                ]
      })
        .then(horarios => res.status(200).send(horarios))
        .catch(error => res.status(400).send(error));
    }
 
    static disponibilidadHora (req, res) {
      const {annoId, colegioId, profesorId, dixId } = req.params;
      let consulta = {};
      // let consulta = getBaseQuery(req);

      if (annoId != '0') {  consulta['annoId'] = annoId;  }
      if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
      if (profesorId != '0') {  consulta['profesorId'] = profesorId;  }
      if (dixId != '0') {  consulta['dixId'] = dixId;  }


    return Horario
      .findAll({ where: consulta, attributes: ['hora']})
      .then(horarios => res.status(200).send(horarios))
      .catch(error => res.status(400).send(error));  

    }

    static groupByFk(req, res) {

      const {annoId, colegioId, cursoId, profesorId, asignaturaId } = req.params;  
      let consulta = {};
      // let consulta = getBaseQuery(req);
      console.log(" consulta ");

      
      if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
      if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
      if (asignaturaId != '0') {  consulta['asignaturaId'] = asignaturaId;  }
      if (profesorId != '0') {  consulta['profesorId'] = profesorId;  }
      if (annoId != '0') {  consulta['annoId'] = annoId;  }

      return Horario
      .findAll({ where: consulta , group: ['Profesor.id','Asignatura.id','Colegio.id','Curso.id','Anno.id'], 
      attributes: ['Profesor.id','Asignatura.id','Colegio.id','Curso.id','Anno.id', [sequelize.fn('COUNT','*'),'TotalHoras']], 
      include: [
        { model:Profesor, attributes:['id','nombre', 'apellido1','apellido2'], where: { } },
        { model:Colegio, attributes:['id','nombre'], where: { } },
        { model:Curso, attributes:['id','nombre'], where: { } },
        { model:Anno, attributes:['id','nombre'], where: { } },
        { model:Asignatura, attributes:['id','nombre'], where: { }  }           
        ]
      })
      .then(horarios => res.status(200).send(horarios))
      .catch(error => res.status(400).send(error));
  }

    static getByFk(req, res) {


      const { annoId, colegioId, cursoId, profesorId, asignaturaId, dixId} = req.params;
      
      let consulta = {};
      // let consulta = getBaseQuery(req);
      
      if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
      if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
      if (asignaturaId != '0') {  consulta['asignaturaId'] = asignaturaId;  }
      if (profesorId != '0') {  consulta['profesorId'] = profesorId;  }
      if (annoId != '0') {  consulta['annoId'] = annoId;  }
      if (dixId != '0') {  consulta['dixId'] = dixId;  }

      return Horario
      .findAll({ where: consulta , attributes: ['id','hora'], order: [['hora','ASC']],
      include: [
        { model:Colegio, attributes:['id','nombre'], where: { } },
        { model:Curso, attributes:['id','nombre'], where: { } },    
        { model:Asignatura, attributes:['id','nombre'], where: { } },
        { model:Profesor, attributes:['id','nombre', 'apellido1','apellido2'], where: { } },
        { model:Anno, attributes:['id','nombre'], where: { } },
        { model:Dix, attributes:['id','nombre'], where: { } }
                ]
      })
      .then(horarios => res.status(200).send(horarios))
      .catch(error => res.status(400).send(error));
  }

    static create(req, res) {
      const { annoId, colegioId, cursoId, profesorId, asignaturaId, dixId } = req.params;
      const { hora } = req.body;

      return Horario
        .create({
            hora,
            colegioId,
            cursoId,
            asignaturaId,
            profesorId,
            annoId,
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
      const { hora, Colegio, Curso, Profesor, Asignatura,  Anno, Dix } = req.body
      return Horario
        .findOne({ where: consulta })
        .then((horario) => {
          horario.update({
            hora: hora || horario.nombre,
            colegioId: Colegio || horario.colegioId,
            cursoId: Curso || horario.cursoId,
            asignaturaId: Asignatura ||   horario.asignaturaId,
            profesorId: Profesor || horario.profesorId,
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
                asignaturaId: Asignatura || updatedHorario.asignaturaId,
                profesorId: Profesor || updatedHorario.profesorId,
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
    // let consulta = getBaseQuery(req);
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