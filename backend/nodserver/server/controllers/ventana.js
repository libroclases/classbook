import model from '../models';

const { Ventana, Colegio, Tabla } = model;

class Ventanas {

    static list(req, res) {
      return Ventana
        .findAll({
          attributes: ['id','dias'],
          include: [
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Tabla, attributes:['id','nombre'], where: { } },
          ],
          order: [['id', 'ASC']]})
        .then(ventanas => res.status(200).send(ventanas))
        .catch(error => res.status(400).send(error));
      }

      static getByFk(req, res) {

        const { colegioId, tablaId } = req.params;

        console.log('AAA', colegioId, tablaId)

        let consulta = {};

        if (colegioId != '0') { consulta['colegioId'] = colegioId; }
        if (tablaId != '0') {  consulta['tablaId'] = tablaId;  }

        console.log('BBB', consulta);

        return Ventana
          .findAll({ where : consulta,
            attributes: ['id','dias'],  include: [ 
                { model:Colegio, attributes:['id','nombre'], where: { } },
                { model:Tabla, attributes:['id','nombre'], where: { } } 
            ] , order: [
            ['id', 'ASC']
          ]})
          .then(ventana => res.status(200).send(ventana))
          .catch(error => res.status(400).send(error));
    }

    static create(req, res) {
      const { dias } = req.body
      const { colegioId, tablaId } = req.params
      return Ventana
        .create({
          dias,
          colegioId,
          tablaId,
   
        })
        .then(tabla => res.status(201).send({
          message: `Ventana ${dias} creada exitosamente `,
          tabla
        }))
        .catch(error => res.status(400).send(error));
      }
    
    static modify(req, res) {
      const { dias, Colegio, Tabla } = req.body
      return Ventana
        .findByPk(req.params.ventanaId)
        .then((ventana) => {
          ventana.update({
            dias: dias || ventana.dias,
            colegioId: Colegio || ventana.colegioId,
            tablaId : Tabla || ventana.tablaId
          })
          .then((updatedVentana) => {
            res.status(200).send({
              message: 'Ventana actualizada exitosamente',
              data: {
                dias: dias || updatedVentana.dias,
                colegioId: Colegio || updatedVentana.colegioId,
                tablaId : Tabla || updatedVentana.tablaId
    
              }
            })
          })
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
    

} 

export default Ventanas;
