import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-reporte-conductores',
  templateUrl: './reporte-conductores.component.html',
  styleUrls: ['./reporte-conductores.component.css']
})
export class ReporteConductoresComponent implements OnInit {

  listaUsuarios = [];

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit() {
    this.usuariosService.getAllUsuario().subscribe((data: any) => {
      this.listaUsuarios = data;
    });
  }
}
