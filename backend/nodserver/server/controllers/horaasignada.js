import model from '../models';

const { HoraAsignada, Colegio, Usuario } = model;

    class HorasAsignadas {

    static list(req, res) {
        return HoraAsignada
        .findAll({
            // where: getBaseQuery(req),
            attributes: ['id','numero', 'horario'],
            include: [
                { model:Colegio, attributes:['id','nombre'], where: { } },

        ],
        order: [['numero','ASC']] })
        .then(hasignada => res.status(200).send(hasignada))
        .catch(error => res.status(400).send(error));
    }

    static getByFk(req, res) {

        const { colegioId, annoId } = req.params;
        let consulta = {};
        
        // let consulta = getBaseQuery(req);
        if (colegioId != '0') { consulta['colegioId'] = colegioId; }
    
        return HoraAsignada 
          .findAll({ where : consulta,
            attributes: ['id','numero', 'horario'],  include: [ 
                { model:Colegio, attributes:['id','nombre'], where: { } }, 
            ] , order: [
            ['numero', 'ASC']
          ]})
          .then(hasignada => res.status(200).send(hasignada))
          .catch(error => res.status(400).send(error));
    }

    static getByPk(req, res) {

        let consulta = getBaseQuery(req);
        consulta["id"] = req.params.horaasignadaId;

        return HoraAsignada
        .findOne({ where: consulta })
        .then(hasignada => res.status(200).send(hasignada))
        .catch(error => res.status(400).send(error));
      }

    static create(req, res) {
        const { colegioId } = req.params;
        const { numero, horario } = req.body;
        return HoraAsignada
        .create({
            numero,
            horario,
            colegioId, 
     

        })
        .then(horarioData => res.status(201).send({
            success: true,
            message: 'Horario Asignado successfully created',
            horarioData
        }))
        .catch(error => res.status(400).send(error));
    }


    static modify(req, res) {
        let consulta = {};
        consulta["id"] = req.params.horaasignadaId;
        const { numero, horario, Colegio } = req.body;
        return HoraAsignada
        .findOne({ where: consulta })
        .then((horadata) => {
            horadata.update({
            numero: numero || horadata.numero,
            horario: horario  ||  horadata.horario,
            colegioId: Colegio || horadata.colegioId,
        })
        .then((updatedHorario) => {
        res.status(200).send({
            message: 'Horario Asignado updated successfully',
            data: {
                numero: numero || updatedHorario.numero,
                horario: horario || updatedHorario.horario,
                colegioId: Colegio || updatedHorario.colegioId,
            }
        })
    })
    .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }
}

export default HorasAsignadas;