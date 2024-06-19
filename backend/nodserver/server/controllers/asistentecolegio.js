import model from '../models';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { AsistenteColegio, TipoAsistente, Usuario, Sexo, Region, Provincix, Comuna } = model;

class AsistenteColegios {

    static list(req, res) {
        return AsistenteColegio
          .findAll({attributes: ['id', 'nombre', 'apellido1', 'apellido2', 'rut', 'celular', 'direccion', 'nacimiento'], 
          include: [
            { model: TipoAsistente, attributes:['id','nombre'], where: { } },
            { model: Usuario, attributes:['id', 'username', 'email'], where: { } },
            { model: Sexo, attributes:['id','nombre'], where: { } },
            { model: Region, attributes:['id','nombre'], where: { } },
            { model: Provincix, attributes:['id','nombre'], where: { } },
            { model: Comuna, attributes:['id','nombre'], where: { } },
  
          ],
             
            order: [['apellido1','ASC'], ['apellido2','ASC'],['nombre','ASC'] ]})
          .then(AsistenteColegios => res.status(200).send(AsistenteColegios))
          .catch(error => res.status(400).send(error));
      }

      static bySearch(req, res) {
        const { expr } = req.params;
        
        return AsistenteColegio
            .findAll({  
                where: {
                    [Op.or] : [{ nombre : {[Op.iLike]: `%${expr}%`}},
                     { apellido1 : {[Op.iLike]: `%${expr}%`}},  { apellido2 : {[Op.iLike]: `%${expr}%`}}]
                },
                include: [
                  { model: TipoAsistente, attributes:['id', 'nombre'], where: { } },
                  { model: Usuario, attributes:['id', 'username', 'email'], where: { } },
                  { model: Sexo, attributes:['id','nombre'], where: { } },
                  { model: Region, attributes:['id','nombre'], where: { } },
                  { model: Provincix, attributes:['id','nombre'], where: { } },
                  { model: Comuna, attributes:['id','nombre'], where: { } },
                ],
                order: [['apellido1','ASC'], ['apellido2','ASC'],['nombre','ASC'] ] 
        } 
    )
            .then(asistecolegio => res.status(200).send(asistecolegio))
            .catch(error => res.status(400).send(error));
    }

  static getByPk(req, res) {
    return AsistenteColegio
    .findByPk(req.params.asistentecolegioId)
    .then(asistentesColegio => res.status(200).send(asistentesColegio))
    .catch(error => res.status(400).send(error));
  }

  static getByFk(req, res) {

    const { tipoasistenteId, usuarioId, sexoId, regionId, provincixId, comunaId} = req.params;
    
    let consulta = {};
    
    if (tipoasistenteId != '0') { consulta['tipoasistenteId'] = tipoasistenteId; }
    if (usuarioId != '0') {  consulta['usuarioId'] = usuarioId; } 
    if (sexoId != '0') {  consulta['sexoId'] = sexoId;  }
    if (regionId != '0') {  consulta['regionId'] = regionId;  }
    if (provincixId != '0') {  consulta['provincixId'] = provincixId;  }
    if (comunaId != '0') {  consulta['comunaId'] = comunaId;  }

    return AsistenteColegio 
      .findAll({ where : consulta,
        attributes: ['id','nombre', 'apellido1',  'apellido2','rut', 'celular', 'direccion', 'nacimiento'],
          include: [
          { model: TipoAsistente, attributes:['id', 'nombre'], where: { } },
          { model: Usuario, attributes:['id', 'username', 'email'], where: { } },
          { model: Sexo, attributes:['id','nombre'], where: { } },
          { model: Region, attributes:['id','nombre'], where: { } },
          { model: Provincix, attributes:['id','nombre'], where: { } },
          { model: Comuna, attributes:['id','nombre'], where: { } },
        ] , order: [
            ['apellido1', 'ASC'],['apellido2', 'ASC']
      ]})
      .then(asistentecolegio => {
        res.status(200).send(asistentecolegio);
      })
      .catch(error => res.status(400).send(error));
  }

      static create(req, res) {
        const { nombre, apellido1, apellido2, rut ,celular, direccion, nacimiento } = req.body;
        const { tipoasistenteId, usuarioId, sexoId, regionId, provincixId, comunaId } = req.params;
        return AsistenteColegio
          .create({
            nombre, 
            apellido1, 
            apellido2,
            rut, 
            celular,
            direccion,
            nacimiento,
            tipoasistenteId,
            usuarioId,
            sexoId,
            regionId,
            provincixId,
            comunaId,
   
          })
          .then(AsistenteColegio => res.status(201).send({
            message: `AsistenteColegio creado exitosamente`,
            AsistenteColegio
          }))
          .catch(error => res.status(400).send(error));
        }
    
        static modify(req, res) {
          const { nombre, apellido1,apellido2, rut, direccion, celular, nacimiento, TipoAsistente, Sexo, Region, Provincix, Comuna } = req.body;
          return AsistenteColegio
            .findByPk(req.params.asistentecolegioId)
            .then((AsistenteColegio) => {
              AsistenteColegio.update({
                nombre: nombre || AsistenteColegio.nombre,
                apellido1: apellido1 || AsistenteColegio.apellido1,
                apellido2: apellido2 || AsistenteColegio.apellido2,
                rut: rut || AsistenteColegio.rut,
                celular: celular || AsistenteColegio.celular,
                nacimiento: nacimiento || AsistenteColegio.nacimiento,
                direccion: direccion || AsistenteColegio.direccion,
                tipoasistenteId: TipoAsistente || AsistenteColegio.tipoasistenteId,
                sexoId: Sexo || AsistenteColegio.sexoId,
                regionId: Region || AsistenteColegio.regionId, 
                provincixId: Provincix || AsistenteColegio.provincixId, 
                comunaId: Comuna || AsistenteColegio.comunaId,
    
            })
            .then((updatedAsistenteColegio) => {
                res.status(200).send({
                  message: 'AsistenteColegio actualizado exitosamente',
                  data: {
                    nombre: nombre || updatedAsistenteColegio.nombre,
                    apellido1: apellido1 || updatedAsistenteColegio.apellido1,
                    apellido2: apellido2 || updatedAsistenteColegio.apellido2,
                    rut: rut || updatedAsistenteColegio.rut,
                    celular: celular || updatedAsistenteColegio.celular,
                    nacimiento: nacimiento || updatedAsistenteColegio.nacimiento,
                    direccion: direccion || updatedAsistenteColegio.direccion,
                    tipoasistenteId: TipoAsistente || updatedAsistenteColegio.tipoasistenteId,
                    sexoId: Sexo || updatedAsistenteColegio.sexoId,
                    regionId: Region || updatedAsistenteColegio.regionId,
                    provincixId: Provincix || updatedAsistenteColegio.provincixId,
                    comunaId: Comuna || updatedAsistenteColegio.comunaId
                  }
                });
            })
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }

} 

export default AsistenteColegios;