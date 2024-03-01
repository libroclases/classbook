import model from '../models';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Alumno, Usuario, Sexo, Region, Provincix, Comuna } = model;

class Alumnos {

    
    static list(req, res) {
        return Alumno
            .findAll({ attributes: ['id','nombre','apellido1','apellido2','nacimiento','rut','direccion','celular'],
            include: [  
                { model: Sexo, attributes:['id','nombre'], where: { } },
                { model: Usuario, attributes:['id', 'username', 'email'], where: { } },
                { model: Region, attributes:['id','nombre'], where: { } },
                { model: Provincix, attributes:['id','nombre'], where: { } },
                { model: Comuna, attributes:['id','nombre'], where: { } },
 
            ],
            order: [['apellido1', 'ASC'], ['apellido2', 'ASC'], ['nombre', 'ASC']] })
            .then(alumnos => res.status(200).send(alumnos))
            .catch(error => res.status(400).send(error));
    }

    static bySearch(req, res) {
        const { expr } = req.params;
        
        return Alumno
        .findAll({
            where: {
                [Op.or] : [
                    { nombre : {[Op.iLike]: `%${expr}%`}},
                    { apellido1 : {[Op.iLike]: `%${expr}%`}},
                    { apellido2 : {[Op.iLike]: `%${expr}%`}}
                ]
                },
            include: [
                { model: Sexo, attributes:['id','nombre'], where: { } },
                { model: Region, attributes: ['id','nombre'], where: { } },
                { model: Provincix, attributes: ['id','nombre'], where: { } },
                { model: Comuna, attributes: ['id','nombre'], where: { } },
            ],
            order: [['apellido1', 'ASC']]   
        } 
    )
            .then(alumnos => res.status(200).send(alumnos))
            .catch(error => res.status(400).send(error));
    }

    static getByPk(req, res) {

        let consulta = {};        
        consulta['id'] = req.params.alumnoId;
        return Alumno
        .findOne({ where: consulta, include: [
            { model: Sexo, attributes:['id','nombre'], where: { } },
            { model: Region, attributes: ['id','nombre'], where: { } },
            { model: Provincix, attributes: ['id','nombre'], where: { } },
            { model: Comuna, attributes: ['id','nombre'], where: { } },

        ], })
        .then(alumnos => res.status(200).send(alumnos))
        .catch(error => res.status(400).send(error));
      }
    
    static byRutSearch(req, res) {
        const { expr } = req.params;
        console.log('expr:',expr)    
        return Alumno
            .findOne({  
                where: {rut : expr } , include: [
                    { model: Sexo, attributes:['id','nombre'], where: { } },
                    { model: Region, attributes: ['id','nombre'], where: { } },
                    { model: Provincix, attributes: ['id','nombre'], where: { } },
                    { model: Comuna, attributes: ['id','nombre'], where: { } },
        
                ],
        })
        .then(alumno => res.status(200).send(alumno))
        .catch(error => res.status(400).send(error));
    }

    static getByFk(req, res) {
        const { usuarioId, sexoId, regionId, provincixId, comunaId } = req.params;

        let consulta = {};

        if (usuarioId != '0') {  consulta['usuarioId'] = usuarioId; } 
        if (sexoId != '0') {  consulta['sexoId'] = sexoId;  } 
        if (regionId != '0') {  consulta['regionId'] = regionId;  }   
        if (provincixId != '0') {  consulta['provincixId'] = provincixId;  }   
        if (comunaId != '0') {  consulta['comunaId'] = comunaId;  }        

        return Alumno
          .findAll({ where : consulta,
              include: [
                { model: Usuario, attributes:['id', 'username', 'email'], where: { } },
                { model: Sexo, attributes:['id', 'nombre'], where: { } },
                { model: Region, attributes:['id','nombre'], where: { } },
                { model: Provincix, attributes:['id','nombre'], where: { } },
                { model: Comuna, attributes:['id','nombre'], where: { } },    
            ],
            order: [['apellido1', 'ASC'],['apellido2', 'ASC']]
        })
        .then(alumno => res.status(200).send(alumno))
        .catch(error => res.status(400).send(error));
    }
   
    static create(req, res) {
    const { usuarioId, sexoId,regionId, provincixId, comunaId} = req.params;
    const {  
        nombre, 
        apellido1,
        apellido2, 
        rut, 
        direccion, 
        celular,
        nacimiento 
    } = req.body;
    return Alumno
    .create({  
        nombre, 
        apellido1,
        apellido2,  
        rut, 
        direccion, 
        celular, 
        nacimiento,
        usuarioId,
        sexoId,
        regionId,
        provincixId,
        comunaId,
    
    })
    .then(data => res.status(201).send({
        success: true,
        message: 'Alumno creado exitosamente',
        data
        }))
    .catch(error => res.status(400).send(error));
    }

    static modify(req, res) {
    const { 
        nombre, 
        apellido1,
        apellido2, 
        rut, 
        direccion, 
        celular, 
        Sexo,
        Region,
        Provincix,
        Comuna,
        nacimiento, 
    } = req.body
    return Alumno
        .findByPk(req.params.alumnoId)
        .then((alumno) => {
            alumno.update({
                nombre: nombre || alumno.nombre, 
                apellido1: apellido1 || alumno.apellido1,
                apellido2: apellido2 || alumno.apellido2, 
                nacimiento: nacimiento || alumno.nacimiento, 
                rut: rut || alumno.rut, 
                direccion: direccion || alumno.direccion, 
                celular: celular || alumno.celular,
                nacimiento: nacimiento || alumno.nacimiento, 
                sexoId: Sexo || alumno.sexoId,
                regionId: Region || alumno.regionId,
                provincixId: Provincix || alumno.provincixId,
                comunaId: Comuna || alumno.provincixId,
           
    })
    .then((updateAlumno) => {
        res.status(200).send({

            message: 'Alumno modificado exitosamente',
                data: {
                    // num_orden: num_orden || updateAlumno.num_orden, 
                    // num_matricula: num_matricula || updateAlumno.num_matricula, 
                    nombre: nombre || updateAlumno.nombre, 
                    apellido1: apellido1 || updateAlumno.apellido1,
                    apellido2: apellido2 || updateAlumno.apellido2, 
                    nacimiento: nacimiento || updateAlumno.nacimiento, 
                    rut: rut || updateAlumno.rut,
                    direccion: direccion || updateAlumno.direccion, 
                    celular: celular || updateAlumno.celular,
                    sexoId: Sexo || updateAlumno.sexoId,
                    regionId: Region || updateAlumno.regionId,
                    provincixId: Provincix || updateAlumno.provincixId,
                    comunaId: Comuna || updateAlumno.comunaId
                }
            })
    })
    .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }
}

export default Alumnos;