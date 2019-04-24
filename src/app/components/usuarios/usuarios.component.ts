import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  nuevoUsuario:[];

  constructor( private usuariosService: UsuariosService ) {
    this.usuariosService.getAllUsuario()
      .subscribe((data: any) => {
        this.nuevoUsuario = data;
        console.log(this.nuevoUsuario);
      });
  }

  ngOnInit() {
  }
}
