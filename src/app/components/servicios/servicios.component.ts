import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { TaxisService } from 'src/app/services/taxis.service';
import { isNgTemplate } from '@angular/compiler';


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  id = localStorage.getItem('idUsuario');
  selected: string;
  enturnados: [];
  taxisList: [];
  listServicio = [];
  asignado: Boolean;
  public nombre: string;
  public apellidos: string;
  public direccion: string;
  public numeroCelular: string;
  cod_servicio = Math.floor((Math.random() * 10000) + 1);
  taxisListD: [];

  constructor(
    private servicio: ServiciosService,
    private taxiService: TaxisService,
    private usuario: UsuariosService) { }


  ngOnInit() {
    this.listarServicios();
    this.taxisDisponibles();

  }

  guardarServicio(form: NgForm) {

    const dataServicio =
    {
      cod_servicio: this.cod_servicio,
      nombres: form.value.nombre,
      apellidos: form.value.apellidos,
      direccion: form.value.direccion,
      telefono: form.value.numeroCelular,
      cod_operador: this.id,
      observaciones: form.value.observaciones,
      cod_taxi: this.selected,
      fecha_servicio: '2019-05-01',
      pvx: true,

    }
    const dataTaxi =
    {
      cod_taxi: this.selected,
      asignado: false
    }

    this.listarServicios();
    this.servicio.postServicio(dataServicio);
    this.taxiService.putTaxi(dataTaxi);
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
    });
  }
  enturnar() {
    this.taxiService.getAllTaxis().subscribe((data: any) => {
      this.taxisList = data.filter(res => res.habilitado == true && res.asignado == false);

    });
  }

  taxisDisponibles() {
    this.taxiService.getAllTaxis().subscribe((data: any) => {
      this.taxisListD = data.filter(res => res.habilitado == true && res.asignado == true);

    });
  }

  guardarturno(list: any) {
    this.enturnados = list.selectedOptions.selected.map(item => item.value);
   
    for (let i = 0; i < this.enturnados.length; i++) {
      let data =
      {
        placa: this.enturnados[i],
        asignado: true
      }
      this.taxiService.putTaxi(data);
    }
  }

}
