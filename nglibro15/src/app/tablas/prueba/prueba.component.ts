import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { concatMap } from 'rxjs/operators';


@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {
ngOnInit(): void {

  //emit 'Hello' and 'Goodbye'
  const source = of('Hello', 'Goodbye');
  //example with promise
  const examplePromise = (val:any) => new Promise(resolve => resolve(`${val} World!`));
  //result of first param passed to second param selector function before being  returned
  const example = source.pipe(
    concatMap(
      val => examplePromise(val),
      result => `${result} w/ selector!`
    )
  );
  //output: 'Example w/ Selector: 'Hello w/ Selector', Example w/ Selector: 'Goodbye w/ Selector'
  const subscribe = example.subscribe(val =>
    console.log('Example w/ Selector:', val)
  );


}





}
