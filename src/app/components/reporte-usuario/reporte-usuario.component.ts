import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-reporte-usuario',
  templateUrl: './reporte-usuario.component.html',
  styleUrls: ['./reporte-usuario.component.css']
})
export class ReporteUsuarioComponent implements OnInit {
  listaUsuarios = [];
  dialog: any;

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuariosService.getAllUsuario().subscribe((data: any) => {
      this.listaUsuarios = data;
    });
  }

  verMas() {  }
}
