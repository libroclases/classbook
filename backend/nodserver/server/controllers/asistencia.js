import model, { sequelize } from '../models';

const Op = require('../models').Sequelize.Op;

const { Asistencia, Matricula, Colegio, Curso, Alumno, Anno, Mes, Feriado } = model;


function doubleZeroPad(num) {
  if ( num < 10) {
    return `0${num}`
  } else {
    return num;
  }
}

function dateString(year, month, day) {
  const dd = doubleZeroPad(day);
  const mm = doubleZeroPad(month);
  return `${year}-${mm}-${dd}`
}

class Asistencias {

  static list(req, res) { 
    return Asistencia
      .findAll({
        // where: getBaseQuery(req),
        include: [
          { model:Matricula, attributes:['id', 'nombre'], where: { } },
          { model:Colegio, attributes:['id','nombre'], where: { } },
          { model:Curso, attributes:['id','nombre'], where: { } },
          { model:Alumno, attributes:['id','nombre', 'apellido1','apellido2'], where: { } },
          { model:Anno, attributes:['id','nombre'], where: { } },
          { model:Mes, attributes:['id','numero'], where: { } },

        ],
        order: [['fecha', 'ASC']]})
      .then(asistencias => res.status(200).send(asistencias))
      .catch(error => res.status(400).send(error)); 
    }

  static getByFk(req, res) {
    const { matriculaId, colegioId, cursoId, alumnoId, annoId, mesId } = req.params;
    // let consulta = getBaseQuery(req);

    let consulta = {};

    if (matriculaId != '0') { consulta['matriculaId'] = matriculaId; }
    if (colegioId != '0') { consulta['colegioId'] = colegioId; }
    if (cursoId != '0') { consulta['cursoId'] = cursoId; }
    if (alumnoId != '0') { consulta['alumnoId'] = alumnoId; }
    if (annoId != '0') { consulta['annoId'] = annoId; }
    if (mesId != '0') { consulta['mesId'] = mesId; }

    return Asistencia
      .findAll({
        where: consulta,
        include: [
          { model: Matricula, attributes: ['id','nombre'], where: { } },
          { model: Colegio, attributes: ['id','nombre'], where: { } },
          { model: Curso, attributes: ['id','nombre'], where: { } },
          { model: Alumno, attributes: ['id','nombre', 'apellido1','apellido2'], where: { } },
          { model: Anno, attributes: ['id','nombre'], where: { } },
          { model: Mes, attributes: ['id','numero'], where: { } },
   
        ],
        order: [['fecha', 'ASC']]

      }).then(asistencias => res.status(200).send(asistencias))
      .catch(error => res.status(400).send(error));
  }

  static getPresente(req, res) {
    const { matriculaId, colegioId, cursoId, alumnoId, annoId, mesId } = req.params;
    // let consulta = getBaseQuery(req);
    let consulta = {};
    if (matriculaId != '0') { consulta['matriculaId'] = matriculaId; }
    if (colegioId != '0') { consulta['colegioId'] = colegioId; }
    if (cursoId != '0') { consulta['cursoId'] = cursoId; }
    if (alumnoId != '0') { consulta['alumnoId'] = alumnoId; }
    if (annoId != '0') { consulta['annoId'] = annoId; }
    if (mesId != '0') { consulta['mesId'] = mesId; }

    return Asistencia
      .findAll({where : consulta,
        include: [
          { model: Alumno, attributes: ['id', 'nombre', 'apellido1','apellido2'], where: { } },
        ],
        order: [['fecha', 'ASC']]

      })
      .then(asistencias => res.status(200).send(asistencias))
      .catch(error => res.status(400).send(error));
  }
  
  static asistenciaCursoDia(req, res) {
    // consulta la asistencia de un curso en un dia especifico
    const { colegioId, cursoId, annoId, mesId } = req.params;
    const { dia } = req.body;
    
    // let consulta = getBaseQuery(req);
    let consulta = {}
    consulta['dia'] = dia;
    if (colegioId != '0') { consulta['colegioId'] = colegioId; }
    if (cursoId != '0') { consulta['cursoId'] = cursoId; }
    if (annoId != '0') { consulta['annoId'] = annoId; }
    if (mesId != '0') { consulta['mesId'] = mesId; }
    
    return Asistencia
      .findAll({
        attributes: ['id', 'fecha', 'presente'],
        where: consulta,
        include: [
          { model: Matricula, attributes: ['id', 'nombre'], where: { } },
          { model: Alumno, attributes: ['id','nombre', 'apellido1','apellido2'], where: { } },
        ],
        order: [['fecha', 'ASC']]
      })
      .then(asistencias => res.status(200).send(asistencias))
      .catch(error => res.status(400).send(error));
  }
  
  static totalesMesColegio(req, res) {
    // consulta de los totales de asistencia en un colegio por curso en un mes especifico
    const { colegioId, annoId, mesId } = req.params;
    // let consulta = getBaseQuery(req);
    let consulta = {}
    consulta['presente'] = { [Op.eq]: true }  // solo interesa contar los presentes
    if (colegioId != '0') { consulta['colegioId'] = colegioId; }
    if (annoId != '0') { consulta['annoId'] = annoId; }
    if (mesId != '0') { consulta['mesId'] = mesId; }
    
    return Asistencia
      .findAll({
        attributes: [
          'dia',
          // [sequelize.fn('COUNT', sequelize.col('dia'), 'dia')]
        // sequelize.fn('COUNT', sequelize.col('presente'))
      ],
        raw: true,
        where: consulta,
        include: [
          { model: Curso, attributes: ['id'] },
        ],
      })
      .then(
        result => {  // result = [{"dia": 1, "Curso.id": 19}, ...]
          let countObj = {}
          let cursoIds = [];
          for ( let obj of result ) {
            const cursoId = obj["Curso.id"];
            if ( !cursoIds.includes(cursoId) ) {
              cursoIds.push(cursoId);
            }
            const cursoDia = `${cursoId}:${obj["dia"]}`;
            countObj[cursoDia] = countObj[cursoDia] ? (countObj[cursoDia] + 1) : 1;
          }
          // countObj: {"<dia>:<cursoId>": <asistenciaDia>, ... }
          var queryPars = {
            id: cursoIds
          };
          Curso.findAll({
            attributes: ['nombre', 'id'],
            where: queryPars,
            raw: true
          }).then(
            queryCursos => {
              let countPorCurso = {};
              let idToName = new Map();
              for ( let curso of queryCursos) {
                countPorCurso[curso.nombre] = {};
                idToName.set(curso.id, curso.nombre);
              }
              for ( let auxString in countObj ) {
                const index = auxString.indexOf(":");
                const cursoId = auxString.slice(0, index);
                const dia = auxString.slice(index+1);
                const count = countObj[auxString];
                countPorCurso[idToName.get(+cursoId)][+dia] = count;
              }
              res.status(200).send(countPorCurso);
            }
          )
          .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
  }

  static findOrCreate(req, res) {
    const { matriculaId, colegioId, cursoId, alumnoId, annoId, mesId } = req.params;
    const { fecha, presente, dia } = req.body;

    return Asistencia
      .findOrCreate({
        where: {
          fecha: fecha,
          matriculaId: matriculaId
        },
        defaults: {
          fecha: fecha,
          presente: presente,
          dia: dia,
          matriculaId: matriculaId,
          colegioId: colegioId,
          cursoId: cursoId,
          alumnoId: alumnoId,
          annoId: annoId,
          mesId: mesId,
   
        }},)
      .then(asistencia => res.status(201).send(
        {
          success: true,
          message: `Your Asistencia at fecha ${fecha} for Alumno ${alumnoId} has been found/created successfully`,
        }))
      .catch(error => res.status(400).send({
        success: false,
        message: `Asistencia at fecha ${fecha} for Alumno ${alumnoId} was NOT found/created`,
      }));
    }

  static create(req, res) {
    const { matriculaId, colegioId, cursoId, alumnoId, annoId, mesId } = req.params;
    const { fecha, presente, dia } = req.body;

    return Asistencia
      .create({
        fecha,
        presente,
        dia,
        matriculaId,
        colegioId,
        cursoId,
        alumnoId,
        annoId,
        mesId,
  
      })
      .then(asistencia => res.status(201).send({
        success: true,
        message: `Asistencia con fecha ${fecha} para Alumno ${alumnoId} creada exitosamente`
      }))
      .catch(error => res.status(400).send({
        success: false,
        message: `Asistencia con fecha ${fecha} para Alumno ${alumnoId} NO fue creada`,
      }));
    }

    static populateMatriculaMes(req, res) {
      const { colegioId, cursoId, annoId, mesId, matriculaId } = req.params;
      const { anno } = req.body;
      const mes = mesId;
    
      var consulta = {};

      consulta['colegioId'] = colegioId;
      consulta['cursoId'] = cursoId;
      consulta['annoId'] = annoId;
      consulta['matriculaId'] = matriculaId;

      var consultaFeriado = {fecha: {[Op.between]: [new Date(anno, mes-1, 0), new Date(anno, mes, 0)]}};


      Feriado
      .findAll({
        attributes: ['id', 'fecha'],
        where: consultaFeriado,
        order: [['fecha', 'ASC']],
        raw: true
      })
      .then(feriados => { 

        const dim = new Date(anno, mesId, 0).getDate();
        const dowFirstDay = (new Date(anno, mesId-1, 1).getDay() + 6) % 7;
        let feriadosSet = new Set();
        for ( let feriado of feriados ) {
          feriadosSet.add(parseInt(feriado.fecha.toString().split('-')[2]));
        }
        let asistenciaObjects = [];

        for (let i = 0; i < dim; i++) {
          const dow = (dowFirstDay + i) % 7;
          const dia = i + 1;
          if ( (dow < 5) && !feriadosSet.has(dia) ) {
            const fecha = dateString(anno, mesId, dia);
            const asistencia = {
              fecha: fecha,
              presente: false,
              dia: dia,
              matriculaId: matriculaId.toString(),
              colegioId: colegioId,
              cursoId: cursoId,
              // alumnoId: alumnoId.toString(),
              annoId: annoId,
              mesId: mesId,

              };
              console.log(asistencia);
              asistenciaObjects.push(asistencia);
          }
        }
      })

      return res.status(200).send({colegioId, cursoId, annoId, mesId, matriculaId});
    
    }

    static populateMes(req, res) {
      const { colegioId, cursoId, annoId, mesId, userId } = req.params;
      const { anno } = req.body;
      const mes = mesId;
      if ((colegioId == '0') || (cursoId == '0') || (annoId == '0') || (mesId == '0')) {
        res.status(400).send({
          success: false,
          message: ` populateMes:  not all FKs are != 0`,
        })
        return
      }
      // lista de curso
      var consulta = {};
      consulta['colegioId'] = colegioId;
      consulta['cursoId'] = cursoId;
      consulta['annoId'] = annoId;
      Matricula
      .findAll({
        where : consulta,
        attributes: ['id', 'nombre' ],
        include: [
          { model: Alumno, attributes:['id', 'nombre', 'apellido1','apellido2'], where: { } },
        ],
        order: [['nombre', 'ASC']]
      })
      .then(matriculas => {
        if (matriculas.length > 0){
          var consultaFeriado = {fecha: {[Op.between]: [new Date(anno, mes-1, 0), new Date(anno, mes, 0)]}};
          
          Feriado
            .findAll({
              attributes: ['id', 'fecha'],
              where: consultaFeriado,
              order: [['fecha', 'ASC']],
              raw: true
            })
            .then(feriados => {
              const dim = new Date(anno, mesId, 0).getDate();
              const dowFirstDay = (new Date(anno, mesId-1, 1).getDay() + 6) % 7;
              let feriadosSet = new Set();
              for ( let feriado of feriados ) {
                feriadosSet.add(parseInt(feriado.fecha.toString().split('-')[2]));
              }
              let asistenciaObjects = [];
              for ( let obj of matriculas ) {
                const alumnoId = obj.Alumno.id;
                const matriculaId = obj.id;
                for (let i = 0; i < dim; i++) {
                  const dow = (dowFirstDay + i) % 7;
                  const dia = i + 1;
                  if ( (dow < 5) && !feriadosSet.has(dia) ) {
                    const fecha = dateString(anno, mesId, dia);
                    const asistencia = {
                      fecha: fecha,
                      presente: false,
                      dia: dia,
                      matriculaId: matriculaId.toString(),
                      colegioId: colegioId,
                      cursoId: cursoId,
                      alumnoId: alumnoId.toString(),
                      annoId: annoId,
                      mesId: mesId,
   
                      };
                      asistenciaObjects.push(asistencia);
                  }
                }
              }
              Asistencia
              .bulkCreate(asistenciaObjects)
              .then(() => res.status(201).send({
                success: true,
                message: `Entradas de Asistencia creadas exitosamente`
              }))
              .catch(error => res.status(400).send({
                success: false,
                message: `Entradas de Asistencia NO fueron creadas con éxito`,
              }));
            })
            .catch(error => res.status(400).send(error));
        }
      })
      .catch(error => res.status(400).send(error));
      
      }

  static modify(req, res) {
    // let consulta = getBaseQuery(req);
    let consulta = {}
    consulta['id'] = req.params.asistenciaId;
    const { fecha, presente, Matricula, Colegio, Curso, Alumno, Anno, Mes } = req.body;
    return Asistencia
      .findOne({where: consulta})
      .then((asistencia) => {
        var new_value = {
          fecha: fecha || asistencia.fecha,
          presente: (presente == null) ? asistencia.presente : presente,
          matriculaId: Matricula || asistencia.matriculaId,
          colegioId: Colegio || asistencia.colegioId,
          cursoId: Curso || asistencia.cursoId,
          alumnoId: Alumno || asistencia.alumnoId,
          annoId: Anno || asistencia.annoId,
          mesId: Mes || asistencia.mesId,
   
        };
        asistencia.update(new_value)
        .then(() => {
          res.status(200).send({
            success: true,
            message: 'Asistencia actualizado exitosamente'
          })
        })
        .catch(error => res.status(400).send({
          success: false,
          message: 'asistencia was NOT updated',
        }));
      })
      .catch(error => res.status(400).send({
        success: false,
        message: `Asistencia with pk=${req.params.asistenciaId} not found. Asistencia was NOT updated`,
      }));
    }

    static delete(req, res) {
      // let consulta = getBaseQuery(req);
      let consulta = {}
      consulta['id'] = req.params.asistenciaId;
      return Asistencia
      .findOne({ where: consulta })
      .then(asistencia => {
          if(!asistencia) {
          return res.status(400).send({
          message: 'Asistencia Not Found',
          });
          }
          return asistencia
          .destroy()
          .then(() => res.status(200).send({
              message: 'Asistencia successfully deleted'
          }))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error))
    }
  
} 

export default Asistencias;
