import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaxisService } from '../../services/taxis.service';
import { enableProdMode } from '@angular/core';


enableProdMode();

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})
export class TaxisComponent implements OnInit {
  constructor(private taxisService: TaxisService) { }

  ngOnInit() {
  }

  GuardarTaxi(form: NgForm) {
    const taxi = {
      modelo: form.value.modelo,
      placa: form.value.placa,
      num_soat: form.value.num_soat,
      fecha_venc_soat: form.value.fecha_venc_soat,
      img_soat: '',
      num_tecnomecanica: form.value.num_tecnomecanica,
      fecha_venc_tecnomecanica: form.value.fecha_venc_tecnomecanica,
      img_tecnomecanica: '',
      num_seguro_contractual: form.value.num_seguro_contractual,
      fecha_venc_seguro_contractual: form.value.fecha_venc_seguro_contractual,
      img_seguro_contractual: '',
      maletero: true,
      parrilla: true,
      mascotas: true,
      habilitado: true,
      fecha_registro: form.value.fecha_registro,
      nombre_apellidos: form.value.nombre_apellidos,
      tipo_documento: form.value.tipo_documento,
      cedula: form.value.cedula,
      correo: form.value.correo,
      conductores: []
      // {
      //   nombre_apellidosC: form.value.nombre_apellidosC,
      //   tipo_documentoC: form.value.tipo_documentoC,
      //   cedulaC: form.value.cedulaC,
      //   correoC: form.value.correoC,
      //   habilitado: true,
      // }
    };

    const datataxi = JSON.stringify(taxi);
    console.log(datataxi);
    this.taxisService.postTaxis(datataxi);
    form.reset();
  }

}
