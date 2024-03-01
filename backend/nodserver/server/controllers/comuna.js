import model from '../models';

const { Comuna, Provincix } = model;

class Comunas {

    static list(req, res) {
        return Comuna
            .findAll( {attributes: ['id','nombre'],
            include: [
                { model:Provincix, attributes:['id','nombre'], where: { } },
   
            ],
            order: [['nombre','ASC']] })
            .then(comunas => res.status(200).send(comunas))
            .catch(error => res.status(400).send(error));
    }

    static getByFk(req, res) {
      const { regionId, provincixId } = req.params;
      let consulta = {};
      
      if (regionId != '0') {  consulta['regionId'] = regionId;  }
      if (provincixId != '0') {  consulta['provincixId'] = provincixId;  }

        return Comuna
          .findAll({ where : consulta,
            attributes: ['id', 'nombre'],
            include: [ { model:Provincix, attributes:['id','nombre'], where: { } } ],
            order: [['nombre', 'ASC']
          ]})
          .then(comuna => res.status(200).send(comuna))
          .catch(error => res.status(400).send(error));
    }

    static create(req, res) {
    const { regionId, provincixId } = req.params;
    const { nombre } = req.body;
    return Comuna
    .create({
        nombre,
        regionId,
        provincixId,
   
    })
    .then(comunaData => res.status(201).send({
        success: true,
        message: 'Comuna successfully created',
        comunaData
        }))
    .catch(error => res.status(400).send(error));
    }

    static modify(req, res) {
    const { nombre, Region, Provincix } = req.body
    return Comuna
        .findByPk(req.params.comunaId)
        .then((comuna) => {
            comuna.update({
            nombre: nombre || comuna.nombre,
            regionId: Region || comuna.regionId,
            provincixId: Provincix || comuna.provincixId,
        
    })
    .then((updatedComuna) => {
        res.status(200).send({
            message: 'Comuna updated successfully',
                data: {
                nombre: nombre || updatedComuna.nombre,
                regionId: Region || updatedComuna.regionId,
                provincixId: Provincix || updatedComuna.provincixId
                }
            })
    })
    .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }
}

export default Comunas;