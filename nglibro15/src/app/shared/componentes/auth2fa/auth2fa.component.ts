import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Select } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Usuario } from 'src/app/ngxs/usuario/usuario.model';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';
import { Output, EventEmitter } from '@angular/core';


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

   constructor(private fb: FormBuilder) { }

   ngOnInit(): void {

    this.usuario$.pipe(
      tap(info => this.getColor(info.personalInfo?.usuario.Tema.nombre)),
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
    /*
    this.crud.postData({userId: 'e9abdc2a-75f6-4c7a-b910-745d4f58c343', auth: codigo},'token').pipe(
      tap(msg => {
        this.showmsg(msg)
      })
    ).subscribe();
    */
  console.log('Codigo: ', this.codigoForm.value.codigo);
   this.codigoValidado = true;
   this.newItemEvent.emit(true);
  }

}
