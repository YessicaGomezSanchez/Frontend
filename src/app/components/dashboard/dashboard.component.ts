import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapsed = true;
  isCollapsed1 = true;
  isCollapsed2 = true;

  constructor(private route: ActivatedRoute, private usuariosService: UsuariosService) { }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
  toggleCollapse1() {
    this.isCollapsed1 = !this.isCollapsed1;
  }
  toggleCollapse2() {
    this.isCollapsed2 = !this.isCollapsed2;
  }

  ngOnInit() {  }

  cerrarSesion() { localStorage.removeItem('idUsuario'); }
}
