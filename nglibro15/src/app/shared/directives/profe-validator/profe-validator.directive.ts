import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

export function profeValidator(valida: any, dia: number, profesor: number): ValidatorFn {

  var isValid = true;
  var dias_ocupados:number[]=[];
  valida.forEach((e:any) => {
    if (e.dia == dia && e.profesor == profesor)
           dias_ocupados.push(e.hora)
  });

  return (control: AbstractControl): ValidationErrors | null => {
    console.log(dias_ocupados, +control.value)
    if ((dias_ocupados.includes(+control.value) ? false: true)) {
      return null;
    } else {
      return {
        profeValidator: {
          valid: !isValid,
        },
      };
    }
  };

}

@Directive({
  selector: '[appProfeValidators]',
   providers: [{
    provide: NG_VALIDATORS,
    useExisting: ProfeValidatorsDirective,
    multi: true,
  }]
})
export class ProfeValidatorsDirective {

  constructor() { }

}