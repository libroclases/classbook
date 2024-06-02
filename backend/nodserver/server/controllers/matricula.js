import model, { sequelize } from '../models';

const Sequelize = require("sequelize");

const { Matricula, Colegio, Curso, Apoderado, Alumno, Vinculo, Anno, Periodo,
  Profesor, Evaluacion, Nota, AsignaturaCurso} = model;

class Matriculas {
  
  static list(req, res) {
    // const consulta = getBaseQuery(req);
    let consulta = {}
    return Matricula
      .findAll( {
        where: consulta,
        attributes: ['id', 'nombre', 'incorporacion', 'retiro', 'procedencia'], 
        include: [ 
          { model:Apoderado, attributes:['id','nombre','apellido1','apellido2'], where: { } },
          { model:Alumno, attributes:['id','nombre','apellido1','apellido2'], where: { } },
          { model:Colegio, attributes:['id','nombre'], where: { } },
          { model:Curso, attributes:['id','nombre'], where: { } },
          { model: Anno, attributes:['id','nombre'], where: { } },
          { model:Vinculo, attributes:['id','nombre'], where: { } },
   
        ],
        order: [['nombre','ASC']]})
      .then(colegios => res.status(200).send(colegios))
      .catch(error => res.status(400).send(error));
  }

  static getByFk(req, res) {
    const { colegioId, cursoId, apoderadoId, alumnoId, vinculoId, annoId } = req.params;
    let consulta = {};
    // const consulta = getBaseQuery(req);
    
    if ( colegioId != '0' ) { consulta['colegioId'] = colegioId; }
    if ( cursoId != '0' ) { consulta['cursoId'] = cursoId; }
    if ( apoderadoId != '0' ) { consulta['apoderadoId'] = apoderadoId;  }
    if ( alumnoId!= '0') { consulta['alumnoId'] = alumnoId;  }
    if ( vinculoId!= '0') { consulta['vinculoId'] = vinculoId;  }
    if ( annoId!= '0') { consulta['annoId'] = annoId;  }

  
    return Matricula
      .findAll({
        where: consulta,
        attributes: ['id','nombre','procedencia','incorporacion','retiro' ],
        include: [ 
          { model:Colegio, attributes:['id','nombre'], where: { } },
          { model:Curso, attributes:['id','nombre'], where: { } },
          { model:Apoderado, attributes:['id','nombre','apellido1','apellido2'], where: { } },
          { model:Alumno, attributes:['id','nombre','apellido1','apellido2'], where: { } },
          { model:Vinculo, attributes:['id','nombre'], where: { } },
          { model:Anno, attributes:['id','nombre'], where: { } },

        ],
        order: [
          ['nombre', 'DESC']]
        })
      .then(matricula => res.status(200).send(matricula))
      .catch(error => res.status(400).send(error));
  }

  static lastMatricula(req, res) {
              
    return Matricula.findOne({
        attributes: [Sequelize.fn('max', Sequelize.col('id'))],
        raw: true,
    })
    .then(matricula => res.status(200).send(matricula))
    .catch(error => res.status(400).send(error));
  }


  static listaDeCurso(req, res) {
    const { colegioId, cursoId, annoId } = req.params;
    // let consulta = getBaseQuery(req);
    let consulta = {};
    if (colegioId != '0') { consulta['colegioId'] = colegioId; }
    if (cursoId != '0') { consulta['cursoId'] = cursoId; }
    if (annoId != '0') { consulta['annoId'] = annoId; }

    return Matricula
      .findAll({
        where : consulta,
        attributes: ['id', 'nombre' ],
        include: [
          { model: Alumno, attributes:['id', 'nombre', 'apellido1','apellido2'], where: { } },
        ],
        order: [['nombre', 'ASC']]
      })
      .then(matricula => res.status(200).send(matricula))
      .catch(error => res.status(400).send(error));
  }

  static listaDeCursoNombres(req, res) {
    const { colegioId, cursoId, annoId } = req.params;
    let consulta = {};
    // let consulta = getBaseQuery(req);
    if (colegioId != '0') { consulta['colegioId'] = colegioId; }
    if (cursoId != '0') { consulta['cursoId'] = cursoId; }
    if (annoId != '0') { consulta['annoId'] = annoId; }

    return Matricula
      .findAll({
        where : consulta,
        attributes: ['id'],
        include: [
          { model: Alumno, attributes:['nombre', 'apellido1','apellido2'], where: { } },
        ],
        raw: true,
        order: [[ Alumno, 'apellido1', 'ASC']]
      })
      .then(query => {
        let matriculasNombres = [];
        query.forEach(
          entry => matriculasNombres.push(
            {"id": entry.id,
            "nombre": `${entry["Alumno.apellido1"]} ${entry["Alumno.apellido2"]} ${entry["Alumno.nombre"]}`})
        );
        res.status(200).send(matriculasNombres);
      })
      .catch(error => res.status(400).send(error));
  }

  static nombreCompleto(req, res) {
    let consulta = {};
    // let consulta = getBaseQuery(req);
    consulta['id'] = req.params.matriculaId;
    
    return Matricula
      .findAll({
        where : consulta,
        include: [
          { model: Alumno, attributes:['nombre', 'apellido1','apellido2'], where: { } },
        ],
        raw: true
      })
      .then(query => {
        const nombreCompleto = `${query[0]["Alumno.apellido1"]},${query[0]["Alumno.apellido2"]}, ${query[0]["Alumno.nombre"]}`
        res.status(200).send({ nombreCompleto });
      })
      .catch(error => res.status(400).send(error));
  }

  static count(req, res) {
    const { colegioId, cursoId, apoderadoId, alumnoId, vinculoId, annoId } = req.params;
    let consulta = {};
    // let consulta = getBaseQuery(req);
    if (apoderadoId != '0') { consulta['apoderadoId'] = apoderadoId; }
    if (alumnoId != '0') { consulta['alumnoId'] = alumnoId; }
    if (colegioId != '0') { consulta['colegioId'] = colegioId; }
    if (cursoId != '0') { consulta['cursoId'] = cursoId; }
    if (annoId != '0') { consulta['annoId'] = annoId; }
    if (vinculoId != '0') { consulta['vinculoId'] = vinculoId; }

    return Matricula
      .findAll({
        where : consulta,
        attributes: [sequelize.fn('COUNT', sequelize.col('id'))],
        // group : ['SaleItem.itemId'],
        raw: true,
      })
      .then(n_matriculas => res.status(200).send(n_matriculas))
      .catch(error => res.status(400).send(error));
  }

  static countCursos(req, res) {
    const { colegioId, annoId } = req.params;
    if ( colegioId == '0' || annoId == '0') {
      res.status(200).send(
        {message: "Todos los foreign keys deben ser validos: 'colegio', 'anno"}
        );
        return
      }
    // let consulta = getBaseQuery(req);
    let consulta = {};
    consulta['colegioId'] = colegioId;
    consulta['annoId'] = annoId;

    return Matricula
      .findAll({
        where : consulta,
        attributes: [],
        include: [
          { model: Curso, attributes:['nombre'] },
        ],
        raw: true,
      })
      .then(query => {
        let counterObject = {};
        for ( let obj of query ) {
          const nombreCurso = obj["Curso.nombre"];
          counterObject[nombreCurso] = counterObject[nombreCurso] ? (counterObject[nombreCurso]+1) : 1;
        }
        res.status(200).send(counterObject);
      })
      .catch(error => res.status(400).send(error));
  }

  static countHombresMujeres(req, res) {
    const { colegioId, cursoId, annoId } = req.params;
    let consulta = {};
    // let consulta = getBaseQuery(req);
    if (colegioId != '0') { consulta['colegioId'] = colegioId; }
    if (cursoId != '0') { consulta['cursoId'] = cursoId; }
    if (annoId != '0') { consulta['annoId'] = annoId; }

    return Matricula
      .findAll({
        where : consulta,
        attributes: [],
        include: [
          { model: Alumno, attributes:['sexoId'], where: { } },
        ],
        raw: true,
      })
      .then(matriculas => {
        let n_hombres = 0;
        let n_mujeres = 0;
        for (let matricula of matriculas){
          if (matricula["Alumno.sexoId"] == 1 ) {
            n_hombres += 1;
          } else {
            n_mujeres += 1;
          }
        }
        res.status(200).send({
          n_hombres,
          n_mujeres
        });
      })
      .catch(error => res.status(400).send(error));
  }
  
  static create(req, res) {
    let matricula_ = 'poronga';
    const { colegioId, cursoId, apoderadoId, alumnoId, vinculoId, annoId } = req.params;
    const { procedencia, nombre ,incorporacion, retiro } = req.body;
    return Matricula
      .create({
        procedencia,
        incorporacion,
        retiro,
        nombre,
        apoderadoId,
        alumnoId,
        colegioId,
        cursoId,
        annoId,
        vinculoId,
   
      })
      .then(matricula => { 
        matricula_ = matricula;
        res.status(200).send(matricula); 
      })
      .then(() => { 
        let m = matricula_.dataValues;
        let consulta_asignaturas =  {
          annoId: m.annoId, colegioId: m.colegioId, cursoId: m.cursoId
       };
        console.log(consulta_asignaturas);
        console.log('nombre',m.id, m.nombre)
        AsignaturaCurso.findAll(consulta_asignaturas).then(asignaturas => {
          
          var notasObject = [];
          var asignaturasObject = [];
          asignaturas.forEach(a => { 
            asignaturasObject.push(a.dataValues.asignaturaId)
            
            
          })  
        

        
        });
        }
        
      )
      .catch(error => res.status(400).send(error));
  }
  

  static getByPk(req, res) {
    
    let consulta = {};
    // let consulta = getBaseQuery(req);
    consulta['id'] = req.params.matriculaId;
    return Matricula
    .findOne({ where: consulta, include: [
      { model: Colegio, attributes:['id','nombre'] },
      { model: Curso, attributes:['id','nombre'] },
      { model: Apoderado, attributes:['id','nombre', 'apellido1','apellido2'] },
      { model: Alumno, attributes:['id','nombre', 'apellido1','apellido2'] },
      { model: Vinculo, attributes:['id','nombre'] },
      { model: Anno, attributes:['id','nombre'] },

    ], })
    .then(matriculas => res.status(200).send(matriculas))
    .catch(error => res.status(400).send(error));
  }

  static modify(req, res) {
    let consulta = {};
    // let consulta = getBaseQuery(req);
    consulta['id'] = req.params.matriculaId;
    const { nombre, procedencia, incorporacion, retiro, Apoderado, Alumno, Colegio, Curso, Anno, Vinculo } = req.body;
    return Matricula
      .findOne({ where: consulta })
      .then((matricula) => {
        matricula.update({
          nombre: nombre || matricula.nombre,
          procedencia: procedencia || matricula.procedencia,
          incorporacion: incorporacion || matricula.incorporacion,
          retiro: retiro || matricula.retiro,
          apoderadoId: Apoderado || matricula.apoderadoId,
          alumnoId: Alumno || matricula.alumnoId,
          colegioId: Colegio || matricula.colegioId,
          cursoId: Curso || matricula.cursoId ,
          annoId: Anno || matricula.annoId, 
          vinculoId: Vinculo || matricula.vinculoId,
   
      })
      .then((updatedMatricula) => {
          res.status(200).send({
            message: 'Matricula actualizada exitosamente',
            data: {
              nombre: nombre || updatedMatricula.nombre,
              procedencia: procedencia || updatedMatricula.procedencia,
              incorporacion: incorporacion || updatedMatricula.incorporacion,
              retiro: retiro || updatedMatricula.retiro,
              apoderadoId: Apoderado || updatedMatricula.apoderadoId,
              alumnoId: Alumno       || updatedMatricula.alumnoId,
              colegioId: Colegio || updatedMatricula.colegioId,
              cursoId: Curso || updatedMatricula.cursoId,
              annoId: Anno || updatedMatricula.annoId,
              vinculoId: Vinculo || updatedMatricula.vinculoId
            }
          })
      })
      .catch(error => res.status(400).send(error));
  })
  .catch(error => res.status(400).send(error));
  }

  static delete(req, res) {
    
    let consulta = {};
    // let consulta = getBaseQuery(req);
    consulta['id'] = req.params.matriculaId;
    return Matricula
      .findOne({ where: consulta })
      .then(matricula => {
        if(!matricula) {
          return res.status(400).send({
          message: 'Matricula Not Found',
          });
        }
        return matricula
          .destroy()
          .then(() => res.status(200).send({
            message: 'Matricula borrada exitosamente'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
  }
}

export default Matriculas;