import { Component, HostListener, OnInit } from '@angular/core';
import { CrudService } from '../../shared/services/crud/crud.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Observer, concatMap, map, share, tap } from 'rxjs';
import { Notification } from '../../interfaces/generic.interface';
import { ForeignKeysService } from '../../shared/services/foreign-keys/foreign-keys.service';
import { SelectionIdsService } from '../../shared/services/selection-ids/selection-ids.service';
import { IconsService } from '../../shared/services/icons/icons.service';
import { environment, modalDataObject } from '../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../../shared/componentes/modal-dialog/modal-dialog.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Evaluacion } from '../../interfaces/evaluacion.interface';
import { GetdatetimeService } from 'src/app/shared/services/getdatetime/getdatetime.service';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';
import { GetPermissionService } from 'src/app/shared/services/get-permission/get-permission.service';
import { Permission } from 'src/environments/environment.development';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {



  mainTable: string = 'nota';

  matriculasNotasMap = new Map<number, any>();
  matriculasPonderadoMap = new Map<number, any>();

  // evaluationEdit = 0;  // marca columna a editar
  edita = false;
  showtable = true;
  promedio: number | null = 0;

  evaluacionId = 0;
  classlock = "bi bi-lock";

  codigo!: string;  // codigo de autentificación google
  codigoValidado = false;

  url!:string;
  photo = environment.photo;
  opacity = environment.opacity;
  position = "center";
  size = "cover";

  // Modal

  modalDataObj!: any;

  // Tabla Principal


  tableTitle = 'Notas';
  textFields = ['hora'];
  dateFields = [];
  // displayFKFields: CamelCase
  displayFKFields = [];
  redirectRoutes!: string[];

  // Selectores

  selTables = [  "anno", "periodo", "colegio", "curso", "cursoprofesor"];

  ignoreFkRequirements: string[] = ['asignatura','profesor'];
  changeFnsArray: Function[] = [];
  patchFKsFromStorage = ['anno','periodo','curso','colegio'];
  customEndpoints = null;

  fatherId=0;
  father='';

  columns:any = 0;
  editarcolumn = 0;


  matricula$!: Observable<any>;

  ponderacion = 0;
  suma:any={};
  numMatriculas = 0;
  btable!:string;
  notasForm!: FormGroup;

  //   colores

  objcolors = environment.colors;

  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  bgmodal!:string;
  modalbutton!:string;

  disable:any = {};
  currentDate:Date = new Date();

  // size screen

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;
  margen_superior_tabla = 0;

  innerHeight=  window.innerHeight

  height = window.innerHeight - (this.banner_height + this.menu_height + this.margen_superior_tabla) + 'px';

  evaluacion$: Observable<any> | undefined;

  title:any = {}

  notas$!: Observable<any>;

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;
  mostra_tabla=false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height =
      event.target.innerHeight - (this.banner_height + this.menu_height +  this.margen_superior_tabla) + 'px';
  }

  constructor(private crud: CrudService,
    private selIdsService: SelectionIdsService,
    private getpermission: GetPermissionService,
    private toastr: ToastrService,
    private dt: GetdatetimeService,
    private fb: FormBuilder,

    ) {

      this.notasForm = new FormGroup({})

     }

    consultarCodigo(codigo:string) {
      this.crud.postData({userId: 'e9abdc2a-75f6-4c7a-b910-745d4f58c343', auth: codigo},'token').pipe(
        tap(msg => {
          this.showmsg(msg)
        })
      ).subscribe();
      
      // console.log(codigo);

 
    }

    IdPed(event: any) {
      this.codigo = event.target.value;
    }

    reset() { this.codigo = ''; }

     getColorNota(nota: number) {
         return  (nota < 4) ? 'red' : 'blue';
     }

     setType(valor:any): number {
       return +valor;
     }

     showmsg(msg:any) {   
      if (msg?.message && Object.keys(msg)?.length > 0 ) {
        this.codigoValidado = true;
        this.toastr.success(msg.message, 'Notas', {positionClass:'toast-top-right'})
      }
      else {
        this.codigoValidado = false;
        this.toastr.error(msg.error, 'Notas')
      }
    }

     desabilitado(fecha: Date): any{

      let dias:any = this.dt.calcularDiasHabiles(new Date(fecha + 'T00:00:00+00:00'),new Date());

      return (dias <=5  && dias >= 0) ? false : true;
    }

    generaForm() {

      for (let notas of this.matriculasNotasMap.entries()) {

        let controlname = notas[0].toString() + '-' + this.editarcolumn;
        const numericNumberReg= '^-?[0-9]\\d*(\\.\\d{1,2})?$';

        this.notasForm.addControl( controlname ,  this.fb.control(notas[1][this.editarcolumn],
          [Validators.required,
           Validators.pattern(numericNumberReg),
           Validators.min(1),
           Validators.max(7)
         ]));

      }
   
    }

    deleteForm() {
      for (let notas of this.matriculasNotasMap.entries()) {
        let controlname = notas[0].toString() + '-' + this.editarcolumn;
        if (this.notasForm.contains(controlname) == true) { // console.log(`${controlname} removido`)
        this.notasForm.removeControl(controlname);
        }
      }
    }

    editarValoresForm() {

      Object.entries(this.notasForm.value).forEach(([key, value]) => {
        if ( value != this.matriculasNotasMap.get(+key.split('-')[0])![+key.split('-')[1]]) {
             let [matriculaId, columna] = key.split('-');

             this.crud.putParamsData({nota: this.setType(value)},'nota',[this.setType(matriculaId), this.evaluacionId]).pipe(
              tap(msg => console.log(msg)),
              tap(_ => this.updateTable())
             )
             .subscribe();
        }
       }
      )

    }


     editar(col:number, evaluacionId: number) {
      this.evaluacionId = evaluacionId;


      this.editarcolumn = col;


      if(this.codigoValidado == true) {

        this.edita = !this.edita;
        if (this.edita) {
          this.generaForm()
        } else {
          this.editarValoresForm();
          this.deleteForm()
        }

      }



    }

     getPonderacion(ponderacion: number) { return (ponderacion == 100)? 'blue' : 'red';}

     getColor = (color: string | null) => {

      if (color == null) {  color = localStorage.getItem('Color')  }

      if (color == 'primary' || !color) {
        this.btable = "table table-primary table-striped table-bordered table-sm";
        this.bodybgcolor = this.objcolors.primary.bodybgcolor;
        this.pagination = this.objcolors.primary.pagination;
        this.tablehead = this.objcolors.primary.tablehead;
        this.bgmodal = this.objcolors.primary.bgmodal;
        this.modalbutton = this.objcolors.primary.modalbutton;
        this.url = this.photo.primary;
      }
      else if (color == 'success') {
        this.btable = "table table-success table-striped table-bordered table-sm";
        this.bodybgcolor = this.objcolors.success.bodybgcolor;
        this.pagination = this.objcolors.success.pagination;
        this.tablehead = this.objcolors.success.tablehead;
        this.bgmodal = this.objcolors.success.bgmodal;
        this.modalbutton = this.objcolors.success.modalbutton;
        this.url = this.photo.success;
      }
      else if (color == 'info') {
        this.btable = "table table-info table-striped table-bordered table-sm";
        this.bodybgcolor = this.objcolors.info.bodybgcolor;
        this.pagination = this.objcolors.info.pagination;
        this.tablehead = this.objcolors.info.tablehead;
        this.bgmodal = this.objcolors.info.bgmodal;
        this.modalbutton = this.objcolors.info.modalbutton;
        this.url = this.photo.info;
      }
    }

    getMatriculaData(): void {

      let ides = [
        this.selIdsService.getId('colegio'),
        this.selIdsService.getId('curso'),
        this.selIdsService.getId('anno')
      ]

      this.matricula$ = this.crud.getDataCustom('matricula', 'lista_curso_nombres', ides).pipe(
        tap(mat => this.numMatriculas = mat.length),
      )

    }

    getEvaluacionData() {
      const fks = [
        this.selIdsService.getId('anno'),
        this.selIdsService.getId('periodo'),
        this.selIdsService.getId('colegio'),
        this.selIdsService.getId('curso'),
        this.selIdsService.getId('cursoprofesor'),
        0,
      ]
      this.ponderacion = 0;
      if (fks[0]*fks[1]*fks[2]*fks[3]*fks[4]>0) { this.mostra_tabla=true;} else {this.mostra_tabla=false;}
      this.evaluacion$ = this.crud.getData('evaluacion', fks)?.pipe(
        tap(eva => eva.forEach((e: any) => {
          this.ponderacion += e.ponderacion;
          this.columns += 1;
        })),
        tap(() => {if (fks[0]*fks[1]*fks[2]*fks[3]*fks[4]>0) { this.mostra_tabla=true;} else {this.mostra_tabla=false;}}),
        share()
      )!;


      this.getMatriculaData();
      this.getNotaData();
    }

    getNotaData(): void {

      let cont = 0;
      this.suma = {};

      let ides = [
        this.selIdsService.getId('anno'),
        this.selIdsService.getId('periodo'),
        this.selIdsService.getId('colegio'),
        this.selIdsService.getId('curso'),
        this.selIdsService.getId('cursoprofesor')
      ]

      this.crud.getDataCustom('nota','poblateNota', ides)?.pipe(
        tap(notas => notas?.forEach((nota: any) => {
          cont = 0;
          // nota[0] -> matricula_id , nota[1] -> ponderacion , nota[2] -> final,  notas[3] -> notas
          this.matriculasNotasMap.set(nota[0], nota[3]);
          this.matriculasPonderadoMap.set(nota[0], nota[2]);

          nota[3].forEach((n: any) => {
             this.suma[cont] = (this.suma[cont] || 0) + n;
             cont++;
          })

        }

      )),
    share()
  ).subscribe();

    }


    updateTable(notification: (Notification | null) = null) {


      if (!notification || notification.message == "updated")  {
        if (this.selIdsService.selectEnableKeys(['anno', 'periodo', 'colegio', 'curso','cursoprofesor'])) {
          this.getEvaluacionData();
        }

      }
    }

  ngOnInit(): void {

    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
      tap(info => { if (info.personalInfo?.usuario) { this.disable = this.getpermission.getPermission(Permission['Nota'], info) } })

    ).subscribe()



    this.selIdsService.msg.pipe(
      tap((message: (Notification)) => this.updateTable(message)), share()
    )
      .subscribe();
  }


}

