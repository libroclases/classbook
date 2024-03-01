import model from '../models';

const { Periodo } = model;

class Periodos {

    static list(req, res) {
      return Periodo
        .findAll({
          attributes: ['id','nombre'],
 
          order: [['nombre','ASC']]
        })
        .then(periodos => res.status(200).send(periodos))
        .catch(error => res.status(400).send(error));
      }

    static create(req, res) {
      const { nombre } = req.body
   
      return Periodo
        .create({
          nombre,
   
        })
        .then(periodo => res.status(201).send({
          message: `Periodo con nombre ${nombre} creado exitosamente`,
          periodo
        }))
        .catch(error => res.status(400).send(error));
      }
    
    static modify(req, res) {
      const { nombre } = req.body
      return Periodo
        .findByPk(req.params.periodoId)
        .then((periodo) => {
          periodo.update({
            nombre: nombre || periodo.nombre,
    
          })
          .then((updatedPeriodo) => {
            res.status(200).send({
              message: 'Periodo actualizado exitosamente',
              data: {
                nombre: nombre || updatedPeriodo.nombre,

              }
            })
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    

} 

export default Periodos;
