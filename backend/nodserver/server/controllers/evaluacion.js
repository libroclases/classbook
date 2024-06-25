import model from '../models';

const { Evaluacion, Colegio, Curso,  CursoProfesor, Anno, Asignatura, Periodo,
  TipoEvaluacion, Matricula, Nota } = model;


class Evaluaciones {


  static list(req, res) {
    return Evaluacion
      .findAll({
        // where: getBaseQuery(req),
        attributes: ['id', 'nombre', 'fecha','hora','ponderacion'],
        include: [
          { model:Anno, attributes:['id','nombre'], where: { } },
          { model:Periodo, attributes:['id','nombre'], where: { } },
          { model:Colegio, attributes:['id','nombre'], where: { } },
          { model:Curso, attributes:['id','nombre'], where: { } },
          { model:CursoProfesor, attributes:['id'], where: { } },
          { model:TipoEvaluacion, attributes:['id','nombre'], where: { } },
   
        ], order: [['fecha','ASC'],['hora','ASC']] })
        .then(evaluaciones => res.status(200).send(evaluaciones))
        .catch(error => res.status(400).send(error));
  }


  static getByFk(req, res) {

    const { annoId,periodoId, colegioId,cursoId, cursoprofesorId, Asignatura, tipoevaluacionId } = req.params;
      let consulta = {};
    // let consulta = getBaseQuery(req);

    if (annoId != '0') {  consulta['annoId'] = annoId;  }
    if (periodoId != '0') {  consulta['periodoId'] = periodoId;  }    
    if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
    if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
    if (cursoprofesorId != '0') {  consulta['cursoprofesorId'] = cursoprofesorId;  }
    if (tipoevaluacionId != '0') {  consulta['tipoevaluacionId'] = tipoevaluacionId;  }

    return Evaluacion
    .findAll({ where: consulta,
      attributes: ['id','nombre', 'fecha','hora', 'ponderacion'],
      
    include: [
      { model:Anno, attributes:['id','nombre'], where: { } },
      { model:Periodo, attributes:['id','nombre'], where: { } },
      { model:Colegio, attributes:['id','nombre'], where: { } },
      { model:Curso, attributes:['id','nombre'], where: { } },
      { model:CursoProfesor, attributes : [ 'id'], where: {} },
      { model:TipoEvaluacion, attributes:['id','nombre'], where: { } },    
      ],
      order: [['fecha','ASC'], ['hora','ASC']]
    })
    .then(evaluaciones => res.status(200).send(evaluaciones))
    .catch(error => res.status(400).send(error));
  }
  
  static create(req, res) {

    const { nombre, fecha, hora, ponderacion } = req.body;
    const { annoId,  periodoId, colegioId, cursoId, cursoprofesorId,  tipoevaluacionId } = req.params;
    
    return Evaluacion
    .create({
      nombre,
      fecha,
      hora,
      ponderacion,
      annoId,
      periodoId,
      colegioId,
      cursoId,
      cursoprofesorId,
      tipoevaluacionId,
   
    })
    .then(evaluacion => {

      let e = evaluacion.dataValues;
      let p = {
        annoId : e.annoId,
        periodoId: e.periodoId,
        colegioId: e.colegioId,
        cursoId: e.cursoId,
        cursoprofesorId: e.cursoprofesorId,
        evaluacionId: e.id
      };

      var consulta = {};

      if (p.annoId != 0) {  consulta['annoId'] = p.annoId };
      if (p.colegioId != 0) {  consulta['colegioId'] = p.colegioId  };
      if (p.cursoId != 0) {  consulta['cursoId'] = p.cursoId  };

      Matricula.findAll({  where: consulta, attributes: ['id'], order: [['id','ASC']]}) 
      .then(matricula => { 
        var notasObject = [];
        matricula.forEach(m => {
          notasObject.push(
            {...p,
              matriculaId: m.dataValues.id,
   
            })
        });
        
        return Nota
        .bulkCreate(notasObject)
                .then(() => res.status(201).send({
                  success: true,
                  newData: true,
                  message: `Notas creadas exitosamente`
        }))
        .catch(error => res.status(400).send({
            success: false,
            newData: false,
            message: `Entradas de Evaluacion NO fueron creadas : ${error}`,
        })); 
    })
  }
);
}

  static modify(req, res) {
    const { nombre, fecha, hora, ponderacion, Colegio, Curso, CursoProfesor, Anno, Periodo, TipoEvaluacion } = req.body;
    let consulta = {};
    // let consulta = getBaseQuery(req);
    consulta['id'] = req.params.evaluacionId;
    return Evaluacion
      .findOne({ where: consulta})
      .then((evaluacion) => {
        evaluacion.update({
          nombre: nombre || evaluacion.nombre,
          fecha: fecha || evaluacion.fecha,
          hora: hora || evaluacion.hora,
          ponderacion: ponderacion || evaluacion.ponderacion,
          colegioId: Colegio || evaluacion.colegioId,
          cursoId: Curso || evaluacion.cursoId,
          cursoprofesorId: CursoProfesor || evaluacion.cursoprofesorId,
          annoId: Anno || evaluacion.annoId,
          periodoId: Periodo || evaluacion.periodoId,
          tipoevaluacionId: TipoEvaluacion || evaluacion.tipoevaluacionId,
    
        })
      .then((updatedEvaluacion) => {
        res.status(200).send({
          message: 'Evaluacion actualizada exitosamente',
          data: {
            nombre: nombre || updatedEvaluacion.nombre,
            fecha: fecha || updatedEvaluacion.fecha,
            hora: hora || updatedEvaluacion.hora,
            ponderacion: ponderacion || updatedEvaluacion.ponderacion,
            colegioId: Colegio || updatedEvaluacion.colegioId,
            cursoId: Curso || updatedEvaluacion.cursoId,
            cursoprofesorId: CursoProfesor || updatedEvaluacion.cursoprofesorId,
            annoId: Anno || updatedEvaluacion.annoId,
            periodoId: Periodo || updatedEvaluacion.periodoId,
            tipoevaluacionId: TipoEvaluacion || updatedEvaluacion.tipoevaluacionId
          }
        })
      })
      .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
    

} 

export default Evaluaciones;