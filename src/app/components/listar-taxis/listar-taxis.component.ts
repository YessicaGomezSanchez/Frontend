import { Component, OnInit } from '@angular/core';
import {TaxisService} from '../../services/taxis.service';
import {enableProdMode} from '@angular/core';


enableProdMode();

@Component({
  selector: 'app-listar-taxis',
  templateUrl: './listar-taxis.component.html',
  styleUrls: ['./listar-taxis.component.css']
})
export class ListarTaxisComponent implements OnInit {
  taxisList:[];
  modelo: String;
  placa: String;
  nombre_apellidos: String;
  tipo_documento: String;
  cedula: String;
  correo: String;
  constructor(private taxisService: TaxisService) { 
    // this.taxisService.getTaxis()
    // .subscribe((data: any) => {
    //   this.taxisList = data;
    //   console.log(this.taxisList);
    // });
  }

  ngOnInit() {
    this.taxisService.getTaxis().subscribe((data: any) => {
      this.taxisList = data;
      console.log(this.taxisList);
    });
  }
 

}
