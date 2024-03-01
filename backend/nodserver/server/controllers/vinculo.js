import model from '../models';

const { Vinculo } = model;

class Vinculos {

    static list(req, res) {
        return Vinculo
          .findAll({
            attributes: ['id','nombre'],
 
            order: [['nombre','ASC']]
          })
          .then(vinculo => res.status(200).send(vinculo))
          .catch(error => res.status(400).send(error));
      }
    
      static create(req, res) {
        const { nombre } = req.body
 
        return Vinculo
          .create({
            nombre,
   
          })
          .then(vinculo => res.status(201).send({
            message: `Vinculo con el nombre ${nombre} creado exitosamente`,
            vinculo
          }))
          .catch(error => res.status(400).send(error));
        }
    
        static modify(req, res) {
          const { nombre } = req.body
          return Vinculo
            .findByPk(req.params.vinculoId)
            .then((vinculo) => {
              vinculo.update({
                nombre: nombre || vinculo.nombre,
    
              })
              .then((updateVinculo) => {
                res.status(200).send({
                  message: 'Vinculo actualizado exitosamente',
                  data: {
                    nombre: nombre || updateVinculo.nombre,
                  }
                })
              })
              .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
        }
    

} 

export default Vinculos;