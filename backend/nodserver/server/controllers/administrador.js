import model from '../models';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Admin,  Usuario, Sexo, Region, Provincix, Comuna } = model;

class Administradores {

    static list(req, res) {
        return Admin
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
                .then(admin => res.status(200).send(admin))
                .catch(error => res.status(400).send(error));
    }

    static bySearch(req, res) {
        const { expr } = req.params;
        
        return Admin
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
        .then(admin => res.status(200).send(admin))
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

        return Admin
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
        .then(admin => res.status(200).send(admin))
        .catch(error => res.status(400).send(error));
    }

    static getByPk(req, res) {
              
        return Admin
        .findByPk(req.params.administradorId)
        .then(admin => res.status(200).send(admin))
        .catch(error => res.status(400).send(error));
      }

    static create(req, res) {
    const { usuarioId, sexoId, regionId, provincixId, comunaId } = req.params;
    const { nombre, apellido1, apellido2 ,rut, direccion, celular, nacimiento } = req.body;
    return Admin
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
        message: 'Admin successfully created',
        data
    }))
    .catch(error => res.status(400).send(error));
    }

    static modify(req, res) {
    
    const { nombre, apellido1, apellido2 ,rut, direccion, celular, nacimiento, Sexo, Region, Provincix, Comuna } = req.body
    return Admin
        .findByPk(req.params.administradorId)
        .then((admin) => {
            admin.update({
            nombre: nombre || admin.nombre,
            apellido1: apellido1 || admin.apellido1,
            apellido2: apellido2 || admin.apellido2,
            rut: rut || admin.rut,
            direccion: direccion || admin.direccion, 
            celular: celular || admin.celular,
            nacimiento: nacimiento || admin.nacimiento,
            regionId : Region || admin.regionId,
            provincixId : Provincix || admin.provincixId,
            comunaId : Comuna || admin.comunaId,
            sexoId : Sexo || admin.sexoId,
        })
        .then((updateAdmin) => {
            res.status(200).send({
                message: 'Admin updated successfully',
                data: {
                    nombre: nombre || updateAdmin.nombre,
                    apellido1: apellido1 || updateAdmin.apellido1,
                    apellido2: apellido2 || updateAdmin.apellido2,
                    rut: rut || updateAdmin.rut,
                    direccion: direccion || updateAdmin.direccion,
                    celular: celular || updateAdmin.celular,
                    nacimiento: nacimiento || updateAdmin.nacimiento,
                    regionId : Region || updateAdmin.regionId,
                    provincixId : Provincix || updateAdmin.provincixId,
                    comunaId : Comuna || updateAdmin.comunaId,
                    sexoId : Sexo || updateAdmin.sexoId
                }
            })
        })
        .catch(error => res.status(400).send(error));
        })
    .catch(error => res.status(400).send(error));
    }
}

export default Administradores;