import model from '../models';

  const Sequelize = require("sequelize");
  const Op = Sequelize.Op;

  const { Apoderado, NivelEducacional, Sexo, Usuario, Region, Provincix, Comuna } = model;

class Apoderados {

  static list(req, res) {
      return Apoderado
        .findAll({
          attributes: ['id','nombre','apellido1','apellido2','rut','direccion','celular','nacimiento'], 
          include: [
            { model: NivelEducacional, attributes: ['id','nombre'], where: { } },
            { model: Usuario, attributes:['id', 'username', 'email'], where: { } },
            { model: Sexo, attributes:['id','nombre'], where: { } },
            { model: Region, attributes:['id','nombre'], where: { } },
            { model: Provincix, attributes:['id','nombre'], where: { } },
            { model: Comuna, attributes:['id','nombre'], where: { } },
   
          ],
          order: [['apellido1','ASC'],['apellido2','ASC'],['nombre','ASC']]})
        .then(apoderado => res.status(200).send(apoderado))
        .catch(error => res.status(400).send(error));
    }

    static byRutSearch(req, res) {
        
      return Apoderado
      .findOne({
         where: { rut : req.params.expr } ,
         include: [
          { model: NivelEducacional, attributes: ['id','nombre'], where: { } },  
          { model: Sexo, attributes:['id','nombre'], where: { } },
          { model: Usuario, attributes:['id', 'username', 'email'], where: { } },
          { model: Region, attributes:['id','nombre'], where: { } },
          { model: Provincix, attributes:['id','nombre'], where: { } },
          { model: Comuna, attributes:['id','nombre'], where: { } },

      ],
      })
      .then(alumnos => res.status(200).send(alumnos))
      .catch(error => res.status(400).send(error));
  }

    static bySearch(req, res) {
      const { expr } = req.params;
      return Apoderado
      .findAll({
        where: {
          [Op.or] : [{ nombre : {[Op.iLike]: `%${expr}%`}},
          { apellido1 : {[Op.iLike]: `%${expr}%`}},
          { apellido2 : {[Op.iLike]: `%${expr}%`}},
        ]
        },
        include: [
          { model: NivelEducacional, attributes: ['id','nombre'], where: { } },
          { model: Sexo, attributes: ['id','nombre'], where: { } },
          { model: Region, attributes: ['id','nombre'], where: { } },
          { model: Provincix, attributes: ['id','nombre'], where: { } },
          { model: Comuna, attributes: ['id','nombre'], where: { } },
        ]  
      })
      .then(apoderados => res.status(200).send(apoderados))
      .catch(error => res.status(400).send(error));
  }

  static getByFk(req, res) {
    const {  niveleducacionalId, usuarioId, sexoId, regionId, provincixId, comunaId } = req.params;
    let consulta = {};
    if (sexoId != '0') {  consulta['sexoId'] = sexoId;  }
    if (niveleducacionalId != '0') { consulta['niveleducacionalId'] = niveleducacionalId; }
    if (usuarioId != '0') {  consulta['usuarioId'] = usuarioId;  }
    if (regionId != '0') {  consulta['regionId'] = regionId;  }
    if (provincixId != '0') {  consulta['provincixId'] = provincixId;  }
    if (comunaId != '0') {  consulta['comunaId'] = comunaId;  }

    return Apoderado
      .findAll({ where : consulta,
        attributes: ['id','nombre','apellido1','apellido2','rut', 'direccion','celular','nacimiento'],
        include: [ 
          { model: NivelEducacional, attributes: ['id','nombre'], where: { } },
          { model: Usuario, attributes:['id', 'username', 'email'], where: { } },
          { model: Sexo, attributes:['id','nombre'], where: { } },
          { model: Region, attributes:['id','nombre'], where: { } },
          { model: Provincix, attributes:['id','nombre'], where: { } },
          { model: Comuna, attributes:['id','nombre'], where: { } },
        ],
        order: [
          ['apellido1', 'ASC'],['apellido2', 'ASC']
        ]})
      .then(apoderado => res.status(200).send(apoderado))
      .catch(error => res.status(400).send(error));
}

  static create(req, res) {
    const { niveleducacionalId, usuarioId, sexoId, regionId, provincixId, comunaId } = req.params;
    const { nombre, apellido1, apellido2, rut, direccion, celular, nacimiento } = req.body;
      return Apoderado
        .create({
          nombre,
          apellido1,
          apellido2,
          rut,
          direccion,
          celular,
          nacimiento,
          niveleducacionalId,
          usuarioId,
          sexoId,
          regionId, 
          provincixId, 
          comunaId,
   
        })
        .then(data => res.status(201).send({
          success: true,
          message: 'Apoderado creado exitosamente',
          data
        }))
        .catch(error => res.status(400).send(error));
    }

    static getByPk(req, res) {

      let consulta = {};        
      consulta['id'] = req.params.apoderadoId;
      return Apoderado
      .findOne({ where: consulta, include: [
        { model: NivelEducacional, attributes: ['id','nombre'], where: { } },
        { model: Usuario, attributes:['id', 'username', 'email'], where: { } },
        { model: Sexo, attributes:['id','nombre'], where: { } },
        { model: Region, attributes:['id','nombre'], where: { } },
        { model: Provincix, attributes:['id','nombre'], where: { } },
        { model: Comuna, attributes:['id','nombre'], where: { } },
      ], })
      .then(apoderados => res.status(200).send(apoderados))
      .catch(error => res.status(400).send(error));
    }

  static modify(req, res) {
    const { nombre, apellido1, apellido2 ,rut, direccion, celular, nacimiento,
      Sexo, NivelEducacional,Region, Provincix, Comuna } = req.body;
    return Apoderado
      .findByPk(req.params.apoderadoId)
      .then((apoderado) => {
        apoderado.update({
          nombre: nombre || apoderado.nombre,
          apellido1: apellido1 || apoderado.apellido1,
          apellido2: apellido2 || apoderado.apellido2,
          rut: rut || apoderado.rut,
          direccion: direccion || apoderado.direccion,
          celular: celular   || apoderado.celular,
          nacimiento: nacimiento || apoderado.nacimiento,
          sexoId: Sexo || apoderado.sexoId,
          regionId: Region || apoderado.regionId,
          provincixId: Provincix || apoderado.provincixId,
          comunaId: Comuna || apoderado.comunaId,
          niveleducacionalId: NivelEducacional || apoderado.niveleducacionalId,
       
      })
      .then((updateApoderado) => {
          res.status(200).send({
            message: 'Apoderado actualizado exitosamente',
            data: {
              nombre: nombre || updateApoderado.nombre,
              apellido1: apellido1 || updateApoderado.apellido1,
              apellido2: apellido2 || updateApoderado.apellido2,
              rut: rut || updateApoderado.rut,
              direccion: direccion || updateApoderado.direccion,
              celular: celular || updateApoderado.celular,
              nacimiento: nacimiento || updateApoderado.nacimiento,
              sexoId: Sexo || updateApoderado.sexoId,
              regionId: Region || updateApoderado.regionId,
              provincixId: Provincix || updateApoderado.provincixId,
              comunaId: Comuna || updateApoderado.comunaId,
              niveleducacionalId: NivelEducacional || updateApoderado.niveleducacionalId,
            }
          })
      })
      .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
}

export default Apoderados;