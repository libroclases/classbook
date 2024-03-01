import model from '../models';

const { NivelEducacional } = model;

class Niveles {

    static list(req, res) {
        return NivelEducacional
          .findAll({
            attributes: ['id','nombre'],
            include: [

            ],
            order: [['nombre','ASC']]
        })
          .then(nivel => res.status(200).send(nivel))
          .catch(error => res.status(400).send(error));
      }
    
      static create(req, res) {
        const { nombre } = req.body;
   
        return NivelEducacional
          .create({
            nombre,
  
          })
          .then(nivel => res.status(201).send({
            message: `NivelEducacional con nombre ${nombre} creado exitosamente `,
            nivel
          }))
          .catch(error => res.status(400).send(error));
        }
    
        static modify(req, res) {
          const { nombre } = req.body;
          return NivelEducacional
            .findByPk(req.params.niveleducacionalId)
            .then((nivelEducacional) => {
              nivelEducacional.update({
                nombre: nombre || nivelEducacional.nombre,
    
              })
              .then((updatedNivelEducacional) => {
                res.status(200).send({
                  message: 'NivelEducacional actualizado exitosamente',
                  data: {
                    nombre: nombre || updatedNivelEducacional.nombre,
                  }
                })
              })
              .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
        }
    

} 

export default Niveles;