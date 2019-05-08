import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SesionService } from 'src/app/services/sesion.service';
import { ToastrComponent } from '../shared/toastr/toastr.component';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {
  pvx: boolean;
  usersForm: FormGroup;
  submitted = false;

  constructor(
    private userService: UsuariosService,
    private sesionService: SesionService,
    public toastr: ToastrComponent,
    private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.usersForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      numeroFijo: ['', [Validators.required]],
      numeroCelular: ['', [Validators.required]],
      rolUsuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confContrasena: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
    });

  }
  get validador() {
    return this.usersForm.controls;
  }

  guardarUsuario(usersForm: any) {

    this.submitted = true;

    if (this.usersForm.invalid) {

      console.log(this.usersForm.invalid);
      return this.toastr.showError('Complete los campos resaltados', 'Campos incompletos');
    } else {

      if (usersForm.value.rolUsuario != "Empresa") {
        this.pvx = true;
      } else {
        this.pvx = false;
      }

      const dataUsuario =
      {
        nombres: usersForm.value.nombre,
        apellidos: usersForm.value.apellidos,
        tipo_documento: usersForm.value.tipoDocument,
        cedula: usersForm.value.numeroDocumento,
        fecha_nacimiento: usersForm.value.fechaNacimiento,
        direccion: usersForm.value.direccion,
        numero_fijo: usersForm.value.numeroFijo,
        numero_celular: usersForm.value.numeroCelular,
        rol: usersForm.value.rolUsuario,
        habilitado: true,
        pvx: this.pvx,
        nombre_usuario: usersForm.value.nombreUsuario,
        correo: usersForm.value.email,
        contrasena: usersForm.value.contrasena,
        num_licencia: usersForm.value.numeroDocumento,
        categoria: usersForm.value.categoria,
        fecha_venc_licencia: usersForm.value.fecha_venc_licencia,
        img_licencia: ''

      }
      const sesion = {
        cedula: usersForm.value.numeroDocumento,
        rol: usersForm.value.rolUsuario,
        habilitado: true,
        nombre_usuario: usersForm.value.nombreUsuario,
        correo: usersForm.value.email,
        contrasena: usersForm.value.contrasena,
      }

      console.log(dataUsuario);
      console.log(sesion);
      this.userService.saveUser(dataUsuario).subscribe((data: any) => {
        if ( data.rol == 'Conductor') {
          this.toastr.showWarning('Verifique la información del conductor', 'Ups!');
        } else {
          this.sesionService.guardarSesion(sesion).subscribe((datos: any) => {
            this.toastr.showSuccess('Guardado', 'La información del usuario se ha guardado!');         
             usersForm.reset();
          },
            error => {

              if (error.status == 404) {
                this.toastr.showInfo('Los datos de sesión están incorrectos', 'Ups!');
              } else {

              }

            });
        }
      },
        error => {

          if (error.status == 404) {
            console.log('dsadas');
            this.toastr.showError('Ocurrió un error en el sistema', 'Ups!');
          } else {
            if (error.status == 500) {
              console.log('dsadas');
              this.toastr.showInfo(error.error.message, 'Ups!');
            }
          }

        });

    }
  }

}
