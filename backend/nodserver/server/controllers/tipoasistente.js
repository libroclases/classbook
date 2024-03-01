import model from '../models';

const { TipoAsistente } = model;

class TipoAsistentes {

  static list(req, res) {
      return TipoAsistente
        .findAll({
          attributes: ['id', 'nombre'],
 
          order: [['nombre','ASC']]
        })
        .then(dias => res.status(200).send(dias))
        .catch(error => res.status(400).send(error));
    }
  
  static create(req, res) {
    const { nombre } = req.body;
   
    
    return TipoAsistente
      .create({
        nombre,
   
      })
      .then(TipoAsistente => res.status(201).send({
        message: `TipoAsistente con nombre ${nombre} creado exitosamente `,
        TipoAsistente
      }))
      .catch(error => res.status(400).send(error));
    }

  static modify(req, res) {
    const { nombre } = req.body
    return TipoAsistente
      .findByPk(req.params.tipoasistenteId)
      .then((TipoAsistente) => {
        TipoAsistente.update({
          nombre: nombre || TipoAsistente.nombre,
     
        })
        .then((updatedTipoAsistente) => {
          res.status(200).send({
            message: 'TipoAsistente actualizado exitosamente',
            data: {
              nombre: nombre || updatedTipoAsistente.nombre,
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
    

} 

export default TipoAsistentes;