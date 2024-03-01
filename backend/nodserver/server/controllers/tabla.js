import model from '../models';

const { Tabla } = model;

class Tablas {

    static list(req, res) {
      return Tabla
        .findAll({
          attributes: ['id','nombre'],
          include: [
 
          ],
          order: [['nombre', 'ASC']]})
        .then(tablas => res.status(200).send(tablas))
        .catch(error => res.status(400).send(error));
      }

    static create(req, res) {
      const { nombre } = req.body
   
      
      return Tabla
        .create({
          nombre,

        })
        .then(tabla => res.status(201).send({
          message: `Tabla ${nombre} creada exitosamente `,
          tabla
        }))
        .catch(error => res.status(400).send(error));
      }
    
    static modify(req, res) {
      const { nombre } = req.body
      return Tabla
        .findByPk(req.params.tablaId)
        .then((tabla) => {
          tabla.update({
            nombre: nombre || tabla.nombre,
    
          })
          .then((updatedTabla) => {
            res.status(200).send({
              message: 'Tabla actualizada exitosamente',
              data: {
                nombre: nombre || updatedTabla.nombre,
              }
            })
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    

} 

export default Tablas;
