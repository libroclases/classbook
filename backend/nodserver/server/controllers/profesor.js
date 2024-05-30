import model from '../models';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Profesor,  Usuario, Sexo, Region, Provincix, Comuna, CursoProfesor } = model;

class Profesores {

    static list(req, res) {
        return Profesor
            .findAll({
                attributes: ['id', 'nombre', 'apellido1', 'apellido2', 'rut', 'direccion', 'celular',  'nacimiento'],
                include: [ 
                    { model:Sexo, attributes:['id','nombre'], where: { } },
                    { model:Usuario, attributes:['id','username', 'email'], where: { } },
                    { model:Region, attributes:['id','nombre'], where: { } },
                    { model:Provincix, attributes:['id','nombre'], where: { } },
                    { model:Comuna, attributes:['id','nombre'], where: { } },
                ],
                order: [['apellido1','ASC'], ['apellido2','ASC'], ['nombre', 'ASC'] ] })
                .then(profesores => res.status(200).send(profesores))
                .catch(error => res.status(400).send(error));
    }

    static bySearch(req, res) {
        const { expr } = req.params;
        
        return Profesor
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
        .then(profesor => res.status(200).send(profesor))
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

        return Profesor
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
           order: [['apellido1','ASC'],['apellido2','ASC'], ['nombre','ASC']]
        })
        .then(profesor => res.status(200).send(profesor))
        .catch(error => res.status(400).send(error));
    }



    static getByPk(req, res) {
              
        return Profesor
        .findByPk(req.params.profesorId)
        .then(profs => res.status(200).send(profs))
        .catch(error => res.status(400).send(error));
      }


    static create(req, res) {
    const { usuarioId, sexoId, regionId, provincixId, comunaId } = req.params;
    const { nombre, apellido1, apellido2 ,rut, direccion, celular, nacimiento } = req.body;
    return Profesor
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
        message: 'Profesor successfully created',
        data
    }))
    .catch(error => res.status(400).send(error));
    }

    static modify(req, res) {
    
    const { nombre, apellido1, apellido2 ,rut, direccion, celular, nacimiento, Sexo, Region, Provincix, Comuna } = req.body
    return Profesor
        .findByPk(req.params.profesorId)
        .then((profesor) => {
            profesor.update({
            nombre: nombre || profesor.nombre,
            apellido1: apellido1 || profesor.apellido1,
            apellido2: apellido2 || profesor.apellido2,
            rut: rut || profesor.rut,
            direccion: direccion || profesor.direccion, 
            celular: celular || profesor.celular,
            nacimiento: nacimiento || profesor.nacimiento,
            regionId : Region || profesor.regionId,
            provincixId : Provincix || profesor.provincixId,
            comunaId : Comuna || profesor.comunaId,
            sexoId : Sexo || profesor.sexoId,
   
        })
        .then((updatedProfesor) => {
            res.status(200).send({
                message: 'Profesor updated successfully',
                data: {
                    nombre: nombre || updatedProfesor.nombre,
                    apellido1: apellido1 || updatedProfesor.apellido1,
                    apellido2: apellido2 || updatedProfesor.apellido2,
                    rut: rut || updatedProfesor.rut,
                    direccion: direccion || updatedProfesor.direccion,
                    celular: celular || updatedProfesor.celular,
                    nacimiento: nacimiento || updatedProfesor.nacimiento,
                    regionId : Region || updatedProfesor.regionId,
                    provincixId : Provincix || updatedProfesor.provincixId,
                    comunaId : Comuna || updatedProfesor.comunaId,
                    sexoId : Sexo || updatedProfesor.sexoId
                }
            })
        })
        .catch(error => res.status(400).send(error));
        })
    .catch(error => res.status(400).send(error));
    }
}

export default Profesores;