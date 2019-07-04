import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SesionService } from 'src/app/services/sesion.service';
import { ToastrComponent } from '../shared/toastr/toastr.component';


@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  usersForm: FormGroup;
  submitted = false;
  nameGuardar: String;

  pvx: boolean;
  nombres: String;
  apellidos: String;
  tipo_documento: String;
  numero_documento: String;
  fecha_nacimiento: String;
  direccion: String;
  numero_contacto: String;
  rol: String;
  habilitado: Boolean;
  nombre_usuario: String;
  correo: String;
  contrasena: String;
  num_licencia: String;
  categoria: String;
  fecha_venc_licencia: String;
  confContrasena: String;


  constructor(
    private userService: UsuariosService,
    private sesionService: SesionService,
    public toastr: ToastrComponent,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validarCampos();
    this.nameGuardar = "Guardar";
  }
  validarCampos() {
    this.usersForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      tipoDocumento: ['', [Validators.required]],
      numero_documento: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      direccion: ['', [Validators.required]],
      numero_contacto: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(7)]],
      rolUsuario: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confContrasena: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      fecha_nacimiento: [''],
      categoria: [''],
      fecha_venc_licencia: [''],
      nombreUsuario: [''],
      idBusqueda: [''],
    });
  }
  get validador() {
    return this.usersForm.controls;
  }

  guardarUsuario(usersForm: any) {
    this.submitted = true;

    if (this.usersForm.invalid) {
      return this.toastr.showError('Los campos resaltados son obligatorios', 'Campos obligatorios');
    } else {

      if (usersForm.value.rolUsuario != "Empresa") {
        this.pvx = true;
      } else {
        this.pvx = false;

      }
      if (usersForm.value.fecha_nacimiento !== "") {
        var myDate = new Date(usersForm.value.fecha_nacimiento + " ");
        var today = new Date();
        today.setHours(0, 0, 0, 0)
        if (myDate > today) {
          return this.toastr.showError('La fecha de nacimiento debe ser menor a la fecha actual', 'Ups!');
        }
      }

      if (usersForm.value.fecha_venc_licencia !== "") {
        var myDate = new Date(usersForm.value.fecha_venc_licencia + " ");
        var today = new Date();
        today.setHours(0, 0, 0, 0)
        if (myDate < today) {
          return this.toastr.showError('La fecha de vencimiento de licencia debe ser mayor a la actual', 'Ups!');
        }
      }

      if (usersForm.value.rolUsuario === 'Conductor' && (usersForm.value.categoria === undefined || usersForm.value.categoria === " ")) {
        return this.toastr.showError('Complete la categoría  de la licencia de conducción', 'Campos obligatorios del conductor');
      } else if (usersForm.value.rolUsuario === 'Conductor' && (usersForm.value.fecha_venc_licencia === undefined || usersForm.value.fecha_venc_licencia === " ")) {
        return this.toastr.showError('Complete la fecha de vencimiento de la licencia de conducción', 'Campos obligatorios del conductor');
      }

      if (usersForm.value.contrasena !== usersForm.value.confContrasena) {
        return this.toastr.showError('La contraseña no coincide con la confirmación de la contraseña', 'Ups!');
      } else {

        const dataUsuario =
        {
          nombres: usersForm.value.nombre,
          apellidos: usersForm.value.apellidos,
          tipo_documento: usersForm.value.tipoDocumento,
          numero_documento: usersForm.value.numero_documento,
          fecha_nacimiento: usersForm.value.fecha_nacimiento,
          direccion: usersForm.value.direccion,
          numero_contacto: usersForm.value.numero_contacto,
          rol: usersForm.value.rolUsuario,
          habilitado: true,
          pvx: this.pvx,
          nombre_usuario: usersForm.value.nombreUsuario,
          correo: usersForm.value.email,
          contrasena: usersForm.value.contrasena,
          num_licencia: usersForm.value.numero_documento,
          categoria: usersForm.value.categoria,
          fecha_venc_licencia: usersForm.value.fecha_venc_licencia,
          img_licencia: ''

        }
        const sesion = {
          numero_documento: usersForm.value.numero_documento,
          rol: usersForm.value.rolUsuario,
          habilitado: true,
          nombre_usuario: usersForm.value.nombreUsuario,
          correo: usersForm.value.email,
          contrasena: usersForm.value.contrasena,
          numero_contacto: usersForm.value.numero_contacto
        }


        this.userService.saveUser(dataUsuario).subscribe((data: any) => {
          console.log('datos del usuario', data);
          this.sesionService.guardarSesion(sesion).subscribe(() => {
            this.toastr.showSuccess('La información del usuario se ha guardado!', 'Guardado');
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
    this.nameGuardar = "Guardar";
  }

  actualizarUsuarios(usersForm: any) {
    this.submitted = true;

    if (this.usersForm.invalid) {
      return this.toastr.showError('Los campos resaltados son obligatorios', 'Campos obligatorios');
    } else {

      if (usersForm.value.rolUsuario != "Empresa") {
        this.pvx = true;
      } else {
        this.pvx = false;

      }
      if (usersForm.value.fecha_nacimiento !== "") {
        var myDate = new Date(usersForm.value.fecha_nacimiento + " ");
        var today = new Date();
        today.setHours(0, 0, 0, 0)
        if (myDate > today) {
          return this.toastr.showError('La fecha de nacimiento debe ser menor a la fecha actual', 'Ups!');
        }
      }

      if (usersForm.value.fecha_venc_licencia !== "") {
        var myDate = new Date(usersForm.value.fecha_venc_licencia + " ");
        var today = new Date();
        today.setHours(0, 0, 0, 0)
        if (myDate < today) {
          return this.toastr.showError('La fecha de vencimiento de licencia debe ser mayor a la actual', 'Ups!');
        }
      }

      if (usersForm.value.rolUsuario === 'Conductor' && (usersForm.value.categoria === undefined || usersForm.value.categoria === " ")) {
        return this.toastr.showError('Complete la categoría  de la licencia de conducción', 'Campos obligatorios del conductor');
      } else if (usersForm.value.rolUsuario === 'Conductor' && (usersForm.value.fecha_venc_licencia === undefined || usersForm.value.fecha_venc_licencia === " ")) {
        return this.toastr.showError('Complete la fecha de vencimiento de la licencia de conducción', 'Campos obligatorios del conductor');
      }

      if (usersForm.value.contrasena !== usersForm.value.confContrasena) {
        return this.toastr.showError('La contraseña no coincide con la confirmación de la contraseña', 'Ups!');
      } else {

        const dataUsuario =
        {
          nombres: usersForm.value.nombre,
          apellidos: usersForm.value.apellidos,
          tipo_documento: usersForm.value.tipoDocumento,
          numero_documento: usersForm.value.numero_documento,
          fecha_nacimiento: usersForm.value.fecha_nacimiento,
          direccion: usersForm.value.direccion,
          numero_contacto: usersForm.value.numero_contacto,
          rol: usersForm.value.rolUsuario,
          habilitado: true,
          pvx: this.pvx,
          nombre_usuario: usersForm.value.nombreUsuario,
          correo: usersForm.value.email,
          contrasena: usersForm.value.contrasena,
          num_licencia: usersForm.value.numero_documento,
          categoria: usersForm.value.categoria,
          fecha_venc_licencia: usersForm.value.fecha_venc_licencia,
          img_licencia: ''

        }
        const sesion = {
          numero_documento: usersForm.value.numero_documento,
          rol: usersForm.value.rolUsuario,
          habilitado: true,
          nombre_usuario: usersForm.value.nombreUsuario,
          correo: usersForm.value.email,
          contrasena: usersForm.value.contrasena,
          numero_contacto: usersForm.value.numero_contacto
        }

        this.userService.putUsuario(dataUsuario).subscribe((data: any) => {
          this.sesionService.putSesion(sesion).subscribe(() => {
            this.toastr.showSuccess('La información del usuario fué actualizada!', 'Actualizado');
          }, error => {
            if (error.status == 404) {
              this.toastr.showError(error.message, 'Ups1!');
            } else {
              this.toastr.showError(error.error.mns, 'Ups1.1!');
            }
          });
        }, error => {
          if (error.status == 404) {
            this.toastr.showError(error.message, 'Ups2!');
          } else {
            this.toastr.showError(error.message, 'Ups2.1!');
          }
        });
      }
    }

    this.submitted = false;
    this.usersForm.reset();
    this.nameGuardar = "Guardar";

  }
  actionFormulario(usersForm: any) {
    if (this.nameGuardar === "Guardar") {
      this.guardarUsuario(usersForm);
    } else {
      this.actualizarUsuarios(usersForm);
    }

  }

  buscarUsuario(usersForm: any): void {
    const numero_contacto = usersForm.value.idBusqueda;

    if (numero_contacto === "" || numero_contacto === " ") {
      this.toastr.showWarning('Debe ingresar un número identificador para realizar la búsqueda', 'Ups!');
    } else {

      this.userService.getUsuario(numero_contacto).subscribe(data => {
        console.log(data);
        this.nombres = data.nombres;
        this.apellidos = data.apellidos;
        this.tipo_documento = data.tipo_documento;
        this.numero_documento = data.numero_documento;
        this.fecha_nacimiento = data.fecha_nacimiento;
        this.direccion = data.direccion;
        this.numero_contacto = data.numero_contacto;
        this.rol = data.rol;
        this.nombre_usuario = data.nombre_usuario;
        this.correo = data.correo;
        this.contrasena = data.contrasena;
        this.num_licencia = data.num_licencia;
        this.categoria = data.categoria;
        this.fecha_venc_licencia = data.fecha_venc_licencia;
        this.confContrasena = data.contrasena;
        this.nameGuardar = "Actualizar";
      },
        error => {
          if (error.status === 404) {
            this.toastr.showError(error.error.message, 'Ups!');
          } else {
            this.toastr.showError('Ocurrió un problema en la conexión del proveedor, intenta más tarde o informa al área técnica', 'Ups!');
          }

        }
      )
   
    }

  }
}
