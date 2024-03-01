import model from '../models';

const { TipoEstado } = model;

class TipoEstados {

  static list(req, res) {
      return TipoEstado
        .findAll({
          attributes: ['id', 'nombre'],
   
          order: [['nombre','ASC']]
        })
        .then(tipoestado => res.status(200).send(tipoestado))
        .catch(error => res.status(400).send(error));
    }
  
  static create(req, res) {
    const { nombre } = req.body;
  
    
    return TipoEstado
      .create({
        nombre,
   
      })
      .then(TipoEstado => res.status(201).send({
        message: `TipoEstado con nombre ${nombre} creado exitosamente.`,
        TipoEstado
      }))
      .catch(error => res.status(400).send(error));
    }

  static modify(req, res) {
    const { nombre } = req.body
    return TipoEstado
      .findByPk(req.params.tipoestadoId)
      .then((TipoEstado) => {
        TipoEstado.update({
          nombre: nombre || TipoEstado.nombre,
    
        })
        .then((updatedTipoEstado) => {
          res.status(200).send({
            message: 'TipoEstado actualizado exitosamente',
            data: {
              nombre: nombre || updatedTipoEstado.nombre,
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
    

} 

export default TipoEstados;