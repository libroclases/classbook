import model from '../models';

const {  Colegio, Periodo, Curso, Anno, Profesor, Asignatura, Matricula, Evaluacion, Nota } = model;

class Notas {

    static list(req, res) {
        return Nota
            .findAll({
                // where: getBaseQuery(req),
                attributes: ['id','nota'],
                include: [ 
                    { model:Matricula, attributes:['id','nombre'], where: { } },
                    { model:Evaluacion, attributes:['id','nombre'], where: { } },
                    { model:Colegio, attributes:['id','nombre'], where: { } },
                    { model:Curso, attributes:['id','nombre'], where: { } },
                    { model:Anno, attributes:['id','nombre'], where: { } },
                    { model:Periodo, attributes:['id','nombre'], where: { }},
                    { model:Profesor, attributes:['id','nombre'], where: { } },
                    { model:Asignatura, attributes:['id','nombre'], where: { } },
    

            ],
             order: [['id','ASC']] })
            .then(notas => res.status(200).send(notas))
            .catch(error => res.status(400).send(error));
    }

    static getByFk(req, res) {
        const { annoId, periodoId, colegioId, cursoId, profesorId, asignaturaId, matriculaId, evaluacionId } = req.params;
        let consulta = {};
        // let consulta = getBaseQuery(req);

        if (matriculaId != '0') {  consulta['matriculaId'] = matriculaId;  }
        if (evaluacionId != '0') {  consulta['evaluacionId'] = evaluacionId;  }
        if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
        if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
        if (annoId != '0') {  consulta['annoId'] = annoId;  }
        if (periodoId != '0') {  consulta['periodoId'] = periodoId;  }
        if (profesorId != '0') {  consulta['profesorId'] = profesorId;  }
        if (asignaturaId != '0') {  consulta['asignaturaId'] = asignaturaId;  }

        return Nota
          .findAll({ where : consulta, attributes: ['id','nota'] ,
            include: [ 
            { model:Matricula, attributes:['id','nombre'], where: { } },
            { model:Evaluacion, attributes:['id','nombre','fecha','ponderacion'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Periodo, attributes:['id','nombre'], where: { }},
            { model:Profesor, attributes:['id','nombre'], where: { } },
            { model:Asignatura, attributes:['id','nombre'], where: { } },
            
           ],
            order: [['evaluacionId','ASC']] 
       })
          .then(nota => res.status(200).send(nota))
          .catch(error => res.status(400).send(error));
    }

    static create(req, res) {
    const { annoId, periodoId, colegioId, cursoId, profesorId,
        asignaturaId, matriculaId, evaluacionId} = req.params;
    const { nota } = req.body;
    return Nota
    .create({
        nota,
        matriculaId, 
        evaluacionId,
        periodoId,
        colegioId,
        cursoId,
        annoId,
        profesorId,
        asignaturaId,
   
    })
    .then(notaData => res.status(201).send({
        success: true,
        message: 'Nota successfully created',
        notaData
    }))
    .catch(error => res.status(400).send(error))
    }

    static modify(req, res) {
    let consulta = {};
    // let consulta = getBaseQuery(req);
    consulta['id'] = req.params.notaId;
    
    const { nota } = req.body
    return Nota
        .findOne({ where: consulta })
        .then((notas) => {
            notas.update({
            nota: nota || notas.nota,
   
    })
    .then((updatedNota) => {
        res.status(200).send({
            message: 'Nota updated successfully',
                data: {
                nota: nota || updatedNota.nota,
          
                }
            })
    })
    .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
    }
}

export default Notas;