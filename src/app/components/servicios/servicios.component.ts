import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { TaxisService } from 'src/app/services/taxis.service';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {

  public nombre: string;
  public apellidos: string;
  public direccion: string;
  public numeroCelular: string;

  constructor(private servicio: ServiciosService, private taxi: TaxisService, private usuario: UsuariosService) { }
listServicio=[];
  ngOnInit() { 
    this.listarServicios();
  }

  guardarServicio(form: NgForm) {

    const dataServicio =
    {
      cod_servicio: form.value.codServicio,
      nombres: form.value.nombre,
      apellidos: form.value.apellidos,
      direccion: form.value.direccion,
      telefono: form.value.numeroCelular,
      cod_operador: form.value.codOperador,
      observaciones: form.value.observaciones,
      cod_taxi: form.value.codTaxi,
    }

    console.log(dataServicio);
    this.servicio.postServicio(dataServicio);
    this.listarServicios();
    form.reset();
  }
  buscarUsuario(form: NgForm): void {
    const id = form.value.nomBusqueda;
    this.usuario.getUsuario(id).subscribe(data => {
      this.nombre = data.nombres;
      this.apellidos = data.apellidos,
      this.direccion = data.direccion,
      this.numeroCelular = data.numero_celular,
      console.log('datos', data)
    })
  }

  listarServicios() { 
    this.servicio.getAllServicio().subscribe((data: any) => {
      this.listServicio = data;
      console.log(this.listServicio);
    });
  }
}
