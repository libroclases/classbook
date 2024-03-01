import model from '../models';

const { TipoColegio } = model;

class TipoColegios {

    static list(req, res) {
        return TipoColegio
          .findAll({
            attributes: ['id','nombre'],
   
            order: [['nombre','ASC']] })
          .then(tipos => res.status(200).send(tipos))
          .catch(error => res.status(400).send(error));
      }
    
      static create(req, res) {
        const { nombre } = req.body
   
        return TipoColegio
          .create({
            nombre,
   
          })
          .then(tipocolegio => res.status(201).send({
            message: `TipoColegio con nombre ${nombre} creado exitosamente`,
            tipocolegio
          }))
          .catch(error => res.status(400).send(error));
        }
    
        static modify(req, res) {
          const { nombre } = req.body
          return TipoColegio
            .findByPk(req.params.tipocolegioId)
            .then((tipo) => {
              tipo.update({
                nombre: nombre || tipo.nombre,
    
              })
              .then((updatedTipoColegio) => {
                res.status(200).send({
                  message: 'TipoColegio actualizado exitosamente',
                  data: {
                    nombre: nombre || updatedTipoColegio.nombre,
                  }
                })
              })
              .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
        }
    

} 

export default TipoColegios;