import model from '../models';

const {  Colegio, Periodo, Curso, Anno,  Matricula, Asignatura,Nota,Evaluacion ,ResumenNota } = model;

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

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
            
            
            let PromedioAsignatura = [];
            
            let mindex=0; // contador matricula
            let matricula=0;
            let asignatura=0;

            let Matrix = [];

            notas.forEach(el => {
                const d = el.dataValues;
                
                if (matricula == d.Matricula.id  ) {                
                           mindex++;
                          
                           if (asignatura != d.Asignatura.id ) {     
                              // console.log(`1:######### ${matricula} | ${asignatura} | ${PromedioAsignatura.reduce((a, b) => a + b, 0)} ###########`);
                              Matrix.push([matricula,asignatura,PromedioAsignatura.reduce((a, b) => a + b, 0)]);
                              PromedioAsignatura=[];
                              PromedioAsignatura.push((d.Evaluacion.ponderacion * d.nota)/100);  // OK 
                           } else { PromedioAsignatura.push((d.Evaluacion.ponderacion * d.nota)/100); }
                           
                           // console.log('1:',mindex,d.Matricula.id , d.Asignatura.id, (d.Evaluacion.ponderacion * d.nota)/100, PromedioAsignatura);
                                            
                 } else { 
                           // console.log(`2:######### ${matricula} | ${asignatura} | ${PromedioAsignatura.reduce((a, b) => a + b, 0)} ###########`);
                           if (matricula > 0) Matrix.push([matricula,asignatura,PromedioAsignatura.reduce((a, b) => a + b, 0)]);
                           PromedioAsignatura=[]; 
                           mindex=0;
                           PromedioAsignatura.push((d.Evaluacion.ponderacion * d.nota)/100); 
                           // console.log('2:',mindex, d.Matricula.id , d.Asignatura.id, (d.Evaluacion.ponderacion * d.nota)/100, PromedioAsignatura);
                          
                                              
                    }
                    matricula = d.Matricula.id;
                    asignatura = d.Asignatura.id;
                    

            });

            // console.log(`3:######### ${matricula} | ${asignatura} | ${PromedioAsignatura.reduce((a, b) => a + b, 0)} ###########`);
            Matrix.push([matricula,asignatura,PromedioAsignatura.reduce((a, b) => a + b, 0)]);
            // console.log(Matrix);
            res.status(200).send(Matrix);
        }
        )
    .catch(error => res.status(400).send(error));
    }
}

export default ResumenNotas;