import { Component, OnInit} from '@angular/core';
import { ServiciosService } from 'src/app/services/servicios.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

   
  constructor(private servicio:ServiciosService ) { }

  ngOnInit() {
  }
  guardarServicio(form: NgForm) {

    const dataServicio =
    {
      cod_servicio: form.value.codServicio,
      nombre: form.value.nombre,
      apellidos: form.value.apellidos,
      direccion: form.value.direccion,
      telefono: form.value.numeroCelular,
      cod_operador: form.value.codOperador,
      observaciones: form.value.observaciones,
      cod_taxi:form.value.codTaxi,
    }

    console.log(dataServicio);
    this.servicio.postServicio(dataServicio);
  }

  Limpiardatos() {

  }


}
