import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-iniciar-sesion',
    templateUrl: './iniciar-sesion.component.html',
    styleUrls: ['./iniciar-sesion.component.css']
})

export class IniciarSesionComponent implements OnInit {
    registerForm: FormGroup;
    submitted = false;

    constructor(
        public toastr: ToastrManager, 
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            contrasena: ['', [Validators.required, Validators.minLength(6)]],
            
        });
   
    }
    get f() { return this.registerForm.controls; }

    onSubmit() {     
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return this. showError('Complete los campos resaltados','Campos incompletos');
        }else{
           this.showSuccess('Bienvenido','Ingreso exitoso!'); 
           this.router.navigate([`/dashboard`])
        }    
     
    
    }


    showSuccess(message:string,title:string) {
        this.toastr.successToastr(message, title);
    }

    showError(message:string,title:string) {
      
        this.toastr.errorToastr(message, title);
    }

    showWarning() {
        this.toastr.warningToastr('This is warning toast.', 'Alert!');
    }

    showInfo() {
        this.toastr.infoToastr('This is info toast.', 'Info');
    }

    // showCustom() {
    //     this.toastr.customToastr('<span style='color: green; font-size: 16px; text-align: center;'>Custom Toast</span>', null,
    //     { enableHTML: true }
    //     );
    // }

    showToast(position: any= 'top-down') {
        this.toastr.infoToastr('This is a toast.', 'Toast', {
            position: position
        });
    }

}
