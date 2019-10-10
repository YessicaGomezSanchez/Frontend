import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menu = [
    {
      "name": "Usuario",
      "link": "/usuario",
    },
    {
      "name": "Taxis",
      "link": "/taxis",
    },
    {
      "name": "Acopio",
      "link": "/sesion",
    }
    ,
    {
      "name": "Historia",
      "link": "/historia",
    }
    ,
    {
      "name": "Contacto",
      "link": "/contacto",
    }
  ];

  constructor() { }

  ngOnInit() {
    console.log('length: ', this.menu.length);
    
  }

}
