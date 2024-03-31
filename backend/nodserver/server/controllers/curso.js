import model from '../models';

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const { Curso, Colegio, Anno } = model;

    class Cursos {

    static list(req, res) {
        /*
        let consulta = getBaseQuery(req);
        if ( consulta.hasOwnProperty('cursoId') ){
            consulta['id'] = consulta.cursoId;
            delete consulta.cursoId;
        }
        */
        return Curso
        .findAll({
            //where: consulta,
            attributes: ['id','nombre', 'profesor_jefe'],
            include: [
                { model:Colegio, attributes:['id','nombre'], where: { } },
                { model:Anno, attributes:['id','nombre'], where: { } },
 
        ],
        order: [['nombre','ASC']] })
        .then(cursos => res.status(200).send(cursos))
        .catch(error => res.status(400).send(error));
    }

    static bySearch(req, res) {
        const { expr } = req.params;
        
        return Curso
        .findAll({
            where: {
                [Op.or] : [
                    { nombre : {[Op.iLike]: `%${expr}%`}},
   
                ]
                },
            include: [
                { model: Colegio, attributes:['id','nombre'], where: { } },
                { model: Anno, attributes: ['id','nombre'], where: { } },
            
            ],
            order: [['nombre', 'ASC']]   
        } 
    )
            .then(cursos => res.status(200).send(cursos))
            .catch(error => res.status(400).send(error));
    }

    static getByFk(req, res) {

        const { colegioId, annoId } = req.params;
        let consulta = {};
        /*
        let consulta = getBaseQuery(req);
        if ( consulta.hasOwnProperty('cursoId') ){
            consulta['id'] = consulta.cursoId;
            delete consulta.cursoId;
        }
        */
        if (colegioId != '0') { consulta['colegioId'] = colegioId; }
        if (annoId != '0') {  consulta['annoId'] = annoId;  }

        return Curso 
          .findAll({ where : consulta,
            attributes: ['id','nombre', 'profesor_jefe'],  include: [ 
                { model:Colegio, attributes:['id','nombre'], where: { } },
                { model:Anno, attributes:['id','nombre'], where: { } } 
            ] , order: [
            ['nombre', 'ASC']
          ]})
          .then(cursos => res.status(200).send(cursos))
          .catch(error => res.status(400).send(error));
    }

    static getByPk(req, res) {
        return Curso
        .findByPk(req.params.cursoId)
        .then(cursos => res.status(200).send(cursos))
        .catch(error => res.status(400).send(error));
      }

    static create(req, res) {
        const { colegioId, annoId } = req.params;
        const { nombre, profesor_jefe } = req.body;
        return Curso
        .create({
            nombre,
            profesor_jefe,
            colegioId, 
            annoId,
    
        })
        .then(cursoData => res.status(201).send({
            success: true,
            message: 'Curso successfully created',
            cursoData
        }))
        .catch(error => res.status(400).send(error));
    }


    static modify(req, res) {
        const { nombre, profesor_jefe,  Colegio, Anno } = req.body;
        return Curso
        .findByPk(req.params.cursoId)
        .then((curso) => {
            curso.update({
            nombre: nombre || curso.nombre,
            profesor_jefe: profesor_jefe  ||  curso.profesor_jefe,
            colegioId: Colegio || curso.colegioId,
     
        })
        .then((updatedCurso) => {
        res.status(200).send({
            message: 'Curso updated successfully',
            data: {
                nombre: nombre || updatedCurso.nombre,
                profesor_jefe: nombre || updatedCurso.profesor_jefe,
                colegioId: Colegio || updatedCurso.colegioId,
                annoId: Anno || updatedCurso.annoId,
            }
        })
    })
    .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }
}

export default Cursos;