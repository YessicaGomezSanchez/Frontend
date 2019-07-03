import { Component, OnInit } from '@angular/core';
import { TaxisService } from '../../services/taxis.service';
import { enableProdMode } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';


enableProdMode();

@Component({
  selector: 'app-listar-taxis',
  templateUrl: './listar-taxis.component.html',
  styleUrls: ['./listar-taxis.component.css']
})
export class ListarTaxisComponent implements OnInit {
  taxisList: []; 
  modelo: String;
  placa: String;
  nombre_apellidos: String;
  tipo_documento: String;
  pageEvent: PageEvent; 
  cedula: String;
  correo: String;
  constructor(private taxisService: TaxisService) { }

  ngOnInit() {
    this.listarTaxis();
  }
  listarTaxis() {
    this.taxisService.getAllTaxis().subscribe((data: any) => {
      this.taxisList = data;
      this.taxisList.filter
    });
  }
  buscarTaxi(placa) {
    this.taxisList = [];
    this.taxisService.getTaxi(placa).subscribe((data:never) => {
      this.taxisList.push(data);
    });
  }


  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output 
  
  setPageSizeOptions(cambio : any) {
    this.taxisList = [];
    this.taxisService.getAllTaxis().subscribe((data: any) => {
      this.taxisList = data.slice(0,cambio.pageSize); 
    }); 

    return cambio;
  }
  
}
