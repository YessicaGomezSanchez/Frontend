import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  constructor(private userService: UsuariosService, private sesionService: SesionService) { }

  ngOnInit() {
  }

  guardarUsuario(form: NgForm) {

    const dataUsuario =
    {
      nombres: form.value.nombre,
      apellidos: form.value.apellidos,
      tipo_documento: form.value.tipoDocument,
      cedula: form.value.numeroDocumento,
      fecha_nacimiento: form.value.fechaNacimiento,
      direccion: form.value.direccion,
      numero_fijo: form.value.numeroFijo,
      numero_celular: form.value.numeroCelular,
      rol: form.value.rolUsuario,
      habilitado: true,
      pvx:true,
      nombre_usuario: form.value.nombreUsuario,
      correo: form.value.email,
      contrasena: form.value.contraseña,
      num_licencia: form.value.numeroDocumento,
      categoria: form.value.categoria,
      fecha_venc_licencia: form.value.fecha_venc_licencia,
      img_licencia: ''

    }
    const sesion = {
      cedula: form.value.numeroDocumento,
      rol: form.value.rolUsuario,
      habilitado: true,
      nombre_usuario: form.value.nombreUsuario,
      correo: form.value.email,
      contrasena: form.value.contraseña,
    }

    console.log(dataUsuario);
    console.log(sesion);
    this.userService.saveUser(dataUsuario);
    this.sesionService.guardarSesion(sesion);
    form.reset();
  }

}
