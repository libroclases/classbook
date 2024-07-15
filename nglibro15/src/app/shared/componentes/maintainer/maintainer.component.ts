import { Component, Input, OnInit, OnDestroy, HostListener } from '@angular/core';
import { SelectionIdsService } from '../../services/selection-ids/selection-ids.service';
import { ForeignKeysService } from '../../services/foreign-keys/foreign-keys.service';
import { Notification } from '../../../interfaces/generic.interface';
import { LabelsService } from '../../services/labels/labels.service';
import { IconsService } from '../../services/icons/icons.service';
import { Observable, Subject, Subscription, concatMap, debounceTime, from, map, of, share, switchMap, take, tap } from 'rxjs';
import { CrudService } from '../../services/crud/crud.service';
import { redirectRoutes, modalDataObject, personTables, notCreateTables ,searchTables, groupTables,middleTables,groupSum, Permission,
  lowerUpperTables ,fKeysByTable, environment, } from 'src/environments/environment';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { OriginTableIdService as OriginTableIdService } from '../../services/origin-table-id/origin-table-id.service';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Select } from '@ngxs/store';
import { GetPermissionService } from '../../services/get-permission/get-permission.service';


@Component({
  selector: 'maintainer',
  templateUrl: './maintainer.component.html',
  styleUrls: ['./maintainer.component.css']
})
export class MaintainerComponent implements OnInit, OnDestroy {

  // bgcolor = environment.color_set.primary.background_color

  mainQuery$!:Observable<any>;



  // mainTableForeignKeys: arreglo auxiliar, se llena solo
  mainTableForeignKeys!: string[];

  // pagina
  currPage = 0;
  url!:string;
  photo = environment.photo;
  opacity = environment.opacity;
  position = "center";
  size = "cover";
  environment = environment;
  fullScreen = false;

  // activate search
  isPersonTable = false;
  isNotCreateTable = false;
  isSearchTable = false;
  isGroupTable = false;
  isMiddleTable = false;
  searchTerm$ = new Subject<string>();

  tieneTablaIntermedia = false;

  cursoProfesorMap:any =  new Map<number, any>();

  disable:any = {leer:true, editar:true, crear:true};
  currentDate:Date = new Date();

  sumGroup = 0;

  colors = environment.colors;

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;
  margen_superior_tabla = environment.cabecera.margen_superior_tabla

  height = window.innerHeight - (this.banner_height + this.menu_height) + 'px';


  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.height = event.target.innerHeight - (this.banner_height + this.menu_height) + 'px';
  }

  // Tabla Principal

  @Input('main-title')
  title!: string;

  @Input('main-table')
  mainTable!: string;

  @Input('main-text-fields')
  textFields: string[] = [];

  @Input('main-date-fields')
  dateFields: string[] = [];

  @Input('main-boolean-fields')
  booleanFields: string[] = [];

  @Input('main-FK-fields')
  // fkFields: CamelCase
  fkFields: string[] = [];

  // Selectores

  @Input('select-tables')
  selTables!: string[];

  @Input('select-change-functions')
  changeFnsArray: Function[] = [];

  @Input("ignore-FK-requirements")
  ignoreFkRequirements: string[] = [];

  @Input("patch-fks-from-storage")
  patchFKsFromStorage: string[] = [];

  // Router
  multiSelectInitIds: {[key: string]: number} = {};
  lowerUpperTables:any = lowerUpperTables;
  querySubs: Subscription | null = null;


  // Modal

  // permission:any =  {};

  modalDataObj!: any;

  // PersonTable

  personTable!: any;
  notCreateTable!:any;

  mainTableUpper! : string;

  redirectRts!: string[];

  numColumns: number = 0;
  numRedirect: number = 0;

  numreg = 0;

  columns:any = []

  //   colores

  objcolors = environment.colors;

  bodybgcolor!:string;
  bgmodal!:string;
  matbutton!:string;
  pagination!:string;
  tablehead!:string;
  tipousuario:any = null;

  btable!:string;

  search(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.searchTerm$.next(element.value);
    this.updateTable({message: 'search'})
  }

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;


  constructor(

    private crud: CrudService,
    activatedRoute: ActivatedRoute,
    originTableIdsService: OriginTableIdService,
    public dialog: MatDialog,
    private selIdsService: SelectionIdsService,
    private fkService: ForeignKeysService,
    private labelsService: LabelsService,
    private iconsService: IconsService,
    private getpermission: GetPermissionService

    ) {


    activatedRoute.params.subscribe((params:any) => {

      if ( Object.keys(params).length > 0) {

        let originTable = params['padre'];
        // console.log('origin',originTable)

        const originId = parseInt(params['id']);

        if ( originTable ) {
          originTable = originTable.toLowerCase();
          this.multiSelectInitIds[originTable] = originId;
          this.querySubs = this.crud.getDataPk(originTable, originId).subscribe(
            (query:any) => {
              fKeysByTable[originTable].forEach(tb => {
                const newId = query[tb+'Id'];
                if ( newId ) { this.multiSelectInitIds[tb] = newId; }
              });
              originTableIdsService.nextMsg(this.multiSelectInitIds);
            });
        }


      }
   });
    }

    getColor(color:string | null)  {

      if (color == null) {  color = localStorage.getItem('Color')  }

      if (color=='primary') {
        this.btable = "table table-primary table-striped table-sm";
        this.bodybgcolor = this.objcolors.primary.bodybgcolor;
        this.pagination = this.objcolors.primary.pagination;
        this.tablehead = this.objcolors.primary.tablehead;
        this.bgmodal = this.objcolors.primary.bgmodal;
        this.matbutton = this.objcolors.primary.matbutton;
        this.url = this.photo.primary;

      }
      if (color=='success') {
        this.btable = "table table-success table-striped table-sm";
        this.bodybgcolor = this.objcolors.success.bodybgcolor;
        this.pagination = this.objcolors.success.pagination;
        this.tablehead = this.objcolors.success.tablehead;
        this.bgmodal = this.objcolors.success.bgmodal;
        this.matbutton = this.objcolors.success.matbutton;
        this.url = this.photo.success;
      }
      if (color=='info') {
        this.btable="table table-info table-striped table-sm";
        this.bodybgcolor = this.objcolors.info.bodybgcolor;
        this.pagination = this.objcolors.info.pagination;
        this.tablehead = this.objcolors.info.tablehead;
        this.bgmodal = this.objcolors.info.bgmodal;
        this.matbutton = this.objcolors.info.matbutton;
        this.url = this.photo.info;

      }

    }


  ngOnInit(): void {

    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
      tap(info => { if (info.personalInfo?.usuario) { this.disable = this.getpermission.getPermission(Permission[lowerUpperTables[this.mainTable]],info)}})

    ).subscribe()


    this.redirectRts = redirectRoutes[lowerUpperTables[this.mainTable]];
    if ( !this.redirectRts ) {
      this.redirectRts = [];
    }

    this.mainTableUpper = this.labelsService.lowerToUpperTable(this.mainTable)!;
    this.modalDataObj = modalDataObject[this.mainTableUpper];

    this.isPersonTable = (personTables.includes(this.mainTable)) ? true : false;
    this.isNotCreateTable = (notCreateTables.includes(this.mainTable)) ? true : false;
    this.isSearchTable = (searchTables.includes(this.mainTable)) ? true : false;
    this.isGroupTable = (groupTables.includes(this.mainTable)) ? true : false;


    this.mainTableForeignKeys = this.fkService.getFKeys(this.mainTable)!;
    this.numRedirect = this.redirectRts.length;
    this.numColumns = (
      this.textFields.length + this.dateFields.length + this.booleanFields.length +
      this.fkFields.length + this.numRedirect + 1);


    this.selIdsService.subscribe(
      'maintainer', (message: (Notification)) => this.updateTable(
        this.isGroupTable ? {message: "group"} : message));

      this.sumDataGroup();

      this.columns = [...Array(this.numColumns-2).keys()]
  }

  ngOnDestroy() {
    if ( this.querySubs ) { this.querySubs.unsubscribe(); }
  }

  sumDataGroup(): void {
    this.sumGroup=100;
   }

  getForeignKeysOfMainTable() {
    let fKeys = [];
    for ( let t of this.mainTableForeignKeys ) {
      fKeys.push(this.selIdsService.getId(t));
    }
    return fKeys;
  }

  updateTable(notification: (Notification | null) = null) {
    let fKeys = this.getForeignKeysOfMainTable();

    const querytablegroup = () => {
      this.sumGroup = 0;
      this.mainQuery$ = this.crud.getDataCustom(this.mainTable,'group',fKeys)?.pipe(
         tap((query:any) => {
          query.forEach((q:any) => { // console.log(q)
            if (q.CursoProfesor) {
               // console.log('ACME0');
               const tmp = this.cursoProfesorMap.get(+q['CursoProfesor'].id);
               q['CursoProfesor'] = {id: q['CursoProfesor'].id, nombre: tmp[0] + ' | ' + tmp[1]  };
          }
            this.sumGroup+=+q[groupSum[this.mainTable]]
          })
        }),   // TODO   hacer variable general
         tap(() => this.currPage = 0),
         tap(query => this.numreg = query.length),
         )!;
    }

    const querytable = () => {

      this.mainQuery$ = this.crud.getData(
        this.mainTable, fKeys)?.pipe(
          tap(query => query.forEach((q:any) => {

            Object.keys(q).forEach(k=>{

              if (k == 'CursoProfesor') {
                  const tmp = this.cursoProfesorMap.get(+q[k].id);
                  q[k] = {id: q[k].id, nombre: tmp[0] + ' | ' + tmp[1]  };
              }
           })
          })),
          tap(() => this.currPage = 0),
          tap(query => this.numreg = query.length),
          share()
        )!;
     }

    if ( !notification || notification.message == "updated" ) {

      if ( fKeys.length === 0) {
        // console.log('ACME2');
        this.mainQuery$ = this.crud.getData(this.mainTable)?.pipe(
            tap(() => this.currPage = 0),
            tap(query => this.numreg = query.length)
          )!;
      } else {

        this.mainTableForeignKeys.forEach(mt => {
          if (middleTables.includes(mt)) {
            this.tieneTablaIntermedia=true;
            // console.log('ACME1', this.tieneTablaIntermedia);
            this.crud.getData(mt,[fKeys[0],fKeys[1],fKeys[3],0,0])!.pipe(
              tap(val => val.forEach((v:any) => this.cursoProfesorMap.set(
                  v.id,[v.Profesor.apellido1 + ' ' + v.Profesor.apellido2 + ' ' + v.Profesor.nombre, v.Asignatura.nombre]
                )
              )),
            ).subscribe(() => querytable())
          }
        }
      )
        if(this.tieneTablaIntermedia==false) {
          // console.log('ACME3', this.tieneTablaIntermedia)
          querytable();
        }


      }

      // this.mainQuery$.subscribe((data:any) => { this.numreg = data.length;   })
    }
    else if ( !notification || notification.message == "group" ) {
      // let fKeys = this.getForeignKeysOfMainTable();

      this.mainTableForeignKeys.forEach(mt => {
        if (middleTables.includes(mt)) {
          this.tieneTablaIntermedia=true;
          // console.log('ACME4', this.tieneTablaIntermedia);
          this.crud.getData(mt,[fKeys[0],fKeys[1],fKeys[3],0,0])!.pipe(
            tap(val => val.forEach((v:any) => this.cursoProfesorMap.set(
                v.id,[v.Profesor.apellido1 + ' ' + v.Profesor.apellido2 + ' ' + v.Profesor.nombre, v.Asignatura.nombre]
              )
            )),
          ).subscribe(() => querytablegroup())
        }
      })

    }
    else if (notification.message == "search") {
      this.searchTerm$.pipe(
          debounceTime(500),
          tap((term:any) => {

            this.mainQuery$ = (term.length > 0) ? this.crud.makeSearch(this.mainTable, term) :   this.crud.getData(this.mainTable, fKeys)!

          }
         ),

        /*
        customOperator((term: string) => term.length > 0, 100, (prev:any, curr:any) => prev === curr ),
        take(3),
        switchMap(term => this.mainQuery$ = this.crud.makeSearch(this.mainTable, term)),
        */
      )
      .subscribe(() => this.mainQuery$.subscribe((data:any) => { this.numreg = data.length;   }))
    }

  }

  getObjectLabel(table: string, object: any) {

    return this.labelsService.getObjectLabel(table, object);
  }

  getTableLabel(table: string) {

    return this.labelsService.getTableLabel(table);
  }

  getAttributeLabel(table: string, attribute: string) {
    // permite acceder a labelsService.getAttributeLabel desde html
    return this.labelsService.getAttributeLabel(table, attribute);
  }

  getBiClass(route: string) {
    // permite acceder a iconsService.getBiClass desde html
    return this.iconsService.getBiClass(route);
  }

  getIconLabel(route: string) {
    // permite acceder a iconsService.getLabel desde html
    return this.iconsService.getLabel(route);
  }

  addItem(newItem: string) {
    if (newItem==="actualizar") {
      this.selIdsService.notifyUpdated();
    }
  }

  downloadCSV() {

    const define_tipo = (r: any) : any => { return r }

    let out:any = [];
    this.textFields.forEach(t => out.push(t+'\t'))
    this.dateFields.forEach(d => out.push(d+'\t'))
    this.fkFields.forEach(f => out.push(f+'\t'))
    out.push('\n');
    this.mainQuery$.pipe(
      tap(res =>  { for (let r of Object.values(res)) {
                        this.textFields.forEach(t => { out.push((define_tipo(r)[t]+'\t')) })
                        this.dateFields.forEach(t => { out.push((define_tipo(r)[t]+'\t')) })
                        this.fkFields.forEach(fk => { out.push((define_tipo(r)[fk].nombre+'\t')) })
                        out.push('\n')
                      }
                  }),
                  tap(() => {
                    const data: Blob = new Blob(out, { type: "text/csv;charset=utf-8" });

                  })
    ).subscribe()
  }

  downloadFile() {

    const define_tipo = (r: any) : any => { return r }

      let data = "";
      this.textFields.forEach(t => data+=t + '|')
      this.dateFields.forEach(d => data+=d + '|')
      this.fkFields.forEach(f => data+=f + '|')
      data = data.slice(0,-1)
      data+='\n'

      this.mainQuery$.pipe(
        tap(res =>  { for (let r of Object.values(res)) {
                          this.textFields.forEach(t => { data+=(define_tipo(r)[t]) + '|' })
                          this.dateFields.forEach(t => { data+=(define_tipo(r)[t]) + '|'})
                          this.fkFields.forEach(fk => { data+=(define_tipo(r)[fk].nombre) + '|' })
                          data = data.slice(0,-1)
                          data+='\n'
                        }
                    }),
                    tap(() => {
                      const blob = new Blob([data], { type: 'text/csv;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = this.mainTable + '.csv';
                      link.click();
                    })
      ).subscribe()

  }


  openDialog(reg: any = null): void {

    if (!reg) {
          var reg:any = {};
          reg['id'] = 0;
          this.modalDataObj.tables.forEach((table: string) => reg[table] = {
            id: this.selIdsService.getId(table.toLocaleLowerCase()) || 0});

          this.modalDataObj.textFields.forEach((text: string) => reg[text] = null);
          this.modalDataObj.booleanFields.forEach((bool: string) => reg[bool] = null);
          this.modalDataObj.dateFields.forEach((date: string) => reg[date] = null);

       }

       reg['bgmodal'] = this.bgmodal;
       reg['modalbutton'] = this.matbutton;

    let modaldata: any = this.modalDataObj;
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: {
        registro: reg,
        ...modaldata,
        tabla: this.mainTableUpper},
        height: this.modalDataObj.height, width: '600px',
    });

    dialogRef.afterClosed().pipe(
      tap(() => this.updateTable()),
    )
    .subscribe();

  }


}



