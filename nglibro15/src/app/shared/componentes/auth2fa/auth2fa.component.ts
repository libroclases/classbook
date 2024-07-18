import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Output, EventEmitter } from '@angular/core';
import { CrudService } from '../../services/crud/crud.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-auth2fa',
  templateUrl: './auth2fa.component.html',
  styleUrls: ['./auth2fa.component.css']
})
export class Auth2faComponent implements OnInit {

   codigoValidado: boolean = false;
   mostra_tabla: boolean = true;

   codigoForm!: FormGroup;

   @Output() newItemEvent = new EventEmitter<boolean>();

   changeValidCode(value: boolean) {
    this.newItemEvent.emit(value);
   }

   @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

   reset() { this.codigoForm.reset(); this.codigoValidado = false; }
   desactivar() { this.newItemEvent.emit(false); this.codigoValidado = false;}

   modalbutton!:string;
   objcolors = environment.colors;

   constructor(private fb: FormBuilder, private crud: CrudService, private toastr: ToastrService) { }

   ngOnInit(): void {

    this.usuario$.pipe(
      tap(info => { this.getColor(info.personalInfo?.usuario.Tema.nombre) }),
    ).subscribe()

    const numericNumberReg= '^[0-9]{6}$';
    this.codigoForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.pattern(numericNumberReg)]]
    })

   }

   getColor = (color: string | null) => {

    if (color == null) {  color = localStorage.getItem('Color')  }

    if (color == 'primary') {
      this.modalbutton = this.objcolors.primary.modalbutton;
    }
    else if (color == 'success') {
      this.modalbutton = this.objcolors.success.modalbutton;
    }
    else if (color == 'info') {
      this.modalbutton = this.objcolors.info.modalbutton;
    }
  }


   validarCodigo() {
    
    this.crud.postData({ userId: '83bab0dc-aa45-4ae9-989f-e6029a13323a', auth: this.codigoForm.value.codigo }, 'token').pipe(
      tap(msg => {
        console.log('msg',msg.validated);
        if (msg.validated == true) {
          this.codigoValidado = true;
          this.newItemEvent.emit(true);
          this.toastr.success('Código Validado', 'Ok', { timeOut: 3000 });       
        }
        else { this.toastr.error('Código Incorrecto', 'Error',{ timeOut: 4000 }); }
      })
    ).subscribe();
    
  
  }

}
