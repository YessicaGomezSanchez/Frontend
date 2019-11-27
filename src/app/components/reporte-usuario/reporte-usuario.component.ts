import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { ExcelService } from 'src/app/services/excel.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-reporte-usuario',
  templateUrl: './reporte-usuario.component.html',
  styleUrls: ['./reporte-usuario.component.css']
})
export class ReporteUsuarioComponent implements OnInit {
  listaUsuarios = [];
  dialog: any;
  list: any;

  @ViewChild('table') table: ElementRef;

  constructor(private usuariosService: UsuariosService, private excelService: ExcelService) { }

  ngOnInit() {
    this.usuariosService.getAllUsuario().subscribe((data: any) => {
      this.listaUsuarios = data;
    });
  }

  verMas() {  }

  exportar() {
    this.usuariosService.getAllUsuario().subscribe((data: any) => {
      this.listaUsuarios = data;
      this.excelService.exportAsExcelFile(this.listaUsuarios, 'ReporteUsuarios');
    });
  }
}
