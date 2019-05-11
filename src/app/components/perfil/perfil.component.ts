import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { SesionService } from '../../services/sesion.service';
import { enableProdMode } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrComponent } from '../shared/toastr/toastr.component';

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
  constructor(
    public toastr: ToastrComponent,
    private route: ActivatedRoute,
    private usuariosService: UsuariosService,
    private sesionService: SesionService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cargarDatos();
    this.campoRequeridos();
  }
  campoRequeridos() {
    this.usersForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      tipo_documento: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      numero_fijo: ['', [Validators.required]],
      numero_celular: ['', [Validators.required]],
      nombre_usuario: ['', [Validators.required]],
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
      console.log(data);
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

      console.log(this.usersForm.invalid);
      return this.toastr.showError('Complete los campos resaltados', 'Campos obligatorios');
    } else {
      const dataUsuario =
      {
        nombres: usersForm.value.nombres,
        apellidos: usersForm.value.apellidos,
        tipo_documento: usersForm.value.tipo_documento,
        cedula: usersForm.value.cedula,
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

      this.usuariosService.putUsuario(dataUsuario).subscribe(() => {
         this.sesionService.putSesion(sesion).subscribe(() => {
          this.toastr.showSuccess('Actualizado', 'La información del usuario se ha actualizado!');
        }, error => {
          if (error.status == 404) {
            this.toastr.showError("El correo " + sesion.correo+ " no está registrado", 'Ups!');
          } else {
            this.toastr.showError(error.message, 'Ups!');
          }
        });
      }, error => {
        if (error.status == 404) {
          this.toastr.showError("El usuario " + sesion.cedula+ " no está registrado", 'Ups!');
        } else {
          this.toastr.showError(error.message, 'Ups2!usuario');
        }
      });

    }
    this.submitted = false;
  }


}
