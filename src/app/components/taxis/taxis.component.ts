import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaxisService } from '../../services/taxis.service';
import {UsuariosService  } from '../../services/usuarios.service';
import { enableProdMode } from '@angular/core';


enableProdMode();

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})
export class TaxisComponent implements OnInit {
  public nombres: string;
  public apellidos: string;
  public numero_celular: string;
  public num_licencia: string;
  public categoria: string;
  public fecha_venc_licencia: Date;

 

  constructor(private taxisService: TaxisService, private usuarioServicio:UsuariosService) { }
  conductores=[];
  ngOnInit() {
  }

  GuardarTaxi(form: NgForm, conductores: any[]) {
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
      conductores: [conductores]
    };

    this.taxisService.postTaxis(taxi);
    form.reset();
  }

  buscarUsuario(form: NgForm): void {
    const id = form.value.cedulaC;
    this.usuarioServicio.getUsuario(id).subscribe(data => {
      if (data.rol =="Conductor") {
      this.nombres = data.nombres;
      this.apellidos = data.apellidos,
      this.numero_celular = data.numero_celular,
      this.num_licencia = data.num_licencia,
      this.categoria = data.categoria,
      this.fecha_venc_licencia = data.fecha_venc_licencia
      } else {
        //agregar las notificaciones
        console.log('usuario no es un taxista', data.nombres)

      }
      
    //  console.log('datos', data)
    })
  }
  agregarConductores(data){
    console.log('datos', data)
  }
}
