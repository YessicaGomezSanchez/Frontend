import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-reporte-usuario',
  templateUrl: './reporte-usuario.component.html',
  styleUrls: ['./reporte-usuario.component.css']
})
export class ReporteUsuarioComponent implements OnInit {
  listaUsuarios = [];
  listaUsuariosExport = [];
  dialog: any;
  list: any;

  constructor(private usuariosService: UsuariosService, private excelService: ExcelService) { }

  ngOnInit() {
    this.usuariosService.getAllUsuario().subscribe((data: any) => {
      this.listaUsuarios = data;
    });
  }

  verMas() {  }

  exportar() {
    this.usuariosService.getAllUsuario().subscribe((data: any) => {
      this.excelService.exportAsExcelFile(data, 'ReporteUsuarios');
  });
  }
}
