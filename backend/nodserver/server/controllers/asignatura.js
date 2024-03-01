import model from '../models';

const { Asignatura, TipoColegio, Colegio } = model;

class Asignaturas {

    static list(req, res) {
        return Asignatura
          .findAll({attributes: ['id','nombre'], 
          include: [
            { model:TipoColegio, attributes:['id','nombre'], where: { } },

          ], 
            order: [['nombre','ASC']]
          })
          .then(asignaturas => res.status(200).send(asignaturas))
          .catch(error => res.status(400).send(error));
      }
 
      static getByFk(req, res) {

        const { tipocolegioId} = req.params;
        
        let consulta = {};
        
        if (tipocolegioId != '0') {  consulta['tipocolegioId'] = tipocolegioId;  }

        return Asignatura 
          .findAll({ where : consulta,
            attributes: ['id','nombre'],
            include: [ 
                { model:TipoColegio, attributes:['id','nombre'], where: { } }, 
            ] , order: [
            ['nombre', 'ASC']
          ]})
          .then(tipocolegio => res.status(200).send(tipocolegio))
          .catch(error => res.status(400).send(error));
    }
 
    static getByColegio(req, res) {

      Colegio.findOne({
        where: { id: req.params.colegioId },
        attributes: [],
        include : [
          { model:TipoColegio, attributes:['id'], where: { } }
        ],
        raw: true
      })
      .then(query => {
        return Asignatura 
        .findAll({ where : { tipocolegioId: query["TipoColegio.id"] },
          attributes: ['id','nombre'],
          include: [] , order: [
          ['nombre', 'ASC']
        ]})
        .then(tipocolegio => res.status(200).send(tipocolegio))
        .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
      
  }

      static create(req, res) {
        const { nombre } = req.body;
        const { tipocolegioId } = req.params;
        return Asignatura
          .create({
            nombre,
            tipocolegioId,
  
          })
          .then(asignatura => res.status(201).send({
            message: `Asignatura con ${nombre} creada exitosamente `,
            asignatura
          }))
          .catch(error => res.status(400).send(error));
        }
    
        static modify(req, res) {
          const { nombre,  TipoColegio } = req.body;
          return Asignatura
            .findByPk(req.params.asignaturaId)
            .then((asignatura) => {
              asignatura.update({
                nombre: nombre || asignatura.nombre,
                tipocolegioId: TipoColegio || asignatura.tipocolegioId,
    
            })
            .then((updatedAsignatura) => {
                res.status(200).send({
                  message: 'Asignatura actualizada exitosamente',
                  data: {
                    nombre: nombre || updatedAsignatura.nombre,
                    tipocolegioId: TipoColegio || updatedAsignatura.tipocolegioId 
                  }
                });
            })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }

} 

export default Asignaturas;