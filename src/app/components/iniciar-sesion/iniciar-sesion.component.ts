import { Component, OnInit } from '@angular/core';
import { ToastrComponent } from '../shared/toastr/toastr.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
    selector: 'app-iniciar-sesion',
    templateUrl: './iniciar-sesion.component.html',
    styleUrls: ['./iniciar-sesion.component.css']
})

export class IniciarSesionComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;

    constructor(
        public toastr: ToastrComponent,
        private formBuilder: FormBuilder,
        private sesionService: SesionService,
        private router: Router) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            correo: ['', [Validators.required, Validators.email]],
            contrasena: ['', [Validators.required, Validators.minLength(6)]],

        });
    }
    get validador() {
        return this.registerForm.controls;
    }

    consultarUsuario(registerForm: any) {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return this.toastr.showError('Los campos presentan un error, por favor verificar la información', 'Campos incompletos');
        } else {
            const sesion = {
                correo: registerForm.value.correo,
                contrasena: registerForm.value.contrasena
            };

            this.sesionService.getSesion(sesion.correo).subscribe((data: any) => {
                if (data.correo === sesion.correo && data.contrasena === sesion.contrasena && (data.rol === 'Operador' || data.rol === 'Administrador')) {
                    this.router.navigate([`/dashboard`]);
                    this.toastr.showSuccess('Bienvenido', 'Ingreso exitoso!');
                    localStorage.setItem('idUsuario', data.cedula);
                } else {
                    return this.toastr.showInfo('La información ingresada es incorrecta, de lo contrario por favor comunicarse con el administrador del acopio', 'Ups!');
                }
            },
                error => {

                    if (error.status === 404) {
                        this.toastr.showInfo('El usuario no se encuentra registrado en nuestro sistema, por favor comunicarse con el administrador del acopio', 'Ups!');
                    } else {

                    }

                }
            );


        }
    }
}
