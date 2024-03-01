import model from '../models';
const Op = require('../models').Sequelize.Op;

const { Feriado } = model;

class Feriados {

  static list(req, res) {
    return Feriado
      .findAll({
        attributes: ['id', 'nombre', 'fecha', 'lugar'],

        order: [['fecha', 'ASC']]
      })
      .then(feriados => res.status(200).send(feriados))
      .catch(error => res.status(400).send(error));
  }
  
  static getAtDate(req, res) {

    const { anno, mes, dia } = req.body;
    var consulta = {fecha: {[Op.eq]: new Date(anno, mes-1, dia)}};
    
    return Feriado
      .findAll({
        attributes: ['id', 'fecha', 'nombre', 'lugar'],
        where: consulta,
        order: [['fecha', 'ASC']]
      })
      .then(feriados => res.status(200).send(feriados))
      .catch(error => res.status(400).send(error));
  }
  
  static getYearMonth(req, res) {

    const { anno, mes } = req.query;
    var consulta = {fecha: {[Op.between]: [new Date(anno, mes-1, 0), new Date(anno, mes, 0)]}};
    
    return Feriado
      .findAll({
        attributes: ['id', 'fecha', 'nombre', 'lugar'],
        where: consulta,
        order: [['fecha', 'ASC']]
      })
      .then(feriados => res.status(200).send(feriados))
      .catch(error => res.status(400).send(error));
  }
  
  static getInYear(req, res) {

    const { anno } = req.query;
    var consulta = {fecha: {[Op.between]: [new Date(anno, 0, 0), new Date(anno, 12, 0)]}};
    return Feriado
      .findAll({
        attributes: ['id', 'fecha', 'nombre', 'lugar'],
        where: consulta,
        order: [['fecha', 'ASC']]
      })
      .then(feriados => res.status(200).send(feriados))
      .catch(error => res.status(400).send(error));
  }
  
  static create(req, res) {
    const { nombre, fecha, lugar } = req.body;
    
    return Feriado
      .create({
        nombre,
        fecha,
        lugar,
   
      })
      .then(feriadoData => res.status(201).send({
        message: `El Feriado con el nombre ${nombre} fue creado exitosamente `,
        feriadoData: feriadoData
      }))
      .catch(error => res.status(400).send(error));
    }

  static modify(req, res) {
    const { nombre, fecha, lugar } = req.body;
    return Feriado
      .findByPk(req.params.feriadoId)
      .then((feriado) => {
        feriado.update({
          nombre: nombre || feriado.nombre,
          fecha: fecha || feriado.fecha,
          lugar: lugar || feriado.lugar,
   
        })
        .then((updatedFeriado) => {
          res.status(200).send({
            message: 'Feriado updated successfully',
            data: {
              nombre: updatedFeriado.nombre,
              fecha: updatedFeriado.fecha,
              lugar: updatedFeriado.lugar
            }
          })
        })
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }

  static delete(req, res) {
    return Feriado
      .findByPk(req.params.feriadoId)
      .then(feriado => {
        if(!feriado) {
          return res.status(400).send({
          message: 'Feriado Not Found',
          });
        }
        return feriado
          .destroy()
          .then(() => res.status(200).send({
            message: 'Feriado successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  }
  
} 

export default Feriados;