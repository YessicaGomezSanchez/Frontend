import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrComponent } from '../shared/toastr/toastr.component';
import { SesionService } from 'src/app/services/sesion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.component.html',
  styleUrls: ['./restablecer-contrasena.component.css']
})
export class RestablecerContrasenaComponent implements OnInit {

  restablerForm: FormGroup;
  submitted = false;

  constructor(public toastr: ToastrComponent, private formBuilder: FormBuilder, private sesionService: SesionService, private router: Router) { }

  ngOnInit() {
    this.restablerForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confContrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get validador() {
    return this.restablerForm.controls;
  }

  restablerContrasena(restablerForm: any) {
    this.submitted = true;

    // stop here if form is invalid
    if (this.restablerForm.invalid) {
      return this.toastr.showError('Los campos resaltados son obligatorios', 'Campos incompletos');
    } else if (restablerForm.value.contrasena === restablerForm.value.confContrasena) {

      const restablecer = {
        correo: restablerForm.value.correo,
        contrasena: restablerForm.value.contrasena,
      };

      this.sesionService.getSesion(restablecer.correo).subscribe((data: any) => {
        if (data.correo === restablecer.correo && data.contrasena !== restablecer.contrasena && data.habilitado === true) {
          console.log(data.correo, restablecer.correo, data.contrasena, restablecer.contrasena, data.habilitado);
          this.sesionService.putSesion(restablecer).subscribe(() => {
            this.router.navigate([`/sesion`]);
            this.toastr.showSuccess('Contraseña restablecida', 'Recuperación Exitosa!');
          },
            error => {

              if (error.status === 404) {
                this.toastr.showInfo('El usuario no se está registrado en nuestro sistema', 'Ups!');
              } else if (error.status === 500) {
                this.toastr.showError('Ocurrión un problema con el servidor, intenta más tarde', 'Ups!');
              }
            }
          );
        } else {
          this.toastr.showInfo('Verifique su información o comuniquese con un administrador', 'Ups!');
          console.log('informacion igual', data.correo, restablecer.correo, data.contrasena, restablecer.contrasena, data.habilitado);
        }
      },
        error => {

          if (error.status === 404) {
            this.toastr.showInfo('El usuario no está registrado', 'Ups!');
          } else {
            this.toastr.showError('Ocurrión un problema con el servidor, intenta más tarde', 'Ups!');
          }
        });
    } else {
      return this.toastr.showError('La contraseña y confirmación de contraseña no coinciden', 'Contraseñas no coinciden');
    }
  }
}

