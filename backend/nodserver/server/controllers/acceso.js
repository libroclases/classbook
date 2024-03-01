import model from '../models';


/*

const Op = require('../models').Sequelize.Op;
const { Acceso, Usuario, TipoUsuario, Tabla,
        Alumno, Profesor, Apoderado, AsistenteColegio, Anno } = model;

export const getBaseQuery = (req) => {
  if ( req.hasOwnProperty('accessIds') ) {
    return req.accessIds;
  } else {
    return {};
  };
}

const getValidAccesos = async (req, res, tablas) =>  {
  const now = Date.now();
    const accesos = await Acceso.findAll({
      where: {
        usuarioId: req.params.userId,
        timestampExpiracion: { [Op.gt]: now }
      },
      attributes: ['idEntrada'],
      include: [
        { model: Tabla,
          attributes:['id', 'nombre'],
          where: { nombre: tablas } },
      ],
      raw: true,
      order: [['idEntrada','ASC']]
    });
    //if username exist in the database respond with a status of 409
    if ( accesos.length == 0 ) {
      return res.status(400).send("Sin acceso a datos");
    }
    let accesosByTabla = new Map();
    accesos.forEach(acceso => {
      if ( acceso["idEntrada"] != 0 ) {
        const tablaIdString = `${acceso["Tabla.nombre"]}Id`;
        if ( !accesosByTabla.has(tablaIdString)) {
          accesosByTabla.set(tablaIdString, []);
        }
        accesosByTabla.get(tablaIdString).push(acceso["idEntrada"]);
      }
    });
    return Object.fromEntries(accesosByTabla);
  }

export const filterAcceso = (tablas) => {
  
 const fn = async (req, res, next) => {
  try {
    req.accessIds = await getValidAccesos(req, res, tablas);
    next();
  } catch (error) {
    console.log(error);
  }
  };
  return fn;
}

export const filterAccesoFK = (tablas) => {
  const fn = async (req, res, next) => {
    try {
      const accessIds = await getValidAccesos(req, res, tablas);
      req.accessIds = {};
      for ( let tbIdString in accessIds ) {
        if ( req.params.hasOwnProperty(tbIdString) ) {
          const accIds = accessIds[tbIdString];
          const tbId = +req.params[tbIdString];
          if ( accIds.includes(0) ) {
            req.accessIds[tbIdString] = 0;
          } else {
            if ( tbId == 0) {
              req.accessIds[tbIdString] = accIds;
            } else {
              if ( !accIds.includes(tbId) ) {
                return res.status(400).send("Acceso denegado a datos");
              }
            }
          }
        }
      }
      
      next();
    } catch (error) {
      console.log(error);
    }
  };
  return fn;
}


export class Accesos {
  
  static list(req, res) {
    return Acceso
      .findAll({
        attributes: ['id', 'fechaExpiracion', 'timestampExpiracion', 'idEntrada'],
      include: [ 
        { model: Tabla, attributes:['id', 'nombre'], where: { } },
        { model: Usuario, attributes:['id', 'username', 'email'], where: { } },
        { model: Usuario, as: '', attributes:['id'], where: { } },
        { model: Usuario, as: '', attributes:['id'], where: { } },
    ], order: [['fechaExpiracion','ASC']]})
      .then(accesos => res.status(200).send(accesos))
      .catch(error => res.status(400).send(error));
    }

  static info(req, res) {
    const { email } = req.query;
    const now = Date.now();
    Usuario.findOne({
      where: { email: email },
      attributes: ['id', 'username'],
      include: [{
        model: TipoUsuario, attributes: ['nombre']
      }],
      raw: true
    })
    .then(usuario => {
      if ( usuario == undefined ){
        res.status(200).send({});
      }

      const tablaPersona = usuario["TipoUsuario.nombre"];
      if ( tablaPersona == "profesor" ) {
        var modelo = Profesor;
      } else if ( tablaPersona == "apoderado" ) {
        var modelo = Apoderado;
      } else if ( tablaPersona == "alumno" ) {
        var modelo = Alumno;
      } else {
        var modelo = AsistenteColegio;
      }
      modelo.findOne({
        where: { usuarioId: usuario.id },
        attributes: ['nombre', 'apellido1'],  // agregar atributos si es necesario
        raw: true
      })
      .then(
        entry => {
          if ( entry == undefined ){
            res.status(200).send({});
            return;
          }
          // const today = new Date();
          const today = new Date('2023-09-27');
          Anno.findAll({
            where: { numero: today.getFullYear() },
            attributes: ['id'],
            raw: true
          })
          .then( annoQuery => {
          return Acceso
          .findAll({
            where: {
              usuarioId: usuario.id,
              timestampExpiracion: { [Op.gt]: now }
            },
            attributes: [ 'idEntrada' ],
            include: [
              { model: Tabla, attributes:['id'], where: { } },
            ],
            raw: true,
            order: [['idEntrada','ASC']]
          })
          .then(accesos => {
            if ( accesos.length ) {

            } else {
              
            }
            let accesosByTabla = new Map();
            accesos.forEach(acceso => {
              const tablaId = acceso["Tabla.id"];
              if ( !accesosByTabla.has(tablaId)) {
                accesosByTabla.set(tablaId, []);
              }
              accesosByTabla.get(tablaId).push(acceso["idEntrada"]);
            });
            Tabla.findAll({
              where: { id: Array.from(accesosByTabla.keys()) },
              attributes: ['id', 'nombre'],
              raw: true
            })
            .then(
              tablas => {
                let objAccesos = {};
                tablas.forEach(
                  tabla => objAccesos[tabla.nombre] = accesosByTabla.get(tabla.id));
                let result = {
                  info: {
                    usuarioId: usuario.id,
                    username: usuario.username,
                    table: usuario["TipoUsuario.nombre"],
                    tableId: 1,
                    nombre: entry.nombre,
                    apellido: entry.apellido1
                  },
                  accessIds: objAccesos
                };
                if ( annoQuery.length > 0 ) {
                  result['info']['annoId'] = annoQuery[0].id;
                  result['info']['mesId'] = today.getMonth()+1;
                }
                res.status(200).send(result);
              }
            )
            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
          });
        }
      )
      .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }

  static validas(req, res) {
    const { usuarioId } = req.body;
    const tsNow = Date.now();
    return Acceso
      .findAll({
        where: {
          usuarioId: usuarioId,
          timestampExpiracion: { [Op.gt]: tsNow }
        },
        attributes: ['id'],
        include: [
          { model: Tabla, attributes:['id'], where: { } },
        ],
        raw: true,
      })
      .then( accesos => {
        let colegioIds = [];
        accesos.forEach( acceso => colegioIds.push(acceso["Tabla.id"]) );
        res.status(200).send(colegioIds);  // array of Ids of Tabla entries
      } )
      .catch(error => res.status(400).send(error));
    }

  static getByFk(req, res) {
    const { usuarioId, tablaId } = req.params;
    let consulta = {};
    if (usuarioId != '0') {  consulta['usuarioId'] = usuarioId;  }
    if (tablaId != '0') {  consulta['tablaId'] = tablaId;  }

    return Acceso
      .findAll({
        where : consulta,
        attributes: ['id', 'fechaExpiracion', 'timestampExpiracion', 'idEntrada'],
        include: [ 
          { model: Usuario, attributes:['id', 'username', 'email'], where: { } },
          { model: Tabla, attributes:['id','nombre'], where: { } },
        ],
        order: [['fechaExpiracion', 'ASC']]
      })
      .then(acceso => res.status(200).send(acceso))
      .catch(error => res.status(400).send(error));
  }

  static getByPk(req, res) {
    
    return Acceso
    .findByPk(req.params.accesoId)
    .then(acceso => res.status(200).send(acceso))
    .catch(error => res.status(400).send(error));
  }

  static create(req, res) {
  const { usuarioId, tablaId, userId } = req.params;
  const { fechaExpiracion, idEntrada } = req.body;
  const timestampExpiracion = new Date(fechaExpiracion).getTime();
    return Acceso
      .create({
        fechaExpiracion,
        timestampExpiracion,
        idEntrada,
        usuarioId,
        tablaId,
    
      })
      .then(data => res.status(201).send({
        success: true,
        message: 'Acceso creado exitosamente',
        data: data
      }))
      .catch(error => res.status(400).send(error));
  }

  static modify(req, res) {
    const { fechaExpiracion, Usuario, Tabla } = req.body;
    if ( fechaExpiracion ) {
      var timestampExpiracion = new Date(fechaExpiracion).getTime();
    } else {
      var timestampExpiracion = null;
    }
    
    return Acceso
      .findByPk(req.params.accesoId)
      .then((acceso) => {
        acceso.update({
          fechaExpiracion: fechaExpiracion || acceso.fechaExpiracion,
          timestampExpiracion: timestampExpiracion || acceso.timestampExpiracion,
          idEntrada: idEntrada || acceso.idEntrada,
          usuarioId: Usuario || acceso.usuarioId,
          tablaId: Tabla || acceso.tablaId,
        
      })
      .then((updatedInscripcionColegio) => {
          res.status(200).send({
            message: 'Acceso actualizada exitosamente',
            data: {
              fechaExpiracion: fechaExpiracion || updatedInscripcionColegio.fechaExpiracion,
              usuarioId: Usuario || updatedInscripcionColegio.usuarioId,
              tablaId: Tabla || updatedInscripcionColegio.tablaId,
            }
          })
      })
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
}
}

*/
