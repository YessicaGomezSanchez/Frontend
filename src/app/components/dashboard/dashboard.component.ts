import { Component, OnInit } from '@angular/core';
import{UsuariosComponent} from '../usuarios/usuarios.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
isCollapsed: boolean=true;
isCollapsed2: boolean=true;

  constructor() { }

toggleCollapse(){
  this.isCollapsed=!this.isCollapsed;

}
toggleCollapse2(){

  this.isCollapsed2=!this.isCollapsed2;
}
  ngOnInit() {
  }

}
