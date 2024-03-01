import model from '../models';

const { Provincix, Region } = model;

    class Provincixs {

        static list(req, res) {
            return Provincix
            .findAll({
                attributes: ['id','nombre'],
                include: [
                    { model:Region, attributes: ['id','nombre'], where: { } },
   
                ],
                    order: [['nombre','ASC']] })
            .then(provincias => res.status(200).send(provincias))
            .catch(error => res.status(400).send(error));
        }

        static getByFk(req, res) {
            const { regionId } = req.params;
            var consulta = {};
            if (regionId != '0') {  consulta['regionId'] = regionId;  }
            return Provincix
              .findAll({ where : consulta,
                attributes: ['id','nombre'],
                include: [ { model: Region, attributes:['id','nombre'], where: { } } ] , order: [
                ['nombre', 'ASC']
              ]})
              .then(provincia => res.status(200).send(provincia))
              .catch(error => res.status(400).send(error));
        }

        static create(req, res) {
        const { regionId } = req.params;
        const { nombre } = req.body;
        return Provincix
        .create({
            nombre,
            regionId,
   
        })
        .then(data => res.status(201).send({
            success: true,
            message: 'Provincix successfully created',
            data
        }))
        .catch(error => res.status(400).send(error));
        }

        static modify(req, res) {
            const { nombre, Region } = req.body
            return Provincix
            .findByPk(req.params.provinciaId)
            .then((provincia) => {
                provincia.update({
                nombre: nombre || provincia.nombre,
                regionId: Region || provincia.regionId,
         
            })
            .then((updatedProvincia) => {
                res.status(200).send({
                    message: 'Provincix updated successfully',
                    data: {
                        nombre: nombre || updatedProvincia.nombre,
                        regionId: Region || updatedProvincia.regionId,
                    }
                })
            })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
}

export default Provincixs;