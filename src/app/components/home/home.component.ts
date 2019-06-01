import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private sesionService: SesionService) { }

  ngOnInit() {
    this.usuarioPrimeraVez();
  }
  usuarioPrimeraVez(){
    this.sesionService.postPrimeraVez().subscribe((data: any) => {
    });
  }

}
