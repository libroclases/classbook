import model from '../models';

const { Sexo } = model;

class Sexos {

    static list(req, res) {
        return Sexo
          .findAll({
            attributes: ['id','nombre'],
 
            order: [['nombre','ASC']] })
          .then(dias => res.status(200).send(dias))
          .catch(error => res.status(400).send(error));
      }
    
      static create(req, res) {
        const { nombre } = req.body;
     
    
        return Sexo
          .create({
            nombre,
  
          })
          .then(sexo => res.status(201).send({
            message: `Sexo con nombre ${nombre} creado exitosamente `,
            sexo
          }))
          .catch(error => res.status(400).send(error));
        }
    
        static modify(req, res) {
          const { nombre } = req.body
          return Sexo
            .findByPk(req.params.sexoId)
            .then((sexo) => {
              sexo.update({
                nombre: nombre || sexo.nombre,
      
              })
              .then((updateSexo) => {
                res.status(200).send({
                  message: 'Sexo updated successfully',
                  data: {
                    nombre: nombre || updateSexo.nombre,
                  }
                })
              })
              .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
        }
    

} 

export default Sexos;