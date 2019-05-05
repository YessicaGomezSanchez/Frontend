import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{UsuariosService} from '../../services/usuarios.service';
import{SesionService} from '../../services/sesion.service';
import {enableProdMode} from '@angular/core';
import { NgForm } from '@angular/forms';

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

  constructor( private route: ActivatedRoute, private usuariosService:UsuariosService, private sesionService: SesionService) { }

  ngOnInit() {
    this.cargarDatos();
  }
  
  cargarDatos(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuariosService.getUsuario('123').subscribe(data => {
      console.log(data);
      this.nombres = data.nombres;
      this.apellidos = data.apellidos;
      this.tipo_documento= data.tipo_documento;
      this.cedula= data.cedula;
      this.fecha_nacimiento= data.fecha_nacimiento;
      this.direccion= data.direccion;
      this.numero_fijo= data.numero_fijo;
      this.numero_celular= data.numero_celular;
      this.nombre_usuario= data.nombre_usuario;
      this.correo= data.correo;  
    });
  }

  actualizarDatos(form: NgForm){
    const dataUsuario =
    {
      nombres: form.value.nombre,
      apellidos: form.value.apellidos,
      tipo_documento: form.value.tipo_documento,
      cedula: form.value.numeroDocumento,
      fecha_nacimiento: form.value.fechaNacimiento,
      direccion: form.value.direccion,
      numero_fijo: form.value.numeroFijo,
      numero_celular: form.value.numeroCelular,
      nombre_usuario: form.value.nombreUsuario,
      correo: form.value.email
    }
    const sesion = {
      cedula: form.value.numeroDocumento,
      habilitado: true,
      nombre_usuario: form.value.nombreUsuario,
      correo: form.value.email
    }

    this.usuariosService.putUsuario(dataUsuario);
    this.sesionService.putSesion(sesion);
  }

}
