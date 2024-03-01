import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rutValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {

    let suma = 0;
    let multiplo = 2;
    let index: number;
    let dvEsperado: number;

    // Despejar Puntos y Gión

    var rep:RegExp = /\./gi;
    var reg:RegExp = /\-/gi;
    let valor=control.value?.replace(rep, '')?.replace(reg,'');
    let largo = valor?.slice(0, -1).length;
    var isValid = false;
  

    for ( let i = 1; i  <= largo ; i++) {

          // Obtener su Producto con el Múltiplo Correspondiente        
          index = multiplo * +valor.charAt(largo - i);
          //  Sumar al Contador General 
          suma = suma + index;
          // Consolidar Múltiplo dentro del rango [2,7] 
          if ( multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
    }

    if (largo >= 7) {
      let dv = valor?.slice(-1)?.toUpperCase();

      dvEsperado = 11 - ( suma % 11);
      
      // Casos Especiales (0 y K) 
      
      dv = (dv === 'K') ? 10 : dv;
      dv = (dv === '0') ? 11 : dv;
      
      isValid = (dv == dvEsperado) ? true : false;

    }



    if (isValid) {
      return null;
    } else {
      return {
        rutValidator: {
          valid: false,
        },
      };
    }
  };

}


@Directive({
  selector: '[appRutValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: RutValidatorDirective,
    multi: true,
  }],
})
export class RutValidatorDirective {

  public validate(control: AbstractControl): ValidationErrors | null {
    return rutValidator()(control);
  }

  constructor() { }

}
