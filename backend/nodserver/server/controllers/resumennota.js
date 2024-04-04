import model from '../models';

const {  Colegio, Periodo, Curso, Anno, Profesor, Matricula, AsignaturaProfesor, ResumenNota } = model;

class ResumenNotas {

    static list(req, res) {
        return ResumenNota
            .findAll({
                // where: getBaseQuery(req),
                attributes: ['id','nota'],
                include: [ 
                    { model:Matricula, attributes:['id','nombre'], where: { } },
                    { model:AsignaturaProfesor, attributes:['id','nombre'], where: { } },
                    { model:Colegio, attributes:['id','nombre'], where: { } },
                    { model:Curso, attributes:['id','nombre'], where: { } },
                    { model:Anno, attributes:['id','nombre'], where: { } },
                    { model:Periodo, attributes:['id','nombre'], where: { }},
                    { model:Profesor, attributes:['id','nombre'], where: { } },
                   
    

            ],
             order: [['id','ASC']] })
            .then(notas => res.status(200).send(notas))
            .catch(error => res.status(400).send(error));
    }

    static getByFk(req, res) {
        const { annoId, periodoId, colegioId, cursoId, profesorId, asignaturaprofesorId, matriculaId } = req.params;
        let consulta = {};
        // let consulta = getBaseQuery(req);

        if (matriculaId != '0') {  consulta['matriculaId'] = matriculaId;  }
        if (asignaturaprofesorId != '0') {  consulta['asignaturaprofesorId'] = asignaturaprofesorId;  }
        if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
        if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
        if (annoId != '0') {  consulta['annoId'] = annoId;  }
        if (periodoId != '0') {  consulta['periodoId'] = periodoId;  }
        if (profesorId != '0') {  consulta['profesorId'] = profesorId;  }

        return ResumenNota
          .findAll({ where : consulta, attributes: ['id','nota'] ,
            include: [ 
            { model:Matricula, attributes:['id','nombre'], where: { } },
            { model:AsignaturaProfesor, attributes:['id','nombre','fecha'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Periodo, attributes:['id','nombre'], where: { }},
            { model:Profesor, attributes:['id','nombre'], where: { } },
            
           ],
           
       })
          .then(nota => res.status(200).send(nota))
          .catch(error => res.status(400).send(error));
    }

    static create(req, res) {
    const { annoId, periodoId, colegioId, cursoId, profesorId,
        asignaturaprofesorId, matriculaId} = req.params;
    const { nota } = req.body;
    return ResumenNota
    .create({
        nota,
        matriculaId, 
        periodoId,
        colegioId,
        cursoId,
        annoId,
        profesorId,
        asignaturaprofesorId,
   
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
    
    const { nota } = req.body
    return ResumenNota
        .findOne({ where: consulta })
        .then((notas) => {
            notas.update({
            nota: nota || notas.nota,
   
    })
    .then((updatedNota) => {
        res.status(200).send({
            message: 'ResumenNota updated successfully',
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

export default ResumenNotas;