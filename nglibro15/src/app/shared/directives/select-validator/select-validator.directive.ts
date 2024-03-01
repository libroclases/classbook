import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

export function selectValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    const isValid = (control.value > 0) ? true : false;

    if (isValid) {
      return null;
    } else {
      return {
        selectValidator: {
          valid: false,
        },
      };
    }
  };

}

@Directive({
  selector: '[appSelect]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: SelectValidatorDirective,
    multi: true,
  }],
})
export class SelectValidatorDirective {

  constructor() { }

}
