import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private http: HttpClient ) { }

   obtenerUsuarios(): any {
    return this.getQuery('usuarios').pipe(map( data => data ));
  }

  getQuery(query: string) {
    const URL = environment.URL + `${ query }`;

    return this.http.get(URL);
  }

  saveUser(form){
    const  headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const URL = environment.URL + `usuarios`
    return this.http.post(URL, form, {headers}).subscribe(
      data => {
        console.log("POST Request is successful ", data);
        console.log(data);
      },
      error => {
        console.log("Error", error);
      }

    );
  }
}
