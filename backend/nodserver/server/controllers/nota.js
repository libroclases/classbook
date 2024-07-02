import model from '../models';

const {  Colegio, Periodo, Curso, Anno, CursoProfesor, Matricula, Evaluacion, Nota } = model;

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
                    { model:CursoProfesor, attributes:['id'], where: { } },
                
    

            ],
             order: [
                [{ model: Matricula }, 'id','ASC'], [{ model: CursoProfesor }, 'id', 'ASC'] , [{ model: Evaluacion }, 'id', 'ASC'] 
            ] })
            .then(notas => res.status(200).send(notas))
            .catch(error => res.status(400).send(error));
    }

    static getByFk(req, res) {
        const { annoId, periodoId, colegioId, cursoId, cursoprofesorId, matriculaId, evaluacionId } = req.params;
        let consulta = {};
        // let consulta = getBaseQuery(req);

        if (matriculaId != '0') {  consulta['matriculaId'] = matriculaId;  }
        if (evaluacionId != '0') {  consulta['evaluacionId'] = evaluacionId;  }
        if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
        if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
        if (annoId != '0') {  consulta['annoId'] = annoId;  }
        if (periodoId != '0') {  consulta['periodoId'] = periodoId;  }
        if (cursoprofesorId != '0') {  consulta['cursoprofesorId'] = cursoprofesorId;  }
        

        return Nota
          .findAll({ where : consulta, attributes: ['id','nota'] ,
            include: [ 
            { model:Matricula, attributes:['id','nombre'], where: { } },
            { model:Evaluacion, attributes:['id','nombre','fecha','ponderacion'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Periodo, attributes:['id','nombre'], where: { }},
            { model:CursoProfesor, attributes:['id'], where: { } },
          
            
           ],
            order:  [
                [{ model: Matricula }, 'id','ASC'], [{ model: CursoProfesor }, 'id', 'ASC'] , [{ model: Evaluacion }, 'id', 'ASC'] 
            ]
       })
          .then(nota => res.status(200).send(nota))
          .catch(error => res.status(400).send(error));
    }

    static create(req, res) {
    const { annoId, periodoId, colegioId, cursoId, cursoprofesorId,
     matriculaId, evaluacionId} = req.params;
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
        cursoprofesorId,
       
   
    })
    .then(notaData => res.status(201).send({
        success: true,
        message: 'Nota successfully created',
        notaData
    }))
    .catch(error => res.status(400).send(error))
    }

    static poblateNotas(req, res) {
        let consulta = {};
            
        const { annoId, periodoId, colegioId, cursoId, cursoprofesorId } = req.params;
    
        if (annoId != '0') {  consulta['annoId'] = annoId;  }
        if (periodoId != '0') {  consulta['periodoId'] = periodoId;  }
        if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
        if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
        if (cursoprofesorId != '0') {  consulta['cursoprofesorId'] = cursoprofesorId;  }
     
    
        return Nota
            .findAll({ where: consulta, attributes: ['nota'] , include: [ 
                { model:Anno, attributes:['id','nombre'], where: { } },
                { model:Periodo, attributes:['id','nombre'], where: { } },
                { model:Colegio, attributes:['id','nombre'], where: { } },
                { model:Curso, attributes:['id','nombre'], where: { } },
                { model:CursoProfesor, attributes:['id'], where: { } },
                { model:Evaluacion, attributes:['id','nombre','fecha', 'ponderacion'], where: { } },
                { model:Matricula, attributes:['id','nombre'], where: { } },
    
            ], order: [
                [{ model: Matricula }, 'id','ASC'],  [{ model: Evaluacion }, 'fecha', 'ASC'] 
            ]})
            .then((notas) => {
                
                
                let NotaEvaluacion = [];
                let NotaSola = [];
                let matricula=0;
                let Matrix = [];
    
                notas.forEach(el => {
                    const d = el.dataValues; 
                         
                    // console.log(d.Matricula.id, d.Evaluacion.fecha,d.Evaluacion.id, d.Evaluacion.ponderacion, d.nota);
                        
                    if (matricula == d.Matricula.id  ) {                          
                        NotaEvaluacion.push((d.Evaluacion.ponderacion * d.nota)/100); // ok
                        NotaSola.push(d.nota);                           
                     } 
                     else {
                        if (matricula> 0) {
                            Matrix.push([matricula,NotaEvaluacion, NotaEvaluacion.reduce((a, b) => a + b, 0), NotaSola]);
                            NotaEvaluacion=[];
                            NotaSola=[];
                        } 
                            NotaEvaluacion.push((d.Evaluacion.ponderacion * d.nota)/100); // ok     
                            NotaSola.push(d.nota);
                     }
                     matricula = d.Matricula.id;
                });
                
                
                Matrix.push([matricula,NotaEvaluacion, NotaEvaluacion.reduce((a, b) => a + b, 0), NotaSola]); 
                res.status(200).send(Matrix);
               
            }
            )
        .catch(error => res.status(400).send(error));
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