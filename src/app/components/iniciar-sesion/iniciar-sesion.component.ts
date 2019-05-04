import { Component, OnInit } from '@angular/core';
import { ToastrComponent } from '../shared/toastr/toastr.component';
import { FormBuilder, FormGroup, Validators, Form, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
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
        private route: ActivatedRoute,
        private location: Location,
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

    consultarUsuario(registerForm) {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return this.toastr.showError('Complete los campos resaltados', 'Campos incompletos');
        } else {
            const sesion =
            {
                correo: registerForm.value.correo,
                contrasena: registerForm.value.contrasena,
            }
            console.log(sesion.correo);
            this.sesionService.getSesion(sesion.correo);
         
            this.toastr.showSuccess('Bienvenido', 'Ingreso exitoso!');
            this.router.navigate([`/dashboard`])
        }
    }
}
