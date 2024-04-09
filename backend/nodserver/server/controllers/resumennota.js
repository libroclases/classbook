import model from '../models';

const {  Colegio, Periodo, Curso, Anno,  Matricula, AsignaturaCurso, ResumenNota } = model;

class ResumenNotas {

    static list(req, res) {
        return ResumenNota
            .findAll({
                // where: getBaseQuery(req),
                attributes: ['id','promedio'],
                include: [ 
                    { model:Matricula, attributes:['id','nombre'], where: { } },
                    { model:AsignaturaCurso, attributes:['id','nombre'], where: { } },
                    { model:Colegio, attributes:['id','nombre'], where: { } },
                    { model:Curso, attributes:['id','nombre'], where: { } },
                    { model:Anno, attributes:['id','nombre'], where: { } },
                    { model:Periodo, attributes:['id','nombre'], where: { }}                   
    

            ],
             order: [['id','ASC']] })
            .then(notas => res.status(200).send(notas))
            .catch(error => res.status(400).send(error));
    }

    static getByFk(req, res) {
        const { annoId, periodoId, colegioId, cursoId, asignaturacursoId, matriculaId } = req.params;
        let consulta = {};
        // let consulta = getBaseQuery(req);

        if (matriculaId != '0') {  consulta['matriculaId'] = matriculaId;  }
        if (asignaturacursoId != '0') {  consulta['asignaturacursoId'] = asignaturacursoId;  }
        if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
        if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
        if (annoId != '0') {  consulta['annoId'] = annoId;  }
        if (periodoId != '0') {  consulta['periodoId'] = periodoId;  }

        return ResumenNota
          .findAll({ where : consulta, attributes: ['id','promedio'] ,
            include: [ 
            { model:Matricula, attributes:['id','nombre'], where: { } },
            { model:AsignaturaCurso, attributes:['id','nombre'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Periodo, attributes:['id','nombre'], where: { }},
            
           ],
           order: [['id','ASC']]
       })
          .then(promedio => res.status(200).send(promedio))
          .catch(error => res.status(400).send(error));
    }

    static create(req, res) {
    const { annoId, periodoId, colegioId, cursoId,
        asignaturacursoId, matriculaId} = req.params;
    const { promedio } = req.body;
    return ResumenNota
    .create({
        promedio,
        matriculaId, 
        periodoId,
        colegioId,
        cursoId,
        annoId,
        asignaturacursoId,
   
    })
    .then(notaData => res.status(201).send({
        success: true,
        message: 'ResumenNota successfully created',
        notaData
    }))
    .catch(error => res.status(400).send(error))
    }

    static modify(req, res) {
    let consulta = {};
    // let consulta = getBaseQuery(req);
    consulta['id'] = req.params.resumennotaId;
    
    const { promedio } = req.body
    return ResumenNota
        .findOne({ where: consulta })
        .then((notas) => {
            notas.update({
            promedio: promedio || notas.promedio,
   
    })
    .then((updatedNota) => {
        res.status(200).send({
            message: 'ResumenNota updated successfully',
                data: {
                promedio: promedio || updatedNota.promedio,
          
                }
            })
    })
    .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }
}

export default ResumenNotas;