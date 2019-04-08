import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrls: ['./crear-usuarios.component.css']
})
export class CrearUsuariosComponent implements OnInit {

  constructor(private userService: UsuariosService) { }

  ngOnInit() {
  }

  saveUser(form: NgForm) {

    const usuario = {
      nombre: form.value.nombre,
      apellido: form.value.apellidos,
      tipo_documento: form.value.tipoDocument,
      cedula: form.value.numeroDocumento,
      fecha_nacimiento: form.value.fechaNacimiento,
      direccion: form.value.direccion,
      numero_fijo: form.value.numeroFijo,
      numero_celular: form.value.numeroCelular,
      rol: form.value.rolUsuario,
      habilitado: true,
      nombre_usuario: form.value.nombreUsuario,
      correo: form.value.email,
      constrasena: form.value.contraseña,
      num_licencia: '',
      fecha_venc_licencia: '',
      img_licencia: ''
    };

    const dataUsuario = JSON.stringify(usuario);
    console.log(dataUsuario);
    this.userService.saveUser(dataUsuario);
  }

}
