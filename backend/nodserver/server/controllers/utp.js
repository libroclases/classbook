import model from '../models';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Utp,  Usuario, Sexo, Region, Provincix, Comuna } = model;

class Utps {

    static list(req, res) {
        return Utp
            .findAll({
                attributes: ['id', 'nombre', 'apellido1', 'apellido2', 'rut', 'direccion', 'celular',  'nacimiento'],
                include: [ 
                    { model:Sexo, attributes:['id','nombre'], where: { } },
                    { model:Usuario, attributes:['id','username', 'email'], where: { } },
                    { model:Region, attributes:['id','nombre'], where: { } },
                    { model:Provincix, attributes:['id','nombre'], where: { } },
                    { model:Comuna, attributes:['id','nombre'], where: { } },
                ],
                order: [['apellido1','ASC'], ['apellido2','ASC'],['nombre','ASC'] ] })
                .then(utps => res.status(200).send(utps))
                .catch(error => res.status(400).send(error));
    }

    static bySearch(req, res) {
        const { expr } = req.params;
        
        return Utp
        .findAll({  
            where: {
                [Op.or] : [{ nombre : {[Op.iLike]: `%${expr}%`}},
                { apellido1 : {[Op.iLike]: `%${expr}%`}},
                { apellido2 : {[Op.iLike]: `%${expr}%`}},
            ]
            },
            include: [
                { model:Sexo, attributes:['id','nombre'], where: { } },
                { model:Usuario, attributes:['id', 'username', 'email'], where: { } },
                { model:Region, attributes:['id','nombre'], where: { } },
                { model:Provincix, attributes:['id','nombre'], where: { } },
                { model:Comuna, attributes:['id','nombre'], where: { } },
                ],
        })
        .then(utp => res.status(200).send(utp))
        .catch(error => res.status(400).send(error));
    }

    static getByFk(req, res) {
        const { usuarioId, sexoId, regionId, provincixId, comunaId } = req.params;

        let consulta = {};

        if (usuarioId != '0') {  consulta['usuarioId'] = usuarioId;  }
        if (regionId != '0') {  consulta['regionId'] = regionId;  }
        if (provincixId != '0') {  consulta['provincixId'] = provincixId;  }
        if (comunaId != '0') {  consulta['comunaId'] = comunaId;  }
        if (sexoId != '0') {  consulta['sexoId'] = sexoId;  }

        return Utp
          .findAll({
            where : consulta,
            attributes: ['id','nombre', 'apellido1','apellido2', 'rut','direccion', 'celular','nacimiento'],
            include: [
            { model:Sexo, attributes:['id','nombre'], where: { } },
            { model:Usuario, attributes:['id','username', 'email'], where: { } },
            { model:Region, attributes:['id','nombre'], where: { } },
            { model:Provincix, attributes:['id','nombre'], where: { } },
            { model:Comuna, attributes:['id','nombre'], where: { } },    
           ],
           order: [['apellido1','ASC'],['apellido2','ASC']]
        })
        .then(utp => res.status(200).send(utp))
        .catch(error => res.status(400).send(error));
    }

    static getByPk(req, res) {
              
        return Utp
        .findByPk(req.params.utpId)
        .then(utps => res.status(200).send(utps))
        .catch(error => res.status(400).send(error));
      }

    static create(req, res) {
    const { usuarioId, sexoId, regionId, provincixId, comunaId } = req.params;
    const { nombre, apellido1, apellido2 ,rut, direccion, celular, nacimiento } = req.body;
    return Utp
    .create({
        nombre,
        apellido1,
        apellido2,
        rut,
        direccion,
        celular,
        nacimiento,
        sexoId,
        usuarioId,
        regionId,
        provincixId,
        comunaId,
    })
    .then(data => res.status(201).send({
        success: true,
        message: 'Utp successfully created',
        data
    }))
    .catch(error => res.status(400).send(error));
    }

    static modify(req, res) {
    
    const { nombre, apellido1, apellido2 ,rut, direccion, celular, nacimiento, Sexo, Region, Provincix, Comuna } = req.body
    return Utp
        .findByPk(req.params.utpId)
        .then((utp) => {
            utp.update({
            nombre: nombre || utp.nombre,
            apellido1: apellido1 || utp.apellido1,
            apellido2: apellido2 || utp.apellido2,
            rut: rut || utp.rut,
            direccion: direccion || utp.direccion, 
            celular: celular || utp.celular,
            nacimiento: nacimiento || utp.nacimiento,
            regionId : Region || utp.regionId,
            provincixId : Provincix || utp.provincixId,
            comunaId : Comuna || utp.comunaId,
            sexoId : Sexo || utp.sexoId,
        })
        .then((updatedUtp) => {
            res.status(200).send({
                message: 'Utp updated successfully',
                data: {
                    nombre: nombre || updatedUtp.nombre,
                    apellido1: apellido1 || updatedUtp.apellido1,
                    apellido2: apellido2 || updatedUtp.apellido2,
                    rut: rut || updatedUtp.rut,
                    direccion: direccion || updatedUtp.direccion,
                    celular: celular || updatedUtp.celular,
                    nacimiento: nacimiento || updatedUtp.nacimiento,
                    regionId : Region || updatedUtp.regionId,
                    provincixId : Provincix || updatedUtp.provincixId,
                    comunaId : Comuna || updatedUtp.comunaId,
                    sexoId : Sexo || updatedUtp.sexoId
                }
            })
        })
        .catch(error => res.status(400).send(error));
        })
    .catch(error => res.status(400).send(error));
    }
}

export default Utps;