import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxisService } from '../../services/taxis.service';
import { UsuariosService } from '../../services/usuarios.service';
import { enableProdMode } from '@angular/core';
import { ToastrComponent } from '../shared/toastr/toastr.component';

enableProdMode();

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.css']
})

export class TaxisComponent implements OnInit {
  id = localStorage.getItem('idUsuario');

  nombres: string;
  apellidos: string;
  numero_celular: string;
  num_licencia: string;
  categoria: string;
  fecha_venc_licencia: Date;

  placa: string;
  modelo: string;
  num_soat: string;
  fecha_venc_soat: Date;
  num_tecnomecanica: string;
  fecha_venc_tecnomecanica: Date;
  num_seguro_contractual: String;
  fecha_venc_seguro_contractual: Date;
  maletero: Boolean;
  parrilla: Boolean;
  mascotas: Boolean;
  habilitado: Boolean;
  fecha_registro: String;
  nombre_apellidos: String;
  tipo_documento: String;
  cedula: String;
  correo: String;
  conductores: [];

  public arrayconductores: Array<{
    nombres: string,
    apellidos: string,
    numero_celular: string,
    num_licencia: string,
    categoria: string,
    fecha_venc_licencia: String,
  }> = [];
  taxiForm: FormGroup;
  submitted = false;

  constructor(
    private taxisService: TaxisService,
    private usuarioServicio: UsuariosService,
    public toastr: ToastrComponent,
    private formBuilder: FormBuilder) {
  }
  ngOnInit() {
    this.listarConductores();
    this.validacionCampos();

  }
  validacionCampos() {
    this.taxiForm = this.formBuilder.group({
      modelo: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      placa: ['', [Validators.required]],
      num_soat: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      fecha_venc_soat: ['', [Validators.required]],
      num_tecnomecanica: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      fecha_venc_tecnomecanica: ['', [Validators.required]],
      num_seguro_contractual: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      fecha_venc_seguro_contractual: ['', [Validators.required]],
      nombre_apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      tipo_documento: ['', [Validators.required]],
      cedula: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      correo: ['', [Validators.required, Validators.email]],
      cedulaC: ['']
    });

  }
  get validador() {
    return this.taxiForm.controls;
  }

  GuardarTaxi(taxiForm: any) {
    this.submitted = true;

    if (this.taxiForm.invalid) {
      return this.toastr.showError('Complete los campos resaltados', 'Campos obligatorios');
    } else {
      let now = new Date();
      const taxi = {
        modelo: taxiForm.value.modelo,
        placa: taxiForm.value.placa,
        num_soat: taxiForm.value.num_soat,
        fecha_venc_soat: taxiForm.value.fecha_venc_soat,
        img_soat: '',
        num_tecnomecanica: taxiForm.value.num_tecnomecanica,
        fecha_venc_tecnomecanica: taxiForm.value.fecha_venc_tecnomecanica,
        img_tecnomecanica: '',
        num_seguro_contractual: taxiForm.value.num_seguro_contractual,
        fecha_venc_seguro_contractual: taxiForm.value.fecha_venc_seguro_contractual,
        img_seguro_contractual: '',
        maletero: true,
        parrilla: true,
        mascotas: true,
        habilitado: true,
        asignado: false,
        fecha_registro: now,
        nombre_apellidos: taxiForm.value.nombre_apellidos,
        tipo_documento: taxiForm.value.tipo_documento,
        cedula: taxiForm.value.cedula,
        correo: taxiForm.value.correo,
        conductores: this.arrayconductores
      };
      if (this.arrayconductores.length == 0) {
        return this.toastr.showError('Debe agregar almenos un conductor!','Ups!' );
       }       
      
      this.taxisService.postTaxis(taxi).subscribe(data => {
        console.log('taxi.conductores', taxi.conductores);    
           this.toastr.showSuccess('Guardado', 'La información del usuario se ha guardado!');
      },
        error => {
          if (error.status == 404) {
            this.toastr.showError(error.message, 'Ups1!');
          } else if (error.status == 500) {
            this.toastr.showError('El taxi ya se encuentra registrado', 'Ups2!');
          }
        }

      );
    }
    taxiForm.reset();
    this.listarConductores();
    this.submitted = false;
  }


  eliminar(index) {
    this.arrayconductores = this.arrayconductores.splice(index, 0);
    console.log(index);
  }
  agregarConductores(conductor: any) {
    this.arrayconductores.push({
      nombres: conductor.nombres,
      apellidos: conductor.apellidos,
      numero_celular: conductor.numero_celular,
      num_licencia: conductor.cedula,
      categoria: conductor.categoria,
      fecha_venc_licencia: conductor.fecha_venc_licencia
    });
    conductor.disabled = true;
    console.log('se agregó', this.arrayconductores);
  }

  buscarTaxi(taxiForm: any): void {
    const placa = taxiForm.value.placa;
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
      this.conductores = data.filter(data => data.rol == "Conductor");
      this.conductores.map((conductor: any) => {
        conductor.disabled = false;
      })
      });
  }
  buscarConductor(cedulaC: any): void {
    this.usuarioServicio.getAllUsuario().subscribe((data: any) => {
      this.conductores = data.filter(data => data.cedula == cedulaC);
      this.conductores.map((conductor: any) => {
        conductor.disabled = false;
      })
      console.log('conductores inscritos', this.conductores);
    });
  };
}
