import model from '../models';
// import { getBaseQuery } from './acceso';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Anotacion, Matricula, Profesor, Anno, Colegio, Curso, Alumno } = model;

class Anotaciones {

    static list(req, res) {
        return Anotacion
            .findAll({
                // where: getBaseQuery(req),
                attributes: ['id', 'texto', 'fecha', 'hora'],
                include: [
                    { model: Matricula, attributes:['id','nombre'],
                        include: [{
                            model: Alumno,
                            attributes: ['id', 'nombre', 'apellido1','apellido2']
                        }] },
                    { model: Profesor, attributes:['id', 'nombre', 'apellido1','apellido2'] },
                    { model: Anno, attributes:['id','nombre'] },
                    { model: Colegio, attributes:['id','nombre'] },
                    { model: Curso, attributes:['id','nombre'] },
   
                ],
                order: [['fecha', 'ASC']] })
                .then(Anotaciones => res.status(200).send(Anotaciones))
                .catch(error => res.status(400).send(error));
    }

    static getByPk(req, res) {
      // let consulta = getBaseQuery(req);
      consulta = {};
      consulta['id'] = req.params.anotacionId;
      return Anotacion
      .findOne({ where: consulta })
      .then(Anotaciones => res.status(200).send(Anotaciones))
      .catch(error => res.status(400).send(error));
    }
    
    static getByFk(req, res) {
        const { matriculaId, profesorId, annoId, colegioId, cursoId } = req.params;

        // let consulta = getBaseQuery(req);

        let consulta = {};

        if (matriculaId != '0') {  consulta['matriculaId'] = matriculaId; } 
        if (profesorId != '0') {  consulta['profesorId'] = profesorId;  } 
        if (annoId != '0') {  consulta['annoId'] = annoId;  }   
        if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }   
        if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }        

        return Anotacion
          .findAll({ where : consulta,
              include: [
                { model: Matricula, attributes:['id','nombre'],
                    include: [{
                        model: Alumno,
                        attributes: ['id', 'nombre', 'apellido1','apellido2']
                    }] },
                { model: Profesor, attributes:['id', 'nombre', 'apellido1','apellido2'] },
                { model: Anno, attributes:['id','nombre'] },
                { model: Colegio, attributes:['id','nombre'] },
                { model: Curso, attributes:['id','nombre'] },
            ],
            order: [['fecha', 'ASC']]
        })
        .then(anotacion => res.status(200).send(anotacion))
        .catch(error => res.status(400).send(error));
    }
   
    static create(req, res) {
    const { matriculaId, profesorId, annoId, colegioId, cursoId } = req.params;
    const { texto, fecha, hora } = req.body;
    return Anotacion
    .create({
        texto, 
        fecha,  
        hora,
        matriculaId,
        profesorId,
        annoId,
        colegioId,
        cursoId,
   
    })
    .then(data => res.status(201).send({
        success: true,
        message: 'Anotacion successfully created',
        data
        }))
    .catch(error => res.status(400).send(error)); 
    }

    static modify(req, res) {
    const { texto, fecha, hora, Matricula, Profesor, Anno, Colegio, Curso } = req.body
    // let consulta = getBaseQuery(req);
    let consulta = {}
    consulta['id'] = req.params.anotacionId;
    return Anotacion
        .findOne({ where: consulta })
        .then((anotacion) => {
            anotacion.update({
                texto: texto || anotacion.texto,
                fecha: fecha || anotacion.fecha,
                hora: hora || anotacion.hora,
                matriculaId: Matricula || anotacion.matriculaId,
                profesorId: Profesor || anotacion.profesorId,
                annoId: Anno || anotacion.annoId,
                colegioId: Colegio || anotacion.colegioId,
                cursoId: Curso || anotacion.cursoId,
        
    })
    .then((updatedAnotacion) => {
        res.status(200).send({

            message: 'Anotacion updated successfully',
                data: {
                    texto: texto || updatedAnotacion.texto,
                    fecha: fecha || updatedAnotacion.fecha,
                    hora: hora || updatedAnotacion.hora,
                    matriculaId: Matricula || updatedAnotacion.matriculaId,
                    profesorId: Profesor || updatedAnotacion.profesorId,
                    annoId: Anno || updatedAnotacion.annoId,
                    colegioId: Colegio || updatedAnotacion.colegioId,
                    cursoId: Curso || updatedAnotacion.cursoId,
                }
            })
    })
    .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }
}

export default Anotaciones;