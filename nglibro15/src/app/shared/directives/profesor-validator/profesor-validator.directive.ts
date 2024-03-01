import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

export function profesorValidator(day: number, horasMap: any): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    
    const isValid = !horasMap.get(day-1).includes(+control.value); 

    if (isValid) {
      return null;
    } else {
      return {
        profesorValidator: {
          valid: false,
        },
      };
    }
  };

}

@Directive({
  selector: '[appProfesorValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ProfesorValidator,
    multi: true,
  }],
})

export class ProfesorValidator {

  constructor() { }

}
