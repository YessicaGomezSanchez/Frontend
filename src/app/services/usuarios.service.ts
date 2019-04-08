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

  saveUser(form): any {
    this.getQuerySave('usuarios', { form });
  }

  getQuerySave(query: string, form: any): any {
    const URL = environment.URL + `${ query }`;
    console.log(URL);
    console.log(form);
    return this.http.post(URL, { form });
  }
}
