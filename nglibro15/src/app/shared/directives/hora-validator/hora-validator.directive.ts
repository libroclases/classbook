import { Directive, inject } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';
import { take, takeLast, tap } from 'rxjs';



export function horaValidator(valida: any, dia: number): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    var isValid = true;

    isValid = (valida.get(+dia).includes(+control.value)) ? false : true;
   
    if (isValid) {
      return null;
    } else {
      return {
        horaValidator: {
          valid: !isValid,
        },
      };
    }
  };

}

@Directive({
  selector: '[appHora]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: HoraValidatorDirective,
    multi: true,
  }],
})


export class HoraValidatorDirective {


  constructor() { }




}