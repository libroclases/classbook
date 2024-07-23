import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UsuarioState } from 'src/app/ngxs/usuario/usuario.state';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css']
})
export class AyudaComponent implements OnInit {
    
  tabletype !:string;
  letters!: string;
  
  usuarioId!:number;

  @Select(UsuarioState.usuario) usuario$!: Observable<Usuario>;

    ngOnInit(): void {
      this.usuario$.subscribe((info:any) => {
        if (info.personalInfo) {
          this.usuarioId = info.personalInfo.usuario.id;
  
          this.getColor(info.personalInfo.usuario.Tema.nombre)
        }     
      });
        
    }

  getColor = (color:string) => {

    if (color=='primary') {
      this.tabletype = 'table-primary';
      this.letters = 'blue';
    }
    if (color=='success') {
      this.tabletype = 'table-success';
      this.letters = 'green';
    }
    if (color=='info') {
      this.tabletype = 'table-info';
      this.letters = 'info';
    }
  }


}
