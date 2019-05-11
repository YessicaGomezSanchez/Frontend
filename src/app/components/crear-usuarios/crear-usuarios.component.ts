import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SesionService } from 'src/app/services/sesion.service';
import { ToastrComponent } from '../shared/toastr/toastr.component';
import { max } from 'rxjs/operators';

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
      nombre: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required,Validators.pattern('[a-zA-Z ]*')]],
      tipoDocumento: ['', [Validators.required]],
      numeroDocumento: ['', [Validators.required,Validators.pattern('[0-9]*')]],
      direccion: ['', [Validators.required]],
      numeroFijo: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(7),Validators.minLength(7)]],
      numeroCelular: ['', [Validators.required,Validators.pattern('[0-9]*'),Validators.maxLength(10),Validators.minLength(7)]],
      rolUsuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confContrasena: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: [''],
      categoria: [''],
      fecha_venc_licencia: [''],
      nombreUsuario: [''],  
    });

  }
  get validador() {
    return this.usersForm.controls;
  }

  guardarUsuario(usersForm: any) {
    this.submitted = true;

    if (this.usersForm.invalid) {
      return this.toastr.showError('Complete los campos resaltados', 'Campos obligatorios');
    } else {

      if (usersForm.value.rolUsuario != "Empresa") {
        this.pvx = true;
      } else {
        this.pvx = false;

      }
      if (usersForm.value.contrasena != usersForm.value.confContrasena) {
         return this.toastr.showError('La contraseña no coincide con la confirmación de la contraseña', 'Ups!');
      } else{

        const dataUsuario =
        {
          nombres: usersForm.value.nombre,
          apellidos: usersForm.value.apellidos,
          tipo_documento: usersForm.value.tipoDocumento,
          cedula: usersForm.value.numeroDocumento,
          fecha_nacimiento: usersForm.value.fecha_nacimiento,
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


        this.userService.saveUser(dataUsuario).subscribe((data: any) => {
          console.log('datos del usuario', data);
          this.sesionService.guardarSesion(sesion).subscribe(() => {
            this.toastr.showSuccess('Guardado', 'La información del usuario se ha guardado!');
          }, error => {
            if (error.status == 404) {
              this.toastr.showError(error.message, 'Ups!');
            } else {
              this.toastr.showError(error.message, 'Ups!');
            }
          });
        }, error => {
          if (error.status == 404) {
            this.toastr.showError(error.message, 'Ups!');
          } else {
            this.toastr.showError(error.message, 'Ups!');
          }
        });    
      }
    }
    this.submitted = false;
    this.usersForm.reset();
  }

cancelar() {
  this.usersForm.reset();
}

}
