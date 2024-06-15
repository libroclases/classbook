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
            [{ model: Matricula }, 'id','ASC'], [{ model: Asignatura }, 'id', 'ASC'] 
        ]})
        .then((notas) => {
            
            let Promedio = {};
            let Suma = {};
            let Ponderado = [];
            let dictio = {};
            
            
            let m=0; // m -> Matricula
            let a=0; //  -> Asignatura
            let asignatura=0;
            let matricula=0;


            notas.forEach(el => {
                const d = el.dataValues;
                Suma[d.Asignatura.dataValues.id] = d.nota * d.Evaluacion.dataValues.ponderacion / 100 + (Suma[d.Asignatura.dataValues.id] || 0);   
                Promedio[d.Asignatura.dataValues.id] = Suma[d.Asignatura.dataValues.id];
                // console.log(i, d.Asignatura.id,d.Matricula.id,d.nota);
                if (matricula == d.Matricula.id  ) {
                    if (m-1 >0) {
                        if (d.Asignatura.id == 1 && d.Evaluacion.dataValues.nombre =='C1' ) { 
                            console.log('poronga1:',m-1, dictio[d.Matricula.id],d.Matricula.id, d.Asignatura.dataValues.id ,d.Evaluacion.dataValues.nombre, d.Evaluacion.dataValues.ponderacion, d.nota );
                        }
                    }

                 } else { 
                    if (m-1 >=0) {
                        dictio[d.Matricula.id] =  m-1;
                        
                        console.log('poronga2:',d.Matricula.id ,d.Asignatura.id, d.nota, d.Evaluacion.nombre, d.nota);
                        Ponderado[m-1] = d.nota;
                        
                        
                        
                         
                    }
                    matricula = d.Matricula.id;
                    asignatura = d.Asignatura.id;
                    m++;   
                };
                // console.log(Matricula);
                // console.log({annoId, periodoId, colegioId, cursoId, asignaturaId:d.Asignatura.dataValues.id , matriculaId:d.Matricula.dataValues.id, promedio});    
            });
            let i=0;
            // console.log(dictio);
            // Ponderado.forEach(p => { console.log(i, p); i++ });

            res.status(200).send(notas);
        }
        )
    .catch(error => res.status(400).send(error));
    }
}

export default ResumenNotas;