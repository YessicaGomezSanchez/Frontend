import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaxisService } from '../../services/taxis.service';
import { UsuariosService } from '../../services/usuarios.service';
import { enableProdMode } from '@angular/core';


enableProdMode();

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})
export class TaxisComponent implements OnInit {
  nombres: string;
  apellidos: string;
  numero_celular: string;
  num_licencia: string;
  categoria: string;
  fecha_venc_licencia: String;

  placa: string;
  modelo: string;
  num_soat: string;
  fecha_venc_soat: String;
  num_tecnomecanica: string;
  fecha_venc_tecnomecanica: String;
  num_seguro_contractual: String;
  fecha_venc_seguro_contractual: String;
  maletero: Boolean;
  parrilla: Boolean;
  mascotas: Boolean;
  habilitado: Boolean;
  fecha_registro: String;
  nombre_apellidos: String;
  tipo_documento: String;
  cedula: String;
  correo: String;
  conductores:[];

  public arrayconductores: Array<{
    nombres: string,
    apellidos: string,
    numero_celular: string,
    num_licencia: string,
    categoria: string,
    fecha_venc_licencia: String,
  }> = [];

  fieldArray: Array<any> = [];
  newAttribute: any = {};

  constructor(private taxisService: TaxisService, private usuarioServicio: UsuariosService) { }
  ngOnInit() {
    this.listarConductores();
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
      conductores: this.arrayconductores
    };

    this.taxisService.postTaxis(taxi);
    form.reset();
    this.arrayconductores=[];
    
  }

  // buscarConductor(cedula:String): void {
  //   this.usuarioServicio.getUsuario(cedula).subscribe(data => {
  //     if (data.rol == "Conductor") {
  //       this.cedula = data.cedula,
  //       this.nombres = data.nombres,
  //       this.apellidos = data.apellidos,
  //       this.numero_celular = data.numero_celular,
  //       this.num_licencia = data.num_licencia,
  //       this.categoria = data.categoria,
  //       this.fecha_venc_licencia = data.fecha_venc_licencia
  //     } else {
  //       //agregar las notificaciones
  //       console.log('usuario no es un taxista', data.nombres)
  //     }
  //     //  console.log('datos', data)
  //   })
  // }

   eliminar(index) { 
    this.arrayconductores = this.arrayconductores.splice(index, 0); 
    console.log(index);
    console.log('conductor a eliminar',this.arrayconductores);
   } 
  agregarConductores(conductor:any) {
    this.arrayconductores.push({
      nombres: conductor.nombres,
      apellidos: conductor.apellidos,
      numero_celular: conductor.numero_celular,
      num_licencia: conductor.num_licencia,
      categoria: conductor.categoria,
      fecha_venc_licencia: conductor.fecha_venc_licencia
    });
    conductor.disabled = true;
    console.log('conductores agregados', this.arrayconductores)
  }

  buscarTaxi(form: NgForm): void {
    const placa = form.value.placa;
    this.taxisService.getTaxi(placa).subscribe(data => {
      this.placa = data.placa;
      this.modelo = data.modelo;
      this.num_soat = data.num_soat;
      this.fecha_venc_soat = data.fecha_venc_soat;
      this.num_tecnomecanica = data.num_tecnomecanica;
      this.fecha_venc_tecnomecanica = data.fecha_venc_tecnomecanica;
      this.num_seguro_contractual = data.num_seguro_contractual;
      this.fecha_venc_seguro_contractual = data.fecha_venc_seguro_contractual;
      this.maletero = data.maletero;
      this.parrilla = data.parrilla;
      this.mascotas = data.mascotas;
      this.habilitado = data.habilitado;
      this.nombre_apellidos = data.nombre_apellidos;
      this.tipo_documento = data.tipo_documento;
      this.cedula = data.cedula;
      this.correo = data.correo; 
      this.conductores = data.conductores; 
    })    
  }

    listarConductores() { 
    this.usuarioServicio.getAllUsuario().subscribe((data: any) => {      
      this.conductores = data.filter(data => data.rol =="Conductor");
      this.conductores.map((conductor: any)=>{
        conductor.disabled = false;
      })
      console.log('conductores inscritos',this.conductores);
    });
  }
}
