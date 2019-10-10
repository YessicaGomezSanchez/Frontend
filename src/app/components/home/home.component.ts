import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/services/sesion.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Texts = [
    {
      "name": "Usuarios",
      "description": "Some quick example text to build on the card title and make up the bulk of the card's content.",
      "image":"../../../assets/imagenes/user.png"
    },
    {
      "name": "Acopio",
      "description": "Some quick example text to build on the card title and make up the bulk of the card's content.",
      "image":"../../../assets/imagenes/user.png"
    },
    {
      "name": "Taxis",
      "description": "Some quick example text to build on the card title and make up the bulk of the card's content.",
      "image":"../../../assets/imagenes/user.png"
    } 
   
  ];

  constructor(private sesionService: SesionService) {
    this.usuarioPrimeraVez();
  }

  ngOnInit() { }

  usuarioPrimeraVez() {
    this.sesionService.postPrimeraVez().subscribe((data: any) => { });
  }
}
