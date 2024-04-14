import model from '../models';

const { Anno } = model;

class Annos {

    static list(req, res) {
      return Anno
        .findAll({
          attributes: ['id','nombre', 'numero'],
          include: [
          ],
          order: [['nombre', 'ASC']]})
        .then(annos => res.status(200).send(annos))
        .catch(error => res.status(400).send(error));
      }

    static create(req, res) {
      const { nombre, numero } = req.body
      
      return Anno
        .create({
          nombre,
          numero,
   
        })
        .then(anno => res.status(201).send({
          success:true,
          message: `Anno ${nombre} creado exitosamente `,
          anno
        }))
        .catch(error => res.status(400).send(error));
      }
    
    static modify(req, res) {
      const { nombre, numero } = req.body
      return Anno
        .findByPk(req.params.annoId)
        .then((anno) => {
          anno.update({
            nombre: nombre || anno.nombre,
            numero: numero || anno.numero,
    
          })
          .then((updateAnno) => {
            res.status(200).send({
              message: 'Anno actualizado exitosamente',
              data: {
                nombre: nombre || updateAnno.nombre,
                numero: numero || updateAnno.numero,
              }
            })
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    

} 

export default Annos;
