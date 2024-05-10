import { Component } from '@angular/core';
import { MaintainerComponent } from '../maintainer/maintainer.component';

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
  displayFKFields = [];

  selTables = [];
  changeFnsArray = [];
  ignoreFkRequirements = [];
  patchFKsFromStorage = [];
  
  constructor( ) { }
}
