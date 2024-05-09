import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

ngOnInit(): void {


const source = of(2000, 1000);

const example = source.pipe(
  concatMap(val => of(`Delayed by: ${val}ms`).pipe(delay(val)))
);

example.subscribe(val =>
  console.log(`With concatMap: ${val}`)
);




}





}
