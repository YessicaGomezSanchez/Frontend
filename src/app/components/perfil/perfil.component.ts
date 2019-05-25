import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { SesionService } from '../../services/sesion.service';
import { enableProdMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrComponent } from '../shared/toastr/toastr.component';

import { DatePipe } from '@angular/common';

enableProdMode();

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  nombres: string;
  apellidos: string;
  numero_celular: string;
  correo: string;
  tipo_documento: string;
  cedula: string;
  fecha_nacimiento: string;
  direccion: string;
  numero_fijo: string;
  nombre_usuario: string;
  usersForm: FormGroup;
  submitted = false;
  documento: string;

  constructor(
    public toastr: ToastrComponent,
    private usuariosService: UsuariosService,
    private sesionService: SesionService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cargarDatos();
    this.campoRequeridos();

  }
  campoRequeridos() {
    this.usersForm = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      tipo_documento: ['', [Validators.required]],
      cedula: [{ value: '', disabled: true }, [Validators.required]],
      direccion: ['', [Validators.required]],
      numero_fijo: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(7), Validators.minLength(7)]],
      numero_celular: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(7)]],
      nombre_usuario: [''],
      correo: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: [''],

    })
  }
  get validador() {
    return this.usersForm.controls;
  }
  cargarDatos() {
    const id = localStorage.getItem('idUsuario');
    this.usuariosService.getUsuario(id).subscribe(data => {
      this.nombres = data.nombres;
      this.apellidos = data.apellidos;
      this.tipo_documento = data.tipo_documento;
      this.cedula = data.cedula;
      this.fecha_nacimiento = data.fecha_nacimiento;
      this.direccion = data.direccion;
      this.numero_fijo = data.numero_fijo;
      this.numero_celular = data.numero_celular;
      this.nombre_usuario = data.nombre_usuario;
      this.correo = data.correo;
    });

  }

  actualizarDatos(usersForm: any) {

    this.submitted = true;
    
    if (this.usersForm.invalid) {
     return this.toastr.showError('Los campos resaltados son obligatorios', 'Campos obligatorios');
    } else {
      const dataUsuario =
      {
        nombres: usersForm.value.nombres,
        apellidos: usersForm.value.apellidos,
        tipo_documento: usersForm.value.tipo_documento,
        cedula: this.cedula,
        fecha_nacimiento: usersForm.value.fecha_nacimiento,
        direccion: usersForm.value.direccion,
        numero_fijo: usersForm.value.numero_fijo,
        numero_celular: usersForm.value.numero_celular,
        nombre_usuario: usersForm.value.nombre_usuario,
        correo: usersForm.value.correo
      }
      const sesion = {
        cedula: usersForm.value.cedula,
        habilitado: true,
        nombre_usuario: usersForm.value.nombre_usuario,
        correo: usersForm.value.correo
      }
      if (usersForm.value.fecha_nacimiento !== "") {
        var myDate = new Date(usersForm.value.fecha_nacimiento + " ");
        var today = new Date();
        today.setHours(0, 0, 0, 0)
        if (myDate > today) {
          return this.toastr.showError('La fecha de nacimiento debe ser menor a la fecha actual', 'Ups!');
        }
      }

      this.usuariosService.putUsuario(dataUsuario).subscribe(() => {
        this.sesionService.putSesion(sesion).subscribe(() => {
          this.toastr.showSuccess('Actualizado', 'La información del usuario se ha actualizado!');
        }, error => {
          if (error.status == 404) {
            this.toastr.showError("El correo " + sesion.correo + " no está registrado", 'Ups!');
          } else {
            this.toastr.showError(error.message, 'Ups!');
          }
        });
      }, error => {
        if (error.status == 404) {
          this.toastr.showError("El usuario " + sesion.cedula + " no está registrado", 'Ups!');
        } else {
          this.toastr.showError(error.message, 'Ups2!usuario');
        }
      });

    }
    this.submitted = false;
  }

  transform(value: string) {
    var datePipe = new DatePipe('en-US');
     value = datePipe.transform(value, 'dd/MM/yyyy');
     return value;

 }

}
