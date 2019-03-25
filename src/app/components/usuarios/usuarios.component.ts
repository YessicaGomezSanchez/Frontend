import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  userArray: Array<{
    Documento: number,
    Nombres: string,
    Apellidos: string,
    FechaNacimiento: Date,
    Direccion: string,
    TelefonoFijo: number,
    Celular: number,
    CorreoElectronico: string,
    DataUsuario: Array<{
      RolUsuario: string,
      NombreUsuario: string,
      Contraseña: string
    }>
  }> = new Array();

  constructor() { }

  ngOnInit() {
  }

  saveUser(formUser: NgForm, formDataUser: NgForm) {
    this.userArray = new Array();

    this.userArray.push(
      formUser.value.docIdentidad
      , formUser.value.nombre
      , formUser.value.apellidos
      , formUser.value.fechaNacimiento
      , formUser.value.direccion
      , formUser.value.telefonoFijo
      , formUser.value.celular
      , formUser.value.email
      );

    console.log(this.userArray);
  }

}
