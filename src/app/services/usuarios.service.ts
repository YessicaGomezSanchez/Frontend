import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 

export class UsuariosService {
 
  constructor( private http: HttpClient, public headers: HttpHeaders) {
    headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
   }

   obtenerUsuarios(): any {
    return this.getQuery('usuarios').pipe(map( data => data ));
  }

  getQuery(query: string) {
    const URL = environment.URL + `${ query }`;

    return this.http.get(URL);
  }

  saveUser(form){
    const headers= this.headers;
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

  getUsuario(id: any) :Observable <any> {
    const  headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const URL = environment.URL + `usuarios` +`/${id}/`
    return this.http.get(URL,{headers}).pipe(map((res:any)=>{      
      return res;
    }))
  }


}
