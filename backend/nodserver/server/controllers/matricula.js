import model, { sequelize } from '../models';

const Sequelize = require("sequelize");

const Op = require('../models').Sequelize.Op;

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function dateString(year, month, day) {
  const dd = doubleZeroPad(day);
  const mm = doubleZeroPad(month);
  return `${year}-${mm}-${dd}`
}

function doubleZeroPad(num) {
  if ( num < 10) {
    return `0${num}`
  } else {
    return num;
  }
}

const { Matricula, Colegio, Curso, Apoderado, Alumno, Vinculo, Anno, Periodo, Asistencia,
  CursoProfesor, Evaluacion, Nota, EstadoAlumno, Feriado} = model;

class Matriculas {

  static list(req, res) {
    // const consulta = getBaseQuery(req);
    let consulta = {}
    return Matricula
      .findAll( {
        where: consulta,
        attributes: ['id', 'nombre', 'incorporacion', 'procedencia'], 
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
        attributes: ['id','nombre','procedencia','incorporacion' ],
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
    let matricula_;
    
    // mesId, mes, anno desde incorporacion
    // matriculaId  
  

    const { colegioId, cursoId, apoderadoId, alumnoId, vinculoId, annoId } = req.params;
    const { procedencia, nombre ,incorporacion } = req.body;
    Matricula
      .create({
        procedencia,
        incorporacion,
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
      })
      .catch(error => res.status(400).send(error))
      .then(() => {
         
        let m = matricula_.dataValues;
        const matricula = {matriculaId: m.id};
        const fecha = {fecha:m.incorporacion};
        const estadoalumno = {tipoestadoId: 1};
        const alumno = {alumnoId: m.alumnoId};   
        const anno = m.incorporacion.substring(0,4)*1;
        const mes = m.incorporacion.substring(5,7)*1;

        let consulta_cursoprofesor =  { annoId: m.annoId, colegioId: m.colegioId, cursoId: m.cursoId };
          
          // console.log('create_estado_alumno', {...alumno,...matricula , ...estadoalumno, ...consulta_cursoprofesor, ...fecha});


          EstadoAlumno.create({ ...alumno,...matricula , ...estadoalumno, ...consulta_cursoprofesor, ...fecha})
          .then(estadoalumno => { console.log(estadoalumno.dataValues) });
           
          var consultaFeriado = {fecha: {[Op.between]: [new Date(anno, mes-1, 0), new Date(anno, mes, 0)]}};
          
          Feriado
          .findAll({
            attributes: ['id', 'fecha'],
            where: consultaFeriado,
            order: [['fecha', 'ASC']],
            raw: true
          })
          .then(feriados => {

            const dim = new Date(anno, mes, 0).getDate();
            const dowFirstDay = (new Date(anno, mes-1, 1).getDay() + 6) % 7;
            let feriadosSet = new Set();
            for ( let feriado of feriados ) {
              feriadosSet.add(parseInt(feriado.fecha.toString().split('-')[2]));
            }
            let asistenciaObjects = [];

            for (let i = 0; i < dim; i++) {
              const dow = (dowFirstDay + i) % 7;
              const dia = i + 1;
              if ( (dow < 5) && !feriadosSet.has(dia) ) {
                const fecha = dateString(anno, mes, dia);
                const asistencia = {
                  fecha: fecha,
                  presente: false,
                  dia: dia,
                  matriculaId: matricula.matriculaId,
                  colegioId: colegioId,
                  cursoId: cursoId,
                  alumnoId: alumnoId,
                  annoId: annoId,
                  mesId: mes,
    
                  };
                  // console.log(asistencia);
                  asistenciaObjects.push(asistencia);
              }
            }
            Asistencia
            .bulkCreate(asistenciaObjects)
            .catch(error => res.status(400).send({
              success: false,
              message: `Entradas de Asistencia NO fueron creadas con éxito`,
            }));
          })

          CursoProfesor.findAll({where : consulta_cursoprofesor}).then(query => {

              var cont=0;
              
              query.forEach(q => {
              
                const c = q.dataValues;
                const consulta_evaluacion = {
                  annoId: c.annoId,  colegioId: c.colegioId, cursoId: c.cursoId, cursoprofesorId: c.id
                }

                // console.log('consulta_evaluacion',consulta_evaluacion);
            
                let notasObj = [];
                
                Evaluacion.findAll({
                  where: consulta_evaluacion, 
                  attributes: ['id','periodoId'],
                  
                })
                .then(evaluacion => {
                  evaluacion.forEach(ev => {
                  let notas = { ...matricula, ...ev.dataValues, ...consulta_evaluacion};
                  cont++;
                  notas['evaluacionId'] = notas['id'];
                  delete notas['id'];
                  notasObj.push(notas);
                  console.log('notas',{...notas, nota: null});
                  //Nota.create(notas).then(nota => { console.log(nota.dataValues) });
                
               
                  })
                  Nota.bulkCreate(notasObj)
                })
                             
              }
            
            )

         
          
        }
        
      )
      .then(res.status(201).send({
        success: true,
        message: `Entradas de Notas creadas exitosamente`
      }))
      .catch(error => res.status(400).send({
        success: false,
        message: `Entradas de Notas NO fueron creadas con éxito: ${error}`,
      })); 

  })
      //.catch(error => res.status(400).send(error));
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
    const { nombre, procedencia, incorporacion, Apoderado, Alumno, Colegio, Curso, Anno, Vinculo } = req.body;
    return Matricula
      .findOne({ where: consulta })
      .then((matricula) => {
        matricula.update({
          nombre: nombre || matricula.nombre,
          procedencia: procedencia || matricula.procedencia,
          incorporacion: incorporacion || matricula.incorporacion,
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