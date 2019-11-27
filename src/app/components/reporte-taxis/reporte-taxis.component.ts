import { Component, OnInit } from '@angular/core';
import { TaxisService } from "src/app/services/taxis.service";
import { ExcelService } from 'src/app/services/excel.service';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-reporte-taxis',
  templateUrl: './reporte-taxis.component.html',
  styleUrls: ['./reporte-taxis.component.css']
})
export class ReporteTaxisComponent implements OnInit {
  listaTaxis = [];

  constructor(private excelService: ExcelService, private taxisService: TaxisService) { }

  ngOnInit() {
    this.taxisService.getAllTaxis().subscribe((data: any) => {
      this.listaTaxis = data;
    });
  }

  exportar() {
    this.taxisService.getAllTaxis().subscribe((data: any) => {
      this.listaTaxis = data;
      this.excelService.exportAsExcelFile(this.listaTaxis, 'ReporteTaxis');
      console.log(this.listaTaxis);
    });
  }
}