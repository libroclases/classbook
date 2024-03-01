import model from '../models';

const { Tema } = model;

class Temas {

  static list(req, res) {
      return Tema
        .findAll({
          attributes: ['id','nombre'],
          order: [['nombre','ASC']]
        })
        .then(temas => res.status(200).send(temas))
        .catch(error => res.status(400).send(error));
    }
    
  static create(req, res) {
    const { nombre } = req.body;
 
    return Tema
      .create({
        nombre,


      })
      .then(tema => res.status(201).send({
        message: `Your tema with the title ${nombre} has been created successfully `,
        tema
      }))
      .catch(error => res.status(400).send(error));
    }
    
  static modify(req, res) {
    const { nombre } = req.body
    
    return Tema
      .findByPk(req.params.temaId)
      .then((tema) => {
        tema.update({
          nombre: nombre || tema.nombre,
   
        })
        .then((updatedTema) => {
          res.status(200).send({
            message: 'Tema updated successfully',
            data: {
              nombre: nombre || updatedTema.nombre,
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

} 

export default Temas;