import model from '../models';

const { TipoUsuario } = model;

class TipoUsuarios {

    static list(req, res) {
        return TipoUsuario
          .findAll({
            attributes: ['id','nombre', 'descripcion'],
            order: [['nombre','ASC']]
          })
          .then(tipos => res.status(200).send(tipos))
          .catch(error => res.status(400).send(error));
      }
    
    static getId(req,res) {
      const {name} = req.params;
      return TipoUsuario
      .findOne({ where: { nombre: name } , attributes:['id'] })
      .then(tipos => res.status(200).send(tipos))
      .catch(error => res.status(400).send(error));
    }

      static create(req, res) {
        const { nombre, descripcion } = req.body
 
        return TipoUsuario
          .create({
            nombre,
            descripcion
          })
          .then(tipousuario => res.status(201).send({
            message: `TipoUsuario con nombre ${nombre} creado exitosamente`,
            sexo: tipousuario
          }))
          .catch(error => res.status(400).send(error));
        }
    
        static modify(req, res) {
          const { nombre, descripcion } = req.body
          return TipoUsuario
            .findByPk(req.params.tipousuarioId)
            .then((tipo) => {
              tipo.update({
                nombre: nombre || tipo.nombre,
                descripcion: descripcion || tipo.descripcion
              })
              .then((updateTipo) => {
                res.status(200).send({
                  message: 'TipoUsuario actualizado exitosamente',
                  data: {
                    nombre: nombre || updateTipo.nombre,
                    descripcion: descripcion || updateTipo.descripcion
                  }
                })
              })
              .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
        }
    

} 

export default TipoUsuarios;