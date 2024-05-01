import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap';
import { QueryObjectResumen } from '../../../interfaces/asistencia.interface';
import { CrudService } from '../../services/crud/crud.service';
import { SelectionIdsService } from '../../services/selection-ids/selection-ids.service';
import { SubscriptionsManagerService } from '../../services/subscriptions-manager/subscriptions-manager.service';
import { IconsService } from '../../services/icons/icons.service';
import { environment } from '../../../../environments/environment';
import { Usuario } from 'src/app/ngxs/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario.state';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-numbers-calendar',
  templateUrl: './numbers-calendar.component.html',
  styleUrls: ['./numbers-calendar.component.css']
})
export class NumbersCalendarComponent  implements OnInit, OnDestroy {
  @Input('title')
  title = '';

  @Input('rowLabel')
  rowLabelTitle = '';

  @Input('total-label')
  totalLabel = '';

  @Input('table')
  table!: string;

  @Input('endpoint-suffix')
  endpoint_suffix!: string;

  @Input('endpoint-foreign-keys')
  endpoint_foreign_keys!: string[];

  @Input('row-count-title')
  rowCountTitle!: string;

  @Input('row-count-table')
  rowCountTable!: string;

  @Input('row-count-endpoint-suffix')
  rowCountEndpointSuffix!: string;

  @Input('row-count-foreign-keys')
  rowCountForeignKeys!: string[];

  @Input('update-if-selected')
  updateIfSelected: string[] = [];

  @Input('year-table')
  yearTable!: string;

  @Input('month-table')
  monthTable!: string;

  @Input('holidays-table')
  holidaysTable!: string;

  @Input('max-rows-number')
  maxRows: number = 50;

  @Input('max-columns-number')
  maxColumns: number = 40;

  opacity = environment.opacity;

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

  banner_height = environment.cabecera.banner_height;
  menu_height = environment.cabecera.menu_height;
  margen_superior_tabla = environment.cabecera.margen_superior_tabla;

  innerHeight=  window.innerHeight

  height = window.innerHeight - (this.banner_height + this.menu_height + this.margen_superior_tabla) + 'px';


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height =
      event.target.innerHeight - (this.banner_height + this.menu_height + 155) + 'px';
  }

  //   colores

  objcolors = environment.colors;
  
  bodybgcolor!:string;
  pagination!:string;
  tablehead!:string;

  disable = true;
  currentDate:Date = new Date();

  daysOfWeek = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  emptyTable = true;
  nRows = 0;
  nColumns = 0;
  rowLabels: string[] = [];
  rowTooltips: string[] = [];

  // ----
  // fecha actual
  today!: Date;
  colToday = 0;
  currentDateInMonth = false;

  // ----
  // mes seleccionado
  daysInMonth = 30; // numero de dias del mes seleccionado
  dayIndicesInWeek: number[] = []; // del 0 al 6

  columnIsGrey: Map<number, boolean> = new Map();
  columnLabelInRed: Map<number, boolean> = new Map();

  // data indices in each page
  colIndicesInPages: number[][] = [];
  colIndices: number[] = [];
  tableValues: Map<number, Map<number, number>> = new Map();
  countNumbersRow: Map<number, number> = new Map();
  totalCountNumber: number = 0;
  totalsByDate: Map<number, number> = new Map();
  totalsByRow: Map<string, number> = new Map();

  entryIdToday: Map<string, number> = new Map();

  constructor(
    private crud: CrudService,
    private selIdsService: SelectionIdsService,
    private subsManagerService: SubscriptionsManagerService,
    private iconsService: IconsService,
    private configAlert: NgbAlertConfig
  ) {
    this.configAlert.dismissible = false;

    const getPermision = (msg: any) => { if(msg) {
      const year = this.currentDate.getFullYear();
      this.disable = (msg.esUtp && msg.anno.id == (year - 2020) && msg.colegio==1) ? false : true;
      } 

    }

    const getColor = (color:string | null) => {
      
      if (color=='azul') { 
        this.bodybgcolor = this.objcolors.azul.bodybgcolor;
        this.pagination = this.objcolors.azul.pagination;
        this.tablehead = this.objcolors.azul.tablehead;
      }
      if (color=='verde') { 
        this.bodybgcolor = this.objcolors.verde.bodybgcolor;
        this.pagination = this.objcolors.verde.pagination;
        this.tablehead = this.objcolors.verde.tablehead;
      }
      if (color=='naranjo') { 
        this.bodybgcolor = this.objcolors.naranjo.bodybgcolor;
        this.pagination = this.objcolors.naranjo.pagination;
        this.tablehead = this.objcolors.naranjo.tablehead; 
      }    
    }
  

    this.usuario$.subscribe(info => {
      if (info.personalInfo) {getColor(info.personalInfo.usuario.Tema.nombre)}
      else { getColor(localStorage.getItem('Color')) }
    });

/*    
      this.userInfo.personalInfo$.subscribe(info => info.inscripcionColegio.forEach((el:any) => {
        getPermision({esUtp: el.esUtp,anno: el.Anno, colegio: el.Colegio.id});
        getColor(info.personalInfo.usuario.Tema.nombre);
      }))
*/
 
  }

  ngOnInit() {
    this.selIdsService.subscribe('checkbox-grid', (q: any) =>
      this.updateData(q)
    );
    this.updateData(null);
  }

  ngOnDestroy() {
    this.subsManagerService.unsubscribeAll();
  }

  getBiClass(route: string) {
    // permite acceder a iconsService.getBiClass desde html
    return this.iconsService.getBiClass(route);
  }

  setGridSize(rowNumber: number, columnNumber: number) {
    if (rowNumber) {
      this.nRows = rowNumber;
    }
    if (columnNumber) {
      this.nColumns = columnNumber;
    }
    let colStart = 0;
    this.colIndices = [];
    for (let c = colStart; c < this.nColumns; c++) {
      this.colIndices.push(c);
    }
  }

  setColumnLabelInRed(colIndex: number, value: boolean) {
    this.columnLabelInRed.set(colIndex, value);
  }

  setColumnIsGrey(colIndex: number, value: boolean) {
    this.columnIsGrey.set(colIndex, value);
  }

  getForeignKeysOfMainQuery() {
    return this.selIdsService.getIds(this.endpoint_foreign_keys);
  }

  updateData(message: any) {
    for (let tbl of this.updateIfSelected) {
      if (this.selIdsService.getId(tbl) === 0) {
        // just don't update
        return;
      }
    }
    const subscription = this.crud
      .getDataCustom(
        this.table,
        this.endpoint_suffix,
        this.getForeignKeysOfMainQuery()
      )!
      .subscribe((queryObject) => {
        this.totalsByDate.clear();
        this.entryIdToday.clear();
        this.tableValues.clear();
        if (Object.keys(queryObject).length > 0) {
          this.processQuery(queryObject);
        }
      });
    this.subsManagerService.registerSubscription(
      subscription,
      'numbers-calendar-main-table'
    );
  }

  processQuery(queryObject: QueryObjectResumen) {
    // selected year and month
    const selYear = parseInt(this.selIdsService.getText(this.yearTable));
    // supuesto: ID=1 para enero, ID=2 para febrero, ...
    const selMonthId = this.selIdsService.getId(this.monthTable);

    const subscription = this.crud
      .getDataCustom(this.holidaysTable, 'getYearMonth', [], {
        anno: selYear,
        mes: selMonthId,
      })
      .subscribe((qry) => {
        // week-index of first day of the month
        // this.today = new Date();
        this.today = new Date('2023-09-26T12:00:00');
        this.currentDateInMonth =
          this.today.getMonth() === selMonthId - 1 &&
          this.today.getFullYear() === selYear;
        if (this.currentDateInMonth) {
          this.colToday = this.today.getDate() - 1;
        } else {
          this.colToday = -1;
        }
        this.daysInMonth = new Date(selYear, selMonthId, 0).getDate();
        // 0: Lu, 1: Ma, 2: Mi, ...
        const dayOfWeekFirstDay =
          (new Date(selYear, selMonthId - 1, 1).getDay() + 6) % 7;
        this.dayIndicesInWeek = [];
        for (let i = 0; i < this.daysInMonth; i++) {
          const dow = (dayOfWeekFirstDay + i) % 7;
          this.columnIsGrey.set(i, dow > 4);
          this.columnLabelInRed.set(i, false);
          this.dayIndicesInWeek.push(dow);
        }

        for (let object of qry) {
          const holidayIndex =
            parseInt(object.fecha.toString().split('-')[2]) - 1;
          this.columnIsGrey.set(holidayIndex, true);
          this.columnLabelInRed.set(holidayIndex, true);
        }

        this.rowLabels = Object.keys(queryObject).sort();
        // (1) extract row labels and values
        for (let rowStr in this.rowLabels) {
          const row = +rowStr;
          const nombreCurso = this.rowLabels[row];
          const object = queryObject[nombreCurso];
          this.tableValues.set(row, new Map());
          for (const [dayString, count] of Object.entries(object)) {
            const dayIndex = +dayString - 1;
            this.tableValues.get(row)!.set(dayIndex, count);
            let totalDay = this.totalsByDate.get(dayIndex);
            if (totalDay == undefined) {
              totalDay = 0;
            }
            this.totalsByDate.set(dayIndex, totalDay + count);
          }
        }
        this.emptyTable = this.rowLabels.length === 0;
        this.setGridSize(this.rowLabels.length, this.dayIndicesInWeek.length);

        const subsCountRows = this.crud
          .getDataCustom(
            this.rowCountTable,
            this.rowCountEndpointSuffix,
            this.selIdsService.getIds(this.rowCountForeignKeys)
          )
          .subscribe((countRowsObj) => {
            this.totalCountNumber = 0;
            this.rowLabels.forEach((rowLabel, index) => {
              this.countNumbersRow.set(index, countRowsObj[rowLabel]);
              this.totalCountNumber += countRowsObj[rowLabel];
            });
          });
        this.subsManagerService.registerSubscription(
          subsCountRows,
          'count-cursos'
        );
        this.rowTooltips = this.rowLabels;
      });
    this.subsManagerService.registerSubscription(
      subscription,
      'numbers-calendar-holidays'
    );
  }

  sumValuesAtColumn(column: number) {
    return 0;
  }
}


