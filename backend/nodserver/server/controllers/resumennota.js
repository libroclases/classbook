import model from '../models';

const {  Colegio, Periodo, Curso, Anno,  Matricula, CursoProfesor,Nota,Evaluacion ,ResumenNota } = model;

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
  }

class ResumenNotas {

    static poblateResumenNotas(req, res) {
    let consulta = {};
        
    const { annoId, periodoId, colegioId, cursoId } = req.params;

    if (colegioId != '0') {  consulta['colegioId'] = colegioId;  }
    if (cursoId != '0') {  consulta['cursoId'] = cursoId;  }
    if (annoId != '0') {  consulta['annoId'] = annoId;  }
    if (periodoId != '0') {  consulta['periodoId'] = periodoId;  }
 

    return Nota
        .findAll({ where: consulta, attributes: ['nota'] , include: [ 
            { model:Anno, attributes:['id','nombre'], where: { } },
            { model:Periodo, attributes:['id','nombre'], where: { } },
            { model:Colegio, attributes:['id','nombre'], where: { } },
            { model:Curso, attributes:['id','nombre'], where: { } },
            { model:CursoProfesor, attributes:['id'], where: { } },
            { model:Evaluacion, attributes:['id','nombre','ponderacion'], where: { } },
            { model:Matricula, attributes:['id','nombre'], where: { } },

        ], order: [
            [{ model: Matricula }, 'id','ASC'], [{ model: CursoProfesor }, 'id', 'ASC'] , [{ model: Evaluacion }, 'id', 'ASC'] 
        ]})
        .then((notas) => {
            
            
            let PromedioAsignatura = [];
            
            let mindex=0; // contador matricula
            let matricula=0;
            let cursoprofesor=0;

            let Matrix = [];

            notas.forEach(el => {
                const d = el.dataValues; 
                console.log(d.Matricula.id, d.CursoProfesor.id, d.Evaluacion.ponderacion, d.nota);
                // console.log(d.CursoProfesor.dataValues);
                
                if (matricula == d.Matricula.id  ) {                
                           mindex++;
                          
                           if (cursoprofesor != d.CursoProfesor.id ) {     
                              // console.log(`1:######### ${matricula} | ${asignatura} | ${PromedioAsignatura.reduce((a, b) => a + b, 0)} ###########`);
                              Matrix.push([matricula,cursoprofesor,PromedioAsignatura.reduce((a, b) => a + b, 0)]);
                              PromedioAsignatura=[];
                              PromedioAsignatura.push((d.Evaluacion.ponderacion * d.nota)/100);  // OK 
                           } else { PromedioAsignatura.push((d.Evaluacion.ponderacion * d.nota)/100); }
                           
                           // console.log('1:',mindex,d.Matricula.id , d.CursoProfesor.id, (d.Evaluacion.ponderacion * d.nota)/100, PromedioAsignatura);
                                            
                 } else { 
                           // console.log(`2:######### ${matricula} | ${asignatura} | ${PromedioAsignatura.reduce((a, b) => a + b, 0)} ###########`);
                           if (matricula > 0) Matrix.push([matricula,cursoprofesor,PromedioAsignatura.reduce((a, b) => a + b, 0)]);
                           PromedioAsignatura=[]; 
                           mindex=0;
                           PromedioAsignatura.push((d.Evaluacion.ponderacion * d.nota)/100); 
                           // console.log('2:',mindex, d.Matricula.id , d.CursoProfesor.id, (d.Evaluacion.ponderacion * d.nota)/100, PromedioAsignatura);
                          
                                              
                    }
                    matricula = d.Matricula.id;
                    cursoprofesor = d.CursoProfesor.id;
                    

            });
            
            // console.log(`3:######### ${matricula} | ${asignatura} | ${PromedioAsignatura.reduce((a, b) => a + b, 0)} ###########`);
            Matrix.push([matricula,cursoprofesor,PromedioAsignatura.reduce((a, b) => a + b, 0)]);
            // console.log(Matrix);
            res.status(200).send(Matrix);
            // res.status(200).send({})
        }
        )
    .catch(error => res.status(400).send(error));
    }
}

export default ResumenNotas;