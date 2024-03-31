import model from '../models';

const { Colegio, Region, Provincix, Comuna, TipoColegio } = model;


class Colegios {
  static list(req, res) {
    /*
    let consulta = getBaseQuery(req);
    if ( consulta.hasOwnProperty('colegioId') ){
      consulta['id'] = consulta.colegioId;
      delete consulta.colegioId;
    }
    */
    return Colegio
      .findAll({
        // where: consulta,
        attributes: ['id', 'nombre', 'telefono', 'rut', 'direccion', 'email', 'www'],
        include: [ 
          { model:Region, attributes:['id','nombre'], where: { } },
          { model:Provincix, attributes:['id','nombre'], where: { } },
          { model:Comuna, attributes:['id','nombre'], where: { } },
          { model:TipoColegio, attributes:['id','nombre'], where: { } },
    ], order: [['nombre','ASC']]})
      .then(colegios => res.status(200).send(colegios))
      .catch(error => res.status(400).send(error));
    }

  static getByFk(req, res) {
    const { regionId, provincixId, comunaId, tipocolegioId } = req.params;
    let consulta = {};
    /*
    let consulta = getBaseQuery(req);
    if ( consulta.hasOwnProperty('colegioId') ){
      consulta['id'] = consulta.colegioId;
      delete consulta.colegioId;
    }
    */
    if (regionId != '0') {  consulta['regionId'] = regionId;  }
    if (provincixId != '0') {  consulta['provincixId'] = provincixId;  }
    if (comunaId != '0') {  consulta['comunaId'] = comunaId;  }
    if (tipocolegioId != '0') {  consulta['tipocolegioId'] = tipocolegioId;  }
    return Colegio
      .findAll({
        where : consulta,
        attributes: ['id','nombre','telefono','rut','direccion','email','www' ],
        include: [ 
          { model:Region, attributes:['id','nombre'], where: { } },
          { model:Provincix, attributes:['id','nombre'], where: { } },
          { model:Comuna, attributes:['id','nombre'], where: { } },
          { model:TipoColegio, attributes:['id','nombre'], where: { } },
        ] , order: [
        ['nombre', 'ASC']
      ]})
      .then(colegio => res.status(200).send(colegio))
      .catch(error => res.status(400).send(error));
  }

  static create(req, res) {
  const { regionId, provincixId, comunaId, tipocolegioId } = req.params;
  const { nombre, telefono, rut, direccion, email, www } = req.body;
    return Colegio
      .create({
        nombre,
        telefono,
        rut,
        direccion,
        email,
        www,
        regionId,
        provincixId,
        comunaId,
        tipocolegioId,
   
      })
      .then(() => {
        res.status(201).send({
          success: true,
          message: 'Colegio creado exitosamente'
        })
      })
      .catch(error => res.status(400).send(error));
  }

  static getByPk(req, res) {
    return Colegio
    .findByPk(req.params.colegioId)
    .then(colegios => res.status(200).send(colegios))
    .catch(error => res.status(400).send(error));
  }

  static modify(req, res) {
    const { nombre, telefono, rut, direccion, email, www,
      Region, Provincix, Comuna, TipoColegio } = req.body;
    return Colegio
      .findByPk(req.params.colegioId)
      .then((colegio) => {
        colegio.update({
          nombre: nombre || colegio.nombre,
          telefono: telefono || colegio.telefono,
          rut: rut || colegio.rut,
          direccion: direccion || colegio.direccion,
          email: email || colegio.email,
          www:www || colegio.www,
          regionId: Region || colegio.regionId,
          provincixId: Provincix || colegio.provincixId,
          comunaId: Comuna || colegio.comunaId ,
          tipocolegioId: TipoColegio || colegio.tipocolegioId,
      })
      .then((updatedColegio) => {
          res.status(200).send({
            message: 'Colegio actualizado exitosamente',
            data: {
              nombre: nombre || updatedColegio.nombre,
              telefono: telefono || updatedColegio.telefono,
              rut: rut || updatedColegio.rut,
              direccion: direccion || updatedColegio.direccion,
              email: email || updatedColegio.email,
              www:www || updatedColegio.www,
              regionId: Region || updatedColegio.regionId,
              provincixId: Provincix || updatedColegio.provincixId,
              comunaId: Comuna || updatedColegio.comunaId,
              tipocolegioId: TipoColegio || updatedColegio.tipocolegioId 
            }
          })
      })
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
}
}
export default Colegios;
