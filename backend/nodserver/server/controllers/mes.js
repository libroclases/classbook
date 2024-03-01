import model from '../models';

const { Mes } = model;

class Meses {

  static list(req, res) {
    return Mes
      .findAll({
        attributes: ['id', 'numero', 'nombre', 'abreviatura'],
        include: [
   
        ],
        order: [['numero', 'ASC']]
      })
      .then(meses => res.status(200).send(meses))
      .catch(error => res.status(400).send(error));
  }
  
  static create(req, res) {
    const { numero, nombre, abreviatura } = req.body;

    return Mes
      .create({
        numero,
        nombre,
        abreviatura,
   
      })
      .then(mesData => res.status(201).send({
        message: `El Mes con el nombre ${nombre} fue creado exitosamente `,
        mesData
      }))
      .catch(error => res.status(400).send(error));
    }

  static modify(req, res) {
    const { numero, nombre, abreviatura } = req.body;
    return Mes
      .findByPk(req.params.mesId)
      .then((mes) => {
        mes.update({
          numero: numero || mes.numero,
          nombre: nombre || mes.nombre,
          abreviatura: abreviatura || mes.abreviatura,
   
        })
        .then((updatedMes) => {
          res.status(200).send({
            message: 'Mes updated successfully',
            data: {
              numero: numero || updatedMes.numero,
              nombre: nombre || updatedMes.nombre,
              abreviatura: abreviatura || updatedMes.abreviatura
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
  
} 

export default Meses;