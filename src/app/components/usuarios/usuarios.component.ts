import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  nuevoUsuario:[];

  constructor( private usuariosService: UsuariosService ) {
   
  }

  ngOnInit() {
    this.listarUsuarios();
  }

  listarUsuarios(){
    this.usuariosService.getAllUsuario().subscribe((data: any) => {
      this.nuevoUsuario = data;
    });
  }
  buscarUsuario(documento) {
    this.nuevoUsuario = [];
    this.usuariosService.getUsuario(documento).subscribe((data:never) => {
      this.nuevoUsuario.push(data);
    });
  }


  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output 
  

  setPageSizeOptions(cambio : any) {
    this.nuevoUsuario = [];
    this.usuariosService.getAllUsuario().subscribe((data: any) => {
      this.nuevoUsuario = data.slice(0,cambio.pageSize); 
    }); 

    return cambio;
  }
}
