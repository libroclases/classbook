import model, { sequelize } from '../models';

const { EstadoAlumno, Alumno, Matricula, Anno, Colegio, Curso,TipoEstado } = model;

class EstadoAlumnos {

  static list(req, res) {
    return EstadoAlumno
      .findAll( {
        attributes: ['id', 'fecha'], 
        include: [ 
          { model:Matricula, attributes:['id','nombre'], where: { } },
          { model:Alumno, attributes:['id','nombre','apellido1','apellido2'], where: { } },
          { model:TipoEstado, attributes:['id','nombre'], where: { } },
          { model:Anno, attributes:['id','nombre'], where: { } },
          { model:Colegio, attributes:['id','nombre'], where: { } },
          { model:Curso, attributes:['id','nombre'], where: { } },
          

        ],
        order: [['fecha','ASC']]})
      .then(estadoalumnos => res.status(200).send(estadoalumnos))
      .catch(error => res.status(400).send(error));
  }

  static getByFk(req, res) {
    const {  annoId, colegioId, cursoId, alumnoId, matriculaId,  tipoestadoId } = req.params;
    let consulta = {};
    
    if (matriculaId != '0') { consulta['matriculaId'] = matriculaId; }
    if (alumnoId != '0') { consulta['alumnoId'] = alumnoId; }
    if (tipoestadoId != '0') { consulta['tipoestadoId'] = tipoestadoId;  }
    if (annoId != '0') { consulta['annoId'] = annoId;  }
    if (colegioId != '0') { consulta['colegioId'] = colegioId;  }
    if (cursoId != '0') { consulta['cursoId'] = cursoId;  }

    return EstadoAlumno
      .findAll({
        where: consulta,
        attributes: ['id', 'fecha'],
        include: [ 
          { model:Matricula, attributes:['id','nombre'], where: { } },
          { model:Alumno, attributes:['id','nombre', 'apellido1','apellido2'], where: { } },
          { model:TipoEstado, attributes:['id','nombre'], where: { } },
          { model:Anno, attributes:['id','nombre'], where: { } },
          { model:Colegio, attributes:['id','nombre'], where: { } },
          { model:Curso, attributes:['id','nombre'], where: { } },

        ],
        order: [
          ['id', 'DESC']]
        })
      .then(estado => res.status(200).send(estado))
      .catch(error => res.status(400).send(error));
  }

  static create(req, res) {
    const { annoId, colegioId, cursoId, alumnoId, matriculaId, tipoestadoId } = req.params;
    const { fecha } = req.body;
    return EstadoAlumno
      .create({
        fecha,
        matriculaId,
        alumnoId,
        tipoestadoId,
        annoId,
        colegioId,
        cursoId
   
      })
      .then(estado => res.status(201).send({
        success: true,
        message: 'EstadoAlumno successfully created',
        estado
      }))
      .catch(error => res.status(400).send(error));
  }

  static getByPk(req, res) {
    
    return EstadoAlumno
    .findByPk(req.params.estadoalumnoId)
    .then(estado => res.status(200).send(estado))
    .catch(error => res.status(400).send(error));
  }

  static modify(req, res) {
    const { fecha, Alumno, Matricula, TipoEstado, Anno, Colegio, Curso } = req.body;
    return EstadoAlumno
      .findByPk(req.params.estadoalumnoId)
      .then((estado) => {
        estado.update({
          fecha: fecha || estado.fecha,
          matriculaId: Matricula || estado.matriculaId,
          alumnoId: Alumno || estado.alumnoId,
          tipoestadoId: TipoEstado || estado.tipoestadoId,
          annoId: Anno || estado.annoId,
          colegioId: Colegio || estado.colegioId,
          cursoId: Curso || estado.cursoId
   
      })
      .then((updatedEstado) => {
          res.status(200).send({
            message: 'EstadoAlumno updated successfully',
            data: {
              fecha: fecha || updatedEstado.fecha,
              matriculaId: Matricula || updatedEstado.matriculaId,
              alumnoId: Alumno       || updatedEstado.alumnoId,
              tipoestadoId: TipoEstado || updatedEstado.tipoestadoId,
              annoId: Anno || updatedEstado.annoId,
              colegioId: Colegio || updatedEstado.colegioId,
              cursoId: Curso || updatedEstado.cursoId
            }
          })
      })
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
  }

  static delete(req, res) {
    return EstadoAlumno
      .findByPk(req.params.estadoalumnoId)
      .then(estado => {
        if(!estado) {
          return res.status(400).send({
          message: 'EstadoAlumno Not Found',
          });
        }
        return estado
          .destroy()
          .then(() => res.status(200).send({
            message: 'EstadoAlumno successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  }
}

export default EstadoAlumnos;