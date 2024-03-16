import { Directive, inject } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn, Validator } from '@angular/forms';
import { MessageService } from '../../services/message/message.service';


@Directive({
  selector: '[appProfeValidators]',
   providers: [{
    provide: NG_VALIDATORS,
    useExisting: ProfeValidatorsDirective,
    multi: true,
  }]
})



export class ProfeValidatorsDirective {

  constructor(private ms: MessageService) { 
    ms.profesor_msg.subscribe(profesor => console.log('porongita',profesor)) 
  }


  profeValidator(valida: any, dia: number, profesor: number): ValidatorFn {
  
         
    return (control: AbstractControl): ValidationErrors | null => {

      var isValid = true;
      var dias_ocupados:number[]=[];
      valida.forEach((e:any) => {
        if (e.dia == dia && e.profesor == profesor)
               dias_ocupados.push(e.hora)
      });

      // const ms = inject(MessageService)
      console.log(dias_ocupados, +control.value, profesor)
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
  

 
}

