import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'AppTaxi';
  routeActiv: any;
  routeHeader: any;
  routesLink: any = [];
  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routeActiv = event.url;
        if (this.routeActiv === '/')
          this.router.navigate(['/home']);
        this.routeHeader = this.routeActiv.replace(/\//g, ' ');
      }
    });
  }


  ngOnInit() {
    this.routesLink.push(this.router.config)
  }
}