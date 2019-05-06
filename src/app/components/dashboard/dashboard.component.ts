import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isCollapsed: boolean = true;
  isCollapsed2: boolean = true;

  constructor(private route: ActivatedRoute, private usuariosService: UsuariosService) { }



  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;

  }
  toggleCollapse2() {

    this.isCollapsed2 = !this.isCollapsed2;
  }

  ngOnInit() {
   

  }

}
