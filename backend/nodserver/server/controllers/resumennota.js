import model from '../models';

const {  Colegio, Periodo, Curso, Anno,  Matricula, Asignatura,Nota,Evaluacion ,ResumenNota } = model;

class ResumenNotas {

    static list(req, res) {
        return ResumenNota
            .findAll({
                // where: getBaseQuery(req),
                attributes: ['id','promedio'],
                include: [ 
                    { model:Matricula, attributes:['id','nombre'], where: { } },
                    { model:Asignatura, attributes:['id','nombre'], where: { } },
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
        const { annoId, periodoId, colegioId, cursoId, asignaturaId, matriculaId } = req.params;
        let consulta = {};
        // let consulta = getBaseQuery(req);

        if (matriculaId != '0') {  consulta['matriculaId'] = matriculaId;  }
        if (asignaturaId != '0') {  consulta['asignaturaId'] = asignaturaId;  }
        if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
        if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
        if (annoId != '0') {  consulta['annoId'] = annoId;  }
        if (periodoId != '0') {  consulta['periodoId'] = periodoId;  }

        return ResumenNota
          .findAll({ where : consulta, attributes: ['id','promedio'] ,
            include: [ 
            { model:Matricula, attributes:['id','nombre'], where: { } },
            { model:Asignatura, attributes:['id','nombre'], where: { } },
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
        asignaturaId, matriculaId} = req.params;
    const { promedio } = req.body;
    return ResumenNota
    .create({
        promedio,
        matriculaId, 
        periodoId,
        colegioId,
        cursoId,
        annoId,
        asignaturaId,
   
    })
    .then(notaData => res.status(201).send({
        success: true,
        message: 'ResumenNota successfully created',
        notaData
    }))
    .catch(error => res.status(400).send(error))
    }

    static poblateResumenNotas(req, res) {
    let consulta = {};
        
    const { annoId, periodoId, colegioId, cursoId, asignaturaId, matriculaId } = req.params;

    if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
    if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
    if (annoId != '0') {  consulta['annoId'] = annoId;  }
    if (periodoId != '0') {  consulta['periodoId'] = periodoId;  }
    if (asignaturaId != '0') {  consulta['asignaturaId'] = asignaturaId;  }
    if (matriculaId != '0') {  consulta['matriculaId'] = matriculaId;  }

    return Nota
        .findAll({ where: consulta, attributes: ['nota'] , include: [ 
            { model:Evaluacion, attributes:['id','nombre','ponderacion'], where: { } },
            { model:Asignatura, attributes:['id','nombre'], where: { } },
            { model:Matricula, attributes:['id','nombre'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Periodo, attributes:['id','nombre'], where: { } }
        ], order: [
            [{ model: Matricula }, 'id','ASC'], [{ model: Asignatura }, 'id', 'ASC'] , [{ model: Evaluacion }, 'id', 'ASC'] 
        ]})
        .then((notas) => {
            
            let Matricula = [];
            let Asignatura = [];
            
            let mindex=0; // contador matricula
            let matricula=0;
            let asignatura=0;


            notas.forEach(el => {
                const d = el.dataValues;
                
                if (matricula == d.Matricula.id  ) {                
                           mindex++;  
                           if (asignatura != d.Asignatura.id ) { console.log(`######### asig ${asignatura} ###########`) }
                           console.log('poronga1:',mindex,d.Matricula.id , d.Asignatura.id, (d.Evaluacion.ponderacion * d.nota)/100);
                                           
                 } else {  
                           mindex=0;
                           console.log(`######### mat ${matricula} ###########`);
                            
                           console.log('poronga2:',mindex, d.Matricula.id , d.Asignatura.id, (d.Evaluacion.ponderacion * d.nota)/100);
                                                
                    }
                    matricula = d.Matricula.id;
                    asignatura = d.Asignatura.id;       
            });
     
            res.status(200).send(notas);
        }
        )
    .catch(error => res.status(400).send(error));
    }
}

export default ResumenNotas;