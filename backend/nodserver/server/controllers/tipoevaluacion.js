import model from '../models';

const { TipoEvaluacion, Usuario } = model;

class TiposEvaluacion {

  static list(req, res) {
      return TipoEvaluacion
        .findAll({
          attributes: ['id', 'nombre', 'descripcion'],
     
          order: [['nombre','ASC']],
        })
        .then(dias => res.status(200).send(dias))
        .catch(error => res.status(400).send(error));
    }
  
  static create(req, res) {
    const { nombre, descripcion } = req.body;

    return TipoEvaluacion
      .create({
        nombre,
        descripcion,

      })
      .then(tipoEvaluacion => res.status(201).send({
        message: `TipoEvaluacion con nombre ${nombre} creado exitosamente`,
        tipoEvaluacion
      }))
      .catch(error => res.status(400).send(error));
    }

  static modify(req, res) {
    const { nombre, descripcion } = req.body
    return TipoEvaluacion
      .findByPk(req.params.tipoevaluacionId)
      .then((tipoEvaluacion) => {
        tipoEvaluacion.update({
          nombre: nombre || tipoEvaluacion.nombre,
          descripcion: descripcion || tipoEvaluacion.descripcion,
        })
        .then((updatedTipoEvaluacion) => {
          res.status(200).send({
            message: 'TipoEvaluacion actualizado exitosamente',
            data: {
              nombre: nombre || updatedTipoEvaluacion.nombre,
              descripcion: descripcion || updatedTipoEvaluacion.descripcion,
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
    

} 

export default TiposEvaluacion;