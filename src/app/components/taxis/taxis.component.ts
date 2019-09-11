import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaxisService } from '../../services/taxis.service';
import { UsuariosService } from '../../services/usuarios.service';
import { enableProdMode } from '@angular/core';
import { ToastrComponent } from '../shared/toastr/toastr.component';
import { DatePipe } from '@angular/common';

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
  num_seguro_contractual: string;
  fecha_venc_seguro_contractual: Date;
  maletero: boolean;
  parrilla: boolean;
  mascotas: boolean;
  habilitado: boolean;
  fecha_registro: string;
  nombre_apellidos: string;
  tipo_documento: string;
  cedula: string;
  correo: string;
  conductores: [];
  actived = true;
  nameGuardar: string;

  public arrayconductores: Array<{
    nombres: string,
    apellidos: string,
    numero_celular: string,
    num_licencia: string,
    categoria: string,
    fecha_venc_licencia: string,
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
    this.nameGuardar = "Guardar";

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

  guardarTaxi(taxiForm: any) {
    this.submitted = true;

    if (this.taxiForm.invalid) {
      return this.toastr.showError('Los campos resaltados son obligatorios', 'Campos obligatorios');
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
      if (taxiForm.value.fecha_venc_soat !== "") {
        var myDate = new Date(taxiForm.value.fecha_venc_soat + " ");
        var today = new Date();
        today.setHours(0, 0, 0, 0)
        if (myDate < today) {
          return this.toastr.showError('La fecha de vencimiento del SOAT debe ser mayor a la fecha actual', 'Ups!');
        }
      }

      if (taxiForm.value.fecha_venc_tecnomecanica !== "") {
        var myDate = new Date(taxiForm.value.fecha_venc_tecnomecanica + " ");
        var today = new Date();
        today.setHours(0, 0, 0, 0)
        if (myDate < today) {
          return this.toastr.showError('La fecha de vencimiento de la tecnomecánica debe ser mayor a la actual', 'Ups!');
        }
      }

      if (taxiForm.value.fecha_venc_seguro_contractual !== "") {
        var myDate = new Date(taxiForm.value.fecha_venc_seguro_contractual + " ");
        var today = new Date();
        today.setHours(0, 0, 0, 0)
        if (myDate < today) {
          return this.toastr.showError('La fecha de vencimiento del seguro contractual debe ser mayor a la fecha actual', 'Ups!');
        }
      }
      if (this.arrayconductores.length === 0) {
        return this.toastr.showError('Debe agregar al menos un conductor!', 'Ups!');
      }

      this.taxisService.postTaxis(taxi).subscribe(data => {

        this.toastr.showSuccess('La información del taxi se ha guardado!', 'Guardado');
      },
        error => {
          if (error.status === 404) {
            this.toastr.showError(error.message, 'Ups1!');
          } else if (error.status === 500) {
            this.toastr.showError('El taxi ya se encuentra registrado', 'Ups2!');
          }
        }

      );
    }
    taxiForm.reset();
    this.listarConductores();
    this.submitted = false;
  }


  eliminar(index, conductor: any) {
    if (this.arrayconductores.length === 0) {
      this.toastr.showWarning('No hay conductores por eliminar ', 'ups!!');
    } else {
      this.arrayconductores = this.arrayconductores.splice(index, 0);
      this.toastr.showWarning('El conductor fué removido del taxi ', 'Removido!');
      conductor.disabled = false;
    }

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
    this.toastr.showInfo('El conductor fué agregado ', 'Agregado!');
    conductor.disabled = true;

  }

  buscarTaxi(taxiForm: any): void {
    const placa = taxiForm.value.placa;
    if (placa === '' || placa === ' ' || placa === undefined) {
      this.toastr.showWarning('Debe ingresar una placa para realizar la búsqueda', 'Ups!');
    } else {

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
        this.arrayconductores = this.conductores;
        console.log('conductores del taxi', data.conductores);
        this.nameGuardar = 'Actualizar';
      },
      error => {
        if (error.status === 404) {
          const message = error.error.message;
          this.toastr.showError(message, 'Ups!');
        } else {
          this.toastr.showError('Ocurrió un problema en la conexión del proveedor, intenta más tarde o informa al área técnica', 'Ups!');
        }
      });
    }
  }

  listarConductores() {
    this.usuarioServicio.getAllUsuario().subscribe((data: any) => {
      this.conductores = data.filter(data => data.rol === 'Conductor');
      this.conductores.map((conductor: any) => {
        conductor.disabled = false;
      });
    });
  }

  buscarConductor(cedulaC: any): void {

    if (cedulaC === '' || cedulaC === ' ' || cedulaC === undefined) {
      this.toastr.showWarning('Debe ingresar un número de documento para realizar la búsqueda', 'Ups!');
    } else {
      this.usuarioServicio.getAllUsuario().subscribe((data: any) => {
        this.conductores = data.filter(data => data.cedula === cedulaC);
        this.conductores.map((conductor: any) => {
          conductor.disabled = false;
        });
      },
        error => {
          if (error.status === 404) {
            const mensaje = error.error.message;
            this.toastr.showError(mensaje, 'Ups!');
          } else {
            this.toastr.showError('Ocurrió un problema en la conexión del proveedor, intenta más tarde o informa al área técnica', 'Ups!');
          }
        });
    }
  }

  editarTaxi(taxiForm: any) {
    this.submitted = true;

    if (this.taxiForm.invalid) {
      return this.toastr.showError('Los campos resaltados son obligatorios', 'Campos obligatorios');
    } else {
      const now = new Date();
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

      if (taxiForm.value.fecha_venc_soat !== '') {
        const myDate = new Date(taxiForm.value.fecha_venc_soat + ' ');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (myDate < today) {
          return this.toastr.showError('La fecha de vencimiento del SOAT debe ser mayor a la fecha actual', 'Ups!');
        }
      }

      if (taxiForm.value.fecha_venc_tecnomecanica !== '') {
        const myDate = new Date(taxiForm.value.fecha_venc_tecnomecanica + ' ');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (myDate < today) {
          return this.toastr.showError('La fecha de vencimiento de la tecnomecánica debe ser mayor a la actual', 'Ups!');
        }
      }

      if (taxiForm.value.fecha_venc_seguro_contractual !== '') {
        const myDate = new Date(taxiForm.value.fecha_venc_seguro_contractual + ' ');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (myDate < today) {
          return this.toastr.showError('La fecha de vencimiento del seguro contractual debe ser mayor a la fecha actual', 'Ups!');
        }
      }


      if (this.arrayconductores.length === 0) {
        return this.toastr.showError('Debe agregar al menos un conductor!', 'Ups!');
      }
      if (this.arrayconductores.length === 0) {
        return this.toastr.showError('Debe agregar al menos un conductor!', 'Ups!');
      }

      this.taxisService.putTaxi(taxi).subscribe(data => {
        this.toastr.showSuccess('La información del taxi se ha actualizado!', 'Editado');
      },
        error => {
          if (error.status === 404) {
            const message = error.message;
            this.toastr.showError(message, 'Ups!');
          } else if (error.status === 500) {
            this.toastr.showError('El taxi ya se encuentra registrado', 'Ups2!');
          }
        }

      );
    }
    taxiForm.reset();
    this.listarConductores();
    this.submitted = false;
    this.nameGuardar = 'Guardar';
  }

  actionFormulario(taxiForm: any) {
    if (this.nameGuardar === 'Guardar') {
      this.guardarTaxi(taxiForm);
    } else {
      this.editarTaxi(taxiForm);
    }

  }

  transform(value: string) {
    const datePipe = new DatePipe('en-US');
    value = datePipe.transform(value, 'dd/MM/yyyy');
    return value;

  }
  cancelar() {
    this.taxiForm.reset();
    this.listarConductores();
    this.nameGuardar = 'Guardar';

  }
}
