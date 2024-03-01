import model from '../models';

const { Dix } = model;

class Dixs {

    static list(req, res) {
        return Dix
          .findAll({
            attributes: ['id','nombre'],
            include: [
            ],
            order: [['nombre','ASC']]
          })
          .then(dias => res.status(200).send(dias))
          .catch(error => res.status(400).send(error));
      }
    
      static create(req, res) {
        const { nombre } = req.body
     
        return Dix
          .create({
            nombre,
 
          })
          .then(dix => res.status(201).send({
            message: `Your dia with the title ${nombre} has been created successfully `,
            dix
          }))
          .catch(error => res.status(400).send(error));
        }
    
        static modify(req, res) {
          const { nombre } = req.body
          return Dix
            .findByPk(req.params.diaId)
            .then((dix) => {
              dix.update({
                nombre: nombre || dix.nombre,
   
              })
              .then((updatedDix) => {
                res.status(200).send({
                  message: 'Dia updated successfully',
                  data: {
                    nombre: nombre || updatedDix.nombre,
                  }
                })
              })
              .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
        }
    

} 

export default Dixs;