import { Component } from '@angular/core';

@Component({
  selector: 'maintainer-template',
  templateUrl: './maintainer-template.component.html',
  styleUrls: ['./maintainer-template.component.css']
})
export class MaintainerTemplateComponent {

  tableTitle  = "";
  mainTable = "";
  textFields = [];
  dateFields = [];
  booleanFields = [];
  displayFKFields = [];

  selTables = [];
  changeFnsArray = [];
  ignoreFkRequirements = [];
  patchFKsFromStorage = [];
  middleTables:any = {};

  constructor( ) { }
}
